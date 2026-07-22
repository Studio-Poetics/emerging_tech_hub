import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SectionWrapper from './components/SectionWrapper';
import Intro from './components/Intro';
import ProofOfWork from './components/Simulations/ProofOfWork';
import ProofOfStake from './components/Simulations/ProofOfStake';
import BFT from './components/Simulations/BFT';
import Analysis from './components/Analysis';
import { ProgressState, SectionId } from './types';
import { BookOpen, Cpu, Coins, ShieldCheck, PieChart } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [progress, setProgress] = useState<ProgressState>({
    intro: false,
    pow: false,
    pos: false,
    bft: false,
    analysis: false,
  });

  const handleComplete = (section: SectionId) => {
    setProgress(prev => ({ ...prev, [section]: true }));
    
    // Auto-scroll to next section logic could go here, 
    // but usually unlocking the next section visually is enough.
    const order: SectionId[] = ['intro', 'pow', 'pos', 'bft', 'analysis'];
    const idx = order.indexOf(section);
    if (idx < order.length - 1) {
       // Optional: Set active section to next
       // setActiveSection(order[idx + 1]);
    }
  };

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        progress={progress} 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
      />
      
      <main className="lg:pl-72 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Understanding Distributed Consensus
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              How do decentralized networks agree on the truth without a leader? 
              Explore the mechanisms that power modern blockchain technology through interactive simulations.
            </p>
          </header>

          <SectionWrapper 
            id="intro" 
            title="Introduction" 
            icon={<BookOpen className="w-6 h-6" />}
            isLocked={false}
            isCompleted={progress.intro}
          >
            <Intro onComplete={() => handleComplete('intro')} />
          </SectionWrapper>

          <SectionWrapper 
            id="pow" 
            title="Proof of Work (Mining)" 
            icon={<Cpu className="w-6 h-6" />}
            isLocked={!progress.intro}
            isCompleted={progress.pow}
          >
            <ProofOfWork onComplete={() => handleComplete('pow')} />
          </SectionWrapper>

          <SectionWrapper 
            id="pos" 
            title="Proof of Stake" 
            icon={<Coins className="w-6 h-6" />}
            isLocked={!progress.pow}
            isCompleted={progress.pos}
          >
            <ProofOfStake onComplete={() => handleComplete('pos')} />
          </SectionWrapper>

          <SectionWrapper 
            id="bft" 
            title="Byzantine Fault Tolerance" 
            icon={<ShieldCheck className="w-6 h-6" />}
            isLocked={!progress.pos}
            isCompleted={progress.bft}
          >
            <BFT onComplete={() => handleComplete('bft')} />
          </SectionWrapper>

           <SectionWrapper 
            id="analysis" 
            title="Strategic Analysis" 
            icon={<PieChart className="w-6 h-6" />}
            isLocked={!progress.bft}
            isCompleted={progress.analysis}
          >
            <Analysis onComplete={() => handleComplete('analysis')} />
          </SectionWrapper>

        </div>
      </main>
    </div>
  );
};

export default App;
