import { MongoClient } from "mongodb";
import 'dotenv/config'

let db;

export const connectDB = async () => {
  try {
    console.log("start");
    console.log(process.env.MONGO_URI);
    const client = new MongoClient(process.env.MONGO_URI);
    console.log(client);
    console.log("client connected");
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const getDB = () => db;