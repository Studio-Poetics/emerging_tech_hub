import React, { useState, useEffect } from 'react';
import { General } from '../../types';
import { Shield, MessageSquare, AlertTriangle, Users } from 'lucide-react';

interface BFTProps {
  onComplete: () => void;
}

const BFT: React.FC<BFTProps> = ({ onComplete }) => {
  const [generals, setGenerals] = useState<General[]>([
    { id: 1, name: 'Commander', type: 'Honest', vote: 'Attack', messagesSent: 0 },
    { id: 2, name: 'Lt. Alpha', type: 'Honest', vote: 'Undecided', messagesSent: 0 },
    { id: 3, name: 'Lt. Beta', type: 'Honest', vote: 'Undecided', messagesSent: 0 },
    { id: 4, name: 'Lt. Gamma', type: 'Traitor', vote: 'Undecided', messagesSent: 0 },
  ]);

  const [simulationState, setSimulationState] = useState<'IDLE' | 'SENDING' | 'CONSENSUS' | 'FAILED'>('IDLE');
  const [messages, setMessages] = useState<string[]>([]);

  const startSimulation = () => {
    setSimulationState('SENDING');
    setMessages([]);
    
    // Reset votes
    setGenerals(prev => prev.map(g => ({...g, vote: g.id === 1 ? 'Attack' : 'Undecided'})));

    // Simulation steps
    setTimeout(() => {
      addMessage("Commander sends 'ATTACK' to all lieutenants.");
      setGenerals(prev => prev.map(g => g.id !== 1 ? { ...g, vote: 'Attack' } : g));
    }, 1000);

    setTimeout(() => {
      addMessage("Lt. Gamma (Traitor) tells Alpha: 'RETREAT'!");
      addMessage("Lt. Gamma (Traitor) tells Beta: 'ATTACK'!");
      // Visualizing confusion
    }, 2500);

    setTimeout(() => {
      addMessage("Lieutenants compare notes...");
    }, 4000);

    setTimeout(() => {
      // 3 Honest nodes vs 1 Traitor = Consensus is robust
      setSimulationState('CONSENSUS');
      addMessage("Consensus Reached: 3/4 Agreement on ATTACK.");
      onComplete();
    }, 5500);
  };

  const addMessage = (msg: string) => {
    setMessages(prev => [...prev, msg]);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-8 relative overflow-hidden min-h-[400px]">
        
        {/* Visual Network Graph */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Connecting Lines (Simplified for React layout) */}
          <svg className="absolute w-full h-full pointer-events-none opacity-20">
            <line x1="50%" y1="20%" x2="20%" y2="50%" stroke="black" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="black" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="black" strokeWidth="2" />
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="black" strokeWidth="1" />
            <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="black" strokeWidth="1" />
            <line x1="80%" y1="50%" x2="50%" y2="80%" stroke="black" strokeWidth="1" />
          </svg>

          {/* Nodes */}
          <div className="relative w-full h-full max-w-lg mx-auto">
            {/* Commander Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg ${simulationState === 'SENDING' ? 'animate-pulse ring-4 ring-indigo-200' : ''} bg-indigo-600`}>
                CMD
              </div>
              <span className="bg-white px-2 py-1 rounded text-xs font-bold mt-2 shadow-sm">Commander</span>
            </div>

            {/* Lt Left */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg bg-green-500`}>
                A
              </div>
              <span className="bg-white px-2 py-1 rounded text-xs font-bold mt-2 shadow-sm">Honest</span>
            </div>

            {/* Lt Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg bg-green-500`}>
                B
              </div>
              <span className="bg-white px-2 py-1 rounded text-xs font-bold mt-2 shadow-sm">Honest</span>
            </div>

             {/* Traitor Bottom */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg bg-red-500`}>
                G
              </div>
              <span className="bg-white px-2 py-1 rounded text-xs font-bold mt-2 shadow-sm text-red-600">Traitor</span>
            </div>
          </div>
        </div>

        {/* Status Overlay */}
        {simulationState === 'CONSENSUS' && (
           <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] flex items-center justify-center z-20">
             <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
               <Shield className="w-12 h-12 text-green-500 mx-auto mb-2" />
               <h3 className="text-xl font-bold text-gray-800">System Secure</h3>
               <p className="text-gray-600">Consensus reached despite traitor.</p>
             </div>
           </div>
        )}

      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-64 overflow-y-auto">
          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Message Log
          </h4>
          <div className="space-y-2 text-sm">
            {messages.length === 0 && <span className="text-gray-400 italic">Waiting to start...</span>}
            {messages.map((m, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl text-sm text-indigo-800">
          <div className="font-bold flex items-center gap-2 mb-2">
            <Users className="w-4 h-4" /> The 2/3 Rule
          </div>
          The network can tolerate up to 1/3 malicious nodes. With 4 generals, we can handle 1 traitor.
        </div>

        <button 
          onClick={startSimulation}
          disabled={simulationState === 'SENDING'}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {simulationState === 'IDLE' ? 'Start Simulation' : 'Replay Scenario'}
        </button>
      </div>
    </div>
  );
};

export default BFT;
