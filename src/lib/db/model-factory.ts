import mongoose, { Model, Schema } from 'mongoose';
import dbConnect from './mongoose';

/**
 * Creates a dynamically loaded Mongoose model with lazy initialization.
 * 
 * @template T The type of the Mongoose document
 * @param {string} modelName The name of the Mongoose model
 * @param {Schema} schema The Mongoose schema definition for the model
 * @returns {Model<T>} A proxy model that initializes the Mongoose model on first access
 * 
 * @remarks
 * This function ensures database connection and model creation are deferred until the model is first used.
 * It provides a transparent proxy that lazily loads the Mongoose model and allows method calls and property access.
 */
export function createModel<T>(modelName: string, schema: Schema): Model<T> {
  const getModel = async (): Promise<Model<T>> => {
    await dbConnect();
    return (mongoose.models[modelName] ||
      mongoose.model<T>(modelName, schema)) as Model<T>;
  };

  return new Proxy({} as Model<T>, {
    get: async (_, prop) => {
      const model = await getModel();

      const value = model[prop as keyof typeof model];

      if (typeof value === 'function') {
        return (...args: any[]) => (value as Function).apply(model, args);
      }
      return value;
    }
  }) as Model<T>;
}