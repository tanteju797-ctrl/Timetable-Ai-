import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Clock, Printer, Sliders, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface InteractiveControlsProps {
  onResetAll: () => void;
  isSimulatedTime: boolean;
  onToggleTimeMode: () => void;
  simulatedHour?: number;
  onChangeSimulatedHour?: (hour: number) => void;
}

export const InteractiveControls: React.FC<InteractiveControlsProps> = ({
  onResetAll,
  isSimulatedTime,
  onToggleTimeMode,
  simulatedHour = 15.25,
  onChangeSimulatedHour,
}) => {
  const handlePrint = () => {
    soundFx.playFairyTwinkle();
    window.print();
  };

  const formatHourSlider = (val: number) => {
    const hours24 = Math.floor(val);
    const minutesVal = Math.round((val - hours24) * 60);
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const minutesStr = minutesVal < 10 ? '0' + minutesVal : minutesVal;
    return `${hours12}:${minutesStr} ${ampm}`;
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 flex-wrap mt-6 pb-2 no-print select-none">
      {/* Left side: Timeline Scrubber with Fantasy Candy Slider */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="candy-glass-pill px-4 py-2.5 rounded-[24px] flex items-center gap-3 text-xs font-black text-white border-2 border-cyan-300/80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-md"
      >
        <div className="flex items-center gap-1.5 text-cyan-200">
          <Clock className="w-4 h-4 text-cyan-300" />
          <span>⏰ Time Machine Slider:</span>
        </div>

        {onChangeSimulatedHour && (
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="6"
              max="23.5"
              step="0.25"
              value={simulatedHour}
              onChange={(e) => {
                onChangeSimulatedHour(parseFloat(e.target.value));
              }}
              className="w-28 sm:w-36 h-2.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-400"
              title="Drag to fast forward your day!"
            />
            <span className="font-mono text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-md font-black border border-white/80">
              {formatHourSlider(simulatedHour)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Right Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            soundFx.playFairyTwinkle();
            onToggleTimeMode();
          }}
          className="candy-glass-pill hover:bg-white/30 px-4 py-2.5 rounded-[20px] text-xs font-black text-white flex items-center gap-1.5 transition-all shadow-md border-2 border-yellow-300/80 bg-amber-500/20 cursor-pointer"
          title="Toggle 3:15 PM simulation mode"
        >
          <Sliders className="w-4 h-4 text-yellow-300" />
          <span>{isSimulatedTime ? '⭐ Mode: 3:15 PM Start' : '🌟 Mode: Real Live Clock'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            soundFx.playBubblePop();
            onResetAll();
          }}
          className="candy-glass-pill hover:bg-white/30 px-4 py-2.5 rounded-[20px] text-xs font-black text-white/90 hover:text-rose-200 flex items-center gap-1.5 transition-all shadow-md border-2 border-rose-300/80 bg-rose-500/20 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-rose-300" />
          <span>Restart Stars</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePrint}
          className="candy-glass-pill hover:bg-white/30 px-4 py-2.5 rounded-[20px] text-xs font-black text-white flex items-center gap-1.5 transition-all shadow-md border-2 border-emerald-300/80 bg-emerald-500/20 cursor-pointer"
          title="Print or Save PDF"
        >
          <Printer className="w-4 h-4 text-emerald-300" />
          <span>Print Star Chart 🖨️</span>
        </motion.button>
      </div>
    </div>
  );
};
