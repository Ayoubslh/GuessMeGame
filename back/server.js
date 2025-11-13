const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("Socket.IO + Express server is running on Render!");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const rooms = new Map();
const imageCategories = { /* your big object here */ };

function assignImages(roomId) {
  const room = rooms.get(roomId);
  if (!room || room.players.length < 2) return;

  const category = room.category || "others";
  const images = imageCategories[category];
  if (!images || images.length < 2) return;

  const [img1, img2] = images.sort(() => 0.5 - Math.random()).slice(0, 2);

  io.to(room.players[0]).emit("receiveImage", { image: img1, role: "You are Player 1" });
  io.to(room.players[1]).emit("receiveImage", { image: img2, role: "You are Player 2" });
  io.to(roomId).emit("gameStart");
}

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("createRoom", ({ category = "others" }) => {
    const roomId = uuidv4().slice(0, 6);
    rooms.set(roomId, { players: [socket.id], category });
    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log(`Room ${roomId} created`);
  });

  socket.on("joinRoom", ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return socket.emit("error", { message: "Room not found" });
    if (room.players.length >= 2)
      return socket.emit("error", { message: "Room is full" });

    room.players.push(socket.id);
    socket.join(roomId);
    assignImages(roomId);
  });

  socket.on("rematch", ({ roomId }) => assignImages(roomId));

  socket.on("guess", ({ roomId, message }) => {
    io.to(roomId).emit("guess", { message });
  });

  socket.on("disconnect", () => {
    for (const [roomId, room] of rooms.entries()) {
      room.players = room.players.filter((id) => id !== socket.id);
      if (room.players.length === 0) rooms.delete(roomId);
    }
    console.log("Player disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

