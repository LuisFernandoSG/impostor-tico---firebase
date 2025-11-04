import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import ThemeSelector from './components/ThemeSelector';
import GameModeSelector from './components/GameModeSelector';
import JoinCodeScreen from './components/JoinCodeScreen';
import PlayerSetup from './components/PlayerSetup';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import VotingScreen from './components/VotingScreen';
import { getPalabraAleatoria } from './data/palabras';
import './firebase';

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function ImpostorGame() {
  const [screen, setScreen] = useState('home');
  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [gameMode, setGameMode] = useState('classic'); // classic, anonymous
  const [impostorCount, setImpostorCount] = useState(1);
  const [nothingCount, setNothingCount] = useState(0); // Ahora inicia en 0 (opcional)
  const [players, setPlayers] = useState([]);
  const [myPlayer, setMyPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [votingPhase, setVotingPhase] = useState(false);
  const [myVote, setMyVote] = useState(null);
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Sincronización con storage
  useEffect(() => {
    let interval;
    if ((screen === 'lobby' || screen === 'game') && roomCode) {
      loadPlayers();
      interval = setInterval(loadPlayers, 1500);
    }
    return () => clearInterval(interval);
  }, [screen, roomCode]);

  const loadPlayers = async () => {
    try {
      const result = await window.storage.get(`room_${roomCode}`, true);
      if (result) {
        const roomData = JSON.parse(result.value);
        setPlayers(roomData.players || []);
        
        if (roomData.gameStarted && !gameStarted) {
          setGameStarted(true);
          const myUpdatedPlayer = roomData.players.find(p => p.id === myPlayer.id);
          setMyPlayer(myUpdatedPlayer);
          setScreen('game');
        }
        
        if (!roomData.gameStarted && gameStarted) {
          setGameStarted(false);
          setVotingPhase(false);
          setMyVote(null);
          setVotes({});
          setShowResults(false);
          const myUpdatedPlayer = roomData.players.find(p => p.id === myPlayer.id);
          const cleanPlayer = {
            id: myUpdatedPlayer.id,
            name: myUpdatedPlayer.name,
            avatar: myUpdatedPlayer.avatar,
            color: myUpdatedPlayer.color,
            isHost: myUpdatedPlayer.isHost,
          };
          setMyPlayer(cleanPlayer);
          setScreen('lobby');
        }

        if (roomData.votingPhase !== undefined) {
          setVotingPhase(roomData.votingPhase);
        }

        if (roomData.votes) {
          setVotes(roomData.votes);
        }

        if (roomData.showResults !== undefined) {
          setShowResults(roomData.showResults);
        }
      }
    } catch (error) {
      console.log('Room not found yet');
    }
  };

  const saveRoom = async (data) => {
    try {
      await window.storage.set(`room_${roomCode}`, JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const createRoom = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    setIsHost(true);
    setScreen('themes');
  };

  const joinRoom = (code) => {
    setRoomCode(code.toUpperCase());
    setIsHost(false);
    setScreen('setup');
  };

  const toggleTheme = (themeKey) => {
    setSelectedThemes(prev =>
      prev.includes(themeKey)
        ? prev.filter(t => t !== themeKey)
        : [...prev, themeKey]
    );
  };

  const enterLobby = async (playerData) => {
    setLoading(true);
    const player = {
      id: Date.now().toString() + Math.random(),
      name: playerData.name,
      avatar: playerData.avatar,
      color: playerData.color,
      isHost: isHost,
      eliminated: false,
    };
    setMyPlayer(player);
    
    try {
      let roomData;
      try {
        const result = await window.storage.get(`room_${roomCode}`, true);
        roomData = result ? JSON.parse(result.value) : { players: [], gameStarted: false, themes: selectedThemes };
      } catch {
        roomData = { players: [], gameStarted: false, themes: selectedThemes };
      }
      
      roomData.players.push(player);
      if (isHost) {
        roomData.themes = selectedThemes;
      }
      await saveRoom(roomData);
      setPlayers(roomData.players);
      setScreen('lobby');
    } catch (error) {
      console.error('Error joining room:', error);
    }
    setLoading(false);
  };

  const startGame = async () => {
    setLoading(true);
    const result = await window.storage.get(`room_${roomCode}`, true);
    const roomData = result ? JSON.parse(result.value) : {};
    const themesToUse = roomData.themes || selectedThemes;
    const mode = roomData.gameMode || gameMode;
    const numImpostors = roomData.impostorCount || impostorCount;
    const numNothings = roomData.nothingCount || nothingCount;
    
    const selectedWord = getPalabraAleatoria(themesToUse);
    
    // Mezclar jugadores y asignar roles
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    
    // Asignar impostores
    const impostorIndices = [];
    for (let i = 0; i < numImpostors; i++) {
      impostorIndices.push(i);
    }
    
    // Asignar Mr. Nothing (solo en modo nothing)
    const nothingIndices = [];
    if (mode === 'nothing') {
      for (let i = numImpostors; i < numImpostors + numNothings; i++) {
        nothingIndices.push(i);
      }
    }
    
    const updatedPlayers = shuffledPlayers.map((player, index) => {
      const isImpostor = impostorIndices.includes(index);
      const isNothing = nothingIndices.includes(index);
      
      return {
        ...player,
        isImpostor,
        role: isNothing ? 'nothing' : (isImpostor ? 'impostor' : 'civil'),
        word: isNothing ? null : selectedWord.palabra,
        pista: isImpostor ? selectedWord.pista : null,
        eliminated: false,
      };
    });

    await saveRoom({ 
      ...roomData, 
      players: updatedPlayers, 
      gameStarted: true,
      gameMode: mode,
      impostorCount: numImpostors,
      nothingCount: numNothings,
      votingPhase: false, 
      votes: {}, 
      showResults: false 
    });
    
    setPlayers(updatedPlayers);
    const updatedMyPlayer = updatedPlayers.find(p => p.id === myPlayer.id);
    setMyPlayer(updatedMyPlayer);
    setGameStarted(true);
    setScreen('game');
    setLoading(false);
  };

  const startVoting = async () => {
    setLoading(true);
    try {
      const result = await window.storage.get(`room_${roomCode}`, true);
      if (result) {
        const roomData = JSON.parse(result.value);
        roomData.votingPhase = true;
        roomData.votes = {}; // ← Limpiar votos anteriores
        roomData.showResults = false;
        await saveRoom(roomData);
        
        // IMPORTANTE: Limpiar estado local para todos
        setVotingPhase(true);
        setMyVote(null); // ← Resetear voto local
        setVotes({}); // ← Resetear votos locales
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error starting voting:', error);
    }
    setLoading(false);
  };

  const castVote = async (votedPlayerId) => {
    setMyVote(votedPlayerId);
    try {
      const result = await window.storage.get(`room_${roomCode}`, true);
      if (result) {
        const roomData = JSON.parse(result.value);
        if (!roomData.votes) roomData.votes = {};
        roomData.votes[myPlayer.id] = votedPlayerId;
        await saveRoom(roomData);
        setVotes(roomData.votes);
      }
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  const showVotingResults = async () => {
    setLoading(true);
    try {
      const result = await window.storage.get(`room_${roomCode}`, true);
      if (result) {
        const roomData = JSON.parse(result.value);
        roomData.showResults = true;
        await saveRoom(roomData);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error showing results:', error);
    }
    setLoading(false);
  };

  const continueGame = async () => {
    setLoading(true);
    try {
      const result = await window.storage.get(`room_${roomCode}`, true);
      if (result) {
        const roomData = JSON.parse(result.value);
        
        // Eliminar al jugador más votado
        const voteCounts = {};
        Object.values(roomData.votes).forEach(votedId => {
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
        
        // Marcar como eliminado
        roomData.players = roomData.players.map(p => 
          p.id === mostVotedId ? { ...p, eliminated: true } : p
        );
        
        // IMPORTANTE: Resetear completamente la votación
        roomData.votingPhase = false;
        roomData.votes = {};
        roomData.showResults = false;
        
        await saveRoom(roomData);
        
        // Actualizar estado local
        setPlayers(roomData.players);
        const updatedMyPlayer = roomData.players.find(p => p.id === myPlayer.id);
        setMyPlayer(updatedMyPlayer);
        setVotingPhase(false);
        setMyVote(null); // ← Limpiar voto local
        setVotes({}); // ← Limpiar votos locales
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error continuing game:', error);
    }
    setLoading(false);
  };

  const endGame = async () => {
    setLoading(true);
    
    const cleanedPlayers = players.map(player => ({
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      color: player.color,
      isHost: player.isHost,
      eliminated: false,
    }));
    
    const result = await window.storage.get(`room_${roomCode}`, true);
    const roomData = result ? JSON.parse(result.value) : {};
    
    await saveRoom({ 
      ...roomData, 
      players: cleanedPlayers, 
      gameStarted: false, 
      votingPhase: false, 
      votes: {}, 
      showResults: false 
    });
    
    setPlayers(cleanedPlayers);
    setGameStarted(false);
    setVotingPhase(false);
    setMyVote(null);
    setVotes({});
    setShowResults(false);
    const cleanMyPlayer = cleanedPlayers.find(p => p.id === myPlayer.id);
    setMyPlayer(cleanMyPlayer);
    setScreen('lobby');
    setLoading(false);
  };

  const leaveRoom = async () => {
    if (roomCode && myPlayer) {
      try {
        const result = await window.storage.get(`room_${roomCode}`, true);
        if (result) {
          const roomData = JSON.parse(result.value);
          const updatedPlayers = roomData.players.filter(p => p.id !== myPlayer.id);
          
          if (myPlayer.isHost && updatedPlayers.length > 0) {
            updatedPlayers[0].isHost = true;
          }
          
          if (updatedPlayers.length > 0) {
            await saveRoom({ ...roomData, players: updatedPlayers });
          } else {
            await window.storage.delete(`room_${roomCode}`, true);
          }
        }
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }
    
    setScreen('home');
    setRoomCode('');
    setInputCode('');
    setSelectedThemes([]);
    setPlayers([]);
    setMyPlayer(null);
    setIsHost(false);
    setGameStarted(false);
    setVotingPhase(false);
    setMyVote(null);
    setVotes({});
    setShowResults(false);
  };

  console.log('My Player:', gameMode);
  // ===== RENDER SCREENS =====

  if (screen === 'home') {
    return (
      <HomeScreen 
        onCreateRoom={createRoom}
        onJoinRoom={() => setScreen('joinInput')}
      />
    );
  }

  if (screen === 'joinInput') {
    return (
      <JoinCodeScreen 
        onJoin={joinRoom}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'themes') {
    return (
      <ThemeSelector
        selectedThemes={selectedThemes}
        onThemeToggle={toggleTheme}
        onContinue={() => setScreen('gameMode')}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'gameMode') {
    return (
      <GameModeSelector
        selectedMode={gameMode}
        onModeSelect={setGameMode}
        impostorCount={impostorCount}
        nothingCount={nothingCount}
        onImpostorCountChange={setImpostorCount}
        onNothingCountChange={setNothingCount}
        playerCount={players.length || 6}
        onContinue={() => setScreen('setup')}
        onBack={() => setScreen('themes')}
      />
    );
  }

  if (screen === 'setup') {
    return (
      <PlayerSetup
        roomCode={roomCode}
        isHost={isHost}
        onEnterLobby={enterLobby}
        onBack={() => setScreen(isHost ? 'themes' : 'home')}
      />
    );
  }

  if (screen === 'lobby') {
    return (
      <LobbyScreen
        roomCode={roomCode}
        players={players}
        isHost={isHost}
        onStartGame={startGame}
        onLeaveRoom={leaveRoom}
        loading={loading}
      />
    );
  }

  if (screen === 'game' && myPlayer) {
    if (votingPhase) {
      return (
        <VotingScreen
          roomCode={roomCode}
          players={players}
          myPlayer={myPlayer}
          votes={votes}
          myVote={myVote}
          showResults={showResults}
          isHost={isHost}
          onCastVote={castVote}
          onShowResults={showVotingResults}
          onContinue={continueGame}
          onEndGame={endGame}
          loading={loading}
        />
      );
    }

    return (
      <GameScreen
        roomCode={roomCode}
        myPlayer={myPlayer}
        players={players}
        gameMode={gameMode}
        isHost={isHost}
        onStartVoting={startVoting}
        onEndGame={endGame}
        loading={loading}
      />
    );
  }

  return null;
}