import React, { useState, useEffect, useRef } from 'react';
import { Miner, Block } from '../../types';
import { Play, Pause, RotateCcw, Box, Hash, Cpu, Zap, Activity } from 'lucide-react';

interface ProofOfWorkProps {
  onComplete: () => void;
}

const ProofOfWork: React.FC<ProofOfWorkProps> = ({ onComplete }) => {
  // State
  const [nonce, setNonce] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(3);
  const [isRaceActive, setIsRaceActive] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [miners, setMiners] = useState<Miner[]>([
    { id: 1, name: 'PowerMiner', hashRate: 45, color: 'bg-blue-500', isMalicious: false },
    { id: 2, name: 'SpeedMiner', hashRate: 30, color: 'bg-indigo-500', isMalicious: false },
    { id: 3, name: 'HomeMiner', hashRate: 15, color: 'bg-teal-500', isMalicious: false },
    { id: 4, name: 'AttackMiner', hashRate: 10, color: 'bg-red-500', isMalicious: true },
  ]);
  const [minerProgress, setMinerProgress] = useState<number[]>([0, 0, 0, 0]);
  const [winner, setWinner] = useState<Miner | null>(null);

  // Manual Hash Demo
  const [manualInput, setManualInput] = useState("Hello Blockchain");
  const [manualHash, setManualHash] = useState("");
  
  // Simple hash function for demo
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  useEffect(() => {
    setManualHash(simpleHash(manualInput + nonce));
  }, [manualInput, nonce]);

  // Race Logic
  const raceInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRace = () => {
    if (isRaceActive) return;
    setIsRaceActive(true);
    setWinner(null);
    setMinerProgress([0, 0, 0, 0]);
  };

  const pauseRace = () => {
    if (raceInterval.current) clearInterval(raceInterval.current);
    setIsRaceActive(false);
  };

  const resetRace = () => {
    pauseRace();
    setMinerProgress([0, 0, 0, 0]);
    setWinner(null);
  };

  useEffect(() => {
    if (isRaceActive) {
      raceInterval.current = setInterval(() => {
        setMinerProgress(prev => {
          const newProgress = [...prev];
          let roundWinnerIndex = -1;

          for (let i = 0; i < miners.length; i++) {
            // Random movement based on hashrate + randomness
            const increment = (miners[i].hashRate / 20) + (Math.random() * 2);
            // Difficulty slows it down
            const difficultyFactor = Math.max(0.1, 1 - (difficulty * 0.1));
            
            newProgress[i] = Math.min(100, newProgress[i] + (increment * difficultyFactor));
            
            if (newProgress[i] >= 100) {
              roundWinnerIndex = i;
            }
          }

          if (roundWinnerIndex !== -1) {
            handleWin(miners[roundWinnerIndex]);
            return newProgress; // Will stop next tick
          }
          return newProgress;
        });
      }, 50);
    }
    return () => {
      if (raceInterval.current) clearInterval(raceInterval.current);
    };
  }, [isRaceActive, miners, difficulty]);

  const handleWin = (winnerMiner: Miner) => {
    pauseRace();
    setWinner(winnerMiner);
    
    const newBlock: Block = {
      id: blocks.length + 1,
      hash: simpleHash(`block${blocks.length}${Date.now()}`),
      miner: winnerMiner.name,
      isMalicious: winnerMiner.isMalicious,
      timestamp: new Date().toLocaleTimeString()
    };

    setBlocks(prev => [...prev, newBlock]);
    
    // Auto complete if we have 3 blocks
    if (blocks.length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. The Puzzle Demo */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-indigo-600" /> 
          Interactive Hash Puzzle
        </h3>
        <p className="text-gray-600 mb-4">
          Proof of Work requires finding a number (Nonce) that results in a hash starting with specific zeros. Try changing the nonce!
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500">Block Data</label>
              <input 
                type="text" 
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500">Nonce (The Variable)</label>
              <input 
                type="number" 
                value={nonce}
                onChange={(e) => setNonce(parseInt(e.target.value) || 0)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
              />
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-4 text-white font-mono flex flex-col justify-center">
            <div className="text-xs text-slate-400 mb-1">Resulting Hash</div>
            <div className="break-all text-lg">
              <span className="text-yellow-400 font-bold">{manualHash.substring(0, difficulty)}</span>
              {manualHash.substring(difficulty)}
            </div>
            <div className="mt-4 text-xs text-slate-400">
              Target: Start with {difficulty} zeros
            </div>
            {manualHash.startsWith('0'.repeat(difficulty)) ? (
              <div className="mt-2 text-green-400 font-bold flex items-center gap-1">
                <Zap className="w-4 h-4" /> Valid Block Found!
              </div>
            ) : (
              <div className="mt-2 text-red-400 text-sm">Invalid - Keep trying nonces</div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Mining Race */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Mining Race Simulation
            </h3>
            <p className="text-sm text-gray-600">Simulating probabilistic competition based on hash rate.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={startRace} 
              disabled={isRaceActive || !!winner}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Play className="w-4 h-4" /> Start
            </button>
            <button 
              onClick={pauseRace} 
              disabled={!isRaceActive}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
            <button 
              onClick={resetRace}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Difficulty Slider */}
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Network Difficulty</span>
            <span className="text-sm font-bold text-indigo-600">{difficulty} Zeros</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="6" 
            value={difficulty} 
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Miners */}
        <div className="space-y-4">
          {miners.map((miner, idx) => (
            <div key={miner.id} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  {miner.isMalicious && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">ATTACKER</span>}
                  {miner.name}
                </span>
                <span className="text-gray-500">{Math.round(minerProgress[idx])}%</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${miner.color} transition-all duration-75 ease-linear relative`}
                  style={{ width: `${minerProgress[idx]}%` }}
                >
                  {/* Stripes pattern for visual interest */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                </div>
              </div>
              {winner?.id === miner.id && (
                <div className="absolute right-0 top-0 -mt-1 -mr-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm animate-bounce">
                  WINNER!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Blockchain Visualization */}
      {blocks.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-600" />
            The Blockchain
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <div className="flex-shrink-0 w-48 bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              Genesis Block
            </div>
            {blocks.map((block) => (
              <React.Fragment key={block.id}>
                <div className="flex items-center text-gray-400">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
                <div className={`flex-shrink-0 w-64 rounded-xl p-4 border-2 shadow-sm ${block.isMalicious ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase text-gray-500">Block #{block.id}</span>
                    <span className="text-xs text-gray-400">{block.timestamp}</span>
                  </div>
                  <div className="font-mono text-xs break-all bg-white/50 p-2 rounded mb-2 text-gray-700">
                    {block.hash}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Mined by:</span>
                    <span className={`font-semibold ${block.isMalicious ? 'text-red-600' : 'text-green-600'}`}>
                      {block.miner}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProofOfWork;