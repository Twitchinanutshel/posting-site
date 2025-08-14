import pool from '../../db.js';
import fs from 'fs';
import path from 'path';
import { GraphQLUpload } from 'graphql-upload';
import { verifyToken } from '../utils/auth.js';

const memoryResolvers = {
  Query: {
    getMemories: async (_, __, context) => {
      verifyToken(context.req);

      try {
        const [rows] = await pool.query('SELECT * FROM memories');
        return rows;
      } catch (error) {
        console.error('Error fetching memories:', error);
        throw new Error('Failed to get memories');
      }
    },
    getMemoryById: async (_, { id }, context) => {
      verifyToken(context.req);
      const [rows] = await pool.query('SELECT * FROM memories WHERE id = ?', [id]);
      return rows[0];
    }
  },
  Mutation: {
    addMemory: async (_, { title, description, file, date }, context) => {
      verifyToken(context.req);

      try {
        const { createReadStream, filename } = await file;
        const uploadDir = path.join(process.cwd(), 'uploads');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        const filePath = path.join(uploadDir, filename);
        await new Promise((resolve, reject) => {
          createReadStream()
            .pipe(fs.createWriteStream(filePath))
            .on('finish', resolve)
            .on('error', reject);
        });

        const [result] = await pool.query(
          'INSERT INTO memories (title, description, image_path, date) VALUES (?, ?, ?, ?)',
          [title, description, filename, date]
        );

        return {
          id: result.insertId,
          title,
          description,
          image_path: `/uploads/${filename}`,
          date,
          uploaded_at: new Date().toISOString()
        };
      } catch (error) {
        console.error('Error adding memory:', error);
        throw error;
      }
    },
    deleteMemory: async (_, { id }, context) => {
      verifyToken(context.req);
      try {
        const [result] = await pool.query('DELETE FROM memories WHERE id = ?', [id]);
        return result.affectedRows > 0;
      } catch (error) {
        console.error('Error deleting memory:', error);
        throw new Error('Failed to delete memory');
      }
    }
  },
  Upload: GraphQLUpload,
};

export default memoryResolvers;
