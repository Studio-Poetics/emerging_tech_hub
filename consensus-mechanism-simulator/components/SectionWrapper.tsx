import React, { ReactNode } from 'react';
import { Lock, CheckCircle2, Circle } from 'lucide-react';

interface SectionWrapperProps {
  id: string;
  title: string;
  icon: ReactNode;
  isLocked: boolean;
  isCompleted: boolean;
  children: ReactNode;
  onUnlock?: () => void; // Optional handler if we want a manual "Continue" button at bottom
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  title, 
  icon, 
  isLocked, 
  isCompleted, 
  children 
}) => {
  if (isLocked) {
    return (
      <div id={id} className="relative p-8 my-8 bg-gray-50 rounded-2xl border border-gray-200 opacity-75 select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-[2px] z-10">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Lock className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-600 font-medium">Complete previous section to unlock</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6 opacity-50">
           <div className="p-2 bg-gray-200 rounded-lg">{icon}</div>
           <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="h-32"></div> {/* Placeholder height */}
      </div>
    );
  }

  return (
    <section id={id} className={`relative p-6 md:p-8 my-8 bg-white rounded-2xl shadow-sm border ${isCompleted ? 'border-green-200' : 'border-gray-200'} transition-all duration-500`}>
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> Completed
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              <Circle className="w-4 h-4" /> In Progress
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
