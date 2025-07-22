import multer from "multer";
import path from "path";
import fs from "fs";

// Define folder path for temporary storage
const tempFolder = path.join("public", "temp");

// Create folder if it doesn't exist
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempFolder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e8);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
