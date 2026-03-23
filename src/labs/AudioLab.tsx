import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Volume2, 
  Settings, 
  RefreshCw,
  Play,
  Pause,
  Waves
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AudioLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConcepts, setShowConcepts] = useState(false);

  const generateAudio = async () => {
    setIsGenerating(true);
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 150));
    }
    setIsGenerating(false);
    toast.success("Speech Synthesis Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
            <Volume2 className="w-4 h-4" />
            Audio Lab
          </div>
          <h2 className="text-4xl font-display font-black text-white">Neural Voice Architect</h2>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
             From text to natural speech. Explore how WaveNet-style models generate audio samples at 24,000 times per second.
          </p>
        </div>
        <button 
           onClick={() => setShowConcepts(!showConcepts)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
        >
          <Settings className="w-4 h-4" />
          {showConcepts ? 'Hide Voice Math' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <Music className="w-4 h-4" />
              Input Text
            </div>
            
            <textarea 
               placeholder="Type something..."
               className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-orange-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-sm"
               defaultValue="Hello, I am a generative voice model built with neural networks."
            />

            <button 
               onClick={generateAudio}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 text-white'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing...' : 'Generate Voice'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
                <Waves className="w-4 h-4" />
                Concept: Sample Generation
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                Standard audio is 44.1kHz (44,100 samples/sec). Generative AI predicts each vibration based on previous ones, creating high-fidelity, natural sounding speech.
             </p>
          </div>
        </div>

        {/* Waveform Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[350px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             <div className="w-full h-32 flex items-center justify-center gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div 
                    key={i} animate={isGenerating || isPlaying ? { height: ['20%', `${20 + Math.random() * 60}%`, `${10 + Math.random() * 40}%`, '20%'] } : { height: '10%' }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                    className={`w-2 rounded-full ${isGenerating ? 'bg-orange-500/40' : i*2.5 < progress ? 'bg-orange-500' : 'bg-white/10'}`}
                  />
                ))}
             </div>

             <div className="relative z-10 w-full max-w-md">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/40 mb-3">
                   <span>Neural Pipeline Progress</span>
                   <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <motion.div className="h-full bg-linear-to-r from-orange-600 to-orange-400 shadow-[0_0_15px_#f97316]" animate={{ width: `${progress}%` }} />
                </div>
             </div>

             {!isGenerating && progress === 100 && (
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 font-bold text-sm text-white"
               >
                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                 {isPlaying ? 'Stop Playback' : 'Play Result'}
               </button>
             )}
          </div>

          <AnimatePresence>
            {showConcepts && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-[2rem] border-orange-500/20 space-y-6 relative overflow-hidden"
              >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-500 to-red-500" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Waves className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white">Acoustic Auto-Regression</h3>
                       <p className="text-xs text-white/40">Calculating the probability of the next vibration.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg md:text-2xl border border-white/5 text-white flex-wrap">
                     <span className="text-orange-400">P(x)</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">PROD(P(x<sub>t</sub> | x<sub>< t</sub>))</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-orange-400 uppercase tracking-tight">Equation Interpretation</h4>
                      <ul className="space-y-3 text-xs text-white/60">
                        <li className="flex gap-2">
                          <span className="text-white font-bold">P(x<sub>t</sub>):</span> 
                          <span>The intensity (vibration) of the speaker at this exact millisecond.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">x<sub>< t</sub>:</span> 
                          <span>Everything the AI has already "spoken" in the previous milliseconds.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">PROD:</span> 
                          <span>The chain of probabilities multiplied to ensure the whole 30s audio makes sense.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4 border-l border-white/5 pl-8">
                       <h4 className="text-sm font-bold text-orange-500 uppercase tracking-tight">Illustration: The Violinist</h4>
                       <p className="text-xs text-white/50 leading-relaxed text-left">
                         Imagine a master violinist. At any given second (t), where they move the bow depends entirely on the note they just played (x<sub>< t</sub>). The AI acts the same, predicting where the "vibration" should go next based on the melody it's already generated.
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                    <h4 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-3">Open-Ended Research Question</h4>
                    <p className="text-sm italic text-white/80 leading-relaxed text-left">
                      "If an AI can copy the vibration (x) of a human voice perfectly, how can we distinguish between a real doctor calling you and a high-fidelity synthetic scammer voice?"
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
