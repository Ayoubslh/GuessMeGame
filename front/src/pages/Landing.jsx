import { useState, useEffect } from 'react';
import img from '@/assets/nextTech.png';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {QRCode} from 'qrcode.react';
import { ImageCard } from '@/components/image-card';
import { GameArea } from '@/components/GameArea';
import { RoomControls } from '@/components/RoomControls';
import { Button } from '@/components/ui/button';

import { CategorySelect } from '@/components/category-select';

function Landing() {
  const [ws, setWs] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerRole, setPlayerRole] = useState('');
  const [hiddenImage, setHiddenImage] = useState('');
  const [messages, setMessages] = useState([]);
  const [guess, setGuess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('footballers');

  useEffect(() => {
    const websocket = new WebSocket('ws://192.168.1.2:8080');
    setWs(websocket);

    websocket.onopen = () => console.log('WebSocket connected!');
    websocket.onerror = error => console.error('WebSocket error:', error);
    websocket.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.type === 'roomCreated') setRoomId(data.roomId);
      else if (data.type === 'gameStart') setGameStarted(true);
      else if (data.type === 'receiveImage') {
        setHiddenImage(`http://192.168.1.2:3000/${data.image}`);
        setPlayerRole(data.role);
      } else if (data.type === 'guess') {
        setMessages(prev => [...prev, data.message]);
      }
    };

    websocket.onclose = () => {
      console.warn('WebSocket disconnected. Ending game.');
      setGameStarted(false);
    };

    return () => websocket.close();
  }, []);

  const createRoom = () => {
    if (ws) {
      ws.send(
        JSON.stringify({ type: 'createRoom', category: selectedCategory })
      );
    }
  };
  const joinRoom = roomIdInput => {
    setRoomId(roomIdInput);
    ws && ws.send(JSON.stringify({ type: 'joinRoom', roomId: roomIdInput }));
  };
  const sendGuess = () => {
    if (ws && roomId) {
      ws.send(JSON.stringify({ type: 'guess', roomId, message: guess }));
      setGuess('');
    }
  };
  const stopGame = () => {
    setGameStarted(false);
    setRoomId(false);
    ws && ws.send(JSON.stringify({ type: 'stopGame', roomId }));
  };
  const requestRematch = () => {
    if (ws && roomId) {
      ws.send(JSON.stringify({ type: 'rematch', roomId }));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <GameArea
        playerRole={playerRole}
        hiddenImage={hiddenImage}
        guess={guess}
        setGuess={setGuess}
        sendGuess={sendGuess}
        gameStarted={gameStarted}
      />
      {gameStarted ? (
        <>
          <div className="flex flex-col gap-3 justify-center mt-1 p-5 border-[1px] w-full">
            <Button onClick={requestRematch}>Rematch</Button>
            <Button onClick={stopGame} variant="secondary" className="w-full">
              End Game
            </Button>
          </div>
        </>
      ) : (
        <>
          <ImageCard roomId={roomId} createRoom={createRoom} />
          <RoomControls joinRoom={joinRoom} />
        </>
      )}
    </div>
  );
}

export default Landing;
