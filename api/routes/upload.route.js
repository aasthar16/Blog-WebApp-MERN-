import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../cloudinary.js";
import path from "path";
import fs from "fs";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("✅ Incoming file:", req.file);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    const localFilePath = req.file.path;

    // Check if file exists on disk
    const exists = fs.existsSync(localFilePath);
    console.log("📁 File exists on disk:", exists);

    if (!exists) {
      return res.status(404).json({ message: "❌ File not found on server" });
    }

    // Upload to cloudinary
    const cloudinaryResult = await uploadOnCloudinary(localFilePath);
    console.log("☁️ Cloudinary Result:", cloudinaryResult);

    // Delete local file after upload
    // fs.unlinkSync(localFilePath);

    if (!cloudinaryResult || !cloudinaryResult.url) {
      return res.status(400).json({ message: "❌ Cloudinary upload failed" });
    }

    return res.status(200).json({ url: cloudinaryResult.url });
  } catch (err) {
    console.error("🔥 Upload error:", err);
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

export default router;
