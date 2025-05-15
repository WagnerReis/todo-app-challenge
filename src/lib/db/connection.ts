import mongoose from 'mongoose';
import dbConnect from './mongoose';

export async function connectToDatabase() {
  await dbConnect();
  console.log('MongoDB connected successfully');
}

export function formatId(id: string) {
  return new mongoose.Types.ObjectId(id);
}

export function isValidObjectId(id: string) {
  return mongoose.isValidObjectId(id);
}