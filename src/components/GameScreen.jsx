import React, { useState } from 'react';
import { Vote, RotateCcw } from 'lucide-react';

export default function GameScreen({ 
  roomCode, 
  myPlayer, 
  players,
  isHost,
  onStartVoting,
  onEndGame,
  loading,
  gameMode,
}) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const activePlayers = players.filter((p) => !p.eliminated);

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const moveY = touch.clientY - window.innerHeight / 2;
    if (moveY < 0) {
      const newDragY = Math.max(moveY, -200);
      setDragY(newDragY);
      setIsPeeking(newDragY < -80);
    } else {
      setDragY(0);
      setIsPeeking(false);
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragY(0);
    setIsPeeking(false);
  };


  console.log('My Player:', gameMode);
  // console.log('players:', players);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const moveY = e.clientY - window.innerHeight / 2;
    if (moveY < 0) {
      const newDragY = Math.max(moveY, -200);
      setDragY(newDragY);
      setIsPeeking(newDragY < -80);
    } else {
      setDragY(0);
      setIsPeeking(false);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragY(0);
    setIsPeeking(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  function isPlayerActive() {
    if (!myPlayer || !activePlayers) return false; // validación básica
    return activePlayers.some((player) => player.id === myPlayer.id);
  }


  // --- Si el jugador fue eliminado ---
  if (!isPlayerActive()) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="bg-slate-900 rounded-3xl p-12 border-2 border-red-800">
            <div className="text-8xl mb-6">☠️</div>
            <h2 className="text-4xl font-bold text-red-400 mb-4">FUISTE ELIMINADO</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Espera a que termine la partida
            </p>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-300 text-sm mb-2">Estado del Juego</p>
              <p className="text-white text-2xl font-bold">
                {players.filter(p => !p.eliminated).length} jugadores vivos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Pantalla principal ---
  return (
    <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm">Sala: {roomCode}</p>
          <p className="text-slate-500 text-xs mt-1">
            Jugadores vivos: {players.filter(p => !p.eliminated).length}
          </p>
        </div>

        <div className="relative">
          {/* --- Carta de palabra/impostor (debajo) --- */}
          <div
            className={`rounded-3xl p-8 border-2 h-full relative z-0 ${
              myPlayer.isImpostor
                ? 'bg-gradient-to-br from-red-900 to-red-950 border-red-700'
                : 'bg-gradient-to-br from-emerald-900 to-emerald-950 border-emerald-700'
            }`}
          >
            {myPlayer.isImpostor ? (
              <div className="text-center h-full flex flex-col justify-center">
                <div className="text-4xl mb-6">🎭</div>
                <h2 className="text-2xl font-bold text-white mb-2.5">¡IMPOSTOR!</h2>
                <div className="bg-black/20 backdrop-blur rounded-2xl p-4 mb-6">
                  {/* <p className="text-red-300 text-sm mb-2">Pista:</p> */}
                  <p className="text-white text-2xl font-bold">Pista: {myPlayer.pista}</p>
                </div>
                <p className="text-red-200 text-sm">
                  Descubre la palabra sin que te descubran
                </p>
              </div>
            ) : (
              <div className="text-center h-full flex flex-col justify-center">
                <div className="text-4xl mb-6">✨</div>
                <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Tu Palabra:</h2>
                <div className="bg-white rounded-2xl p-2 mb-6">
                  <p className="text-slate-900 text-2xl font-bold">{myPlayer.word}</p>
                </div>
                <p className="text-emerald-200 text-sm">
                  ¡Descubre al impostor!
                </p>
              </div>
            )}
          </div>

          {/* --- Carta de "mantén presionado" (encima) --- */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translateY(${dragY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border-2 border-slate-700 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-6">🎴</div>
                <h2 className="text-2xl font-bold text-white mb-3">Mantén presionado</h2>
                <p className="text-slate-400 mb-8">y arrastra hacia arriba</p>
                <div className="text-4xl">☝️</div>
              </div>
            </div>
          </div>

          {/* --- Indicador visual mientras arrastra --- */}
          {isPeeking && (
            <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-20">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Suelta para ocultar
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-500 text-sm">
            {players.filter(p => !p.eliminated).length} jugadores vivos
          </p>
          {isHost ? (
            <>
              <button
                onClick={onStartVoting}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Vote size={18} />
                {loading ? 'Iniciando...' : 'Iniciar Votación'}
              </button>
              <button
                onClick={onEndGame}
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                {loading ? 'Terminando...' : 'Terminar Partida'}
              </button>
            </>
          ) : (
            <p className="text-slate-500 text-sm">
              El anfitrión puede iniciar la votación
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
