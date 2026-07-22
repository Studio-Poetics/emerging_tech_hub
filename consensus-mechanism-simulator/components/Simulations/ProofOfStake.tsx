import React, { useState } from 'react';
import { Validator } from '../../types';
import { Coins, ShieldAlert, Gavel, UserCheck } from 'lucide-react';

interface ProofOfStakeProps {
  onComplete: () => void;
}

const ProofOfStake: React.FC<ProofOfStakeProps> = ({ onComplete }) => {
  const [validators, setValidators] = useState<Validator[]>([
    { id: 1, name: 'Validator A', stake: 300000, isMalicious: false, slashed: false, rewards: 0 },
    { id: 2, name: 'Validator B', stake: 250000, isMalicious: false, slashed: false, rewards: 0 },
    { id: 3, name: 'Validator C', stake: 200000, isMalicious: false, slashed: false, rewards: 0 },
    { id: 4, name: 'Malicious D', stake: 250000, isMalicious: true, slashed: false, rewards: 0 },
  ]);

  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);
  const [rounds, setRounds] = useState(0);

  const totalStake = validators.reduce((acc, v) => acc + v.stake, 0);

  const runRound = () => {
    // Weighted random selection
    let random = Math.random() * totalStake;
    let selectedIndex = -1;
    
    for (let i = 0; i < validators.length; i++) {
      random -= validators[i].stake;
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    // Fallback if float math is weird
    if (selectedIndex === -1) selectedIndex = validators.length - 1;

    setLastSelectedId(validators[selectedIndex].id);
    setRounds(prev => prev + 1);

    setValidators(prev => prev.map((v, i) => {
      if (i === selectedIndex) {
        if (v.isMalicious && !v.slashed) {
          // Chance to be caught? Let's say yes for demo
          return v; // Logic handled in render/slashing button
        }
        return { ...v, rewards: v.rewards + 100 };
      }
      return v;
    }));

    if (rounds >= 2) onComplete();
  };

  const slashMalicious = () => {
    setValidators(prev => prev.map(v => {
      if (v.isMalicious) {
        return { ...v, stake: v.stake - 50000, slashed: true };
      }
      return v;
    }));
  };

  const reset = () => {
    setValidators([
      { id: 1, name: 'Validator A', stake: 300000, isMalicious: false, slashed: false, rewards: 0 },
      { id: 2, name: 'Validator B', stake: 250000, isMalicious: false, slashed: false, rewards: 0 },
      { id: 3, name: 'Validator C', stake: 200000, isMalicious: false, slashed: false, rewards: 0 },
      { id: 4, name: 'Malicious D', stake: 250000, isMalicious: true, slashed: false, rewards: 0 },
    ]);
    setLastSelectedId(null);
    setRounds(0);
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Network State */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Validator Pool
            </h3>
            <span className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
              Total Stake: {totalStake.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {validators.map((v) => {
              const probability = ((v.stake / totalStake) * 100).toFixed(1);
              const isSelected = lastSelectedId === v.id;
              
              return (
                <div 
                  key={v.id}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    v.slashed ? 'border-red-500 bg-red-50' : 
                    isSelected ? 'border-indigo-500 bg-indigo-50 scale-105 shadow-md' : 
                    'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${v.isMalicious ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className="font-bold text-gray-700 text-sm">{v.name}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Stake: <span className="font-mono font-medium text-gray-800">{v.stake.toLocaleString()}</span></div>
                    <div className="text-xs text-gray-500">Win Chance: <span className="font-mono font-medium text-indigo-600">{probability}%</span></div>
                    {v.rewards > 0 && (
                      <div className="text-xs text-green-600 font-bold flex items-center gap-1 mt-2">
                        + {v.rewards} Rewards
                      </div>
                    )}
                    {v.slashed && (
                      <div className="text-xs text-red-600 font-bold flex items-center gap-1 mt-2">
                        <ShieldAlert className="w-3 h-3" /> SLASHED
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Coins className="w-5 h-5 text-indigo-500 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls & Analysis */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white rounded-xl p-6">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Gavel className="w-4 h-4" /> Consensus Mechanism
            </h4>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
              Unlike mining, validators are chosen deterministically based on their economic stake. 
              The more "skin in the game," the higher the chance to propose a block.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={runRound}
                className="w-full py-3 bg-white text-indigo-900 rounded-lg font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Select Next Validator
              </button>
              
              <button 
                onClick={slashMalicious}
                className="w-full py-3 bg-red-500/20 text-red-100 border border-red-500/50 rounded-lg font-bold hover:bg-red-500/30 transition flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                Slash Malicious Actor
              </button>

              <button 
                onClick={reset}
                className="w-full py-2 text-sm text-indigo-300 hover:text-white transition"
              >
                Reset Simulation
              </button>
            </div>
          </div>

          {/* Comparision */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">PoW vs PoS Energy</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Proof of Work</span>
                  <span>Very High Energy</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[95%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Proof of Stake</span>
                  <span>~99% Less Energy</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[5%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofOfStake;
