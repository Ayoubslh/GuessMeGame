const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("WebSocket + Express server is running on Render!");
});

// --- Create a single server ---
const server = http.createServer(app);

// --- Attach WebSocket to the same HTTP server ---
const wss = new WebSocket.Server({ server });

// --- Store rooms ---
const rooms = new Map();

// --- Image categories (unchanged) ---
const imageCategories = { /* your big object here */ };

// --- Helper function to assign images ---
function assignImages(room) {
  if (room.players.length === 2) {
    const category = room.category || "others";
    const images = imageCategories[category];

    if (!images || images.length < 2) {
      console.error(`Category ${category} has insufficient images.`);
      return;
    }

    const [img1, img2] = images.sort(() => 0.5 - Math.random()).slice(0, 2);
    room.players[0].send(JSON.stringify({ type: "receiveImage", image: img1, role: "You are Player 1" }));
    room.players[1].send(JSON.stringify({ type: "receiveImage", image: img2, role: "You are Player 2" }));

    room.players.forEach((player) => player.send(JSON.stringify({ type: "gameStart" })));
  }
}

// --- WebSocket connection handling ---
wss.on("connection", (ws) => {
  console.log("New player connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "createRoom") {
      const roomId = uuidv4().slice(0, 6);
      const category = data.category || "others";
      rooms.set(roomId, { players: [ws], category });

      ws.send(JSON.stringify({ type: "room-created", roomId }));
      console.log(`Room ${roomId} created`);
    } else if (data.type === "joinRoom") {
      const { roomId } = data;
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        if (room.players.length < 2) {
          room.players.push(ws);
          assignImages(room);
        } else {
          ws.send(JSON.stringify({ type: "error", message: "Room is full" }));
        }
      } else {
        ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
      }
    } else if (data.type === "rematch") {
      const { roomId } = data;
      if (rooms.has(roomId)) {
        assignImages(rooms.get(roomId));
      }
    } else if (data.type === "guess") {
      const { roomId, message } = data;
      if (rooms.has(roomId)) {
        rooms.get(roomId).players.forEach((player) =>
          player.send(JSON.stringify({ type: "guess", message }))
        );
      }
    }
  });

  ws.on("close", () => console.log("Player disconnected"));
});

// --- Use Render's provided PORT ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server (HTTP + WS) running on port ${PORT}`);
});
