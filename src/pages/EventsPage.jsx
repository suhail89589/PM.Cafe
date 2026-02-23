"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const containerRef = useRef(null);
  const mainImageRef = useRef(null);
  const secondaryColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Text Animations
      gsap.from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Parallax for the FULL Main Image
      gsap.to(mainImageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: mainImageRef.current,
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        },
      });

      // 3. Parallax for small side images
      gsap.to(secondaryColRef.current, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: "top bottom",
        },
      });

      // 4. Particle floaters
      gsap.to(".particle", {
        y: "-100vh",
        opacity: 0,
        duration: 15,
        repeat: -1,
        ease: "linear",
        stagger: { each: 0.8 },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { title: "Birthdays", desc: "Private tandoor feast setups" },
    { title: "Kitty Parties", desc: "Elegant afternoon chai & snacks" },
    { title: "Decor", desc: "Marigold & contemporary styling" },
    { title: "Group Menu", desc: "Curated multi-course experiences" },
  ];

  return (
    <div className="relative min-h-screen bg-[#080808] py-24 lg:py-40 overflow-hidden" ref={containerRef}>
      
      {/* Subtle Ethnic Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/mandala-ornament.png')]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Top Section: Branding + Secondary Images */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-40">
          <div className="lg:w-1/2">
            <div className="overflow-hidden mb-6">
              <span className="reveal-text block text-cafe-brown font-bold tracking-[0.4em] uppercase text-[10px]">
                Exquisite Gatherings
              </span>
            </div>
            <h1 className="reveal-text text-5xl md:text-7xl font-[Playfair_Display] font-bold text-white leading-[1.1] mb-8">
              Moments Made <br />
              <span className="italic text-cafe-brown/80 font-serif">Exceptional</span>
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed font-light">
              We transform your milestones into heritage experiences, blending traditional Indian hospitality with a sophisticated modern touch.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((f, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cafe-brown/30 transition-colors duration-500">
                  <h3 className="text-white font-bold text-[10px] uppercase tracking-widest mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/contact" className="inline-flex items-center gap-6 bg-cafe-brown text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
              INQUIRE NOW
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Secondary Images (Side-by-side) */}
          <div ref={secondaryColRef} className="lg:w-1/2 flex gap-4 w-full">
             <div className="flex-1 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#111]">
                <img src="src/assets/cafe2.png" className="w-full h-full object-cover" alt="Ambience" />
             </div>
             <div className="flex-1 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#111] mt-12">
                <img src="src/assets/cafe3.png" className="w-full h-full object-cover" alt="Table Setting" />
             </div>
          </div>
        </div>

        {/* --- THE MAIN CAFE IMAGE SECTION --- */}
        {/* Full width, no cropping, showing the image exactly as it is */}
        <div className="w-full relative py-20">
          <div className="overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0a] shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
            <div ref={mainImageRef} className="w-500">
              <img
                src="src/assets/cafe.png" 
                className="w-full h-auto block" // Critical: h-auto ensures the full original height is shown
                alt="Our Restaurant Architecture"
              />
            </div>
          </div>
          
          {/* Elegant Float Caption */}
          <div className="absolute -bottom-6 right-4 md:right-12 bg-cafe-brown p-8 md:p-14 rounded-3xl max-w-sm shadow-2xl z-20">
             <span className="text-white/60 uppercase tracking-[0.3em] text-[9px] font-bold block mb-4">The Venue</span>
             <p className="text-white font-[Playfair_Display] text-2xl md:text-3xl leading-snug">
               A space where <span className="italic opacity-80">Heritage</span> meets <br/> the <span className="italic opacity-80">Contemporary</span>.
             </p>
          </div>
        </div>

      </div>

      {/* Particle Decor */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bottom-[-5%] w-1 h-1 bg-cafe-brown/20 rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}