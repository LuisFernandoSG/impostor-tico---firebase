
import React from 'react';
import { Check } from 'lucide-react';
import { temas } from '../data/palabras';

export default function ThemeSelector({ selectedThemes, onThemeToggle, onContinue, onBack }) {
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
          <h2 className="text-3xl font-bold text-white mb-2">Selecciona los Temas</h2>
          <p className="text-slate-400">Elige uno o más temas para el juego</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {Object.entries(temas).map(([key, tema]) => {
            const isSelected = selectedThemes.includes(key);
            return (
              <button
                key={key}
                onClick={() => onThemeToggle(key)}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                )}
                <div className="text-5xl mb-3">{tema.emoji}</div>
                <div className="text-white font-semibold">{tema.nombre}</div>
                <div className="text-slate-300 text-sm mt-1">
                  {tema.palabras.length} palabras
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onContinue}
          disabled={selectedThemes.length === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 px-6 rounded-xl font-semibold transition-all"
        >
          {selectedThemes.length === 0
            ? 'Selecciona al menos un tema'
            : `Continuar (${selectedThemes.length} ${selectedThemes.length === 1 ? 'tema' : 'temas'})`}
        </button>
      </div>
    </div>
  );
}