import { useRef, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Factory,
  Cog,
  Truck,
  Wrench,
  ClipboardCheck,
  Ruler,
  Flame,
  FileCheck,
  HardHat,
  Trash2,
  Users,
  ShieldCheck,
} from 'lucide-react';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50, rotateX: -14 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const clipBtn =
  'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)';

/* ============================================================
   DATA
   ============================================================ */
const infraItems = [
  {
    Icon: Factory,
    title: 'Workshop & Fabrication',
    desc: 'Dedicated bays for plate work, structural fabrication and vessel assembly.',
  },
  {
    Icon: Cog,
    title: 'Machinery & Equipment',
    desc: 'Plate rolling, cutting, welding and forming equipment maintained for production.',
  },
  {
    Icon: Truck,
    title: 'Material Handling',
    desc: 'Overhead and mobile lifting for heavy component movement within the shop.',
  },
  {
    Icon: Wrench,
    title: 'Fabrication & Assembly Areas',
    desc: 'Separate areas for SS and MS work, plus final assembly and dispatch.',
  },
];

const qualityItems = [
  {
    Icon: ClipboardCheck,
    title: 'Material Identification',
    desc: 'Material identified and traceable where specified — from receipt to dispatch.',
  },
  {
    Icon: Ruler,
    title: 'Inspection & Dimensional Checks',
    desc: 'Fit-up, dimensional and visual checks against approved GA drawings.',
  },
  {
    Icon: Flame,
    title: 'Welding & Fabrication Controls',
    desc: 'Qualified welders, controlled procedures and inspection of weld quality.',
  },
  {
    Icon: FileCheck,
    title: 'Testing & Documentation',
    desc: 'Hydro / leak testing arranged as specified, with inspection records maintained.',
  },
];

const safetyItems = [
  {
    Icon: HardHat,
    title: 'PPE & Protective Equipment',
    desc: 'Helmets, safety shoes, gloves and eye protection on shop floor and site.',
  },
  {
    Icon: Flame,
    title: 'Hot-Work Safety',
    desc: 'Controlled welding, cutting and grinding practice with fire prevention.',
  },
  {
    Icon: Trash2,
    title: 'Housekeeping',
    desc: 'Clean work areas, safe material storage and daily housekeeping routines.',
  },
  {
    Icon: Users,
    title: 'Training & Procedures',
    desc: 'Supervised lifting, safe material handling and workforce safety briefings.',
  },
];

/* ============================================================
   TILT WRAPPER — mouse se 3D rotate + glare
   ============================================================ */
const Tilt = ({ children, className = '', max = 12, glare = true }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });
  const gx = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const gy = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const glareBg = useTransform(
    [gx, gy],
    ([a, b]) =>
      `radial-gradient(circle at ${a} ${b}, rgba(255,255,255,0.18), transparent 55%)`
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
};

/* ============================================================
   MOVING 3D GRID FLOOR
   ============================================================ */
const GridFloor = ({ height = '55%' }) => (
  <div
    className="absolute bottom-0 left-0 right-0 z-[1] overflow-hidden pointer-events-none"
    style={{ height, perspective: 500 }}
  >
    <motion.div
      className="absolute inset-x-[-50%] top-0 h-[200%] opacity-[0.18]"
      style={{
        transform: 'rotateX(62deg)',
        transformOrigin: 'top center',
        backgroundImage: `
          linear-gradient(rgba(120,180,255,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(120,180,255,0.8) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 75%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, transparent 75%)',
      }}
      animate={{ backgroundPositionY: ['0px', '60px'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

/* ============================================================
   HERO 3D CUBE — Quality / Safety / Infrastructure icons
   ============================================================ */
const HeroCube = () => {
  const size = 150;
  const half = size / 2;
  const faces = [
    { Icon: ShieldCheck, t: `rotateY(0deg) translateZ(${half}px)` },
    { Icon: HardHat, t: `rotateY(90deg) translateZ(${half}px)` },
    { Icon: ClipboardCheck, t: `rotateY(180deg) translateZ(${half}px)` },
    { Icon: Factory, t: `rotateY(-90deg) translateZ(${half}px)` },
    { Icon: Ruler, t: `rotateX(90deg) translateZ(${half}px)` },
    { Icon: Flame, t: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div
      className="relative w-[340px] h-[340px] flex items-center justify-center"
      style={{ perspective: 900 }}
    >
      <div className="absolute w-64 h-64 rounded-full bg-accent/25 blur-[90px]" />

      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-300/25"
          style={{
            width: 280 + i * 50,
            height: 280 + i * 50,
            transformStyle: 'preserve-3d',
            rotateX: 70,
          }}
          animate={{ rotateZ: i === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 8, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(120,180,255,0.9)]" />
        </motion.div>
      ))}

      <motion.div
        className="relative"
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [-20, 340], rotateY: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map(({ Icon, t }, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center border border-accent/60 bg-[#0a1428]/60 backdrop-blur-sm"
            style={{ transform: t }}
          >
            <Icon size={44} className="text-accent" strokeWidth={1.5} />
            <div className="absolute inset-2 border border-white/10" />
          </div>
        ))}
        <motion.div
          className="absolute inset-[45px] bg-accent/70 blur-md"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

/* ============================================================
   3D VISUAL PANEL — photo ki jagah (blueprint + scanner + orbit)
   ============================================================ */
const VisualPanel = ({ Icon, caption, chips = [] }) => (
  <Tilt max={7}>
    <div
      className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0f2147] via-[#0a1428] to-[#050810] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.25),transparent_65%)]" />

      {/* scanner line */}
      <motion.div
        className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
        animate={{ top: ['-20%', '110%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* orbit rings */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 700, transformStyle: 'preserve-3d' }}
      >
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-accent/30"
            style={{
              width: 190 + i * 70,
              height: 190 + i * 70,
              rotateX: 72,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateZ: i ? -360 : 360 }}
            transition={{ duration: 14 + i * 6, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(120,180,255,0.9)]" />
          </motion.div>
        ))}

        {/* centre icon block, ghoomta hua */}
        <motion.div
          className="relative w-24 h-24 bg-accent flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.7)]"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}
          animate={{ rotateY: [-25, 25, -25], rotateX: [8, -8, 8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={44} className="text-white" strokeWidth={2} />
          <div className="absolute inset-1 border border-white/30" />
        </motion.div>
      </div>

      {/* floating chips */}
      {chips.map((c, i) => (
        <motion.div
          key={c}
          className="absolute px-3 py-1.5 bg-[#050810]/80 border border-accent/40 backdrop-blur-sm text-[10px] font-bold tracking-[0.2em] uppercase text-white/80"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            top: `${14 + i * 24}%`,
            [i % 2 ? 'right' : 'left']: '6%',
            transform: `translateZ(${40 + i * 12}px)`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.5 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle" />
          {c}
        </motion.div>
      ))}

      {/* caption */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div
          className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          {caption}
        </div>
      </div>

      {/* corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent" />
    </div>
  </Tilt>
);

/* ============================================================
   FEATURE CARD (dark / light)
   ============================================================ */
const FeatureCard = ({ item, index, light = false }) => (
  <motion.div variants={fadeUp}>
    <Tilt max={14}>
      <div
        className={`group relative h-full p-7 overflow-hidden transition-colors duration-500 ${
          light
            ? 'bg-white border border-borderlight hover:border-accent shadow-[0_20px_50px_-25px_rgba(10,31,68,0.35)] hover:shadow-[0_40px_80px_-30px_rgba(10,31,68,0.5)]'
            : 'bg-gradient-to-br from-white/[0.07] to-white/[0.015] backdrop-blur-md border border-white/10 hover:border-accent/60 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.8)]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* number watermark */}
        <span
          className={`absolute -right-1 -top-5 text-[110px] font-extrabold leading-none select-none transition-colors duration-500 ${
            light
              ? 'text-navy/[0.04] group-hover:text-accent/10'
              : 'text-white/[0.04] group-hover:text-accent/10'
          }`}
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* shine */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />

        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

        <motion.div
          className={`relative w-14 h-14 flex items-center justify-center mb-5 transition-all duration-300 ${
            light
              ? 'bg-navy group-hover:bg-accent group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
              : 'bg-accent/10 border border-accent/30 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_35px_rgba(120,180,255,0.55)]'
          }`}
          style={{ transform: 'translateZ(50px)' }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3 + (index % 3) * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2,
          }}
        >
          <item.Icon
            size={24}
            className={
              light
                ? 'text-white'
                : 'text-accent group-hover:text-white transition-colors'
            }
            strokeWidth={2.5}
          />
        </motion.div>

        <h3
          className={`relative text-lg font-display font-bold mb-3 group-hover:text-accent transition-colors ${
            light ? 'text-navy' : 'text-white'
          }`}
          style={{ transform: 'translateZ(32px)' }}
        >
          {item.title}
        </h3>
        <p
          className={`relative text-sm leading-relaxed ${
            light ? 'text-steel' : 'text-white/60'
          }`}
          style={{ transform: 'translateZ(18px)' }}
        >
          {item.desc}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </Tilt>
  </motion.div>
);

/* ============================================================
   SECTION HEADING TAG
   ============================================================ */
const Tag = ({ children }) => (
  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
    <div
      className="w-7 h-4 bg-accent"
      style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
    />
    <span
      className="text-accent text-xs font-bold tracking-[0.3em] uppercase"
      style={{ fontFamily: 'Rajdhani, sans-serif' }}
    >
      {children}
    </span>
  </motion.div>
);

const GridBg = ({ dark = true, size = 80, opacity = 0.04 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: dark
        ? `linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
           linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)`
        : `linear-gradient(#0A1F44 1px, transparent 1px),
           linear-gradient(90deg, #0A1F44 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }}
  />
);

/* ============================================================
   QUALITY SAFETY PAGE
   ============================================================ */
const QualitySafety = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(heroProgress, [0, 0.9], [1, 0]);

  const particles = useMemo(
    () =>
      [...Array(26)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <>
      {/* SCROLL PROGRESS */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100] shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#050810]"
      >
        <GridBg size={60} opacity={0.05} />
        <GridFloor />

        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], x: [0, 60, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-300/50 z-[2]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -50, 0], opacity: [0, 0.9, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="container-custom relative z-10 pt-40 pb-20 w-full"
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
            <span className="text-accent font-bold">
              Quality, Safety & Infrastructure
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-7"
              style={{ perspective: 1000 }}
            >
              <Tag>Quality · Safety · Infrastructure</Tag>

              <motion.h1
                variants={fadeUp}
                className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-tight mb-8"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                Our workshop, our
                <br />
                <motion.span
                  className="text-accent inline-block"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0)',
                      '0 0 30px rgba(120,180,255,0.7)',
                      '0 0 10px rgba(255,255,255,0)',
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  checks,
                </motion.span>{' '}
                our people.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                The workshop where we fabricate, the quality checks we run, and
                the practices that protect the people who do the work.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
              className="hidden lg:flex lg:col-span-5 justify-center"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HeroCube />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* ============================================================
          SECTION 2 — INFRASTRUCTURE
          ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
        <GridBg />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[110px] pointer-events-none"
        />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-5"
              style={{ perspective: 1000 }}
            >
              <Tag>Infrastructure</Tag>

              <motion.h2
                variants={fadeUp}
                className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-8"
              >
                Workshop &
                <br />
                <span className="text-accent">fabrication facilities.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed mb-8"
              >
                Our workshop is set up for plate work, structural fabrication
                and vessel assembly, with handling equipment to move heavy
                components safely.
              </motion.p>

              <motion.div variants={fadeUp}>
                <VisualPanel
                  Icon={Factory}
                  caption="Workshop · Plate · Vessel Assembly"
                  chips={['Plate Work', 'Structural', 'Assembly']}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ perspective: 1400 }}
            >
              {infraItems.map((item, i) => (
                <FeatureCard key={i} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — QUALITY
          ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden">
        <GridBg dark={false} opacity={0.03} />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"
        />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ perspective: 1400 }}
            >
              {qualityItems.map((item, i) => (
                <FeatureCard key={i} item={item} index={i} light />
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-5 order-1 lg:order-2"
              style={{ perspective: 1000 }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <motion.div
                  className="h-px bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <span className="eyebrow !mb-0">Quality</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-8"
              >
                Checked before
                <br />
                it <span className="text-accent">leaves the shop.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-steel text-lg leading-relaxed mb-8"
              >
                Every fabrication goes through dimensional checks, weld
                inspection and material identification before dispatch — with
                documentation maintained for the project record.
              </motion.p>

              <motion.ul variants={stagger} className="space-y-4 mb-10">
                {[
                  'Material identification and traceability',
                  'Dimensional and fit-up checks against GA drawings',
                  'Welding and fabrication quality controls',
                  'Hydro / leak testing arranged as per project',
                  'Inspection records and project documentation',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-3 group cursor-default"
                  >
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-accent flex items-center justify-center mt-0.5 group-hover:bg-accent transition-colors">
                      <Check
                        size={11}
                        className="text-accent group-hover:text-white transition-colors"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-navy text-sm font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp}>
                <VisualPanel
                  Icon={ClipboardCheck}
                  caption="Inspection · Fit-up · Weld Quality"
                  chips={['Dimensional', 'Weld Check', 'Hydro Test']}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — SAFETY
          ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
        <GridBg />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[130px] pointer-events-none"
        />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-5"
              style={{ perspective: 1000 }}
            >
              <Tag>Safety & Workforce</Tag>

              <motion.h2
                variants={fadeUp}
                className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-8"
              >
                Every worker
                <br />
                goes <span className="text-accent">home safe.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed mb-8"
              >
                We take workplace safety seriously — for every worker, in the
                shop and at site. Our workforce is our most important
                infrastructure, and we protect it with discipline.
              </motion.p>

              <motion.div variants={fadeUp}>
                <VisualPanel
                  Icon={ShieldCheck}
                  caption="PPE · Hot-Work · Safe Handling"
                  chips={['PPE', 'Hot-Work', 'Briefings']}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ perspective: 1400 }}
            >
              {safetyItems.map((item, i) => (
                <FeatureCard key={i} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — CTA
          ============================================================ */}
      <section className="relative py-28 bg-[#050810] overflow-hidden">
        <GridBg size={60} opacity={0.05} />
        <GridFloor height="70%" />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: 900 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-accent/25"
              style={{
                width: 360 + i * 140,
                height: 360 + i * 140,
                transformStyle: 'preserve-3d',
                rotateX: 70,
              }}
              animate={{ rotateZ: i % 2 ? -360 : 360 }}
              transition={{
                duration: 20 + i * 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_14px_rgba(120,180,255,0.9)]" />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[130px] pointer-events-none"
        />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto"
            style={{ perspective: 1000 }}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-3 mb-6"
            >
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
              className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
            >
              Want to inspect
              <br />
              our <span className="text-accent">workshop?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
            >
              We welcome plant owners, EPC contractors and procurement teams to
              visit our facility. Get in touch to schedule a visit.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact">
                <motion.div
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden group shadow-[0_20px_50px_-15px_rgba(59,130,246,0.8)]"
                  style={{ clipPath: clipBtn }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Visit</span>
                  <ArrowRight
                    size={18}
                    className="relative group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </Link>

              <Link to="/clientele">
                <motion.div
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm tracking-wide backdrop-blur-sm hover:bg-white/5 hover:border-accent transition-all"
                  style={{ clipPath: clipBtn }}
                >
                  <span>View Clientele</span>
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default QualitySafety;