import mongoose from 'mongoose';
import { dbConfig } from './app.config';


export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConfig.uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};