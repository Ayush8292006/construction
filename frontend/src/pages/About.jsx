import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useInView,
  animate,
} from 'framer-motion';
import {
  ArrowRight, Award, Users, Factory, Target, ShieldCheck, Clock, Wrench,
  CheckCircle2,
} from 'lucide-react';

/* ============================================================
   PALETTE
   ============================================================ */
const C = {
  ink: '#1C1C1F',
  inkDeep: '#121214',
  stone: '#E2DDD3',
  stoneDark: '#D6D0C4',
  stoneCard: '#EFEBE4',
  soft: '#4B4741',
  orange: '#E67E22',
  orangeText: '#A8480A',
};

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const inView = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
  variants: stagger,
};

/* ============================================================
   SHARED PIECES
   ============================================================ */
const Eyebrow = ({ children, dark = false }) => (
  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
    <span className="w-10 h-[2px]" style={{ background: C.orange }} />
    <span
      className="text-xs font-bold tracking-[0.25em] uppercase"
      style={{ fontFamily: 'Rajdhani, sans-serif', color: dark ? C.orange : C.orangeText }}
    >
      {children}
    </span>
  </motion.div>
);

const BTN = {
  primary: 'text-white hover:text-[#1C1C1F] border-transparent',
  outlineDark: 'text-[#1C1C1F] hover:text-white border-[#1C1C1F]/40',
  outlineLight: 'text-white hover:text-[#1C1C1F] border-white/30',
};
const SWEEP = { primary: '#fff', outlineDark: C.ink, outlineLight: '#fff' };

const Btn = ({ to, children, variant = 'primary', arrow = false }) => (
  <Link
    to={to}
    className={`group relative inline-flex items-center gap-3 px-8 py-4 border-2 overflow-hidden font-bold text-sm tracking-wide transition-colors duration-300 ${BTN[variant]}`}
    style={variant === 'primary' ? { background: 'linear-gradient(90deg,#F08A2C,#D9620F)' } : undefined}
  >
    <span
      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      style={{ background: SWEEP[variant] }}
    />
    <span className="relative">{children}</span>
    {arrow && <ArrowRight size={18} className="relative group-hover:translate-x-1.5 transition-transform" />}
  </Link>
);

/* ============================================================
   SPLIT TEXT
   ============================================================ */
const SplitText = ({ text, delay = 0, color = '#fff', hover = C.orange }) => {
  const reduce = useReducedMotion();
  if (reduce) return <span style={{ color }}>{text}</span>;
  return (
    <span className="inline-block" style={{ perspective: '700px' }} aria-label={text}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block cursor-default"
              style={{ color, transformOrigin: '50% 100%' }}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: delay + (wi * 5 + ci) * 0.035, ease: EASE }}
              whileHover={{ y: -10, rotateZ: -4, color: hover, transition: { duration: 0.15 } }}
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
   3D TILT CARD
   ============================================================ */
const TiltCard = ({ children, className = '', max = 6, glare = 'rgba(230,126,34,0.12)' }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(300px circle at ${gx}% ${gy}%, ${glare}, transparent 60%)`;

  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max);
    rx.set(-(py - 0.5) * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: '900px' }} className="h-full">
      <motion.div
        ref={ref}
        variants={fadeUp}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`group relative h-full ${className}`}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{ background: bg }}
        />
        {children}
      </motion.div>
    </div>
  );
};

/* ============================================================
   STAT COUNTER
   ============================================================ */
const StatCounter = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const c = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [isInView, value]);

  return (
    <motion.div ref={ref} variants={fadeUp} className="group text-center lg:text-left">
      <div className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl transition-colors" style={{ color: C.orange }}>
        {n}
        {suffix}
      </div>
      <div className="text-xs md:text-sm mt-2 tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>
        {label}
      </div>
    </motion.div>
  );
};

/* ============================================================
   ABOUT PAGE
   ============================================================ */
const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const mx = useMotionValue(25);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(230,126,34,0.12), transparent 60%)`;

  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: C.ink }}
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img
            src="/about-hero.jpeg"
            alt="Workshop"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #1C1C1F 0%, rgba(28,28,31,0.9) 40%, rgba(28,28,31,0.4) 75%, rgba(28,28,31,0.7) 100%)',
            }}
          />
        </motion.div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0.06,
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, transparent 75%)',
          }}
        />

        {/* Spotlight */}
        <motion.div
          style={{ background: spotlight }}
          className="absolute inset-0 z-[2] pointer-events-none"
        />

        {/* Glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[130px] pointer-events-none z-[3]" />

        <div className="container-custom relative z-10 pt-32 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            <Link to="/" className="text-white/50 hover:text-[#E67E22] transition-colors">Home</Link>
            <span className="text-white/25">/</span>
            <span className="font-bold" style={{ color: C.orange }}>About Us</span>
          </motion.div>

          <div className="max-w-5xl">
            <h1
              className="font-display font-extrabold leading-[1.02] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 6.5rem)' }}
            >
              <div><SplitText text="An industrial" delay={0.2} /></div>
              <div><SplitText text="fabrication" delay={0.5} /></div>
              <div className="relative inline-block">
                <SplitText text="partner" delay={0.8} color={C.orange} hover="#fff" />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
                  className="absolute -bottom-2 left-0 right-0 h-1 origin-left"
                  style={{ background: 'linear-gradient(90deg, #F08A2C, transparent)' }}
                />
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-10"
            >
              Fabrication and mechanical execution for chemical, pharmaceutical, specialty chemical,
              process manufacturing and EPC requirements.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { value: 15, suffix: '+', label: 'Years Experience' },
                { value: 200, suffix: '+', label: 'Projects Delivered' },
                { value: 3, suffix: '', label: 'Core Industries' },
                { value: 24, suffix: '/7', label: 'Site Support' },
              ].map((s, i) => (
                <div key={i} className="text-left">
                  <div className="font-display font-extrabold text-2xl md:text-3xl" style={{ color: C.orange }}>
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="text-[10px] md:text-xs mt-1 tracking-[0.2em] uppercase text-white/50" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121214] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.stone} 0%, ${C.stoneDark} 100%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.06,
            backgroundImage: `linear-gradient(${C.ink} 1px, transparent 1px), linear-gradient(90deg, ${C.ink} 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />

        <div
          className="absolute -right-10 top-1/2 -translate-y-1/2 font-display font-extrabold text-[20rem] leading-none select-none pointer-events-none hidden lg:block"
          style={{ WebkitTextStroke: `2px ${C.ink}`, WebkitTextFillColor: 'transparent', opacity: 0.05 }}
        >
          01
        </div>

        <div className="container-custom relative">
          <motion.div {...inView} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Who We Are</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-display font-extrabold leading-[1.05] tracking-tight"
                style={{ color: C.ink, fontSize: 'clamp(2.2rem, 4.4vw, 4.2rem)' }}
              >
                Amit Engineering <span style={{ color: C.orange }}>Construction</span>
              </motion.h2>
            </div>

            <div className="lg:col-span-7">
              <motion.p variants={fadeUp} className="text-lg xl:text-xl leading-relaxed mb-6" style={{ color: C.soft }}>
                Amit Engineering Construction fabricates process equipment and steel structures and
                carries out mechanical erection for process industries. Our work covers storage tanks,
                reactors and vessels, process equipment, piping, structural steel and the site work
                needed to install them.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg xl:text-xl leading-relaxed mb-8" style={{ color: C.soft }}>
                We work from client drawings and specifications, fabricating in our workshop and
                completing installation, fit-up and modification work at site. Our customers include
                plant owners and EPC contractors who need a fabricator that understands process plant
                layouts, tie-ins and shutdown timelines.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="relative pl-6 border-l-4 py-2 mb-8"
                style={{ borderColor: C.orange }}
              >
                <div className="absolute -left-3 top-0 text-6xl font-display font-extrabold opacity-20 select-none" style={{ color: C.orange }}>
                  "
                </div>
                <motion.p
                  className="text-xl xl:text-2xl font-semibold leading-snug relative"
                  style={{ color: C.ink }}
                >
                  We keep our commitments specific: work to the approved drawing, check it before
                  dispatch, and erect it safely.
                </motion.p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Btn to="/products" arrow>View Capabilities</Btn>
                <Btn to="/contact" variant="outlineDark">Contact Us</Btn>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: C.inkDeep }}>
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative">
          <motion.div {...inView} className="max-w-4xl mb-14">
            <Eyebrow dark>Our Capabilities</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
            >
              Shop fabrication and site execution{' '}
              <span className="text-accent">under one team.</span>
            </motion.h2>
          </motion.div>

          <motion.div {...inView} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Factory, title: 'Tanks & Vessels', desc: 'MS and SS storage tanks, reactors, vessels and process equipment.' },
              { icon: Wrench, title: 'Process Piping', desc: 'MS & SS piping, utility lines, spools and pipe supports.' },
              { icon: Target, title: 'Structural Steel', desc: 'Equipment structures, platforms, staircases, pipe racks and sheds.' },
              { icon: ShieldCheck, title: 'Mechanical Erection', desc: 'Equipment installation, fit-up and site modification works.' },
              { icon: Clock, title: 'Shutdown Works', desc: 'Maintenance fabrication and shutdown execution under tight timelines.' },
              { icon: Award, title: 'Custom Fabrication', desc: 'Bespoke fabrication to client drawings, specifications and BOQs.' },
            ].map((cap, i) => (
              <TiltCard key={cap.title} className="relative p-8 bg-white/[0.04] border border-white/10 hover:border-accent/60 transition-colors">
                {/* Big number top right */}
                <div
                  className="absolute top-5 right-6 text-5xl font-display font-extrabold select-none leading-none pointer-events-none"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.10)', WebkitTextFillColor: 'transparent' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-accent transition-colors" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-accent transition-colors" />

                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center border border-accent/40 bg-accent/10 group-hover:bg-accent transition-colors duration-300">
                  <cap.icon size={24} strokeWidth={2} className="text-accent group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-white text-xl mb-3 font-display font-bold group-hover:text-accent transition-colors pr-12">
                  {cap.title}
                </h3>
                <p className="text-white/60 text-sm xl:text-base leading-relaxed">
                  {cap.desc}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: C.ink }}>
        <div className="container-custom">
          <motion.div
            {...inView}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y-2 border-white/15"
          >
            {[
              { value: 15, suffix: '+', label: 'Years of Experience' },
              { value: 200, suffix: '+', label: 'Projects Delivered' },
              { value: 3, suffix: '', label: 'Core Industries' },
              { value: 100, suffix: '%', label: 'Drawing-Driven' },
            ].map((s, i) => (
              <StatCounter key={i} {...s} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= WORKING APPROACH ================= */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: C.stoneDark }}>
        <div className="container-custom relative">
          <motion.div {...inView} className="max-w-4xl mb-14">
            <Eyebrow>Our Working Approach</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold leading-[1.05] tracking-tight"
              style={{ color: C.ink, fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
            >
              From drawing to <span style={{ color: C.orange }}>commissioning support</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-start">
            <motion.div {...inView}>
              {[
                { n: '01', title: 'Drawing & Scope Review', desc: 'We study GA drawings, specifications and BOQs and clarify open points before quoting.' },
                { n: '02', title: 'Material Planning', desc: 'Plates, pipes and sections are procured to specification and identified on receipt.' },
                { n: '03', title: 'Fabrication', desc: 'Cutting, rolling, fit-up and welding in the workshop under supervision.' },
                { n: '04', title: 'Inspection & Testing', desc: 'Dimensional checks, weld inspection and pressure or leak testing as specified.' },
                { n: '05', title: 'Dispatch', desc: 'Finishing, protection and safe loading for transport to site.' },
                { n: '06', title: 'Erection & Installation', desc: 'Lifting, alignment and installation at site, with support during commissioning.' },
              ].map((s) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="group flex gap-6 py-6 border-b border-[#1C1C1F]/15 hover:border-accent transition-colors"
                >
                  <div className="font-display font-extrabold text-3xl text-[#1C1C1F]/25 group-hover:text-accent transition-colors w-12 flex-shrink-0">
                    {s.n}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg xl:text-xl mb-2 group-hover:text-[#A8480A] transition-colors" style={{ color: C.ink }}>
                      {s.title}
                    </h4>
                    <p className="text-sm xl:text-base leading-relaxed" style={{ color: C.soft }}>{s.desc}</p>
                  </div>
                  <ArrowRight size={20} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: C.orange }} />
                </motion.div>
              ))}
            </motion.div>

            {/* IMAGE — Fixed aspect ratio + offset border */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative lg:sticky lg:top-32 lg:self-start"
            >
              {/* Offset border */}
              <div
                className="absolute -top-3 -right-3 w-full h-full border-2 pointer-events-none"
                style={{ borderColor: C.orange }}
              />

              <div className="relative aspect-[4/5] overflow-hidden" style={{ background: C.ink }}>
                <img
                  src="/about-process.jpeg"
                  alt="Fabrication process"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-accent" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-accent" />

                {/* Floating badge 1 — bottom left */}
                <div
                  className="absolute bottom-6 left-6 p-5 shadow-2xl max-w-[200px]"
                  style={{ background: C.stoneCard }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-accent/15 flex-shrink-0">
                      <Users size={18} style={{ color: C.orange }} />
                    </div>
                    <div>
                      <div className="text-xl font-display font-extrabold leading-none" style={{ color: C.ink }}>Skilled</div>
                      <div className="text-[10px] tracking-wider uppercase mt-1" style={{ color: C.soft }}>Workforce</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge 2 — top right */}
                <div
                  className="absolute top-6 right-6 p-4 shadow-2xl"
                  style={{ background: C.ink }}
                >
                  <div className="text-[10px] tracking-wider uppercase mb-1" style={{ color: C.orange }}>On-Time</div>
                  <div className="text-white font-display font-bold text-base whitespace-nowrap">Execution</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= COMMITMENT ================= */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: C.stone }}>
        <div className="container-custom">
          <motion.div {...inView} className="max-w-4xl mb-14">
            <Eyebrow>Our Commitment</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold leading-[1.05] tracking-tight mb-4"
              style={{ color: C.ink, fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
            >
              What we <span style={{ color: C.orange }}>guarantee</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg xl:text-xl" style={{ color: C.soft }}>
              Three things we don't compromise on — quality, safety, and schedule.
            </motion.p>
          </motion.div>

          <motion.div {...inView} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Quality You Can Inspect',
                desc: 'Dimensional checks, weld inspection and material identification at every stage.',
                points: ['Material traceability', 'Fit-up checks', 'Testing documentation'],
              },
              {
                icon: Users,
                title: 'Workforce Safety First',
                desc: 'PPE, safe hot-work practice and housekeeping for every worker, in the shop and at site.',
                points: ['Full PPE compliance', 'Hot-work controls', 'Daily safety briefings'],
              },
              {
                icon: Clock,
                title: 'Execution On Schedule',
                desc: 'Planned fabrication sequences that keep site erection and shutdown windows on time.',
                points: ['Production planning', 'Milestone tracking', 'Dispatch discipline'],
              },
            ].map((item, i) => (
              <TiltCard
                key={item.title}
                className="relative p-8 border border-[#1C1C1F]/10 hover:border-accent hover:shadow-2xl transition-all duration-300"
                max={5}
                glare="rgba(230,126,34,0.10)"
              >
                <div className="absolute inset-0 -z-10" style={{ background: C.stoneCard }} />

                {/* Big outline number top right */}
                <div
                  className="absolute top-4 right-5 text-6xl font-display font-extrabold select-none leading-none pointer-events-none"
                  style={{ WebkitTextStroke: `1.5px ${C.orange}`, WebkitTextFillColor: 'transparent', opacity: 0.15 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon top left */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-[#1C1C1F] group-hover:bg-accent transition-colors duration-300">
                  <item.icon size={26} strokeWidth={2} className="text-white" />
                </div>

                <h3 className="text-lg xl:text-xl mb-3 font-display font-bold pr-10" style={{ color: C.ink }}>
                  {item.title}
                </h3>
                <p className="text-sm xl:text-base leading-relaxed mb-5" style={{ color: C.soft }}>
                  {item.desc}
                </p>
                <ul className="space-y-2.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
                      <span className="text-sm font-medium" style={{ color: C.ink }}>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: C.ink }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.05,
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #E67E22, transparent)' }} />

        <div className="container-custom relative z-10 text-center">
          <motion.div {...inView}>
            <motion.div variants={fadeUp} className="flex justify-center">
              <Eyebrow dark>Next Step</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold leading-[1.05] tracking-tight text-white max-w-4xl mx-auto mb-8"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)' }}
            >
              Share your drawing.
              <br />
              <span style={{ color: C.orange }}>We'll review the scope.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg xl:text-xl max-w-3xl mx-auto mb-10">
              Send us your GA drawings, specifications or BOQ — our team will respond within one
              working day.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Btn to="/contact" arrow>Send an Enquiry</Btn>
              <Btn to="/products" variant="outlineLight">View Products</Btn>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;