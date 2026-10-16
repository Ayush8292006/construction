import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Wrench, Target, ShieldCheck, Clock } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const products = [
  { code: 'TNK', title: 'Tanks & Process Equipment', desc: 'MS and SS storage tanks, process tanks, reactors, mixing vessels, receivers and custom-fabricated industrial equipment.', path: '/products/tanks-process-equipment', image: '/client-01.jpeg', items: ['MS Storage Tanks', 'SS Storage Tanks', 'Process Tanks', 'Reactors & Vessels', 'Receivers', 'Custom Equipment'] },
  { code: 'PIP', title: 'Piping', desc: 'MS and SS process piping, utility piping, pipe spool fabrication, supports and complete installation & erection.', path: '/products/piping', image: '/client-02.jpeg', items: [] },
  { code: 'SKD', title: 'Skids & Equipment Assemblies', desc: 'Fabricated skid structures, equipment mounting frames and integrated mechanical assemblies.', path: '/products/skids-assemblies', image: '/client-03.jpeg', items: [] },
  { code: 'STR', title: 'Structural Fabrication', desc: 'Industrial structural steel, equipment platforms, walkways, pipe racks, staircases and access structures.', path: '/products/structural-fabrication', image: '/client-04.jpeg', items: [] },
  { code: 'MEC', title: 'Mechanical Execution', desc: 'Mechanical erection, equipment installation, site fabrication, plant modification and shutdown works.', path: '/products/mechanical-execution', image: '/client-01.jpeg', items: [] },
];

const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(230,126,34,0.25), transparent 55%)`;
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * 16);
    rotateX.set(-(py - 0.5) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const handleLeave = () => { rotateX.set(0); rotateY.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1100 }} className={className}>
      {children}
      <motion.div style={{ background: glare }} className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
    </motion.div>
  );
};

const Products = () => {
  const particles = useMemo(() => Array.from({ length: 25 }, () => ({ left: Math.random() * 100, top: Math.random() * 100, dur: 5 + Math.random() * 6, delay: Math.random() * 5, size: Math.random() > 0.7 ? 3 : 1.5 })), []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-[#050810]">
        <div className="absolute inset-0 z-0">
          <img src="/client-01.jpeg" alt="Industrial" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #0a1428 0%, #050810 50%, #0d1f3d 100%)'; }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.92) 35%, rgba(5,8,16,0.55) 65%, rgba(5,8,16,0.35) 100%)' }} />
          <div className="absolute inset-0 bg-blue-900/25 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

        <motion.div animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px] pointer-events-none z-[2]" />

        {particles.map((p, i) => (
          <motion.div key={i} className="absolute rounded-full bg-blue-200/50 z-[3]" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }} animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }} transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
        ))}

        <div className="container-custom relative z-10 pt-40 pb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <Link to="/" className="text-white/40 hover:text-accent transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-accent font-bold">Products & Services</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-7 h-4 bg-accent" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }} />
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Products & Services</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight mb-8">
              What we <span className="text-accent">fabricate</span> and execute.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              Each capability has its own page with photographs, materials, typical specifications and our execution scope.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* PRODUCTS GRID */}
      <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

        <div className="container-custom relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mb-16">
            <motion.h2 variants={fadeUp} className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight">
              Five core <span className="text-accent">capabilities.</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((prod, i) => (
              <motion.div key={prod.code} variants={fadeUp} className={`group relative ${i === 0 ? 'lg:col-span-2' : ''}`}>
                <TiltCard className="relative h-full">
                  <Link to={prod.path} className="block relative h-full overflow-hidden bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md border border-white/10 group-hover:border-accent/60 transition-all duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(230,126,34,0.35)]">
                    <div className={`relative overflow-hidden bg-[#0a1428] ${i === 0 ? 'h-72 lg:h-80' : 'h-56'}`}>
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover opacity-55 group-hover:opacity-85 group-hover:scale-110 transition-all duration-[900ms]" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #0a1428 0%, #050810 100%)'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-[#0B1420]/60 to-transparent" />
                      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[20deg] transition-transform duration-[1100ms] ease-out pointer-events-none" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-accent/40">
                        <span className="text-accent text-[10px] font-bold tracking-[0.2em]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{prod.code}</span>
                      </div>
                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="text-white text-2xl md:text-3xl font-display font-bold leading-tight">{prod.title}</h3>
                      </div>
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                    </div>

                    <div className={`p-6 md:p-8 ${i === 0 ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}`}>
                      <div>
                        <p className="text-white/60 text-sm leading-relaxed mb-5">{prod.desc}</p>
                        <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                      {i === 0 && prod.items.length > 0 && (
                        <div className="mt-5 lg:mt-0 lg:pl-8 lg:border-l lg:border-white/10">
                          <div className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Includes</div>
                          <div className="grid grid-cols-2 gap-2">
                            {prod.items.map((item, idx) => (
                              <div key={idx} className="text-white/70 text-xs flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#050810] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <motion.div animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-7 h-4 bg-accent" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }} />
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Custom Requirement</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-6">
              We fabricate to
              <br />
              <span className="text-accent">your drawing.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Share your GA drawings, specifications or BOQ — our team will respond with a scope-based approach and quotation.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide group" style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}>
                <span>Send an Enquiry</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/industries" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm hover:bg-white/5 hover:border-accent transition-all" style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}>
                <span>View Industries</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Products;