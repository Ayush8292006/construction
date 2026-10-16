import { useState, useRef, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  User,
  Briefcase,
  FileText,
  Upload,
  ExternalLink,
  Globe,
  Wrench,
  Factory,
  Cog,
  Ruler,
} from 'lucide-react';



/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50, rotateX: -12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ============================================================
   CONTACT INFO DATA
   ============================================================ */
const contactInfo = [
  {
    Icon: MapPin,
    label: 'Office Address',
    value: 'Address to be added',
    link: null,
  },
  {
    Icon: Mail,
    label: 'Business Email',
    value: 'enquiry@amitengineering.com',
    link: 'mailto:enquiry@amitengineering.com',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 XXXXX XXXXX',
    link: 'tel:+91XXXXXXXXXX',
  },
  {
    Icon: Clock,
    label: 'Working Hours',
    value: 'Mon–Sat · Hours to be added',
    link: null,
  },
];

// Marquee strip (apne services ke hisaab se edit karein)
const marqueeItems = [
  'Fabrication',
  'SS Storage Tanks',
  'Pressure Vessels',
  'Structural Works',
  'Piping',
  'Erection & Commissioning',
];

/* ============================================================
   TILT CARD — mouse ke saath 3D rotate + glare
   ============================================================ */
const TiltCard = ({ children, className = '', max = 12, glare = true }) => {
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
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18), transparent 55%)`
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
   3D ROTATING CUBE (hero)
   ============================================================ */
const faceBase =
  'absolute inset-0 flex items-center justify-center border border-accent/60 bg-[#0a1428]/60 backdrop-blur-sm';

const Cube3D = () => {
  const size = 150;
  const half = size / 2;
  const faces = [
    { Icon: Cog, t: `rotateY(0deg) translateZ(${half}px)` },
    { Icon: Wrench, t: `rotateY(90deg) translateZ(${half}px)` },
    { Icon: Factory, t: `rotateY(180deg) translateZ(${half}px)` },
    { Icon: Ruler, t: `rotateY(-90deg) translateZ(${half}px)` },
    { Icon: Cog, t: `rotateX(90deg) translateZ(${half}px)` },
    { Icon: Wrench, t: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div
      className="relative w-[340px] h-[340px] flex items-center justify-center"
      style={{ perspective: 900 }}
    >
      {/* glow */}
      <div className="absolute w-64 h-64 rounded-full bg-accent/25 blur-[90px]" />

      {/* orbit rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-300/25"
          style={{
            width: 280 + i * 50,
            height: 280 + i * 50,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: i === 0 ? [70, 70] : [70, 70],
            rotateZ: i === 0 ? 360 : -360,
          }}
          transition={{
            duration: 18 + i * 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        </motion.div>
      ))}

      {/* cube */}
      <motion.div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateX: [-20, 340], rotateY: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map(({ Icon, t }, i) => (
          <div key={i} className={faceBase} style={{ transform: t }}>
            <Icon size={44} className="text-accent" strokeWidth={1.5} />
            <div className="absolute inset-2 border border-white/10" />
          </div>
        ))}
        {/* inner core */}
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
   CONTACT PAGE
   ============================================================ */
const Contact = () => {
  const formRef = useRef(null);
  const heroRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [files, setFiles] = useState([]);

  // Scroll progress bar + hero parallax
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(heroProgress, [0, 0.9], [1, 0]);

  // Particles ek hi baar generate honge (re-render pe jump nahi karenge)
  const particles = useMemo(
    () =>
      [...Array(24)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 5,
      })),
    []
  );

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      formRef.current.reset();
      setFiles([]);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      {/* ===== SCROLL PROGRESS BAR ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100] shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#050810]"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
          <img
            src="/contact-bg.jpeg"
            alt="Industrial facility"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background =
                'linear-gradient(135deg, #0a1428 0%, #050810 50%, #0d1f3d 100%)';
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.9) 40%, rgba(5,8,16,0.55) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
        </motion.div>

        {/* Moving perspective grid floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] z-[1] overflow-hidden pointer-events-none"
          style={{ perspective: 500 }}
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
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 75%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 75%)',
            }}
            animate={{ backgroundPositionY: ['0px', '60px'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Glow orbs */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px] pointer-events-none z-[2]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], x: [0, 60, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-[380px] h-[380px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-[2]"
        />

        {/* Particles */}
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
            <span className="text-accent font-bold">Contact</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-7"
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
                  Get in Touch
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight mb-8"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                Discuss your
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
                  project
                </motion.span>{' '}
                with us.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                Send a general enquiry, or attach drawings, BOQs and
                specifications for a quotation. Our team will respond within one
                working day.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#enquiry-form"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden"
                  style={{
                    clipPath:
                      'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Send Enquiry</span>
                  <Send size={16} className="relative" />
                </a>
                <a
                  href="mailto:enquiry@amitengineering.com"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white/90 hover:border-accent hover:text-accent font-bold text-sm tracking-wide backdrop-blur-sm transition-all"
                >
                  <Mail size={16} />
                  Email Us
                </a>
              </motion.div>
            </motion.div>

            {/* 3D cube */}
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
                <Cube3D />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* ============================================================
          MARQUEE STRIP
          ============================================================ */}
      <div className="relative bg-accent overflow-hidden py-4 z-10">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, i) => (
              <span
                key={i}
                className="flex items-center text-white font-display font-bold text-sm md:text-base tracking-[0.2em] uppercase"
              >
                <span className="px-8">{item}</span>
                <span className="w-2 h-2 bg-white/60 rotate-45" />
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* ============================================================
          SECTION 2 — CONTACT INFO CARDS (3D tilt)
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: 1200 }}
          >
            {contactInfo.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard max={14}>
                  <div
                    className="group relative h-full bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-accent/60 p-7 transition-colors duration-300 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                    {/* Icon floats forward in 3D */}
                    <div
                      className="w-14 h-14 bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(120,180,255,0.5)] transition-all duration-300"
                      style={{ transform: 'translateZ(45px)' }}
                    >
                      <item.Icon
                        size={22}
                        className="text-accent group-hover:text-white transition-colors"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div
                      className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        transform: 'translateZ(30px)',
                      }}
                    >
                      {item.label}
                    </div>

                    <div style={{ transform: 'translateZ(22px)' }}>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-white text-sm font-medium hover:text-accent transition-colors break-words block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white text-sm font-medium break-words">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp + LinkedIn buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366] hover:shadow-[0_10px_40px_-10px_#25D366] transition-all"
            >
              <MessageCircle
                size={18}
                className="text-[#25D366] group-hover:text-white transition-colors"
              />
              <span className="text-[#25D366] group-hover:text-white font-bold text-sm transition-colors">
                Open WhatsApp
              </span>
              <ExternalLink
                size={14}
                className="text-[#25D366] group-hover:text-white transition-colors"
              />
            </motion.a>

            <motion.a
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-blue-500/10 border border-blue-500/40 hover:bg-blue-500 hover:shadow-[0_10px_40px_-10px_#3b82f6] transition-all"
            >
              <Globe
                size={18}
                className="text-blue-400 group-hover:text-white transition-colors"
              />
              <span className="text-blue-400 group-hover:text-white font-bold text-sm transition-colors">
                LinkedIn
              </span>
              <ExternalLink
                size={14}
                className="text-blue-400 group-hover:text-white transition-colors"
              />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — FORM + MAP
          ============================================================ */}
      <section
        id="enquiry-form"
        className="relative py-24 lg:py-32 bg-[#F5F6F8] overflow-hidden"
      >
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
        {/* soft floating blobs */}
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none"
        />

        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mb-14"
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
              <span className="eyebrow !mb-0">Send an Enquiry</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-navy text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
            >
              Tell us what you need.{' '}
              <span className="text-accent">We'll get back.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ===== FORM ===== */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-7"
              style={{ perspective: 1400 }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="bg-white border border-borderlight p-12 text-center shadow-[0_40px_80px_-30px_rgba(10,31,68,0.35)]"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                    <CheckCircle size={40} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-navy text-2xl mb-3">Enquiry Received</h3>
                  <p className="text-steel mb-8">
                    Thank you. Our team will respond within one working day.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn btn-outline"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <div className="relative">
                  {/* animated gradient border glow */}
                  <motion.div
                    className="absolute -inset-[2px] opacity-70 blur-[2px]"
                    style={{
                      background:
                        'linear-gradient(120deg, transparent 20%, rgba(59,130,246,0.7) 50%, transparent 80%)',
                      backgroundSize: '250% 250%',
                    }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  />
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="relative bg-white border border-borderlight p-8 lg:p-10 shadow-[0_50px_100px_-40px_rgba(10,31,68,0.45)]"
                  >
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <User size={14} className="text-accent" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="from_name"
                          required
                          className="input-field"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <Building2 size={14} className="text-accent" />
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          className="input-field"
                          placeholder="Company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <Briefcase size={14} className="text-accent" />
                          Designation
                        </label>
                        <input
                          type="text"
                          name="designation"
                          className="input-field"
                          placeholder="e.g. Project Manager"
                        />
                      </div>
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <Mail size={14} className="text-accent" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="from_email"
                          required
                          className="input-field"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <Phone size={14} className="text-accent" />
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="input-field"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="label-field flex items-center gap-2">
                          <FileText size={14} className="text-accent" />
                          Enquiry Type *
                        </label>
                        <select
                          name="enquiry_type"
                          required
                          defaultValue=""
                          className="input-field"
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          <option>General Enquiry</option>
                          <option>Request for Quotation (RFQ)</option>
                          <option>Vendor Registration</option>
                          <option>Site Visit Request</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="label-field">
                          Product / Service Requirement
                        </label>
                        <input
                          type="text"
                          name="product"
                          className="input-field"
                          placeholder="e.g. SS Storage Tank 10 KL"
                        />
                      </div>
                      <div>
                        <label className="label-field">Project Location</label>
                        <input
                          type="text"
                          name="location"
                          className="input-field"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="label-field">Message *</label>
                      <textarea
                        name="message"
                        rows="5"
                        required
                        className="input-field"
                        placeholder="Describe your requirement..."
                      />
                    </div>

                    <div className="mb-6">
                      <label className="label-field flex items-center gap-2">
                        <Upload size={14} className="text-accent" />
                        Attach Drawings, BOQ or Specifications
                      </label>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="input-field cursor-pointer file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-accent file:text-white file:font-semibold file:cursor-pointer file:rounded-sm file:text-xs"
                      />
                      {files.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-accent mt-2 font-semibold"
                        >
                          {files.length} file{files.length > 1 ? 's' : ''} selected
                        </motion.p>
                      )}
                      <p className="text-xs text-steel-light mt-2">
                        PDF, DWG, DXF, Excel, Word or images.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_20px_40px_-15px_rgba(59,130,246,0.7)]"
                      style={{
                        clipPath:
                          'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="relative">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative">Send Enquiry</span>
                          <Send
                            size={18}
                            className="relative group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </motion.button>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 flex items-start gap-3"
                      >
                        <AlertCircle
                          size={18}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-red-800 text-sm">
                          Something went wrong. Please email us directly at
                          enquiry@amitengineering.com
                        </p>
                      </motion.div>
                    )}

                    <p className="text-xs text-steel-light text-center mt-4">
                      Protected against spam · Replies within one working day
                    </p>
                  </form>
                </div>
              )}
            </motion.div>

            {/* ===== MAP + NEXT STEPS ===== */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-5 space-y-6"
              style={{ perspective: 1400 }}
            >
              <TiltCard max={6} glare={false}>
                <div
                  className="relative bg-white border border-borderlight overflow-hidden shadow-[0_40px_80px_-35px_rgba(10,31,68,0.4)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative h-[280px] bg-navy overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                      }}
                    />

                    {/* radar ripples */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="absolute w-24 h-24 rounded-full border border-accent/60"
                          animate={{ scale: [0.5, 3], opacity: [0.7, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1,
                            ease: 'easeOut',
                          }}
                        />
                      ))}

                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative"
                        style={{ transform: 'translateZ(40px)' }}
                      >
                        <div className="w-16 h-16 bg-accent/20 rounded-full blur-xl absolute inset-0 -m-4" />
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/50 relative">
                          <MapPin size={22} className="text-white" fill="white" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div
                        className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Workshop Location
                      </div>
                      <div className="text-white text-sm font-semibold mt-1">
                        Address to be added
                      </div>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="flex items-center justify-between p-5 hover:bg-bglight transition-colors group"
                  >
                    <span className="text-navy font-semibold text-sm">
                      Open in Google Maps
                    </span>
                    <ExternalLink
                      size={16}
                      className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                </div>
              </TiltCard>

              <TiltCard max={6}>
                <div
                  className="relative bg-navy p-8 overflow-hidden shadow-[0_40px_80px_-35px_rgba(10,31,68,0.6)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/20 blur-[60px]" />

                  <div className="relative">
                    <div
                      className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-6"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      What Happens Next
                    </div>

                    <div className="relative">
                      {/* animated vertical connector line */}
                      <motion.div
                        className="absolute left-3 top-3 w-px bg-gradient-to-b from-accent to-accent/0 origin-top"
                        style={{ height: 'calc(100% - 24px)' }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: EASE }}
                      />

                      <ul className="space-y-5">
                        {[
                          'Our team reviews your enquiry within one working day.',
                          'We may request clarifications on drawings or BOQ.',
                          'You receive a scope-based quotation or callback.',
                          'If approved, we schedule fabrication and dispatch.',
                        ].map((step, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className="flex gap-4 group"
                          >
                            <div
                              className="relative flex-shrink-0 w-6 h-6 bg-navy border border-accent/60 group-hover:bg-accent flex items-center justify-center mt-0.5 transition-colors"
                              style={{ transform: 'translateZ(25px)' }}
                            >
                              <span
                                className="text-accent group-hover:text-white text-[10px] font-bold transition-colors"
                                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                              >
                                {i + 1}
                              </span>
                            </div>
                            <span className="text-white/70 group-hover:text-white text-sm leading-relaxed transition-colors">
                              {step}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;