import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
app.use(express.json()); // If you’re handling JSON payloads

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId) userSocketMap[userId] = socket.id;

	// Emit updated online users list
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		for (const [key, value] of Object.entries(userSocketMap)) {
			if (value === socket.id) {
				delete userSocketMap[key];
				break;
			}
		}
		// Emit updated online users list
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
