import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClipboard } from 'react-haiku';
import { QRCodeCanvas } from 'qrcode.react';

export function ImageCard({
  roomId = null,
  createRoom = null,
}) {
  const clipboard = useClipboard({ timeout: 2000 });
  return (
    <div className="w-full p-5 border flex flex-col gap-3 justify-between">
      {/* {roomId ? (
        <QRCodeCanvas
          value={`http://localhost:3000/join?roomId=${roomId}`}
          size={256}
          className="w-full"
        />
      ) : (
        <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No Room Created
        </div>
      )} */}
      <div className="border p-3 flex justify-between">
        <p className="flex items-center pl-3">
          {roomId || 'No Room ID'}
        </p>
        <div
          className="p-2 border cursor-pointer"
          onClick={() => navigator.clipboard.writeText(roomId || '')}
        >
          <button
            className="flex justify-center items-center"
            onClick={() => clipboard.copy(roomId || '')}
          >
            {roomId ? (
              clipboard.copied ? (
                <Check className="h-5" />
              ) : (
                <Copy className="h-5" />
              )
            ) : (
              <Copy className="h-5" />
            )}
          </button>
        </div>
      </div>
      <Button onClick={createRoom}>Create a Room</Button>
    </div>
  );
}
