import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GameArea({
  playerRole,
  hiddenImage,
  guess,
  setGuess,
  sendGuess,
  gameStarted = false,
}) {
  return (
    <div className="w-full p-5 border flex flex-col gap-3">
      <h2 className="text-xl font-bold">
        {gameStarted ? 'Switch Your Phones' : 'Waiting for Players'}
      </h2>

      {gameStarted ? (
        <div className='relative overflow-hidden'>
          <div
            className="absolute inset-0 bg-cover bg-center blur-md -z-50"
            style={{ backgroundImage: `url(${hiddenImage})` }}
          ></div>
          <img
            src={hiddenImage}
            alt="Error: Click Rematch"
            className="w-full min-h-[45dvh] object-scale-down border"
          />
        </div>
      ) : (
        <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No Room Created
        </div>
      )}
    </div>
  );
}
