import React, { useState } from 'react';
import { Globe, Briefcase, TrendingUp, ArrowRight, Check } from 'lucide-react';

interface AnalysisProps {
    onComplete: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ onComplete }) => {
    const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

    const scenarios = [
        {
            id: 'currency',
            title: 'Global Currency',
            icon: <Globe className="w-6 h-6 text-white" />,
            color: 'bg-blue-500',
            description: 'A censorship-resistant money system for the whole world.',
            bestFit: 'Proof of Work',
            reason: 'Maximum security and decentralization are critical. Energy cost is the price of trustlessness.'
        },
        {
            id: 'supply',
            title: 'Supply Chain',
            icon: <Briefcase className="w-6 h-6 text-white" />,
            color: 'bg-orange-500',
            description: 'Tracking goods between known manufacturers and retailers.',
            bestFit: 'Byzantine Fault Tolerance (Private)',
            reason: 'Participants are known entities. High throughput is more important than anonymous decentralization.'
        },
        {
            id: 'defi',
            title: 'DeFi Platform',
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            color: 'bg-purple-500',
            description: 'Financial applications requiring speed and low fees.',
            bestFit: 'Proof of Stake',
            reason: 'Needs high scalability and low transaction costs while maintaining public access.'
        }
    ];

    const handleSelect = (id: string) => {
        setSelectedScenario(id);
        onComplete();
    };

    return (
        <div className="space-y-8">
            <p className="text-gray-600 text-lg">
                Now that you understand the mechanisms, act as the architect. Choose a use case to see the recommended consensus engine.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {scenarios.map((scenario) => (
                    <button
                        key={scenario.id}
                        onClick={() => handleSelect(scenario.id)}
                        className={`group relative p-6 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg
                            ${selectedScenario === scenario.id 
                                ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-xl scale-105 z-10' 
                                : 'border-gray-100 bg-white hover:border-gray-300'
                            }
                        `}
                    >
                        <div className={`w-12 h-12 rounded-lg ${scenario.color} flex items-center justify-center mb-4 shadow-md`}>
                            {scenario.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                            {scenario.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {scenario.description}
                        </p>
                        
                        {selectedScenario === scenario.id && (
                             <div className="absolute -top-3 -right-3 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                                 <Check className="w-4 h-4" />
                             </div>
                        )}
                    </button>
                ))}
            </div>

            {selectedScenario && (
                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                            <h4 className="text-slate-400 uppercase tracking-wider text-xs font-bold mb-2">Recommended Architecture</h4>
                            <div className="text-3xl font-bold text-white mb-4">
                                {scenarios.find(s => s.id === selectedScenario)?.bestFit}
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {scenarios.find(s => s.id === selectedScenario)?.reason}
                            </p>
                        </div>
                        <div className="hidden md:block w-px h-32 bg-slate-700"></div>
                        <div className="flex-1 space-y-3">
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"><Check className="w-4 h-4" /></div>
                                 <span className="font-medium">Optimized for requirements</span>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"><Check className="w-4 h-4" /></div>
                                 <span className="font-medium">Balanced trade-offs</span>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analysis;
