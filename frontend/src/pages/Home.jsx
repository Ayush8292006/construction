import { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Factory,
  Wrench,
  Target,
  ShieldCheck,
  Clock,
  Award,
  FlaskConical,
  Pill,
  Beaker,
  Zap,
  Building2,
  FileSearch,
  Hammer,
  Truck,
  HardHat,
  ChevronDown,
} from 'lucide-react';

/* ============================================================
   CONFIG
   ============================================================ */
const heroImages = ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg'];
const SLIDE_MS = 5500;
const EASE = [0.22, 1, 0.36, 1];

const C = {
  bgFrom: '#E2DDD3',
  bgTo: '#CBC4B7',
  ink: '#1C1C1F',
  inkSoft: '#4B4741',
  navyPanel: '#1C1C1F',
  orange: '#E67E22',
  orangeText: '#A8480A',
};

const STATS = [
  { value: 15, suffix: '+', label: 'Years of experience' },
  { value: 200, suffix: '+', label: 'Projects delivered' },
  { value: 3, suffix: '', label: 'Core industries' },
];

const rotatingWords = [
  { text: 'chemical sites' },
  { text: 'pharma units' },
  { text: 'process plants' },
  { text: 'EPC projects' },
];

const tickerItems = [
  'MS Fabrication',
  'SS304',
  'SS316',
  'Storage Tanks',
  'Reactors',
  'Process Piping',
  'Structures',
  'Skids & Assemblies',
  'Shutdown Works',
];

const ANGLE =
  'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)';
const FRAME =
  'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
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

/* ============================================================
   SHARED HELPERS
   ============================================================ */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-[#E67E22] z-[100]"
    />
  );
};

/* Marquee ticker — slower, calmer */
const Marquee = ({ items, duration = 55, className = '' }) => {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-max items-center gap-10 whitespace-nowrap"
      >
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display font-semibold uppercase tracking-[0.18em] text-sm md:text-base">
              {t}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-current opacity-40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* 3D tilt card — calmer defaults */
const TiltCard = ({ children, className = '', max = 6, glare = 'rgba(230,126,34,0.10)' }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(340px circle at ${gx}% ${gy}%, ${glare}, transparent 55%)`;

  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 1.2);
    rx.set(-(py - 0.5) * max * 1.2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className={`group ${className}`}
    >
      {children}
      <motion.div
        style={{ background: bg }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
      />
    </motion.div>
  );
};

/* ============================================================
   SPLIT TEXT — per-character entrance + hover effect retained
   ============================================================ */
const SplitText = ({ text, delay = 0, outline = false }) => {
  const reduce = useReducedMotion();
  const base = outline
    ? { WebkitTextStroke: `1.5px ${C.ink}`, color: 'rgba(230,126,34,0)' }
    : { color: C.ink };

  if (reduce) return <span style={base}>{text}</span>;

  return (
    <span className="inline-block" style={{ perspective: '700px' }} aria-label={text}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block cursor-default"
              style={{ ...base, transformOrigin: '50% 100%' }}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + (wi * 5 + ci) * 0.035,
                ease: EASE,
              }}
              whileHover={{
                y: -10,
                rotateZ: -4,
                color: 'rgba(230,126,34,1)',
                transition: { duration: 0.15 },
              }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < arr.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

/* ============================================================
   ROTATING WORD — single direction, calm
   ============================================================ */
const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % rotatingWords.length), 3200);
    return () => clearInterval(t);
  }, []);

  const current = rotatingWords[index];

  return (
    <span className="relative inline-block align-baseline">
      <span className="invisible whitespace-nowrap">process plants</span>
      <span className="absolute left-0 right-0 -top-1 -bottom-3 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-block whitespace-nowrap"
            style={{ color: C.orange }}
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

/* ============================================================
   MAGNETIC + CTAs — calmer hover shift
   ============================================================ */
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const PrimaryCTA = ({ to, children }) => {
  return (
    <Magnetic>
      <Link
        to={to}
        className="group relative inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-sm tracking-wide overflow-hidden transition-colors"
        style={{ clipPath: ANGLE, background: C.ink }}
      >
        <span
          className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ background: C.orange }}
        />
        <span className="relative">{children}</span>
        <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
      </Link>
    </Magnetic>
  );
};

const SecondaryCTA = ({ to, children }) => (
  <Magnetic>
    <Link
      to={to}
      className="group relative inline-flex items-center gap-3 px-8 py-4 font-semibold text-sm tracking-wide overflow-hidden transition-colors duration-300 group-hover:text-white border"
      style={{ clipPath: ANGLE, background: C.bgFrom, color: C.ink, borderColor: 'rgba(28,28,31,0.25)' }}
    >
      <span
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: C.ink }}
      />
      <span className="relative">{children}</span>
      <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
    </Link>
  </Magnetic>
);

/* ============================================================
   STAT
   ============================================================ */
const Stat = ({ value, suffix, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration: 2,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="group border-l-2 pl-4 transition-colors"
      style={{ borderColor: 'rgba(28,28,31,0.18)' }}
    >
      <div
        className="font-display font-extrabold text-3xl transition-colors group-hover:!text-[#E67E22]"
        style={{ color: C.ink }}
      >
        {n}
        {suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: C.inkSoft }}>
        {label}
      </div>
    </motion.div>
  );
};

/* ============================================================
   HERO SLIDER — no scan line, no orbit rings, no float, no floating tags
   ============================================================ */
const HeroSlider = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c + 1) % heroImages.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current]);

  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.15), transparent 50%)`;

  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      className="relative w-full h-[52vh] lg:h-[72vh] max-h-[680px]"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-8 bg-[#E67E22]/15 blur-[80px]" />

        <div
          className="absolute inset-0"
          style={{
            clipPath: FRAME,
            background: 'linear-gradient(135deg, #E67E22 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.08) 100%)',
          }}
        />
        <div
          className="absolute inset-[2px] bg-[#0E0E10] overflow-hidden"
          style={{ clipPath: FRAME }}
        >
          {heroImages.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={i === current ? `Industrial project ${i + 1}` : ''}
              initial={false}
              animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.08 }}
              transition={{
                opacity: { duration: 1.4, ease: 'easeInOut' },
                scale: { duration: i === current ? 6 : 1.4, ease: 'easeOut' },
              }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.05) 45%)',
            }}
          />
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glare }} />

          {/* Static capability strip — no floating */}
          <div className="absolute bottom-7 left-7 hidden md:flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
            <span className="text-white/70 text-[11px] font-medium tracking-[0.15em] uppercase">
              Tanks · Reactors · Piping · Structures
            </span>
          </div>

          <div className="absolute bottom-7 right-8 flex items-baseline gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white font-display font-bold text-2xl inline-block"
              >
                {String(current + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="text-white/50 text-xs">
              / {String(heroImages.length).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute bottom-9 right-8 translate-y-7 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1 rounded-full bg-white/25 hover:bg-white/50 overflow-hidden"
                style={{ width: i === current ? 44 : 12, transition: 'width 0.4s' }}
              >
                {i === current && (
                  <motion.span
                    key={current}
                    className="absolute inset-y-0 left-0 bg-[#E67E22]"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(25);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(230,126,34,0.14), transparent 60%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.bgFrom} 0%, ${C.bgTo} 100%)` }}
    >
      {/* Static grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: `linear-gradient(${C.ink} 1px, transparent 1px), linear-gradient(90deg, ${C.ink} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, transparent 75%)',
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 pointer-events-none z-[1]"
      />

      {/* Single soft orb */}
      <div className="absolute top-10 left-[8%] w-[320px] h-[320px] rounded-full bg-[#E67E22]/10 blur-[110px] pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_0.85fr] min-h-screen">
        <div className="relative z-30 flex items-center px-6 lg:px-12 xl:px-20 pt-16 pb-12 lg:py-16">
          <div className="w-full max-w-4xl">
            <h1
              className="font-display font-extrabold leading-[1.02] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 6rem)' }}
            >
              <div>
                <SplitText text="Steel," delay={0.2} />
              </div>
              <div>
                <SplitText text="shaped for" delay={0.35} outline />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <RotatingWord />
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="text-lg xl:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: C.inkSoft }}
            >
              Storage tanks, reactors, process equipment, piping and structures — fabricated in our
              workshop and erected at your site for chemical, pharmaceutical and EPC projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4 items-center mb-12"
            >
              <PrimaryCTA to="/contact">Discuss Your Project</PrimaryCTA>
              <SecondaryCTA to="/products">Explore Capabilities</SecondaryCTA>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="grid grid-cols-3 gap-8 max-w-xl"
            >
              {STATS.map((s, i) => (
                <Stat key={s.label} {...s} delay={1.1 + i * 0.12} />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 flex items-center px-8 py-12 lg:px-8 xl:px-12 lg:py-16">
          <div
            className="absolute inset-0 lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
            style={{ background: `linear-gradient(180deg, ${C.navyPanel} 0%, #0D0D0F 100%)` }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: C.orange,
              clipPath: 'polygon(14% 0, calc(14% + 5px) 0, 5px 100%, 0 100%)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative w-full lg:pl-8"
          >
            <HeroSlider />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#ticker"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-6 lg:left-12 z-30 hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase"
        style={{ fontFamily: 'Rajdhani, sans-serif', color: C.inkSoft }}
      >
        <span className="w-10 h-px bg-current" /> Scroll <ChevronDown size={14} />
      </motion.a>
    </section>
  );
};

/* ============================================================
   TICKER BAND — dark, calm
   ============================================================ */
const Ticker = () => (
  <section
    id="ticker"
    className="relative bg-[#1C1C1F] text-white py-4 overflow-hidden border-y border-white/10"
  >
    <Marquee items={tickerItems} duration={55} />
  </section>
);

/* ============================================================
   SECTION 2 — CAPABILITIES
   ============================================================ */
const capabilities = [
  {
    Icon: Factory,
    title: 'Tanks & Process Equipment',
    desc: 'MS & SS storage tanks, reactors, mixing vessels and process equipment.',
    path: '/products/tanks-process-equipment',
  },
  {
    Icon: Wrench,
    title: 'Piping',
    desc: 'MS & SS process piping, utility lines, spools, supports and erection.',
    path: '/products/piping',
  },
  {
    Icon: Target,
    title: 'Structural Fabrication',
    desc: 'Equipment structures, platforms, walkways, pipe racks and staircases.',
    path: '/products/structural-fabrication',
  },
  {
    Icon: ShieldCheck,
    title: 'Skids & Assemblies',
    desc: 'Fabricated skid structures, equipment mounting frames and assemblies.',
    path: '/products/skids-assemblies',
  },
  {
    Icon: Clock,
    title: 'Mechanical Execution',
    desc: 'Erection, installation, site fabrication and shutdown works.',
    path: '/products/mechanical-execution',
  },
  {
    Icon: Award,
    title: 'Custom Fabrication',
    desc: 'Bespoke fabrication to your drawings, specifications and BOQs.',
    path: '/products',
  },
];

const Capabilities = () => (
  <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

    <div className="container-custom relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="max-w-3xl mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="eyebrow !mb-0">Our Capabilities</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
        >
          What we{' '}
          <span className="text-accent">fabricate and execute.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {capabilities.map((cap, i) => (
          <motion.div key={cap.title} variants={fadeUp}>
            <Link to={cap.path} className="block h-full">
              <TiltCard className="relative h-full" max={5}>
                <div className="relative h-full overflow-hidden bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md border border-white/10 group-hover:border-accent/60 p-8 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                  <div
                    className="absolute top-4 right-5 text-6xl font-display font-extrabold select-none transition-all duration-500 group-hover:scale-105"
                    style={{
                      WebkitTextStroke: '1px rgba(255,255,255,0.10)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="h-14 mb-5" />

                  <h3 className="text-white text-lg font-display font-bold mb-3 group-hover:text-accent transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{cap.desc}</p>

                  <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>

                <div
                  className="absolute top-6 left-6 w-14 h-14 bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-xl shadow-accent/30 z-30 transition-transform duration-300 group-hover:rotate-3"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <cap.Icon size={24} className="text-white" strokeWidth={2.2} />
                  <div className="absolute inset-0 border border-white/25" />
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ============================================================
   SECTION 3 — INDUSTRIES
   ============================================================ */
const industries = [
  { code: 'CH', Icon: FlaskConical, title: 'Chemical', desc: 'Tanks, reactors, piping and structures for bulk and fine chemical plants.' },
  { code: 'PH', Icon: Pill, title: 'Pharmaceutical', desc: 'SS vessels, reactors and piping with finishes for cleanable regulated areas.' },
  { code: 'SC', Icon: Beaker, title: 'Specialty Chemical', desc: 'Equipment for batch processes requiring careful material selection.' },
  { code: 'PM', Icon: Factory, title: 'Process Mfg.', desc: 'Structures, sheds, platforms and utility equipment for production lines.' },
  { code: 'UT', Icon: Zap, title: 'Industrial Utilities', desc: 'Tanks, piping and stacks for water, steam, air and effluent services.' },
  { code: 'EPC', Icon: Building2, title: 'EPC Contractors', desc: 'Fabrication and erection partner working to EPC drawings and site rules.' },
];

const IndustriesSection = () => (
  <section className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(#0A1F44 1px, transparent 1px), linear-gradient(90deg, #0A1F44 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
    <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

    <div className="container-custom relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="max-w-3xl mb-14"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="eyebrow !mb-0">Industries We Serve</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
        >
          Where our <span className="text-accent">fabrication</span> goes to work.
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {industries.map((ind) => (
          <motion.div key={ind.code} variants={fadeUp}>
            <TiltCard className="relative h-full" max={5} glare="rgba(230,126,34,0.10)">
              <div className="relative h-full overflow-hidden bg-white border border-borderlight group-hover:border-accent p-7 transition-all duration-500">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                <div className="absolute -right-3 -bottom-6 text-8xl font-display font-extrabold text-navy/[0.04] group-hover:text-accent/10 transition-colors select-none">
                  {ind.code}
                </div>

                <div className="relative flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 flex-shrink-0" />
                  <div className="flex-1 pt-1">
                    <span
                      className="text-[10px] text-accent font-bold tracking-[0.25em] uppercase block mb-1"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {ind.code}
                    </span>
                    <h3 className="text-navy text-lg font-display font-bold group-hover:text-accent transition-colors">
                      {ind.title}
                    </h3>
                  </div>
                </div>
                <p className="relative text-steel text-sm leading-relaxed">{ind.desc}</p>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>

              <div
                className="absolute top-7 left-7 w-14 h-14 bg-navy group-hover:bg-accent flex items-center justify-center shadow-lg shadow-navy/25 z-30 transition-colors duration-300"
                style={{ transform: 'translateZ(40px)' }}
              >
                <ind.Icon size={24} className="text-white" strokeWidth={2.2} />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <Link to="/industries" className="btn btn-outline">
          View All Industries <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ============================================================
   SECTION 4 — HOW WE EXECUTE
   ============================================================ */
const processSteps = [
  {
    Icon: FileSearch,
    title: 'Drawing & Scope Review',
    desc: 'GA drawings, specifications and BOQ reviewed, with clarifications closed before fabrication begins.',
  },
  {
    Icon: Hammer,
    title: 'Workshop Fabrication',
    desc: 'MS and SS fabrication with dimensional checks, weld inspection and material identification.',
  },
  {
    Icon: Truck,
    title: 'Planned Dispatch',
    desc: 'Dispatch sequenced around your erection window and shutdown schedule.',
  },
  {
    Icon: HardHat,
    title: 'Site Erection',
    desc: 'Erection, installation and shutdown works with safe hot-work practice and housekeeping.',
  },
];

const ProcessSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#050810] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accent/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-3xl mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="eyebrow !mb-0">How We Execute</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
          >
            From drawing to <span className="text-accent">site, in four steps.</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute top-8 left-[6%] right-[6%] h-px bg-white/10 hidden lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            className="absolute top-8 left-[6%] right-[6%] h-px bg-gradient-to-r from-accent via-orange-300 to-accent origin-left hidden lg:block"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
          >
            {processSteps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="group relative">
                <div className="relative w-16 h-16 mb-8">
                  <div
                    className="relative w-full h-full flex items-center justify-center bg-[#0B1420] border border-accent/60 group-hover:bg-accent transition-colors duration-300"
                    style={{ clipPath: ANGLE }}
                  >
                    <s.Icon size={26} className="text-accent group-hover:text-white transition-colors" strokeWidth={2.1} />
                  </div>
                  <span
                    className="absolute -top-3 -right-3 text-[11px] font-bold text-accent"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-white text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SECTION 5 — WHY CHOOSE US
   ============================================================ */
function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  );
}

const trustPoints = [
  { Icon: ShieldCheck, title: 'Quality You Can Inspect', desc: 'Dimensional checks, weld inspection and material identification at every stage.' },
  { Icon: UsersIcon, title: 'Workforce Safety First', desc: 'PPE, safe hot-work practice and housekeeping for every worker — in the shop and at site.' },
  { Icon: Clock, title: 'Execution On Schedule', desc: 'Planned fabrication sequences that keep site erection and shutdown windows on time.' },
];

const WhyChooseUs = () => (
  <section className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(#0A1F44 1px, transparent 1px), linear-gradient(90deg, #0A1F44 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
    <div className="absolute bottom-0 left-1/4 w-[460px] h-[460px] rounded-full bg-accent/10 blur-[110px] pointer-events-none" />

    <div className="container-custom relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="eyebrow !mb-0">Why Choose Us</span>
          <div className="w-12 h-px bg-accent" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
        >
          Three things we <span className="text-accent">don't compromise on.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-3 gap-7"
      >
        {trustPoints.map((point, i) => (
          <motion.div key={i} variants={fadeUp}>
            <TiltCard className="relative h-full" max={5} glare="rgba(230,126,34,0.10)">
              <div className="relative h-full bg-white p-9 overflow-hidden border border-borderlight group-hover:border-accent transition-colors duration-500">
                <div className="absolute -right-3 -top-4 text-[110px] leading-none font-display font-extrabold text-navy/[0.04] group-hover:text-accent/10 transition-colors select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="h-16 mb-6" />

                <h3 className="relative text-navy text-xl font-display font-bold mb-4 group-hover:text-accent transition-colors">
                  {point.title}
                </h3>
                <p className="relative text-steel text-sm leading-relaxed">{point.desc}</p>
              </div>

              <div
                className="absolute top-9 left-9 w-16 h-16 bg-gradient-to-br from-navy to-[#14305f] group-hover:from-accent group-hover:to-orange-600 flex items-center justify-center shadow-lg shadow-navy/25 z-30 transition-colors duration-300"
                style={{ transform: 'translateZ(45px)' }}
              >
                <point.Icon size={28} className="text-white" strokeWidth={2} />
                <div className="absolute inset-0 border border-white/15" />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ============================================================
   SECTION 6 — CLIENT STRIP
   ============================================================ */
const ClienteleStrip = () => (
  <section className="relative py-20 bg-white overflow-hidden border-t border-borderlight">
    <div className="container-custom">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-3xl mb-12"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="eyebrow !mb-0">Our Clientele</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-navy text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.05] tracking-tight"
        >
          Organisations we've <span className="text-accent">worked with.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
      >
        {['/client-01.jpeg', '/client-02.jpeg', '/client-03.jpeg', '/client-04.jpeg'].map((logo, i) => (
          <motion.div key={i} variants={fadeUp}>
            <TiltCard className="relative" max={4} glare="rgba(230,126,34,0.10)">
              <div className="relative overflow-hidden bg-[#F5F6F8] border border-borderlight group-hover:border-accent group-hover:bg-white transition-all duration-300 p-8 flex items-center justify-center min-h-[140px]">
                <img
                  src={logo}
                  alt={`Client ${i + 1}`}
                  className="max-h-16 max-w-[120px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Link to="/clientele" className="btn btn-outline">
          View Clientele <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ============================================================
   SECTION 7 — FINAL CTA
   ============================================================ */
const FinalCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#050810] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-10 -bottom-10">
        <img
          src="/home-cta.jpeg"
          alt=""
          className="w-full h-full object-cover opacity-25"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#050810]/80 to-[#050810]" />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-7 h-4 bg-accent"
              style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
            />
            <span
              className="text-accent text-xs font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Next Step
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-white text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Share your drawing.
            <br />
            <span className="text-accent">We'll review the scope.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Send us your GA drawings, specifications or BOQ — our team will respond within one
            working day.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <PrimaryCTA to="/contact">Send an Enquiry</PrimaryCTA>
            <SecondaryCTA to="/products">View Capabilities</SecondaryCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   HOME PAGE
   ============================================================ */
const Home = () => (
  <>
    <ScrollProgress />
    <Hero />
    <Ticker />
    <Capabilities />
    <IndustriesSection />
    <ProcessSection />
    <WhyChooseUs />
    <ClienteleStrip />
    <FinalCTA />
  </>
);

export default Home;