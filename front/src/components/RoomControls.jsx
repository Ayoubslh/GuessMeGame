import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RoomControls({ joinRoom }) {
  const [roomCodeInput, setRoomCodeInput] = useState('');

  return (
    <div className="w-full p-5 border flex flex-col gap-3">
      <Input
        placeholder="Enter the room code"
        value={roomCodeInput}
        onChange={(e) => setRoomCodeInput(e.target.value)}
      />
      <Button variant={'secondary'} onClick={() => joinRoom(roomCodeInput)}>Join Room</Button>
    </div>
  );
}
