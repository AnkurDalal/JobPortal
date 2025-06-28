import mongoose from "mongoose";

//function to connect to the database
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB connection successful")
  );
  await mongoose.connect(process.env.MONGODB_URI);
};
export default connectDB;
