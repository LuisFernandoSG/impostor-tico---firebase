import React from "react";
import { Vote, Check } from "lucide-react";
import ResultModal from "./ResultModal";

export default function VotingScreen({
  roomCode,
  players,
  myPlayer,
  votes,
  myVote,
  showResults,
  isHost,
  onCastVote,
  onShowResults,
  onContinue,
  onEndGame,
  loading,
}) {
  const activePlayers = players.filter((p) => !p.eliminated);

  // Contar votos únicos (sin contar jugadores eliminados)
  const activeVotes = Object.entries(votes).filter(([voterId]) => {
    const voter = players.find((p) => p.id === voterId);
    return voter && !voter.eliminated;
  });

  function isPlayerActive() {
    if (!myPlayer || !activePlayers) return false; // validación básica
    return activePlayers.some((player) => player.id === myPlayer.id);
  }

  // console.log(isPlayerActive()); // 👉 true

  const allVoted = activeVotes.length === activePlayers.length;

  const getMostVotedPlayer = () => {
    const voteCounts = {};
    Object.values(votes).forEach((votedId) => {
      voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    });

    let maxVotes = 0;
    let mostVotedId = null;
    Object.entries(voteCounts).forEach(([playerId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        mostVotedId = playerId;
      }
    });

    return activePlayers.find((p) => p.id === mostVotedId);
  };

  const mostVoted = getMostVotedPlayer();
  const impostor = players.find((p) => p.isImpostor);

  // Si el jugador está eliminado, mostrar pantalla de espera
  if (!isPlayerActive()) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="bg-slate-900 rounded-3xl p-12 border-2 border-red-800">
            <div className="text-8xl mb-6">☠️</div>
            <h2 className="text-4xl font-bold text-red-400 mb-4">
              FUISTE ELIMINADO
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Espera a que termine la votación
            </p>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-300 text-sm mb-2">
                Votación en progreso
              </p>
              <p className="text-white text-xl">
                {activeVotes.length} / {activePlayers.length} votos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-8">
          <div className="text-center mb-8">
            {/* <p className="text-slate-400 text-sm mb-2">Sala: {roomCode}</p> */}
            <h2 className="text-3xl font-bold text-white mb-2">
              Fase de Votación
            </h2>
            <p className="text-slate-400">¿Quién crees que es el impostor?</p>
            <div className="mt-4 inline-block bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <p className="text-white font-semibold">
                Jugadores restantes: {activePlayers.length}
              </p>
            </div>
          </div>

          {/* Mensaje para cambiar voto */}
          {/* {myVote && (
            <div className="bg-indigo-900/30 border border-indigo-700 rounded-xl p-4 mb-6 text-center">
              <p className="text-indigo-300 text-sm">
                ✓ Has votado. Puedes cambiar tu voto tocando otro jugador.
              </p>
            </div>
          )} */}

          {/* {isPlayerActive() ? ( */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Vote size={20} />
                  Vota por un jugador
                </h3>
              </div>
              <div className="divide-y divide-slate-800">
                {activePlayers.map((player) => {
                  const isMyVote = myVote === player.id;

                  return (
                    <button
                      key={player.id}
                      onClick={() => onCastVote(player.id)}
                      className={`w-full p-4 flex items-center gap-4 transition-all ${
                        isMyVote
                          ? "bg-indigo-600 scale-[1.02]"
                          : "hover:bg-slate-800 hover:scale-[1.01]"
                      }`}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: player.color }}
                      >
                        {player.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-medium">{player.name}</p>
                        {isMyVote && (
                          <p className="text-indigo-300 text-xs font-semibold">
                            ✓ Tu voto
                          </p>
                        )}
                      </div>
                      {isMyVote && <Check className="text-white" size={24} />}
                    </button>
                  );
                })}
              </div>
            </div>
          {/* )  */}
          {/* // : 
          // (
          //   <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6 text-center">
          //     <div className="p-4 bg-slate-800/50 border-b border-slate-700">
          //       <h3 className="text-white font-semibold flex items-center justify-center gap-2">
          //         💀 Has sido eliminado
          //       </h3>
          //     </div>

          //     <div className="p-6 flex flex-col items-center justify-center">
          //       <div className="w-20 h-20 bg-slate-800 flex items-center justify-center rounded-full border border-slate-700 mb-4">
          //         <span className="text-5xl">💀</span>
          //       </div>
          //       <p className="text-slate-300 text-lg font-medium">
          //         Tu participación ha terminado.
          //       </p>
          //       <p className="text-slate-500 text-sm mt-1">
          //         Espera la próxima ronda o el reinicio del juego.
          //       </p>
          //     </div>
          //   </div> */}
          {/* // )} */}

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-6 text-center">
            <p className="text-slate-400 text-sm">
              {activeVotes.length} de {activePlayers.length} jugadores han
              votado
            </p>
            {/* {myVote && (
              <p className="text-indigo-400 text-xs mt-2">
                Tú ya votaste ✓
              </p>
            )} */}
          </div>

          {isHost && allVoted && (
            <button
              onClick={onShowResults}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all"
            >
              {loading ? "Mostrando..." : "Mostrar Resultados"}
            </button>
          )}

          {!isHost && allVoted && (
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
              <p className="text-slate-400">
                Esperando que el anfitrión muestre los resultados...
              </p>
            </div>
          )}

          {!allVoted && (
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-slate-500 text-sm">
                Esperando que todos voten...
              </p>
            </div>
          )}
        </div>
      </div>

      <ResultModal
        isOpen={showResults}
        onClose={() => {}}
        mostVoted={mostVoted}
        impostor={impostor}
        players={players}
        votes={votes}
        onContinue={onContinue}
        onEndGame={onEndGame}
        isHost={isHost}
        loading={loading}
      />
    </>
  );
}
