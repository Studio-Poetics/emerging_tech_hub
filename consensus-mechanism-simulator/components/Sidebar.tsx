import React from 'react';
import { ProgressState, SectionId } from '../types';
import { BookOpen, Cpu, Coins, ShieldCheck, PieChart, Check } from 'lucide-react';

interface SidebarProps {
  progress: ProgressState;
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ progress, activeSection, onNavigate }) => {
  const menuItems = [
    { id: 'intro', label: 'Introduction', icon: BookOpen },
    { id: 'pow', label: 'Proof of Work', icon: Cpu },
    { id: 'pos', label: 'Proof of Stake', icon: Coins },
    { id: 'bft', label: 'Byzantine Faults', icon: ShieldCheck },
    { id: 'analysis', label: 'Final Analysis', icon: PieChart },
  ];

  // Calculate percentage
  const completedCount = Object.values(progress).filter(Boolean).length;
  const percentage = (completedCount / 5) * 100;

  return (
    <div className="w-full lg:w-72 bg-white lg:h-screen lg:fixed lg:left-0 lg:top-0 border-r border-gray-200 z-50 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">
          Consensus <span className="text-indigo-600">Simulator</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Interactive Learning Hub</p>
      </div>

      {/* Progress Bar (Mobile/Desktop) */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
          <span>Your Progress</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const isCompleted = progress[item.id as keyof ProgressState];
          const isActive = activeSection === item.id;
          // Determine if locked: Previous section must be done. Intro always unlocked.
          // Simple logic: Can navigate if completed OR is the immediate next step.
          // For simplicity in this demo, we allow clicking if we've reached it.
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as SectionId)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </div>
              {isCompleted && <Check className="w-4 h-4 text-green-500" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 text-xs text-gray-400">
        &copy; 2025 Emerging Tech Hub. <br/>Designed for Education.
      </div>
    </div>
  );
};

export default Sidebar;
