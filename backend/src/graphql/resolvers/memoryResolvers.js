import pool from '../../db.js';
import { GraphQLUpload } from 'graphql-upload';
import { verifyToken } from '../utils/auth.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://6996b0642a70cac8cb2ecee886f523ac.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY
  }
});

const memoryResolvers = {
  Mutation: {
    addMemory: async (_, { title, description, file, date }, context) => {
      verifyToken(context.req);

      try {
        const { createReadStream, filename, mimetype } = await file;

        // Upload directly to R2
        await s3.send(new PutObjectCommand({
          Bucket: "memories-images",
          Key: filename,
          Body: createReadStream(),
          ContentType: mimetype
        }));

        // Construct public URL
        const imageUrl = `https://6996b0642a70cac8cb2ecee886f523ac.r2.cloudflarestorage.com/memories-images/${filename}`;

        // Store URL in MySQL
        const [result] = await pool.query(
          'INSERT INTO memories (title, description, image_path, date) VALUES (?, ?, ?, ?)',
          [title, description, imageUrl, date]
        );

        return {
          id: result.insertId,
          title,
          description,
          image_path: imageUrl,
          date,
          uploaded_at: new Date().toISOString()
        };
      } catch (error) {
        console.error('Error adding memory:', error);
        throw error;
      }
    }
  },
  Query: {
    getMemories: async (_, __, context) => {
      verifyToken(context.req);
      const [rows] = await pool.query('SELECT * FROM memories');
      return rows;
    },
    getMemoryById: async (_, { id }, context) => {
      verifyToken(context.req);
      const [rows] = await pool.query('SELECT * FROM memories WHERE id = ?', [id]);
      return rows[0];
    }
  },
  Upload: GraphQLUpload,
};

export default memoryResolvers;
