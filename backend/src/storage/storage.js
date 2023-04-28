import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

// Load confg
dotenv.config({ path: "./src/config/config.env" });

const storage = new Storage({
  keyFilename: "./src/config/keys/cloudStorageKey.json",
  projectId: process.env.PROJECT_ID,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

export default bucket;
