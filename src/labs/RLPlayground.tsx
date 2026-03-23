import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Target, 
  Zap, 
  RefreshCw,
  Award,
  TrendingUp,
  Settings2,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
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
  const [rewardHistory, setRewardHistory] = useState<{iter: number, reward: number}[]>([]);
  const [exploration, setExploration] = useState(0.2);
  const [learningRate, setLearningRate] = useState(0.01);
  const [discountFactor, setDiscountFactor] = useState(0.9);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setIteration(prev => prev + 1);
        const newReward = (Math.log(iteration + 1) * 10) + (Math.random() - exploration) * 5;
        setRewardHistory(prev => [...prev.slice(-29), { iter: iteration, reward: newReward }]);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning, iteration, exploration]);

  const toggleTraining = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.success("Starting RL Training Loop...", { icon: '🧠' });
    } else {
      toast("Training paused.", { icon: '⏸️' });
    }
  };

  const reset = () => {
    setIsRunning(false);
    setIteration(0);
    setRewardHistory([]);
    toast("Training Reset.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-xs">
            <BrainCircuit className="w-4 h-4" />
            Decision Lab
          </div>
          <h2 className="text-4xl font-display font-black">RL Training Grounds</h2>
          <p className="text-white/50 max-w-xl">
             Teaching AI through trial and error. Adjust the reward loop and watch the model find the optimal path.
          </p>
        </div>
        <div className="flex gap-2">
           <div className="glass px-4 py-2 rounded-xl text-xs font-bold border-white/5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Efficiency: {((rewardHistory[rewardHistory.length-1]?.reward || 0) * 1.5).toFixed(1)}%
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Settings2 className="w-4 h-4" />
              Hyperparameters
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                   <span>Exploration Rate (ε)</span>
                   <span className="text-rose-400">{exploration.toFixed(2)}</span>
                 </div>
                 <input 
                   type="range" 
                   min="0.01" 
                   max="1" 
                   step="0.01" 
                   value={exploration}
                   onChange={(e) => setExploration(parseFloat(e.target.value))}
                   className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500"
                 />
                 <p className="text-[10px] text-white/30 italic">High ε = model tries new things. Low ε = model sticks to what it knows.</p>
               </div>

               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                   <span>Learning Rate (α)</span>
                   <span className="text-rose-400">{learningRate.toFixed(3)}</span>
                 </div>
                 <input 
                   type="range" 
                   min="0.001" 
                   max="0.1" 
                   step="0.001" 
                   value={learningRate}
                   onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                   className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500"
                 />
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                  onClick={toggleTraining}
                  className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-rose-500' : 'bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95'}`}
               >
                 {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                 {isRunning ? 'Pause Training' : 'Start Simulation'}
               </button>
               <button 
                  onClick={reset}
                  className="w-14 h-14 rounded-2x glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
               >
                  <RefreshCw className="w-5 h-5 text-white/60" />
               </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                The Bellman Equation
             </div>
             <div className="bg-black/40 p-4 rounded-xl font-mono text-[9px] text-rose-400 leading-relaxed border border-white/5">
                Q(s,a) = Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                The model learns to update its "Q-value" (expected reward) for every action. Over thousands of trials, it learns which actions lead to the highest final score.
             </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[400px] flex flex-col gap-8">
             <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Training Convergence Chart</div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                   <span className="text-[10px] font-bold text-rose-400">EPOCH {iteration}</span>
                </div>
             </div>
             
             <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={rewardHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="iter" hide />
                      <YAxis stroke="#ffffff20" fontSize={10} domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '10px' }} 
                        itemStyle={{ color: '#f43f5e' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="reward" 
                        stroke="#f43f5e" 
                        strokeWidth={3} 
                        dot={false} 
                        animationDuration={300}
                      />
                   </LineChart>
                </ResponsiveContainer>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                   <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase">
                      <Zap className="w-3 h-3" />
                      Current Action
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-mono">Move Left</span>
                      <ArrowRight className="w-4 h-4 text-white/20" />
                      <span className="text-xs text-emerald-400">+0.5 Reward</span>
                   </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                   <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase">
                      <Award className="w-3 h-3" />
                      Policy Quality
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-500" 
                        animate={{ width: `${Math.min(iteration / 5, 100)}%` }} 
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RLPlayground;
