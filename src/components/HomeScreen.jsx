import React from 'react';

export default function HomeScreen({ onCreateRoom, onJoinRoom }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
              <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
              <text x="50" y="65" fontSize="50" textAnchor="middle" fill="#f1f5f9">🎭</text>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">El Impostor</h1>
          <p className="text-slate-400 text-lg">Edición Tica</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-sm">
            <span>🇨🇷</span>
            <span>Pura Vida</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onCreateRoom}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            Crear Partida
          </button>

          <button
            onClick={onJoinRoom}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 border border-slate-700"
          >
            Unirse con Código
          </button>
        </div>
      </div>
    </div>
  );
}