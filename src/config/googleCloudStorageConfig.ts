import { Storage } from "@google-cloud/storage";
import path from "path";

const googleCredential = process.env.GOOGLE_CLOUD_CREDENTIALS || "";

const storage = new Storage({
  keyFilename: path.resolve(__dirname, "../../", googleCredential),
});

const bucketName = process.env.BUCKET_NAME || "";

const bucket = storage.bucket(bucketName);

export { bucket };
