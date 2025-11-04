import React, { useState, useRef, useEffect } from 'react';

export default function GameCard({ myPlayer, onRevealed }) {
  const [revealed, setRevealed] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleTouchStart = (e) => {
    if (revealed) return;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || revealed) return;
    const touch = e.touches[0];
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const moveY = touch.clientY - rect.top - rect.height / 2;
      if (moveY < 0) {
        setDragY(Math.max(moveY, -150));
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY < -80) {
      setRevealed(true);
      onRevealed();
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  const handleMouseDown = (e) => {
    if (revealed) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || revealed) return;
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const moveY = e.clientY - rect.top - rect.height / 2;
      if (moveY < 0) {
        setDragY(Math.max(moveY, -150));
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY < -80) {
      setRevealed(true);
      onRevealed();
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragY]);

  if (!revealed) {
    return (
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border-2 border-slate-700 relative overflow-hidden">
          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
          </div>
          <div className="text-center pt-4">
            <div className="text-7xl mb-6">🎴</div>
            <h2 className="text-2xl font-bold text-white mb-3">Arrastra hacia arriba</h2>
            <p className="text-slate-400 mb-8">para revelar tu carta</p>
            <div className="text-4xl animate-bounce">☝️</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-12 border-2 ${
      myPlayer.isImpostor
        ? 'bg-gradient-to-br from-red-900 to-red-950 border-red-700'
        : 'bg-gradient-to-br from-emerald-900 to-emerald-950 border-emerald-700'
    }`}>
      {myPlayer.isImpostor ? (
        <div className="text-center">
          <div className="text-7xl mb-6">🎭</div>
          <h2 className="text-4xl font-bold text-white mb-8">¡IMPOSTOR!</h2>
          <div className="bg-black/20 backdrop-blur rounded-2xl p-6 mb-6">
            <p className="text-red-300 text-sm mb-2">Pista:</p>
            <p className="text-white text-3xl font-bold">{myPlayer.pista}</p>
          </div>
          <p className="text-red-200 text-sm">
            Descubre la palabra sin que te descubran
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-7xl mb-6">✨</div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Tu Palabra:</h2>
          <div className="bg-white rounded-2xl p-8 mb-6">
            <p className="text-slate-900 text-4xl font-bold">{myPlayer.word}</p>
          </div>
          <p className="text-emerald-200 text-sm">
            ¡Descubre al impostor!
          </p>
        </div>
      )}
    </div>
  );
}
