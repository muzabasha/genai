import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathBlockProps {
  formula: string;
  color?: 'blue' | 'indigo' | 'emerald' | 'orange' | 'purple' | 'rose' | 'teal';
}

/**
 * Renders a LaTeX formula block with a colored border accent.
 * Uses KaTeX for proper math rendering.
 */
export const EquationBlock: React.FC<MathBlockProps> = ({ formula, color = 'indigo' }) => {
  const borderColor: Record<string, string> = {
    blue: 'border-blue-500/20',
    indigo: 'border-indigo-500/20',
    emerald: 'border-emerald-500/20',
    orange: 'border-orange-500/20',
    purple: 'border-purple-500/20',
    rose: 'border-rose-500/20',
    teal: 'border-teal-500/20',
  };

  return (
    <div className={`p-6 bg-black/40 rounded-3xl border overflow-x-auto ${borderColor[color]}`}>
      <div className="flex justify-center text-white text-base md:text-lg">
        <BlockMath math={formula} />
      </div>
    </div>
  );
};

/**
 * Renders inline LaTeX math.
 */
export const InlineEquation: React.FC<{ formula: string }> = ({ formula }) => (
  <InlineMath math={formula} />
);

export default EquationBlock;
