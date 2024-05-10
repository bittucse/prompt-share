import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectedToDB = async () => {

  if (isConnected) {
    console.log("MongoDB is already connnectd");
    return;
  }

  try {

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
