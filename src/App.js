import React, { useState, useEffect } from 'react';
import { Calendar, Truck, ShieldCheck, Star, ChevronRight, Shirt, Clock } from 'lucide-react';

const FlyDryLogo = ({ size = "text-2xl" }) => (
  <div className="flex items-center">
    <span className={`text-[#063b2c] font-black tracking-tighter uppercase leading-none ${size}`}>
      FlyDry
    </span>
  </div>
);

// A clean, iconic washing machine that stays static while its contents move
const MiniMachine = ({ className = "" }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Machine Frame (Static) */}
      <rect x="25" y="15" width="50" height="70" rx="4" stroke="currentColor" strokeWidth="4" />
      <rect x="25" y="15" width="50" height="12" rx="2" fill="currentColor" />
      
      {/* The Drum (Circular Window) */}
      <circle cx="50" cy="55" r="20" stroke="currentColor" strokeWidth="3" fill="white" />
      <mask id="drumClip">
        <circle cx="50" cy="55" r="18" fill="white" />
      </mask>
      
      <g mask="url(#drumClip)">
        {/* Sloshing Water Animation */}
        <path 
          className="animate-slosh" 
          d="M25 65Q35 60 50 65Q65 70 75 65V90H25V65Z" 
          fill="#c5a267" 
          opacity="0.4" 
        />
        {/* Rotating Drum Elements (The "Running" effect) */}
        <g className="animate-spin-fast origin-[50px_55px]">
          <path d="M40 45C45 40 55 40 60 45" stroke="#c5a267" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 68C48 72 52 72 58 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <circle cx="50" cy="55" r="2" fill="currentColor" opacity="0.2" />
        </g>
      </g>
      
      {/* Control Details */}
      <circle cx="65" cy="21" r="1.5" fill="#c5a267" />
      <rect x="30" y="20" width="10" height="2" rx="1" fill="#c5a267" opacity="0.5" />
    </svg>
  </div>
);

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(null);

  const steps = [
    {
      id: 0,
      title: "Choose a Time Slot",
      subtitle: "STEP 1: BOOKING",
      description: "Select the most convenient date and time for us to arrive. Our easy-to-use booking system lets you schedule your laundry in seconds.",
      icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />,
      accent: "#c5a267",
      detail: "Live tracking & instant confirmation"
    },
    {
      id: 1,
      title: "We Collect & Take Care",
      subtitle: "STEP 2: PROCESSING",
      description: "Once we pick up your items, we take them to our facility where we invoice and professionally clean them using premium eco-friendly methods.",
      icon: <Shirt className="w-6 h-6 md:w-8 md:h-8" />,
      accent: "#c5a267",
      detail: "Expert handling with premium care"
    },
    {
      id: 2,
      title: "Returned to Your Door",
      subtitle: "STEP 3: DELIVERY",
      description: "Your garments are returned to you on your chosen date, perfectly folded or hung and ready to wear immediately.",
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
      accent: "#c5a267",
      detail: "24-hour turnaround available"
    }
  ];

  const mockSlots = [
    { day: "Mon", date: "16 Mar", time: "08:00 - 10:00" },
    { day: "Tue", date: "17 Mar", time: "10:00 - 12:00" },
    { day: "Wed", date: "18 Mar", time: "14:00 - 16:00" }
  ];

  useEffect(() => {
    if (isHovering !== null) return;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5500);
    
    return () => clearInterval(timer);
  }, [activeStep, isHovering]);

  return (
    <div className="bg-[#fdfdfd] font-sans text-[#063b2c] py-16 md:py-24 px-4 sm:px-6 w-full overflow-x-hidden overflow-y-visible">
      {/* Explicitly set overflow-x-hidden to stop horizontal scrolling, and overflow-y-visible to help site builders read the natural height */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 uppercase italic">
            How it works
          </h2>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#c5a267] mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
          
          {/* Left: Interactive Content */}
          <div className="order-2 lg:order-1 space-y-4 md:space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                onMouseEnter={() => {
                  setActiveStep(step.id);
                  setIsHovering(step.id);
                }}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setActiveStep(step.id)}
                className={`group relative cursor-pointer p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-700 border-2 ${
                  activeStep === step.id 
                  ? 'bg-white border-[#063b2c]/5 shadow-[0_20px_40px_-10px_rgba(6,59,44,0.1)] md:shadow-[0_30px_60px_-15px_rgba(6,59,44,0.12)] scale-[1.02] lg:scale-[1.03] z-10' 
                  : 'bg-transparent border-transparent opacity-50 lg:opacity-40 hover:opacity-100'
                }`}
                style={{
                  animation: `slideIn 0.8s ease-out forwards ${index * 0.2}s`,
                  opacity: 0
                }}
              >
                {/* Visual Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-14 md:left-16 bottom-[-24px] w-0.5 h-6 bg-slate-100 hidden lg:block" />
                )}

                {/* Progress Indicator */}
                {activeStep === step.id && isHovering === null && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 md:h-1.5 bg-[#c5a267] transition-all"
                    style={{ animation: 'progress 5.5s linear forwards' }}
                  />
                )}

                <div className="flex gap-5 md:gap-8 items-start">
                  <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-700 rounded-xl md:rounded-2xl ${
                    activeStep === step.id 
                    ? 'bg-[#063b2c] text-[#c5a267] shadow-xl shadow-[#063b2c]/20 md:rotate-[-4deg]' 
                    : 'bg-slate-50 text-slate-400'
                  }`}>
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <span className={`text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.25em] mb-2 md:mb-3 block transition-colors ${
                      activeStep === step.id ? 'text-[#c5a267]' : 'text-slate-400'
                    }`}>
                      {step.subtitle}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-black mb-2 md:mb-3 transition-colors uppercase italic ${
                      activeStep === step.id ? 'text-[#063b2c]' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
                      activeStep === step.id ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-4 md:mb-5 pr-2 md:pr-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-[#c5a267] uppercase tracking-widest">
                        <ShieldCheck size={14} className="md:w-4 md:h-4" />
                        {step.detail}
                      </div>
                    </div>
                  </div>
                  
                  {activeStep === step.id && (
                    <ChevronRight className="text-[#c5a267] self-center animate-pulse hidden sm:block" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: The Phone Experience */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center pt-8 pb-12 lg:py-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-full md:h-full max-w-[550px] aspect-square pointer-events-none">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#063b2c]/5 to-transparent rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
               <div className="absolute inset-8 md:inset-10 border border-[#063b2c]/10 rounded-full animate-[spin_30s_linear_infinite]" />
               <div className="absolute inset-16 md:inset-20 border-2 border-dashed border-[#c5a267]/10 rounded-full animate-[spin_50s_linear_infinite_reverse]" />
            </div>

            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] z-10 animate-float">
               <div className="bg-[#063b2c] rounded-[3rem] md:rounded-[3.8rem] p-2.5 md:p-3 shadow-[0_40px_80px_-20px_rgba(6,59,44,0.3)] md:shadow-[0_60px_120px_-20px_rgba(6,59,44,0.4)] border-[6px] md:border-[8px] border-[#0a3d2e] relative overflow-hidden">
                 
                 <div className="relative aspect-[9/19] rounded-[2.2rem] md:rounded-[2.9rem] overflow-hidden bg-white shadow-inner">
                    <div className="p-4 md:p-6 h-full flex flex-col">
                      <div className="flex justify-between items-center mt-4 md:mt-6 mb-6 md:mb-8">
                         <FlyDryLogo size="text-lg md:text-xl" />
                         <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-50 flex items-center justify-center">
                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#c5a267]" />
                         </div>
                      </div>

                      <div className="flex-1 relative">
                        {/* Step 1 UI */}
                        <div className={`absolute inset-0 transition-all duration-1000 flex flex-col ${
                          activeStep === 0 ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'
                        }`}>
                          <h4 className="font-black text-xl md:text-2xl mb-4 md:mb-6 text-[#063b2c]">Pick a slot</h4>
                          <div className="space-y-2 md:space-y-3">
                             {mockSlots.map((slot, i) => (
                               <div key={i} className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all ${i === 0 ? 'border-[#c5a267] bg-white shadow-md' : 'border-slate-50 opacity-40'}`}>
                                 <div className="flex justify-between items-center mb-1">
                                   <span className="text-[10px] md:text-xs font-black text-[#063b2c] uppercase">{slot.day}, {slot.date}</span>
                                   {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#c5a267]" />}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-slate-400">
                                   <Clock size={10} className="md:w-3 md:h-3" />
                                   <span className="text-[9px] md:text-[10px] font-bold">{slot.time}</span>
                                 </div>
                               </div>
                             ))}
                          </div>
                          <div className="mt-auto mb-4 h-12 md:h-14 bg-[#063b2c] rounded-xl md:rounded-2xl flex items-center justify-center text-[#c5a267] font-black uppercase text-[10px] md:text-xs tracking-[0.2em] shadow-lg shadow-[#063b2c]/20">
                            Book Now
                          </div>
                        </div>

                        {/* Step 2 UI */}
                        <div className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center text-center ${
                          activeStep === 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
                        }`}>
                          <div className="w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8 relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-[#063b2c]/5 border-t-[#c5a267] animate-spin-slow" />
                            <div className="absolute inset-2 border border-[#063b2c]/10 rounded-full animate-pulse" />
                            <MiniMachine className="w-20 h-20 md:w-24 md:h-24 text-[#063b2c] relative z-10" />
                          </div>
                          
                          <p className="font-black text-lg md:text-xl mb-1 uppercase italic tracking-tighter">Handled with Care</p>
                          <p className="text-slate-400 text-[9px] md:text-[10px] font-bold tracking-widest uppercase">Premium Cleaning Cycles</p>
                        </div>

                        {/* Step 3 UI */}
                        <div className={`absolute inset-0 transition-all duration-1000 flex flex-col ${
                          activeStep === 2 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
                        }`}>
                          <div className="bg-[#063b2c] p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] mb-4 md:mb-6 shadow-xl shadow-[#063b2c]/10">
                            <div className="flex items-center gap-3 mb-4 md:mb-5">
                              <Truck className="text-[#c5a267] w-5 h-5 md:w-6 md:h-6" />
                              <span className="font-black text-[9px] md:text-[10px] tracking-[0.3em] text-white">ON ROUTE</span>
                            </div>
                            <div className="h-1 md:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-[#c5a267] w-3/4 animate-shimmer" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center pt-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#fdfdfd] shadow-xl rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-3 md:mb-4 border border-slate-50">
                              <Star className="text-[#c5a267] fill-[#c5a267] w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <p className="font-black text-base md:text-lg uppercase italic text-center leading-none">Freshly<br/><span className="text-[#c5a267]">Delivered</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-8 bg-white shadow-2xl p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-[#063b2c]/5 flex items-center gap-3 md:gap-4 animate-float-delayed z-20">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#063b2c] rounded-xl md:rounded-2xl flex items-center justify-center text-[#c5a267] shadow-lg shadow-[#063b2c]/20 rotate-12">
                    <ShieldCheck size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="pr-2 md:pr-4">
                    <div className="text-[8px] md:text-[9px] font-black text-slate-300 tracking-[0.2em] uppercase">Trust FlyDry</div>
                    <div className="font-black text-xs md:text-sm uppercase italic tracking-tighter text-[#063b2c]">Eco-Certified</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-8px) rotate(14deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slosh {
          0%, 100% { d: path("M25 65Q35 60 50 65Q65 70 75 65V90H25V65Z"); }
          50% { d: path("M25 70Q35 75 50 70Q65 65 75 70V90H25V70Z"); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-slosh {
          animation: slosh 1.2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 1.5s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, #c5a267 0%, #e8d5b5 50%, #c5a267 100%);
          background-size: 200% 100%;
        }
        @media (max-width: 640px) {
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
        }
      `}} />
    </div>
  );
};

export default App;
