import { useRef, useMemo, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  useInView,
  animate,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  FlaskConical,
  Pill,
  Beaker,
  Factory,
  Zap,
  Building2,
  ChevronDown,
} from 'lucide-react';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const wordReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/* ============================================================
   INDUSTRIES DATA
   ============================================================ */
const industries = [
  {
    code: 'CH',
    Icon: FlaskConical,
    title: 'Chemical Industries',
    desc: 'Tanks, reactors, piping and structures for bulk and fine chemical plants, fabricated in materials matched to the process media.',
    support: [
      'Storage and process tanks',
      'Process piping and supports',
      'Equipment structures',
      'Shutdown fabrication',
    ],
    image: '/client-01.jpeg',
  },
  {
    code: 'PH',
    Icon: Pill,
    title: 'Pharmaceutical Industries',
    desc: 'Stainless steel vessels, reactors and piping with finishes suited to cleanable, regulated production areas.',
    support: [
      'SS reactors and vessels',
      'SS process piping',
      'Equipment installation in clean areas',
      'Plant modification works',
    ],
    image: '/client-02.jpeg',
  },
  {
    code: 'SC',
    Icon: Beaker,
    title: 'Specialty Chemical Industries',
    desc: 'Equipment for batch processes that need careful material selection and nozzle layouts.',
    support: [
      'Agitated reactors',
      'Receivers and condensers',
      'Custom process equipment',
      'Pipe spools',
    ],
    image: '/client-03.jpeg',
  },
  {
    code: 'PM',
    Icon: Factory,
    title: 'Process Manufacturing',
    desc: 'Structures, sheds, platforms and utility equipment that keep production lines running.',
    support: [
      'Industrial sheds',
      'Platforms and walkways',
      'Ducting and cyclones',
      'Equipment mounting frames',
    ],
    image: '/client-04.jpeg',
  },
  {
    code: 'UT',
    Icon: Zap,
    title: 'Industrial Utilities',
    desc: 'Tanks, piping and stacks for water, steam, air and effluent services.',
    support: [
      'Utility water tanks',
      'Steam, air and nitrogen lines',
      'Stacks and ducting',
      'Pipe racks',
    ],
    image: '/client-01.jpeg',
  },
  {
    code: 'EPC',
    Icon: Building2,
    title: 'EPC & Project Contractors',
    desc: "A fabrication and erection partner that works to the EPC contractor's drawings, schedule and site rules.",
    support: [
      'Package fabrication to drawing',
      'Site erection manpower',
      'Structural and piping scopes',
      'Documentation for handover',
    ],
    image: '/client-02.jpeg',
  },
];

const whyPoints = [
  {
    n: '01',
    title: 'Material Discipline',
    desc: 'MS, SS304 and SS316 selected to match the process media, with identification and traceability maintained from receipt to dispatch.',
  },
  {
    n: '02',
    title: 'Drawing-Driven Execution',
    desc: 'Every scope is delivered against approved GA drawings and specifications, with clarifications closed before fabrication begins.',
  },
  {
    n: '03',
    title: 'Shutdown-Ready Timelines',
    desc: 'Fabrication sequences and dispatch schedules planned around site erection windows and shutdown criticality.',
  },
  {
    n: '04',
    title: 'Workforce Safety, Always',
    desc: 'PPE, hot-work controls and housekeeping maintained for every worker — in the shop and at site.',
  },
];

const stats = [
  { value: 6, suffix: '', label: 'Industry Sectors' },
  { value: 3, suffix: '', label: 'Core Materials · MS / SS304 / SS316' },
  { value: 100, suffix: '%', label: 'Drawing-Driven Scope' },
  { value: 2, suffix: '', label: 'Execution Fronts · Shop + Site' },
];

/* ============================================================
   HELPERS
   ============================================================ */
const hideBrokenImg = (e, fallback) => {
  e.target.style.display = 'none';
  if (fallback) e.target.parentElement.style.background = fallback;
};

const Eyebrow = ({ children, light = false }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-7 h-4 bg-accent"
      style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
    />
    <span
      className={`text-xs font-bold tracking-[0.3em] uppercase ${
        light ? 'text-navy' : 'text-accent'
      }`}
      style={{ fontFamily: 'Rajdhani, sans-serif' }}
    >
      {children}
    </span>
  </div>
);

/* Scroll progress bar — thinner, solid */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent z-[100]"
    />
  );
};

/* Count-up number */
const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {String(val).padStart(to < 10 ? 2 : 1, '0')}
      {suffix}
    </span>
  );
};

/* Magnetic wrapper — subtle */
const Magnetic = ({ children, strength = 0.2 }) => {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   3D TILT CARD — calmer defaults
   ============================================================ */
const TiltCard = ({ children, className = '', max = 6 }) => {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(360px circle at ${gx}% ${gy}%, rgba(230,126,34,0.12), transparent 60%)`;

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * max);
    rotateX.set(-(py - 0.5) * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1100,
      }}
      className={className}
    >
      {children}
      <motion.div
        style={{ background: glare }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
      />
    </motion.div>
  );
};

/* ============================================================
   INDUSTRIES PAGE
   ============================================================ */
const Industries = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const mx = useMotionValue(30);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(230,126,34,0.12), transparent 60%)`;
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const heroWords = ['Industries', 'we', 'serve'];
  const marquee = [...industries, ...industries];

  return (
    <>
      <ScrollProgress />

      {/* SECTION 1 — HERO */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#050810]"
      >
        {/* Parallax background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-105">
          <img
            src="/client-01.jpeg"
            alt="Industrial facility"
            className="w-full h-full object-cover"
            onError={(e) =>
              hideBrokenImg(
                e,
                'linear-gradient(135deg, #0a1428 0%, #050810 50%, #0d1f3d 100%)'
              )
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.92) 35%, rgba(5,8,16,0.55) 65%, rgba(5,8,16,0.35) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
        </motion.div>

        <motion.div
          style={{ background: spotlight }}
          className="absolute inset-0 z-[1] pointer-events-none"
        />

        {/* Static grid */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Static diagonal panel */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[60%] hidden lg:block z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #050810 0%, rgba(5,8,16,0.9) 60%, transparent 100%)',
            clipPath: 'polygon(0 0, 82% 0, 62% 100%, 0 100%)',
          }}
        />

        {/* Single soft glow instead of two pulsing orbs */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[130px] pointer-events-none z-[3]" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-custom relative z-10 pt-44 pb-28"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            <Link to="/" className="text-white/40 hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-accent font-bold">Industries We Serve</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Eyebrow>Industries We Serve</Eyebrow>
            </motion.div>

            <h1
              className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.98] tracking-tight mb-8 flex flex-wrap gap-x-5"
            >
              {heroWords.map((w, i) => (
                <span key={i} className="overflow-hidden inline-block pb-2">
                  <motion.span
                    variants={wordReveal}
                    className={`inline-block origin-bottom ${
                      i === 2 ? 'text-accent' : ''
                    }`}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              Fabrication and mechanical execution for plants where material
              choice, cleanliness and safe erection matter.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Magnetic>
                <a
                  href="#industries-grid"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-white text-sm font-bold tracking-wide shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90"
                  style={{
                    clipPath:
                      'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
                  }}
                >
                  Explore Industries
                  <ChevronDown size={18} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue — subtle, single direction */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* STATS STRIP */}
      <section className="relative bg-[#0B1420] -mt-1 z-10">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 border-y border-white/10"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative px-6 py-8 lg:py-10 border-r border-white/10 last:border-r-0 overflow-hidden"
              >
                <div className="relative text-4xl lg:text-5xl font-display font-extrabold text-white">
                  <Counter to={s.value} suffix={s.suffix} />
                  <span className="text-accent">.</span>
                </div>
                <div
                  className="relative mt-2 text-[11px] tracking-[0.2em] uppercase text-white/50"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {s.label}
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE — calmer, smaller, slower */}
      <section className="relative bg-[#0B1420] py-6 overflow-hidden border-b border-white/5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap w-max"
        >
          {marquee.map((ind, i) => (
            <div key={i} className="flex items-center gap-12">
              <span
                className="text-lg md:text-xl font-display font-semibold text-transparent uppercase tracking-[0.18em]"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.20)' }}
              >
                {ind.title}
              </span>
              <span className="w-1.5 h-1.5 bg-accent/50 rotate-45" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2 — INDUSTRIES GRID */}
      <section
        id="industries-grid"
        className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Single static glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="max-w-3xl mb-16"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Eyebrow>Six Industries</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
            >
              Where our fabrication{' '}
              <span className="text-accent">goes to work.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {industries.map((ind) => (
              <motion.div key={ind.code} variants={fadeUp} className="group relative">
                <TiltCard className="relative h-full" max={5}>
                  <div className="relative h-full overflow-hidden bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md border border-white/10 group-hover:border-accent/60 transition-all duration-500">
                    <div className="relative h-52 overflow-hidden bg-[#0a1428]">
                      <img
                        src={ind.image}
                        alt={ind.title}
                        className="w-full h-full object-cover opacity-55 group-hover:opacity-85 group-hover:scale-105 transition-all duration-[900ms]"
                        onError={(e) =>
                          hideBrokenImg(
                            e,
                            'linear-gradient(135deg, #0a1428 0%, #050810 100%)'
                          )
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-[#0B1420]/60 to-transparent" />

                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-accent/40">
                        <span
                          className="text-accent text-[10px] font-bold tracking-[0.2em]"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          {ind.code}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="text-white text-xl font-display font-bold leading-tight">
                          {ind.title}
                        </h3>
                      </div>

                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                    </div>

                    <div className="p-6">
                      <p className="text-white/60 text-sm leading-relaxed mb-5">
                        {ind.desc}
                      </p>

                      <div className="border-t border-white/10 pt-4">
                        <h4
                          className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          How we support
                        </h4>
                        <ul className="space-y-2.5">
                          {ind.support.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 group/item"
                            >
                              <div className="w-3.5 h-3.5 border border-accent flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-accent transition-colors">
                                <Check
                                  size={9}
                                  className="text-accent group-hover/item:text-white transition-colors"
                                  strokeWidth={3}
                                />
                              </div>
                              <span className="text-white/65 text-xs group-hover/item:text-white transition-colors">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </div>

                  <div
                    className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-xl shadow-accent/40 z-30 transition-transform duration-300 group-hover:rotate-3"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <ind.Icon size={24} className="text-white" strokeWidth={2.2} />
                    <div className="absolute inset-0 border border-white/25" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — WHY INDUSTRIES CHOOSE US */}
      <section className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(#0A1F44 1px, transparent 1px),
              linear-gradient(90deg, #0A1F44 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Static orb instead of animated */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[110px] pointer-events-none" />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-5 lg:sticky lg:top-32 self-start"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-accent" />
                <span className="eyebrow !mb-0">Why Industries Choose Us</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-8"
              >
                Built for plants where{' '}
                <span className="text-accent">precision</span> is not optional.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-steel text-lg leading-relaxed mb-10"
              >
                We understand that in chemical, pharma and process plants, every
                weld, material certificate and fit-up tolerance matters. Our
                fabrication and execution discipline is built around that reality.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="relative h-56 overflow-hidden border border-borderlight bg-navy/5 group"
                style={{
                  clipPath:
                    'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
                }}
              >
                <img
                  src="/client-03.jpeg"
                  alt="Fabrication quality"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                  onError={(e) =>
                    hideBrokenImg(
                      e,
                      'linear-gradient(135deg, #0a1f44 0%, #1a3a6b 100%)'
                    )
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-0 left-0 h-1 w-full bg-accent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-7 space-y-5"
            >
              {whyPoints.map((point) => (
                <motion.div
                  key={point.n}
                  variants={fadeUp}
                  className="group relative flex gap-6 p-7 bg-white border border-borderlight hover:border-accent hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                  <div className="absolute -right-6 -bottom-8 text-[120px] leading-none font-display font-extrabold text-navy/[0.04] select-none group-hover:text-accent/10 transition-colors">
                    {point.n}
                  </div>

                  <div className="flex-shrink-0 relative">
                    <div
                      className="text-4xl font-display font-extrabold transition-transform duration-300 group-hover:scale-105"
                      style={{
                        WebkitTextStroke: '2px #E67E22',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {point.n}
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <h4 className="text-navy font-display font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-steel text-sm leading-relaxed">{point.desc}</p>
                  </div>

                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all relative">
                    <ArrowRight size={20} className="text-accent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="relative py-28 lg:py-36 bg-[#0B1420] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/client-04.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-25"
            onError={(e) => hideBrokenImg(e)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1420] via-[#0B1420]/90 to-[#0B1420]/60" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal hatch pattern — static, no rings */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[45%] hidden lg:block"
          style={{
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            background:
              'repeating-linear-gradient(0deg, rgba(120,80,40,0.4) 0px, rgba(120,80,40,0.4) 1px, rgba(80,60,30,0.5) 1px, rgba(80,60,30,0.5) 8px)',
          }}
        >
          <div className="absolute inset-0 bg-[#0B1420]/40" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-8">
                <Eyebrow>Your Plant</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-white text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight"
              >
                Tell us about
                <br />
                your <span className="text-accent">process requirement.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg mt-8 max-w-lg"
              >
                Share your process details, materials of construction and site
                constraints — our team will respond with a clear execution
                approach.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:pl-16 flex flex-col gap-5 items-start"
            >
              <motion.div variants={fadeUp}>
                <Magnetic>
                  <Link to="/contact">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex items-center gap-3 px-9 py-5 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden group shadow-xl shadow-accent/25"
                      style={{
                        clipPath:
                          'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Send an Enquiry</span>
                      <ArrowRight
                        size={18}
                        className="relative group-hover:translate-x-1 transition-transform"
                      />
                    </motion.div>
                  </Link>
                </Magnetic>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Magnetic>
                  <Link to="/products">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex items-center gap-3 px-9 py-5 border-2 border-white/30 text-white font-bold text-sm tracking-wide hover:bg-white/5 hover:border-accent transition-all backdrop-blur-sm"
                      style={{
                        clipPath:
                          'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                      }}
                    >
                      <span>View Capabilities</span>
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Industries;