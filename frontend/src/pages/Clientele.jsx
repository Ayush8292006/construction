import { useRef, useMemo, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
  animate,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle,
  FileText,
  Factory,
  FlaskConical,
  Pill,
  HardHat,
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
  visible: { transition: { staggerChildren: 0.09 } },
};

const clipBtn =
  'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)';

/* ============================================================
   CLIENT DATA (images nahi — sirf placeholder tiles)
   ============================================================ */
const clients = [
  { id: 1, name: 'Client 01', viaContractor: false },
  { id: 2, name: 'Client 02', viaContractor: false },
  { id: 3, name: 'Client 03', viaContractor: false },
  { id: 4, name: 'Client 04', viaContractor: true },
  { id: 5, name: 'Client 05', viaContractor: false },
  { id: 6, name: 'Client 06', viaContractor: false },
  { id: 7, name: 'Client 07', viaContractor: false },
  { id: 8, name: 'Client 08', viaContractor: true },
  { id: 9, name: 'Client 09', viaContractor: false },
  { id: 10, name: 'Client 10', viaContractor: false },
  { id: 11, name: 'Client 11', viaContractor: false },
  { id: 12, name: 'Client 12', viaContractor: true },
];

const stats = [
  { Icon: Building2, count: 25, suffix: '+', label: 'Client Organisations' },
  { Icon: FlaskConical, text: 'Chemical', label: 'Bulk & Fine Plants' },
  { Icon: Pill, text: 'Pharma', label: 'Regulated Facilities' },
  { Icon: HardHat, text: 'EPC', label: 'Project Partners' },
];

/* ============================================================
   TILT WRAPPER — mouse se 3D rotate + glare
   ============================================================ */
const Tilt = ({ children, className = '', max = 14, glare = true }) => {
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
   COUNT-UP NUMBER
   ============================================================ */
const CountUp = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(0);
  const rounded = useTransform(val, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const c = animate(val, to, { duration: 2, ease: 'easeOut' });
      return c.stop;
    }
  }, [inView, to, val]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

/* ============================================================
   3D CLIENT CAROUSEL RING (hero) — images ke bina
   ============================================================ */
const ClientRing = () => {
  const count = 8;
  const radius = 270;

  return (
    <div
      className="relative w-full h-[420px] flex items-center justify-center"
      style={{ perspective: 1100 }}
    >
      <div className="absolute w-72 h-72 rounded-full bg-accent/25 blur-[100px]" />

      <motion.div
        className="relative"
        style={{
          width: 150,
          height: 190,
          transformStyle: 'preserve-3d',
          rotateX: -12,
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-accent/50 bg-[#0a1428]/70 backdrop-blur-sm"
            style={{
              transform: `rotateY(${(360 / count) * i}deg) translateZ(${radius}px)`,
              backfaceVisibility: 'visible',
              boxShadow: '0 0 40px -10px rgba(59,130,246,0.5)',
            }}
          >
            <Building2 size={34} className="text-accent" strokeWidth={1.5} />
            <span
              className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Client {String(i + 1).padStart(2, '0')}
            </span>
            <div className="absolute inset-2 border border-white/10" />
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent" />
          </div>
        ))}
      </motion.div>

      {/* floor ring */}
      <motion.div
        className="absolute bottom-6 rounded-full border border-accent/30"
        style={{ width: 560, height: 560, rotateX: 78 }}
      />
    </div>
  );
};

/* ============================================================
   3D CLIENT CARD — logo ki jagah icon + number watermark
   ============================================================ */
const ClientCard = ({ client, index }) => {
  const num = String(client.id).padStart(2, '0');

  return (
    <motion.div variants={fadeUp}>
      <Tilt max={16}>
        <div
          className="group relative min-h-[190px] h-full bg-gradient-to-br from-white/[0.07] to-white/[0.015] backdrop-blur-md border border-white/10 hover:border-accent/60 p-6 flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden shadow-[0_25px_50px_-25px_rgba(0,0,0,0.8)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* big number watermark */}
          <span
            className="absolute -right-2 -top-4 text-[110px] font-extrabold leading-none text-white/[0.04] group-hover:text-accent/10 transition-colors duration-500 select-none"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            {num}
          </span>

          {/* shine sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />

          {/* corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

          {/* floating icon */}
          <motion.div
            className="relative w-16 h-16 bg-accent/10 border border-accent/30 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_35px_rgba(120,180,255,0.55)] flex items-center justify-center mb-4 transition-all duration-300"
            style={{ transform: 'translateZ(50px)' }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3 + (index % 4) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.12,
            }}
          >
            <Building2
              size={28}
              className="text-accent group-hover:text-white transition-colors"
              strokeWidth={2}
            />
          </motion.div>

          <span
            className="relative text-white/80 group-hover:text-white font-bold text-sm tracking-[0.12em] uppercase transition-colors"
            style={{
              fontFamily: 'Oswald, sans-serif',
              transform: 'translateZ(30px)',
            }}
          >
            {client.name}
          </span>

          {client.viaContractor && (
            <span
              className="relative mt-2 px-2 py-0.5 border border-accent/40 text-[9px] text-accent/90 tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                transform: 'translateZ(20px)',
              }}
            >
              via EPC contractor
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        </div>
      </Tilt>
    </motion.div>
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
   CLIENTELE PAGE
   ============================================================ */
const Clientele = () => {
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

  /* vendor card tilt (alag, kyunki layered stack hai) */
  const stackRef = useRef(null);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const stackRotX = useSpring(useTransform(sy, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const stackRotY = useSpring(useTransform(sx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <>
      {/* ===== SCROLL PROGRESS ===== */}
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
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
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
            <span className="text-accent font-bold">Our Clientele</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-6"
              style={{ perspective: 1000 }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div
                  className="w-7 h-4 bg-accent"
                  style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
                />
                <span
                  className="text-accent text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Our Clientele
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-tight mb-8"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                Trusted by plants,
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
                  EPC partners
                </motion.span>{' '}
                and industry.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl"
              >
                Organisations we have worked for, directly and through EPC
                contractors — across chemical, pharmaceutical, specialty
                chemical and process manufacturing plants.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
              className="hidden lg:block lg:col-span-6"
            >
              <ClientRing />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* ============================================================
          SECTION 2 — STATS (3D tilt + counters)
          ============================================================ */}
      <section className="relative py-20 bg-[#0B1420] overflow-hidden">
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
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/10 blur-[100px] pointer-events-none" />

        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ perspective: 1200 }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Tilt max={14}>
                  <div
                    className="group relative h-full bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-accent/60 p-7 text-center transition-colors shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                    <div
                      className="w-12 h-12 mx-auto mb-4 bg-accent/10 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all"
                      style={{ transform: 'translateZ(45px)' }}
                    >
                      <stat.Icon
                        size={20}
                        className="text-accent group-hover:text-white transition-colors"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div
                      className="text-3xl md:text-4xl font-extrabold text-white mb-2 group-hover:text-accent transition-colors"
                      style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        transform: 'translateZ(35px)',
                      }}
                    >
                      {stat.count ? (
                        <CountUp to={stat.count} suffix={stat.suffix} />
                      ) : (
                        stat.text
                      )}
                    </div>
                    <div
                      className="text-accent/80 text-[10px] font-bold tracking-[0.25em] uppercase"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        transform: 'translateZ(20px)',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — CLIENT GRID (no images)
          ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[110px] pointer-events-none"
        />

        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="max-w-3xl mb-14"
            style={{ perspective: 1000 }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div
                className="w-7 h-4 bg-accent"
                style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
              />
              <span
                className="text-accent text-xs font-bold tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Client Organisations
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
            >
              Organisations we've{' '}
              <span className="text-accent">worked with.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            style={{ perspective: 1400 }}
          >
            {clients.map((client, i) => (
              <ClientCard key={client.id} client={client} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex items-start gap-3 p-5 bg-white/[0.03] border border-white/10 max-w-3xl"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-accent/20 border border-accent/50 flex items-center justify-center mt-0.5">
              <span className="text-accent font-bold text-xs">i</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Client names are shown only with approval. Where our work was
              through a contractor, the tile is marked "via EPC contractor".
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — VENDOR REGISTRATION CTA (3D layered stack)
          ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(#0A1F44 1px, transparent 1px),
              linear-gradient(90deg, #0A1F44 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"
        />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-6"
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
                <span className="eyebrow !mb-0">Vendor Registration</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                Need our <span className="text-accent">company profile?</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-steel text-lg leading-relaxed mb-8"
              >
                For vendor registration, RFQ submissions and pre-qualification
                documents, share your requirement and we will send our company
                profile, capability statement and compliance documents.
              </motion.p>

              <motion.ul variants={fadeUp} className="space-y-4 mb-10">
                {[
                  'Company profile & capability statement',
                  'Fabrication & workshop infrastructure details',
                  'Quality & safety documentation',
                  'Client references (on request)',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={18}
                      className="text-accent flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-navy text-base font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <motion.div
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden group shadow-[0_20px_40px_-15px_rgba(59,130,246,0.7)]"
                    style={{ clipPath: clipBtn }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Request Company Profile</span>
                    <ArrowRight
                      size={18}
                      className="relative group-hover:translate-x-1 transition-transform"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT — 3D layered stack */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-6 relative"
              style={{ perspective: 1400 }}
            >
              <motion.div
                ref={stackRef}
                onMouseMove={(e) => {
                  const r = stackRef.current.getBoundingClientRect();
                  sx.set((e.clientX - r.left) / r.width - 0.5);
                  sy.set((e.clientY - r.top) / r.height - 0.5);
                }}
                onMouseLeave={() => {
                  sx.set(0);
                  sy.set(0);
                }}
                style={{
                  rotateX: stackRotX,
                  rotateY: stackRotY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative h-[420px] lg:h-[500px]"
              >
                {/* Layer 1 — back */}
                <motion.div
                  className="absolute top-8 left-4 w-[80%] h-[340px] bg-navy/10 border-2 border-accent/20"
                  style={{ transform: 'translateZ(-60px) rotate(-3deg)' }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Layer 2 — middle */}
                <motion.div
                  className="absolute top-10 left-6 w-[80%] h-[340px] bg-navy/40 border-2 border-accent/30"
                  style={{ transform: 'translateZ(-20px) rotate(-1deg)' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Layer 3 — main card */}
                <div
                  className="absolute top-12 left-8 w-[80%] h-[340px] bg-navy border-2 border-accent/40 overflow-hidden shadow-[0_50px_90px_-30px_rgba(10,31,68,0.7)]"
                  style={{ transform: 'translateZ(30px) rotate(2deg)' }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <motion.div
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: ['-150%', '600%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                  />

                  <div className="relative p-8 flex flex-col h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-accent flex items-center justify-center mb-6 shadow-lg shadow-accent/40"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <FileText size={28} className="text-white" strokeWidth={2.5} />
                    </motion.div>

                    <h3 className="text-white font-display font-bold text-2xl mb-3">
                      Company Profile 2024
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                      Complete vendor profile including fabrication
                      capabilities, workshop details, quality systems and
                      project references.
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-accent" />
                        <span
                          className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          Vendor Ready
                        </span>
                      </div>
                      <div
                        className="text-white/40 text-[10px] tracking-[0.15em]"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        PDF · 4.2 MB
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge — sabse aage */}
                <motion.div
                  animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0 right-0 bg-accent p-5 shadow-2xl shadow-accent/50 z-10"
                  style={{ transform: 'translateZ(110px)' }}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={24} className="text-white" />
                    <div>
                      <div className="text-white font-display font-extrabold text-xl leading-none">
                        25+
                      </div>
                      <div
                        className="text-white/80 text-[9px] font-bold tracking-[0.15em] uppercase mt-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Clients
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — CTA
          ============================================================ */}
      <section className="relative py-28 bg-[#050810] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <GridFloor height="70%" />

        {/* rotating 3D rings behind text */}
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
              Want to work with us?
              <br />
              <span className="text-accent">Let's talk.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
            >
              Share your project details, drawings or BOQ — our team will
              respond with a scope-based approach and quotation.
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
                  <span className="relative">Send an Enquiry</span>
                  <ArrowRight
                    size={18}
                    className="relative group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </Link>

              <Link to="/products">
                <motion.div
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm tracking-wide backdrop-blur-sm hover:bg-white/5 hover:border-accent transition-all"
                  style={{ clipPath: clipBtn }}
                >
                  <Factory size={18} />
                  <span>View Capabilities</span>
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

export default Clientele;