import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Volume2, Settings, RefreshCw, Play, Pause, Volume1, Activity
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AudioLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConcepts, setShowConcepts] = useState(false);
  
  // Intermediate data
  const [sampleVal, setSampleVal] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  const generateAudio = async () => {
    setIsGenerating(true);
    setProgress(0);
    setHistoryCount(0);
    
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      setSampleVal(parseFloat(((Math.random() * 2 - 1) * 0.8).toFixed(4)));
      setHistoryCount(prev => prev + 1024); // Simulating sample windowing
      await new Promise(r => setTimeout(r, 150));
    }
    setIsGenerating(false);
    toast.success("Speech Synthesis Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 text-white">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
            <Volume2 className="w-4 h-4" />
            Audio Lab
          </div>
          <h2 className="text-4xl font-display font-black">Neural Voice Architect</h2>
          <p className="text-white/50 max-w-xl text-sm italic">
             Witness the "Vibration Synthesis" — mapping text to acoustic sample probabilities.
          </p>
        </div>
        <button onClick={() => setShowConcepts(!showConcepts)} className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white">
          <Settings className="w-4 h-4" />
          {showConcepts ? 'Hide Voice Math' : 'Show Voice Theory'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-1 space-y-6 text-white leading-relaxed">
          <div className="glass rounded-[2rem] p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <Music className="w-4 h-4" />
              Input Text
            </div>
            
            <textarea placeholder="Type something..." className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-orange-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-sm" defaultValue="Hello, I am a generative voice model built with neural networks." />

            <button onClick={generateAudio} disabled={isGenerating} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 text-white'}`}>
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing...' : 'Generate Voice'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase">
                <Volume1 className="w-4 h-4" />
                Data Step: Sampling
             </div>
             <p className="text-xs text-white/50 leading-relaxed italic">
                In this lab, you don't just hear the voice. You see the **Current Vibration Intensity** and the **Sample History Pool** used for the next prediction.
             </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[3rem] p-8 border-white/5 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             {/* Intermediate Representation: Sample Intensity */}
             <AnimatePresence>
                {isGenerating && (
                   <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-8 left-8 p-4 glass rounded-2xl border-orange-500/10 text-center z-30">
                      <div className="text-[8px] font-bold text-white/40 uppercase mb-2 text-white">Intermediate: Sample Amplitude</div>
                      <div className="font-mono text-2xl text-orange-400">{sampleVal}</div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Intermediate Representation: History Counter */}
             <AnimatePresence>
                {isGenerating && (
                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute top-8 right-8 p-4 glass rounded-2xl border-orange-500/10 text-center z-30">
                      <div className="text-[8px] font-bold text-white/40 uppercase mb-2 text-white">Intermediate: Context Window</div>
                      <div className="font-mono text-xl text-orange-400">{historyCount.toLocaleString()} Samples</div>
                   </motion.div>
                )}
             </AnimatePresence>

             <div className="w-full h-32 flex items-center justify-center gap-1.5 px-12">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div 
                    key={i} animate={isGenerating || isPlaying ? { height: ['15%', `${15 + Math.random() * 70}%`, `${10 + Math.random() * 50}%`, '15%'] } : { height: '8%' }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.03, ease: "easeInOut" }}
                    className={`w-2.5 rounded-full ${isGenerating ? 'bg-orange-500/40' : i*2.5 < progress ? 'bg-orange-600 shadow-[0_0_10px_#ea580c]' : 'bg-white/10'}`}
                  />
                ))}
             </div>

             <div className="relative z-10 w-full max-w-md">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                   <span>Neural Sample Accumulator</span>
                   <span className="text-orange-400">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                   <motion.div className="h-full bg-linear-to-r from-orange-600 to-orange-400 shadow-[0_0_20px_#f97316]" animate={{ width: `${progress}%` }} />
                </div>
             </div>

             {!isGenerating && progress === 100 && (
               <button onClick={() => setIsPlaying(!isPlaying)} className="px-8 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white/10 transition-all flex items-center gap-3 font-bold text-sm text-white">
                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                 {isPlaying ? 'Freeze Playback' : 'Replay Result'}
               </button>
             )}
          </div>

          <AnimatePresence>
            {showConcepts && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="p-10 glass rounded-[3rem] border-orange-500/20 space-y-10 relative overflow-hidden bg-black/20 text-left">
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-amber-500 shadow-[0_5px_15px_rgba(249,115,22,0.3)]" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-white px-0.5 uppercase tracking-wide">Acoustic Auto-Regression</h3>
                       <p className="text-sm text-white/40">Calculating the conditional probability of the next vibration.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-8 rounded-3xl flex items-center justify-center gap-6 font-mono text-xl md:text-3xl border border-white/10 text-white flex-wrap shadow-inner">
                     <span className="text-orange-400">P(x)</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">PROD(P(x<sub>t</sub> | x<sub>&lt; t</sub>))</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-orange-400 uppercase tracking-[0.2em]">The Mathematical Logic</h4>
                      <ul className="space-y-5 text-sm text-white/60 text-left">
                        <li className="flex gap-4">
                          <span className="text-orange-400 font-bold">P(x<sub>t</sub>) :</span> 
                          <span>The intensity (vibration) of the speaker at this exact millisecond.</span>
                        </li>
                        <li className="flex gap-4">
                           <span className="text-orange-400 font-bold">x<sub>&lt; t</sub> :</span> 
                          <span>The history window of all vibrations produced before t.</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-orange-400 font-bold">PROD :</span> 
                          <span>The iterative chain of predictions (likelihood multiplication).</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-6 border-l border-white/5 pl-10 text-left">
                       <h4 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em]">The Violinist Illustration</h4>
                       <p className="text-sm text-white/50 leading-relaxed italic">
                         "Imagine a master violinist. At any given millisecond (t), where they move the bow depends entirely on the note they just finished (x<sub>&lt; t</sub>). The AI performs this millions of times per minute to create a voice."
                       </p>
                    </div>
                  </div>

                  <div className="p-8 bg-orange-500/[0.03] rounded-3xl border border-orange-500/10 transition-all hover:bg-orange-500/[0.05]">
                    <h4 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-4">Open Research Question</h4>
                    <p className="text-md italic text-white/80 leading-relaxed">
                      "If an AI can copy the unique vibration signature (x) of any human voice, how can we keep our voice-based security features safe in the future?"
                    </p>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AudioLab;
