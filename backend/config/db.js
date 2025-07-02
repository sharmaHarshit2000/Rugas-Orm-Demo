import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connc = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MonogoDB connected: ${connc.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
