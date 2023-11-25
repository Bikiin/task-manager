import mongoose from "mongoose";
import config from "../config";

const options = {
  socketTimeoutMS: 0,
  connectTimeoutMS: 30000,
};

export const dbConnect = async () => await mongoose.connect(config.DB_URI, options)