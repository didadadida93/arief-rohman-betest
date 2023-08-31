import mongoose from 'mongoose';

export const setupMongoDb = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
  } catch {
    console.log('Failed to connect to mongodb');
    process.exit(1);
  }
}
