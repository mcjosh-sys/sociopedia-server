import http from 'http'
import app from './app.js'
import mongoose from 'mongoose'

const server = http.createServer(app)
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => server.listen(PORT,() => console.log(`Server is running on port: ${PORT}...`)))
  .catch((error) =>
    console.log(`Could not connect...\nError: ${error.message}`)
  );
