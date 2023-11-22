import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_DB_URL as string;

async function connectMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose
      .connect(uri)
      .then(() => console.log("Db Connection estublished!"));
  } finally {
  }
}

export default connectMongo;
