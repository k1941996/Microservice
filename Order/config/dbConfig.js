import mongoose from "mongoose";
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "Orders",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connection to database Successfully established");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
