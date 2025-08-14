import pool from '../../db.js';
import { GraphQLUpload } from 'graphql-upload';
import { verifyToken } from '../utils/auth.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://6996b0642a70cac8cb2ecee886f523ac.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY
  }
});

const BUCKET = "memories-images"; // your R2 bucket name

const memoryResolvers = {
  Query: {
    getMemories: async (_, __, context) => {
      verifyToken(context.req);

      const [rows] = await pool.query('SELECT * FROM memories');

      return await Promise.all(
        rows.map(async memory => {
          const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: memory.image_path // just the filename
          });
          const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
          return { ...memory, image_path: signedUrl };
        })
      );
    },

    getMemoryById: async (_, { id }, context) => {
      verifyToken(context.req);

      const [rows] = await pool.query('SELECT * FROM memories WHERE id = ?', [id]);
      if (!rows[0]) return null;

      const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: rows[0].image_path
      });
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

      return { ...rows[0], image_path: signedUrl };
    }
  },

  Mutation: {
    addMemory: async (_, { title, description, file, date }, context) => {
      verifyToken(context.req);

      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();

      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Upload file to R2
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,  // filename only
        Body: fileBuffer,
        ContentType: mimetype,
        ContentLength: fileBuffer.length
      }));

      // Save filename to DB
      const [result] = await pool.query(
        'INSERT INTO memories (title, description, image_path, date) VALUES (?, ?, ?, ?)',
        [title, description, filename, date]
      );

      return {
        id: result.insertId,
        title,
        description,
        image_path: filename, // still just filename here
        date,
        uploaded_at: new Date().toISOString()
      };
    },

    deleteMemory: async (_, { id }, context) => {
      verifyToken(context.req);

      const [rows] = await pool.query('SELECT image_path FROM memories WHERE id = ?', [id]);
      if (rows[0]) {
        await s3.send(new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: rows[0].image_path
        }));
      }

      const [result] = await pool.query('DELETE FROM memories WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }
  },

  Upload: GraphQLUpload
};

export default memoryResolvers;
