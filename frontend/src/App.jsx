import { useState, useEffect } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import CanvasRenderer from './components/CanvasRenderer';

const App = () => {
  const [gameState, setGameState] = useState('loading'); // loading, difficulty, playing, gameover, victory
  const [difficulty, setDifficulty] = useState('Médio');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [finalScore, setFinalScore] = useState(0);

  // Hook handles our core mechanics
  const { canvasRef, gameState: engineState, uiState, initBricks } = useGameEngine(
    (score) => { setFinalScore(score); setGameState('gameover'); },
    (score) => { setFinalScore(score); setGameState('victory'); },
    (nextLevel) => { setCurrentLevel(nextLevel); },
    currentLevel,
    difficulty
  );

  useEffect(() => {
    // Restart level logically when state changes back to playing
    if (gameState === 'playing') {
      engineState.current.isPaused = false;
      engineState.current.score = finalScore; // carry over
    }
  }, [gameState, currentLevel]);

  // Small delay for initial loading aesthetic
  useEffect(() => {
    if (gameState === 'loading') {
      setTimeout(() => setGameState('difficulty'), 2000);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-steampunk-bg text-steampunk-copper flex flex-col items-center justify-center font-sans tracking-wide">
      
      {/* Title Header */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-steampunk-brass drop-shadow-[0_0_10px_#b87333] uppercase">
        Arkanoid <span className="text-steampunk-neonCyan text-3xl align-top">Antigravity</span>
      </h1>

      {/* Loading Screen */}
      {gameState === 'loading' && (
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-16 h-16 border-4 border-dashed rounded-full border-steampunk-brass animate-spin-slow"></div>
            <h2 className="text-2xl mt-4">Calculando Engrenagens...</h2>
        </div>
      )}

      {/* Difficulty Selection */}
      {gameState === 'difficulty' && (
        <div className="bg-steampunk-panel p-8 border-2 border-steampunk-copper rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] text-center">
            <h2 className="text-2xl mb-6 text-white font-bold">Selecione a Dificuldade</h2>
            <div className="flex flex-col gap-4">
              {['Fácil', 'Médio', 'Difícil'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => { setDifficulty(lvl); setCurrentLevel(1); setFinalScore(0); setGameState('playing'); }}
                  className="px-8 py-3 bg-gradient-to-r from-[#b87333] to-[#8b4513] text-white font-bold rounded hover:scale-105 transition-transform border border-steampunk-brass shadow-[0_0_5px_#d4af37]"
                >
                  {lvl}
                </button>
              ))}
            </div>
        </div>
      )}

      {/* Game Play */}
      {gameState === 'playing' && (
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-between px-4 mb-2 text-xl font-bold bg-steampunk-panel/50 py-2 border border-steampunk-brass rounded">
            <span>Pontuação: <span className="text-white">{uiState.score}</span></span>
            <span>Fase: <span className="text-steampunk-neonOrange">{currentLevel}</span></span>
            <span>Vidas: {Array.from({length: Math.max(0, uiState.lives)}).map((_,i) => <span key={i} className="text-red-500 text-2xl mx-1 shadow-sm">♥</span>)}</span>
          </div>
          <CanvasRenderer canvasRef={canvasRef} gameState={engineState} />
        </div>
      )}

      {/* Game Over */}
      {gameState === 'gameover' && (
        <div className="bg-steampunk-panel p-8 border-4 border-red-800 rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.4)] text-center">
            <h2 className="text-6xl text-red-500 mb-4 drop-shadow-[0_0_10px_red] font-black">GAME OVER</h2>
            <p className="text-3xl text-white mb-6">Pontuação Final: {uiState.score}</p>
            <button 
              onClick={() => { setGameState('difficulty'); }}
              className="px-8 py-3 bg-red-800 text-white font-bold rounded hover:bg-red-700 transition-colors border border-red-400 uppercase tracking-widest"
            >
              Reiniciar
            </button>
        </div>
      )}

      {/* Victory */}
      {gameState === 'victory' && (
        <div className="bg-steampunk-panel p-10 border-4 border-yellow-500 rounded-xl shadow-[0_0_40px_rgba(212,175,55,0.7)] text-center animate-decay-bounce">
            <h2 className="text-6xl text-steampunk-brass mb-4 drop-shadow-[0_0_15px_#d4af37] font-black">CAMPEÃO! 👑</h2>
            <p className="text-3xl text-white mb-6">Você dominou o Arkanoid.</p>
            <p className="text-2xl text-steampunk-copper mb-8">Score Máximo: {uiState.score}</p>
            <button 
              onClick={() => { setGameState('difficulty'); }}
              className="px-8 py-3 bg-steampunk-brass text-black font-extrabold rounded hover:bg-white transition-colors border-2 border-white uppercase"
            >
              Jogar Novamente
            </button>
        </div>
      )}

    </div>
  );
};

export default App;
