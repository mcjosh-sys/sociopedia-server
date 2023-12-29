import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import http from "http"

/* Configurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined", {stream: accessLogStream}));
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "public/media")));

/* Routes */
app.use("/api", routes);

//const server = http.createServer(app)
const PORT = process.env.PORT || 6001;
const server = http.createServer(app)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => server.listen(PORT,() => console.log(`Server is running on port ${PORT} ...`)))
  .catch((error) =>
    console.log(`Could not connect...\nError: ${error.message}`)
  );
