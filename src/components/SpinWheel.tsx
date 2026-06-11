import { useState } from "react";
import { Sparkles, Gift, Copy, Check, Info, Eye } from "lucide-react";

interface SpinWheelProps {
  onApplyPromo: (code: string) => void;
  onClose?: () => void;
}

interface Prize {
  name: string;
  code: string;
  color: string;
  rotation: number;
}

const PRIZES: Prize[] = [
  { name: "Flat 20% Off", code: "GLOW20", color: "bg-[#D8A47F]", rotation: 0 },
  { name: "Free Shipping", code: "FREESHIP", color: "bg-[#FFF5E6]", rotation: 60 },
  { name: "15% Welcome Pass", code: "WELCOME15", color: "bg-[#F8D7DA]", rotation: 120 },
  { name: "Botanical Freebie", code: "WELCOME15", color: "bg-brand-ivory", rotation: 180 },
  { name: "Flat 10% Off", code: "GLOW20", color: "bg-[#F4EDE4]", rotation: 240 },
  { name: "Surprise Skin Kit", code: "WELCOME15", color: "bg-brand-pink", rotation: 300 }
];

export default function SpinWheel({ onApplyPromo, onClose }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spunAngle, setSpunAngle] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [copied, setCopied] = useState(false);
  const [spinsCount, setSpinsCount] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Generate random full rotations + a target sector angle
    const targetSectorIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[targetSectorIndex];
    
    // We rotate in the opposite direction, and adding extra spins
    const extraRotations = 1800; // 5 full rounds
    const prizeAngle = selectedPrize.rotation;
    const finalAngle = extraRotations + (360 - prizeAngle);

    setSpunAngle(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setSpinsCount(prev => prev + 1);
    }, 4000); // matching CSS cubic bezier duration
  };

  const copyToClipboard = () => {
    if (!wonPrize) return;
    navigator.clipboard.writeText(wonPrize.code);
    setCopied(true);
    // Apply immediately to global state
    onApplyPromo(wonPrize.code);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-brand-beige rounded-3xl p-6 shadow-2xl max-w-sm mx-auto text-center relative overflow-hidden animate-fade-in-up">
      {/* Abstract backing glow */}
      <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-brand-pink opacity-30 blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-brand-cream opacity-30 blur-2xl"></div>

      <div className="flex items-center justify-center space-x-1.5 text-brand-rosegold mb-1">
        <Sparkles className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: "10s" }} />
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Natural Glow Gamified Club</span>
      </div>
      
      <h3 className="text-lg font-serif font-bold text-brand-charcoal">
        Skincare Spin & Win Wheel
      </h3>
      <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-sans mb-6">
        Claim luxury vouchers, flat product rebates, or free clinical delivery. Spin the botanical wheel once per daily session!
      </p>

      {/* Actual Wheel container stage */}
      <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center select-none">
        {/* Needle pointer */}
        <div className="absolute -top-1 z-30 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-brand-charcoal drop-shadow-md"></div>
        
        {/* Spinning Outer Ring Circular stage */}
        <div 
          className="w-full h-full rounded-full border-4 border-brand-charcoal relative flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-[4000ms] cubic-bezier(0.25, 1, 0.5, 1)"
          style={{
            transform: `rotate(${spunAngle}deg)`,
            transitionDuration: "4000ms",
            transitionTimingFunction: "cubic-bezier(0.1, 0.8, 0.1, 1)"
          }}
        >
          {PRIZES.map((prize, idx) => {
            const angle = idx * 60;
            return (
              <div 
                key={idx}
                className="absolute inset-0 origin-center flex justify-center text-center pt-3 text-[9px] font-sans font-bold uppercase pointer-events-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                {/* Visual colored slice blocks simulated */}
                <div 
                  className={`w-0 h-0 border-l-[46px] border-r-[46px] border-t-[94px] border-l-transparent border-r-transparent border-t-[#FFF]/20 absolute top-0 origin-bottom`}
                  style={{ transform: `scaleY(1.15)` }}
                ></div>
                <span className="z-10 text-brand-charcoal drop-shadow-xs bg-white/70 px-2.5 py-1 rounded-full border border-brand-beige/50 mt-1.5 leading-none">
                  {prize.name}
                </span>
              </div>
            );
          })}

          {/* Golden Center Hub Pin */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-brand-rosegold to-brand-gold border-4 border-white z-20 flex items-center justify-center shadow-lg pointer-events-none">
            <Gift className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Button spin toggle and won panels */}
      {!wonPrize ? (
        <button
          onClick={handleSpin}
          disabled={isSpinning || spinsCount >= 1}
          className={`w-full py-3.5 cursor-pointer rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white transition-all shadow-md ${
            isSpinning 
              ? "bg-brand-charcoal/40" 
              : spinsCount >= 1 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none" 
              : "bg-gradient-to-r from-brand-rosegold to-brand-gold hover:scale-[1.01] hover:shadow-brand-rosegold/35"
          }`}
          id="trigger-spin-btn"
        >
          {isSpinning ? "Revolving Botanical Slices..." : spinsCount >= 1 ? "Used Session Token" : "Activate Lucky Spin"}
        </button>
      ) : (
        <div className="space-y-3 bg-brand-cream/20 p-4 rounded-2xl border border-brand-rosegold/20 animate-fade-in-up">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#D8A47F]">Congratulations! You Won</div>
          <h4 className="text-sm font-bold text-brand-charcoal">{wonPrize.name}</h4>
          
          {/* Copyable voucher widget */}
          <div className="flex items-center border border-brand-beige rounded-xl overflow-hidden bg-white p-1">
            <code className="flex-1 font-mono text-center text-brand-charcoal font-bold text-sm tracking-widest select-all">
              {wonPrize.code}
            </code>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-brand-rosegold text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1 hover:bg-brand-gold transition-colors cursor-pointer"
              title="Copy Code to Clipboard"
              id="copy-prize-code-btn"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-1">✓ Applied Immediately to Active Checkout</p>
        </div>
      )}

      {onClose && (
        <button 
          onClick={onClose}
          className="text-[11px] font-bold uppercase text-brand-charcoal/40 hover:text-brand-rosegold transition-colors mt-4 block mx-auto underline tracking-wider"
          id="close-spin-btn"
        >
          Close Promotion
        </button>
      )}

      <div className="mt-4 pt-3.5 border-t border-brand-beige/50 text-[10px] text-brand-charcoal/40 flex items-center justify-center space-x-1">
        <Info className="w-3.5 h-3.5" />
        <span>Limited to 1 lucky spin voucher claim per checkout sequence.</span>
      </div>
    </div>
  );
}
