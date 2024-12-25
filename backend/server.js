import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import connectToMongoDb from "./db/connectToMongoDb.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app, io, server } from "./Socket/socket.js";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
})
server.listen(PORT, ()=> {
    connectToMongoDb();
console.log(`server running on port ${PORT} `)
});