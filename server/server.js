import express from "express";
import { config } from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import profileRoute from "./routes/profileRoutes.js";
import searchRoute from "./routes/searchRoutes.js";
import connectDB from "./data/database.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import ErrorHandler from "./middlewares/error.js";
import Document from "./models/documentModel.js";
import Logbook from "./models/logbookModel.js";
import { config_path } from "./data/configpath.js";

config({
  path: config_path,
  // path: "/Users/hariom/Desktop/vvce/server/data/secret/.env",
});

//changes made here
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const server = http.createServer(app);

//middleares
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
//socket cors
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

//express cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const defaultValue = "";

//socket.io
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
    // console.log("fdsbfj",documentId,document.data)
    socket.on("log-document", async (data) => {
      console.log("data", data);
      await saveLog(documentId, data);
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);

  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
}

//routes
app.use("/api/v1", userRoute);
app.use("/api/v1", profileRoute);
app.use("/api/v1", searchRoute);

//error handler
app.use(ErrorHandler);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//logbook
async function saveLog(documentId, data) {
  // Create a new log entry using Logbook model
  console.log("document id ", documentId);
  console.log("document data", data);
  const newLog = await new Logbook({
    data: data, // Assuming you want to log the existing data
    document_id: documentId,
  });

  await newLog
    .save()
    .then((savedLog) => {
      console.log("Log entry saved:", savedLog);
    })
    .catch((error) => {
      console.error("Error saving log entry:", error);
    });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
