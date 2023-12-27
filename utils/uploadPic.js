import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationPath = path.join(__dirname, "../public/media");

if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
}

/* File Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, destinationPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({ storage: storage });
