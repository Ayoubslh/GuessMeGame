const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors=require('cors');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });
const rooms = new Map();



app.get('/', (req, res) => {
    res.send("WebSocket & Express server is running...");
});
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

const server = app.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
console.log("WebSocket Server running at ws://localhost:8080");

// Image categories
const imageCategories = {
    footballers: [
    "images/foot/valverde.jpeg",
    "images/foot/maradona.jpeg",
    "images/foot/asensio.jpeg",
    "images/foot/vandijk.jpeg",
    "images/foot/beckham.jpeg",
    "images/foot/courtois.jpeg",
    "images/foot/son.jpeg",
    "images/foot/walker.jpeg",
    "images/foot/debruyne.jpeg",
    "images/foot/lewandoski.jpeg",
    "images/foot/dimaria.jpeg",
    "images/foot/dembele.jpeg",
    "images/foot/iniesta.jpeg",
    "images/foot/xavi.jpeg",
    "images/foot/pepe.jpeg",
    "images/foot/felix.jpeg",
    "images/foot/brahimovic.jpeg",
    "images/foot/naymar.jpeg",
    "images/foot/zidan.jpeg",
    "images/foot/yamal.jpeg",
    "images/foot/nuer.jpeg",
    "images/foot/macallister.jpeg",
    "images/foot/foden.jpeg",
    "images/foot/kante.jpeg",
    "images/foot/diaz.jpeg",
    "images/foot/ramos.jpeg",
    "images/foot/hakimi.jpeg",
    "images/foot/arnold.jpeg",
    "images/foot/maddison.jpeg",
    "images/foot/ruben.jpeg",
    "images/foot/lautaro.jpeg",
    "images/foot/rodri.jpeg",
    "images/foot/allison.jpeg",
    "images/foot/modric.jpeg",
    "images/foot/griezman.jpeg",
    "images/foot/saka.jpeg",
    "images/foot/bellingham.jpeg",
    "images/foot/Vinicus.jpg",
    "images/foot/mbappe.jpg",
    "images/foot/kane.jpeg",
    "images/foot/haland.jpg",
    "images/foot/ronaldo.jpg"
    ],
    others: [
        "images/9rabej/obj(1).jpeg",
        "images/9rabej/obj(2).jpeg",
        "images/9rabej/obj(3).jpeg",
        "images/9rabej/obj(4).jpeg",
        "images/9rabej/obj(5).jpeg",
        "images/9rabej/obj(6).jpeg",
        "images/9rabej/obj(7).jpeg",
        "images/9rabej/obj(8).jpeg",
        "images/9rabej/obj(9).jpeg",
        "images/9rabej/obj(10).jpeg",
        "images/9rabej/obj(11).jpeg",
        "images/9rabej/obj(12).jpeg",
        "images/9rabej/obj(13).jpeg",
        "images/9rabej/obj(14).jpeg",
        "images/9rabej/obj(15).jpeg",
        "images/9rabej/obj(16).jpeg",
        "images/9rabej/obj(17).jpeg",
        "images/9rabej/obj(18).jpeg",
        "images/9rabej/obj(19).jpeg",
        "images/9rabej/obj(20).jpeg",
        "images/9rabej/obj(21).jpeg",
        "images/9rabej/obj(22).jpeg",
        "images/9rabej/obj(23).jpeg",
        "images/9rabej/obj(24).jpeg",
        "images/9rabej/obj(25).jpeg",
        "images/9rabej/obj(26).jpeg",
        "images/9rabej/obj(27).jpeg",
        "images/9rabej/obj(28).jpeg",
        "images/9rabej/obj(29).jpeg",
        "images/9rabej/obj(30).jpeg",
        "images/9rabej/obj(31).jpeg",
        "images/9rabej/obj(32).jpeg",
        "images/9rabej/obj(33).jpeg",
        "images/9rabej/obj(34).jpeg",
        "images/9rabej/obj(35).jpeg",
        "images/9rabej/obj(36).jpeg",
        "images/9rabej/obj(37).jpeg"

    ],
    gamechar:[
        "images/gamechar/t(1).jpeg",
    "images/gamechar/t(2).jpeg",
    "images/gamechar/t(3).jpeg",
    "images/gamechar/t(4).jpeg",
    "images/gamechar/t(5).jpeg",
    "images/gamechar/t(6).jpeg",
    "images/gamechar/t(7).jpeg",
    "images/gamechar/t(8).jpeg",
    "images/gamechar/t(9).jpeg",
    "images/gamechar/t(10).jpeg",
    "images/gamechar/t(11).jpeg",
    "images/gamechar/t(12).jpeg",
    "images/gamechar/t(13).jpeg",
    "images/gamechar/t(14).jpeg",
    "images/gamechar/t(15).jpeg",
    "images/gamechar/t(16).jpeg",
    "images/gamechar/t(17).jpeg",
    "images/gamechar/t(18).jpeg",
    "images/gamechar/t(19).jpeg",
    "images/gamechar/t(20).jpeg",
    ],
    animechar:["images/animechar/image(1).jfif",
    "images/animechar/image(2).jfif",
    "images/animechar/image(3).jfif",
    "images/animechar/image(4).jfif",
    "images/animechar/image(5).jfif",
    "images/animechar/image(6).jfif",
    "images/animechar/image(7).jfif",
    "images/animechar/image(8).jfif",
    "images/animechar/image(9).jfif",
    "images/animechar/image(10).jfif",
    "images/animechar/image(11).jfif",
    "images/animechar/image(12).jfif",
    "images/animechar/image(13).jfif",
    "images/animechar/image(14).jfif",
    "images/animechar/image(15).jfif",
    "images/animechar/image(16).jfif",
    "images/animechar/image(17).jfif",
    "images/animechar/image(18).jfif",
    "images/animechar/image(19).jfif",
    "images/animechar/image(20).jfif",
    "images/animechar/image(21).jfif",
    "images/animechar/image(22).jfif",
    "images/animechar/image(23).jfif",
    "images/animechar/image(24).jfif",
    "images/animechar/image(25).jfif",
    "images/animechar/image(26).jfif",
    "images/animechar/image(27).jfif",
    "images/animechar/image(28).jfif",
    "images/animechar/image(29).jfif",
    "images/animechar/image(30).jfif",
    "images/animechar/image(31).jfif",
    "images/animechar/image(32).jfif",
    "images/animechar/image(33).jfif",
    "images/animechar/image(34).jfif",
    "images/animechar/image(35).jfif",
    "images/animechar/image(36).jfif",
    "images/animechar/image(37).jfif",
    "images/animechar/image(38).jfif",
    "images/animechar/image(39).jfif",
    "images/animechar/image(40).jfif",
    "images/animechar/image(41).jfif",
    "images/animechar/image(42).jfif",
    "images/animechar/image(43).jfif",
    "images/animechar/image(44).jfif",
    "images/animechar/image(45).jfif",
    "images/animechar/image(46).jfif",
    "images/animechar/image(47).jfif",
    "images/animechar/image(48).jfif",
    "images/animechar/image(49).jfif",
    "images/animechar/image(50).jfif",
    "images/animechar/image(51).jfif",
    "images/animechar/image(52).jfif",
    "images/animechar/image(53).jfif",
    "images/animechar/image(54).jfif",
    "images/animechar/image(55).jfif",
    "images/animechar/image(56).jfif",
    "images/animechar/image(57).jfif",
    "images/animechar/image(58).jfif",
    "images/animechar/image(59).jfif",
    "images/animechar/image(60).jfif",
    "images/animechar/image(61).jfif",
    "images/animechar/image(62).jfif",
    "images/animechar/image(63).jfif",
    "images/animechar/image(64).jfif"],
    cars:[ "images/cars/imagek(1).jfif",
        "images/cars/imagek(2).jfif",
        "images/cars/imagek(3).jfif",
        "images/cars/imagek(4).jfif",
        "images/cars/imagek(5).jfif",
        "images/cars/imagek(6).jfif",
        "images/cars/imagek(7).jfif",
        "images/cars/imagek(8).jfif",
        "images/cars/imagek(9).jfif",
        "images/cars/imagek(10).jfif",
        "images/cars/imagek(11).jfif",
        "images/cars/imagek(12).jfif",
        "images/cars/imagek(13).jfif",
        "images/cars/imagek(14).jfif",
        "images/cars/imagek(15).jfif",
        "images/cars/imagek(16).jfif",
        "images/cars/imagek(17).jfif",
        "images/cars/imagek(18).jfif",
        "images/cars/imagek(19).jfif",
        "images/cars/imagek(20).jfif",
        "images/cars/imagek(21).jfif",
        "images/cars/imagek(22).jfif",
        "images/cars/imgj(1).jpeg",
        "images/cars/imgj(2).jpeg",
        "images/cars/imgj(3).jpeg",
        "images/cars/imgj(4).jpeg",
        "images/cars/imgj(4).jpeg"
        ,"images/cars/imgj(6).jpeg",
        "images/cars/imgj(7).jpeg"
    ]


};

// Function to randomly assign images based on category
function assignImages(room) { 
    if (room.players.length === 2) {
        const category = room.category || 'others'; // Default to "others"
        const images = imageCategories[category];

        if (!images || images.length < 2) {
            console.error(`Category ${category} has insufficient images.`);
            return;
        }

        const [img1, img2] = images.sort(() => 0.5 - Math.random()).slice(0, 2);

        room.players[0].send(JSON.stringify({ type: 'receiveImage', image: img1, role: "You are Player 1" }));
        room.players[1].send(JSON.stringify({ type: 'receiveImage', image: img2, role: "You are Player 2" }));

        room.players.forEach(player => player.send(JSON.stringify({ type: 'gameStart' })));
    }
}

wss.on('connection', ws => {
    console.log('New player connected');

    ws.on('message', message => {
        const data = JSON.parse(message);

        if (data.type === 'createRoom') {
            const roomId = uuidv4().slice(0, 6); // Short room ID
            const category = data.category || 'others'; // Default category
            rooms.set(roomId, { players: [ws], category });

            ws.send(JSON.stringify({ type: "room-created", roomId }));
            console.log(`Room ${roomId} created`);
        } 

        else if (data.type === 'joinRoom') {
            const { roomId } = data;
            if (rooms.has(roomId)) {
                const room = rooms.get(roomId);
                
                if (room.players.length < 2) {
                    room.players.push(ws);
                    assignImages(room); // Assign initial images
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: "Room is full" }));
                }
            } else {
                ws.send(JSON.stringify({ type: 'error', message: "Room not found" }));
            }
        } 

        else if (data.type === 'rematch') {
            const { roomId } = data;
            if (rooms.has(roomId)) {
                const room = rooms.get(roomId);
                assignImages(room); // Assign new images for rematch
            }
        }

        else if (data.type === 'guess') {
            const { roomId, message } = data;
            if (rooms.has(roomId)) {
                rooms.get(roomId).players.forEach(player => {
                    player.send(JSON.stringify({ type: 'guess', message }));
                });
            }
        }
    });

    ws.on('close', () => {
        console.log('Player disconnected');
    });
});
