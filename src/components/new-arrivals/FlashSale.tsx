import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";

export const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[60px] bg-gradient-to-r from-[#900030] to-[#C00040] py-20 px-8 text-center text-white shadow-2xl">
          {/* Decorative icons from screenshot */}
          <div className="absolute top-10 left-10 opacity-10 animate-pulse">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
            </svg>
          </div>
          
          <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Offre Limitée</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12" style={{ fontFamily: "var(--font-headline)" }}>
            Flash Sales : -40% sur tout
          </h2>

          <div className="flex justify-center gap-8 mb-12">
            {[
              { label: "Hours", value: timeLeft.hours.toString().padStart(2, "0") },
              { label: "Minutes", value: timeLeft.minutes.toString().padStart(2, "0") },
              { label: "Seconds", value: timeLeft.seconds.toString().padStart(2, "0") },
            ].map((unit, index, array) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-center">
                  <span className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums mb-2">
                    {unit.value}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    {unit.label}
                  </span>
                </div>
                {index < array.length - 1 && (
                  <span className="text-6xl md:text-8xl font-black opacity-30 mt-[-10px]">:</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <Button 
            className="rounded-full bg-white text-slate-900 hover:bg-slate-100 px-12 py-7 text-lg font-bold shadow-xl transform hover:scale-105 transition-all"
          >
            Profitez maintenant
          </Button>
          
          {/* Signature badge from screenshot */}
          <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none">
            <span className="text-xs font-mono tracking-widest">TLS_V5_SUMMER</span>
          </div>
        </div>
      </div>
    </section>
  );
};
