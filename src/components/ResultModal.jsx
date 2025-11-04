import React, { useMemo } from 'react';
import { X, Play, RotateCcw } from 'lucide-react';

export default function ResultModal({ 
  isOpen, 
  onClose, 
  mostVoted, 
  impostor, 
  players, 
  votes, 
  onContinue, 
  onEndGame, 
  isHost, 
  loading 
}) {
  if (!isOpen) return null;

  const getVoteCount = (playerId) => {
    return Object.values(votes).filter(v => v === playerId).length;
  };

  // Calcular jugadores activos DESPUÉS de eliminar al votado
  const playersAfterElimination = useMemo(() => {
    return players.map(p => 
      p.id === mostVoted?.id ? { ...p, eliminated: true } : p
    );
  }, [players, mostVoted]);

  const activePlayersAfterVote = playersAfterElimination.filter(p => !p.eliminated);
  const impostorEliminated = mostVoted?.id === impostor?.id;
  
  // Validaciones de fin de juego
  const impostorWon = !impostorEliminated && activePlayersAfterVote.length <= 2;
  const civiliansWon = impostorEliminated;
  const gameOver = impostorWon || civiliansWon;

  // Mensaje de resultado
  const getResultMessage = () => {
    if (civiliansWon) {
      return {
        emoji: '🎉',
        title: '¡Victoria de los Civiles!',
        subtitle: 'Eliminaron al impostor',
        color: 'from-green-900 to-emerald-950 border-green-700'
      };
    }
    if (impostorWon) {
      return {
        emoji: '👹',
        title: '¡Victoria del Impostor!',
        subtitle: 'El impostor ha ganado',
        color: 'from-purple-900 to-violet-950 border-purple-700'
      };
    }
    return {
      emoji: '😔',
      title: '¡Eliminaron a un Inocente!',
      subtitle: 'El juego continúa',
      color: 'from-red-900 to-red-950 border-red-700'
    };
  };

  const result = getResultMessage();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-white">Resultados de la Votación</h2>
          {/* {!isHost && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          )} */}
        </div>

        <div className="p-6">
          {/* Resultado principal */}
          <div className={`rounded-2xl p-8 border-2 mb-6 text-center bg-gradient-to-br ${result.color}`}>
            <div className="text-4xl mb-4">{result.emoji}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
            <p className="text-white/80 text-lg mb-4">{result.subtitle}</p>
            
            <div className="bg-black/20 backdrop-blur rounded-xl p-6">
              <p className="text-white text-lg mb-3">
                <strong>{mostVoted?.name}</strong> fue eliminado
              </p>
              <p className="font-bold text-white mb-2">
                {impostorEliminated ? '¡Era el impostor! ✓' : 'No era el impostor ✗'}
              </p>
            </div>
          </div>

          {/* Estadísticas del juego */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Jugadores restantes</p>
              <p className="text-3xl font-bold text-white">
                {activePlayersAfterVote.length}
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Estado del juego</p>
              <p className="text-xl font-bold text-white">
                {gameOver ? '🏁 Terminado' : '▶️ Continúa'}
              </p>
            </div>
          </div>

          {/* Tabla de votos */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden mb-6">
            <div className="p-4 bg-slate-800/50 border-b border-slate-700">
              <h3 className="text-white font-semibold">Votos Recibidos</h3>
            </div>
            <div className="divide-y divide-slate-700">
              {players.filter(p => !p.eliminated).map((player) => {
                const voteCount = getVoteCount(player.id);
                const isMostVoted = mostVoted?.id === player.id;
                const willBeEliminated = isMostVoted;
                
                return (
                  <div
                    key={player.id}
                    className={`p-4 flex items-center gap-4 ${
                      willBeEliminated ? 'bg-red-900/20' : ''
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
                      style={{ backgroundColor: player.color }}
                    >
                      {player.avatar}
                      {player.isImpostor && gameOver && (
                        <div className="absolute -top-1 -right-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          🎭
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{player.name}</p>
                      <p className="text-slate-400 text-sm">
                        {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
                      </p>
                    </div>
                    {willBeEliminated && (
                      <div className="flex flex-col items-end">
                        <div className="text-red-400 font-bold text-sm">☠️ Eliminado</div>
                        {player.isImpostor && (
                          <div className="text-green-400 text-xs mt-1">Era el impostor</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Información del impostor cuando termina */}
          {gameOver && (
            <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700">
              <div className="text-center">
                <p className="text-slate-300 text-sm mb-2">El impostor era:</p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: impostor?.color }}
                  >
                    {impostor?.avatar}
                  </div>
                  <p className="text-white text-2xl font-bold">{impostor?.name}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 inline-block">
                  <p className="text-slate-400 text-sm">Palabra secreta:</p>
                  <p className="text-white text-xl font-bold">{impostor?.word}</p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          {isHost && (
            <div className="space-y-3">
              {!gameOver && (
                <button
                  onClick={onContinue}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  {loading ? 'Continuando...' : `Siguiente Ronda (${activePlayersAfterVote.length} jugadores)`}
                </button>
              )}
              <button
                onClick={onEndGame}
                disabled={loading}
                className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                {loading ? 'Terminando...' : 'Nueva Partida'}
              </button>
            </div>
          )}

          {!isHost && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <p className="text-slate-400">
                {gameOver 
                  ? 'El anfitrión puede iniciar una nueva partida'
                  : 'El anfitrión decidirá si continuar o iniciar nueva partida'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
