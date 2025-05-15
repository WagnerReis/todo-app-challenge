import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);