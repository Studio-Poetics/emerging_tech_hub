import React, { useState } from 'react';
import { Target, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const options = [
    { id: 1, text: "Trust everyone to be honest" },
    { id: 2, text: "Appoint a central admin" },
    { id: 3, text: "Economic incentives for honesty" },
    { id: 4, text: "Ban anonymous users" },
  ];

  const handleSelect = (id: number) => {
    setSelectedAnswer(id);
    const correct = id === 3;
    setIsCorrect(correct);
    if (correct) {
      onComplete();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Target className="w-5 h-5" /> The Core Problem
          </h3>
          <p className="text-indigo-800 leading-relaxed">
            In a distributed network where participants don't trust each other (like the internet), 
            how do we agree on a single version of the truth (like who owns what money)?
            This is the <strong>Consensus Problem</strong>.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4">What You Will Learn</h4>
          <ul className="space-y-2">
            {['Why consensus is hard', 'Proof of Work (Mining)', 'Proof of Stake (Validation)', 'Byzantine Fault Tolerance'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          Quick Check
        </h3>
        <p className="text-gray-600 mb-6">
          You have 100 participants. 30 are trying to cheat. How do you ensure the network stays secure without a boss?
        </p>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isCorrect === true}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 flex items-center justify-between
                ${selectedAnswer === opt.id 
                  ? (opt.id === 3 ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                  : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              {opt.text}
              {selectedAnswer === opt.id && (
                opt.id === 3 ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
              )}
            </button>
          ))}
        </div>

        {isCorrect === true && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <strong>Correct!</strong> Blockchain uses game theory. It makes it profitable to play by the rules and expensive to cheat.
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
