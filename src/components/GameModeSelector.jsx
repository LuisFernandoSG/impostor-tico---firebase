import React from 'react';

const gameModes = [
  {
    id: 'classic',
    name: 'Clásico',
    emoji: '🎭',
    description: 'Todos saben su rol. Los civiles ven la palabra, el impostor solo una pista.',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'anonymous',
    name: 'Anónimo',
    emoji: '❓',
    description: 'Nadie sabe si es impostor o civil. Todos ven la palabra pero no su rol.',
    color: 'from-purple-600 to-pink-600'
  }
];

export default function GameModeSelector({ 
  selectedMode, 
  onModeSelect, 
  impostorCount,
  nothingCount,
  onImpostorCountChange,
  onNothingCountChange,
  playerCount,
  onContinue, 
  onBack 
}) {
  const maxImpostors = Math.max(1, Math.floor(playerCount / 3));
  const maxNothings = Math.max(0, Math.floor(playerCount / 4));

  

  return (
    <div className="min-h-screen bg-slate-950 p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-8 flex items-center gap-2"
        >
          ← Volver
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Modo de Juego</h2>
          <p className="text-slate-400">Elige cómo quieres jugar</p>
        </div>

        {/* Selector de Modos Base */}
        <div className="space-y-4 mb-8">
          {gameModes.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onModeSelect(mode.id)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-slate-800'
                    : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-5xl ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {mode.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{mode.name}</h3>
                      {isSelected && (
                        <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          Seleccionado
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{mode.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Configuración de Impostores */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            🎭 Cantidad de Impostores
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onImpostorCountChange(Math.max(1, impostorCount - 1))}
              className="bg-slate-800 hover:bg-slate-700 text-white w-12 h-12 rounded-lg font-bold text-xl transition"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <div className="text-4xl font-bold text-white">{impostorCount}</div>
              <div className="text-slate-400 text-sm mt-1">
                {impostorCount === 1 ? 'impostor' : 'impostores'}
              </div>
            </div>
            <button
              onClick={() => onImpostorCountChange(Math.min(maxImpostors, impostorCount + 1))}
              className="bg-slate-800 hover:bg-slate-700 text-white w-12 h-12 rounded-lg font-bold text-xl transition"
            >
              +
            </button>
          </div>
          <p className="text-slate-500 text-xs text-center mt-3">
            Máximo: {maxImpostors} impostores (1/3 de jugadores)
          </p>
        </div>

        {/* Configuración de Mr. Nothing - OPCIONAL para ambos modos */}
        <div className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl p-6 border-2 border-gray-700 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">👤</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Mr. Nothing (Opcional)</h3>
              <p className="text-slate-400 text-xs">
                Jugadores que no ven nada: ni palabra, ni pista, ni rol
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNothingCountChange(Math.max(0, nothingCount - 1))}
              className="bg-slate-800 hover:bg-slate-700 text-white w-12 h-12 rounded-lg font-bold text-xl transition"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <div className="text-4xl font-bold text-white">{nothingCount}</div>
              <div className="text-slate-400 text-sm mt-1">
                {nothingCount === 0 ? 'ninguno' : nothingCount === 1 ? 'Mr. Nothing' : 'Mr. Nothings'}
              </div>
            </div>
            <button
              onClick={() => onNothingCountChange(Math.min(maxNothings, nothingCount + 1))}
              className="bg-slate-800 hover:bg-slate-700 text-white w-12 h-12 rounded-lg font-bold text-xl transition"
            >
              +
            </button>
          </div>
          
          {nothingCount > 0 && (
            <div className="mt-4 bg-black/30 rounded-lg p-3 border border-gray-600">
              <p className="text-gray-300 text-xs text-center">
                ⚠️ Los Mr. Nothing no saben absolutamente nada del juego
              </p>
            </div>
          )}
        </div>

        {/* Resumen de configuración */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
          <p className="text-white text-sm text-center font-semibold mb-2">
            📊 Resumen de la Partida
          </p>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-slate-400 text-xs">Modo</p>
              <p className="text-white font-bold">
                {selectedMode === 'classic' ? '🎭 Clásico' : '❓ Anónimo'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Impostores</p>
              <p className="text-red-400 font-bold">{impostorCount}</p>
            </div>
            {nothingCount > 0 && (
              <>
                <div>
                  <p className="text-slate-400 text-xs">Mr. Nothing</p>
                  <p className="text-gray-400 font-bold">{nothingCount}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Civiles</p>
                  <p className="text-green-400 font-bold">
                    ~{Math.max(0, playerCount - impostorCount - nothingCount)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all"
        >
          Continuar con {selectedMode === 'classic' ? 'Clásico' : 'Anónimo'}
          {nothingCount > 0 && ` + ${nothingCount} Mr. Nothing`}
        </button>
      </div>
    </div>
  );
}