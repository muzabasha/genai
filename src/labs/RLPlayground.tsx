import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  BrainCircuit, 
  RefreshCw,
  Zap,
  Target,
  Trophy,
  Play,
  Pause
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { toast } from 'react-hot-toast';

const RLPlayground: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [rewardHistory, setRewardHistory] = useState<{ i: number, r: number }[]>([]);
  const [learningRate, setLearningRate] = useState(0.1);
  const [epsilon, setEpsilon] = useState(0.5);
  const [showEquation, setShowEquation] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setIteration(prev => prev + 1);
        setRewardHistory(prev => {
          const lastReward = prev.length > 0 ? prev[prev.length - 1].r : 0;
          const nextReward = Math.min(100, lastReward + (Math.random() * 10 - 2) * (1 - iteration / 200));
          return [...prev.slice(-49), { i: iteration, r: nextReward }];
        });

        if (iteration >= 200) {
          setIsRunning(false);
          toast.success("Training Loop Converged!");
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, iteration]);

  const resetTraining = () => {
    setIsRunning(false);
    setIteration(0);
    setRewardHistory([]);
    toast.success("Training Buffers Cleared");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-xs">
            <Trophy className="w-4 h-4" />
            Adaptive Lab
          </div>
          <h2 className="text-4xl font-display font-black">RL Training Ground</h2>
          <p className="text-white/50 max-w-xl">
             Be the teacher. Learn how machines learn through trial and error using Reinforcement Learning.
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Bellman Math' : 'Show Equation'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hyperparameters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              Agent Configuration
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span>Learning Rate (α)</span>
                    <span className="text-rose-400">{learningRate}</span>
                  </div>
                  <input 
                    type="range" min="0.01" max="1" step="0.05" 
                    value={learningRate} 
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-rose-500 cursor-pointer"
                  />
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span>Exploration (ε)</span>
                    <span className="text-rose-400">{epsilon}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1" step="0.1" 
                    value={epsilon} 
                    onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-rose-500 cursor-pointer"
                  />
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-white/10 text-white' : 'bg-rose-500 hover:shadow-lg hover:shadow-rose-500/20 shadow-none active:scale-95'}`}
               >
                 {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                 {isRunning ? 'Pause Training' : 'Start Simulation'}
               </button>
               <button 
                  onClick={resetTraining}
                  className="w-full py-4 glass rounded-2xl border-white/5 text-xs text-white/40 font-bold hover:text-white transition-colors"
               >
                 Reset Environment
               </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Concept: Policy Improvement
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                The agent takes actions, receives rewards, and updates its strategy (Policy). With a high learning rate, it forgets old knowledge quickly. With high epsilon, it takes more risks to find better paths.
             </p>
          </div>
        </div>

        {/* Training Convergence Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2rem] p-10 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col gap-8">
             <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                   <BarChart3 className="w-4 h-4" />
                   Training Convergence: Mean Reward
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono">
                   Step: {iteration} / 200
                </div>
             </div>

             <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <ReLineChart data={rewardHistory} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="i" hide />
                      <YAxis domain={[0, 100]} stroke="#ffffff10" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', fontSize: '10px' }}
                        itemStyle={{ color: '#f43f5e' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="r" 
                        stroke="#f43f5e" 
                        strokeWidth={3} 
                        dot={false} 
                        animationDuration={100}
                        isAnimationActive={false}
                      />
                   </ReLineChart>
                </ResponsiveContainer>
             </div>
             
             {isRunning && (
               <div className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest justify-center animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Stochastic Gradient Descent in Progress...
               </div>
             )}
          </div>

          <AnimatePresence>
            {showEquation && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-3xl border-rose-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">Temporal Difference Learning (Bellman)</h3>
                       <p className="text-xs text-white/40">Updating the value of an action.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5 flex-wrap text-center leading-relaxed">
                     <span className="text-rose-400">Q(s,a)</span>
                     <span className="text-white/30">←</span>
                     <span className="text-rose-500">Q(s,a)</span>
                     <span className="text-white/30">+</span>
                     <span className="text-rose-400">α</span>
                     <span className="text-white">[</span>
                     <span className="text-white">r + </span>
                     <span className="text-rose-400">γ</span>
                     <span className="text-white">max Q(s',a') - Q(s,a)</span>
                     <span className="text-white">]</span>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed max-w-lg mx-auto">
                     This formula is how the agent learns. It takes the difference between what it expected to happen and what actually happened (the reward) and adjusts its future expectations by the learning rate (α).
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RLPlayground;
