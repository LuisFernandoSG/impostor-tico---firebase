import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const avatars = [
  { emoji: '🦥', name: 'Perezoso' },
  { emoji: '🦜', name: 'Lapa' },
  { emoji: '🐸', name: 'Rana' },
  { emoji: '🦎', name: 'Lagarto' },
  { emoji: '☕', name: 'Café' },
  { emoji: '🌺', name: 'Guaria' },
  { emoji: '🌴', name: 'Palma' },
  { emoji: '🍃', name: 'Hoja' },
  { emoji: '🦋', name: 'Mariposa' },
  { emoji: '🐒', name: 'Mono' },
];

const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#64748b'];

export default function PlayerSetup({ 
  roomCode, 
  isHost,
  onEnterLobby, 
  onBack 
}) {
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnterLobby = async () => {
    if (playerName.trim()) {
      setLoading(true);
      await onEnterLobby({
        name: playerName.trim(),
        avatar: selectedAvatar.emoji,
        color: selectedColor,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 overflow-y-auto">
      <div className="max-w-md mx-auto py-8">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-8 flex items-center gap-2"
        >
          ← Volver
        </button>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 mb-6">
          {isHost && (
            <div className="mb-8">
              <p className="text-slate-400 text-sm mb-3 text-center">Código de la Sala</p>
              <div className="bg-slate-800 py-5 px-6 rounded-xl border-2 border-indigo-500 mb-3">
                <p className="text-4xl font-bold text-white text-center tracking-widest font-mono">{roomCode}</p>
              </div>
              <button
                onClick={copyCode}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white py-2 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-sm">{copied ? '¡Copiado!' : 'Copiar código'}</span>
              </button>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">Tu Nombre</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              placeholder="Escribe tu nombre"
              className="w-full bg-slate-800 text-white py-3 px-4 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 mb-3 font-medium">Elige tu Avatar</label>
            <div className="grid grid-cols-5 gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar.emoji}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                    selectedAvatar.emoji === avatar.emoji
                      ? 'bg-indigo-600 scale-110'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-slate-300 mb-3 font-medium">Elige tu Color</label>
            <div className="grid grid-cols-8 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`aspect-square rounded-full transition-all ${
                    selectedColor === color ? 'scale-110 ring-4 ring-white' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleEnterLobby}
            disabled={!playerName.trim() || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 px-6 rounded-xl font-semibold transition-all"
          >
            {loading ? 'Entrando...' : 'Entrar al Lobby'}
          </button>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs text-center">
            Diseño inspirado en la cultura tica 🇨🇷
          </p>
        </div>
      </div>
    </div>
  );
}