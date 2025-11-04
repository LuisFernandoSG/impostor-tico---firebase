import React, { useState } from 'react';

export default function JoinCodeScreen({ onJoin, onBack }) {
  const [inputCode, setInputCode] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-8 flex items-center gap-2"
        >
          ← Volver
        </button>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6">Unirse a Partida</h2>
          
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">Código de Sala</label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              maxLength={6}
              placeholder="Ej: ABC123"
              className="w-full bg-slate-800 text-white text-2xl text-center py-4 px-4 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none tracking-widest font-mono"
            />
          </div>

          <button
            onClick={() => onJoin(inputCode)}
            disabled={inputCode.length !== 6}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 px-6 rounded-xl font-semibold transition-all"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}