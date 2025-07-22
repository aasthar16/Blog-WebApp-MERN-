import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);

    // Remove local file after successful upload
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log("🗑️ Local file deleted.");
      } catch (unlinkError) {
        console.warn("⚠️ Failed to delete local file:", unlinkError.message);
      }
    }

    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);

    // Try deleting the file even after failure, if it exists
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log("🗑️ Local file deleted after failure.");
      } catch (unlinkError) {
        console.warn("⚠️ Failed to delete file after failure:", unlinkError.message);
      }
    }

    return null;
  }
};
