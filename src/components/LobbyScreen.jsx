
import React, { useState } from 'react';
import { Users, Copy, Check, LogOut, Play } from 'lucide-react';

export default function LobbyScreen({ 
  roomCode, 
  players, 
  isHost, 
  onStartGame, 
  onLeaveRoom,
  loading 
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-slate-800 py-2 px-4 rounded-lg border border-indigo-500">
                <p className="text-2xl font-bold text-white tracking-wider font-mono">{roomCode}</p>
              </div>
              <button onClick={copyCode} className="text-slate-400 hover:text-white p-2">
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Users size={16} />
              {players.length} {players.length === 1 ? 'jugador' : 'jugadores'}
            </p>
          </div>
          <button
            onClick={onLeaveRoom}
            className="text-slate-400 hover:text-red-400 p-2 transition-colors mb-7"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6">
          <div className="p-4 bg-slate-800/50 border-b border-slate-700">
            <h3 className="text-white font-semibold">Jugadores en la Sala</h3>
          </div>
          <div className="divide-y divide-slate-800">
            {players.map((player) => (
              <div key={player.id} className="p-4 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: player.color }}
                >
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{player.name}</p>
                  {player.isHost && (
                    <p className="text-indigo-400 text-xs font-medium">Anfitrión</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {isHost ? (
          <button
            onClick={onStartGame}
            disabled={players.length < 3 || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white py-5 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Play size={20} />
            {loading ? 'Iniciando...' : players.length < 3 ? 'Mínimo 3 jugadores' : 'Iniciar Juego'}
          </button>
        ) : (
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
            <p className="text-slate-400">
              Esperando que {players.find(p => p.isHost)?.name || 'el anfitrión'} inicie el juego...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}