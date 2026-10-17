import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
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
  Building2,
  ChevronRight,
  Star,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   CONFIG
   ============================================================ */
const SLIDE_MS = 5000;
const EASE = [0.22, 1, 0.36, 1];

const C = {
  navy: '#0B1420',
  navyLight: '#111E30',
  charcoal: '#15171A',
  cream: '#F5F0E5',
  creamSoft: '#FAF7F0',
  gold: '#C9A961',
  goldLight: '#E8C77E',
  goldDark: '#A8884A',
  white: '#FFFFFF',
  muted: '#8A8F98',
  border: '#E8E2D4',
  borderDark: '#1F2A3D',
  borderGold: 'rgba(201,169,97,0.3)',
};

/* ============================================================
   DATA
   ============================================================ */
const HERO_SLIDES = [
  { image: '/1.jpeg', tag: 'Storage Tanks', label: 'Fabrication · Erection' },
  { image: '/2.jpeg', tag: 'Reactors & Vessels', label: 'Process Equipment' },
  { image: '/3.jpeg', tag: 'Structural Steel', label: 'Industrial Structures' },
  { image: '/4.jpeg', tag: 'Process Piping', label: 'Piping Systems' },
];

const CAPABILITIES = [
  { icon: Factory, title: 'Tanks & Process Equipment', category: 'Fabrication', tag: 'Bestseller', discount: '20%', desc: 'MS & SS storage tanks, reactors, mixing vessels', rating: '4.8', reviews: '234' },
  { icon: Wrench, title: 'Process Piping', category: 'Piping', tag: 'Premium', discount: '15%', desc: 'MS & SS piping, utility lines, spools', rating: '4.7', reviews: '189' },
  { icon: Target, title: 'Structural Fabrication', category: 'Structures', tag: 'Luxury', discount: '10%', desc: 'Platforms, walkways, pipe racks, staircases', rating: '4.9', reviews: '412' },
  { icon: ShieldCheck, title: 'Skids & Assemblies', category: 'Skids', tag: 'Trending', discount: '10%', desc: 'Skid structures, mounting frames, assemblies', rating: '4.6', reviews: '156' },
  { icon: Clock, title: 'Mechanical Execution', category: 'Erection', tag: 'Exclusive', discount: '30%', desc: 'Erection, installation, site fabrication', rating: '4.9', reviews: '78' },
  { icon: Award, title: 'Custom Fabrication', category: 'Custom', tag: 'New', discount: '20%', desc: 'Bespoke fabrication to your drawings and BOQs', rating: '4.7', reviews: '356' },
];

const FEATURED_INDUSTRIES = [
  { image: '/client-01.jpeg', tag: 'Chemical', subtitle: 'Bulk & fine chemicals', title: 'Chemical Plants', desc: 'Tanks, reactors, piping for chemical production', rating: '4.9', reviews: '412' },
  { image: '/client-02.jpeg', tag: 'Pharma', subtitle: 'Regulated facilities', title: 'Pharmaceutical', desc: 'SS vessels and piping for cleanable areas', rating: '4.8', reviews: '356' },
  { image: '/client-03.jpeg', tag: 'Specialty', subtitle: 'Batch processes', title: 'Specialty Chemical', desc: 'Equipment for batch processes and reactions', rating: '4.7', reviews: '234' },
  { image: '/client-04.jpeg', tag: 'Process', subtitle: 'Production lines', title: 'Process Mfg.', desc: 'Structures, platforms and utility equipment', rating: '4.8', reviews: '189' },
  { image: '/1.jpeg', tag: 'Utilities', subtitle: 'Water & steam', title: 'Industrial Utilities', desc: 'Tanks, piping and stacks for utilities', rating: '4.9', reviews: '578' },
  { image: '/2.jpeg', tag: 'EPC', subtitle: 'Project partners', title: 'EPC Contractors', desc: 'Fabrication and erection to EPC drawings', rating: '4.9', reviews: '412' },
];

const BRANDS = [
  'Chemical', 'Pharma', 'Specialty', 'Process', 'Utilities', 'EPC', 'Bulk Chem', 'Fine Chem', 'Batches',
];

const INDUSTRIES_STRIP = [
  { icon: FlaskConical, title: 'Chemical', tag: 'Bulk & fine chemicals', rating: '4.8' },
  { icon: Pill, title: 'Pharma', tag: 'Regulated facilities', rating: '4.9' },
  { icon: Factory, title: 'Process Mfg.', tag: 'Production lines', rating: '4.7' },
  { icon: Building2, title: 'EPC', tag: 'Project partners', rating: '4.9' },
];

/* ============================================================
   HERO — Navy + Gold with scroll parallax
   ============================================================ */
function Hero() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current]);

  const active = HERO_SLIDES[current];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: C.navy, minHeight: '90vh' }}
    >
      {/* Decorative gold lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(${C.borderGold} 1px, transparent 1px), linear-gradient(90deg, ${C.borderGold} 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%)',
        }}
      />

      {/* Gold glow orb */}
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: C.gold }}
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-custom grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center py-20 lg:py-28 relative"
      >
        {/* LEFT */}
        <motion.div style={{ y: contentY }} className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <Sparkles size={14} style={{ color: C.gold }} />
            <span
              className="text-[10px] font-bold tracking-[0.3em] uppercase"
              style={{ color: C.gold }}
            >
              Premium Industrial Fabrication · 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight mb-6"
            style={{ color: C.white }}
          >
            Steel, tanks
            <br />
            <span style={{ color: C.gold }}>and structures.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Discover industrial fabrication, process equipment and structural steel — built for
            chemical, pharmaceutical and EPC projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#E8C77E]"
              style={{ background: C.gold }}
            >
              Explore Capabilities
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-bold tracking-wide border-2 transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Discuss Project
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — Image with gold borders */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative"
        >
          <div
            className="absolute -top-4 -right-4 w-full h-full border-2"
            style={{ borderColor: C.gold }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-full h-full border"
            style={{ borderColor: C.borderGold }}
          />

          <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] shadow-2xl">
            <AnimatePresence mode="sync">
              <motion.img
                key={current}
                src={active.image}
                alt={active.tag}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2 }, scale: { duration: 5 } }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute top-5 left-5 px-3 py-1.5" style={{ background: C.gold }}>
              <span className="text-black font-bold text-xs tracking-wider">
                {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: C.gold }}>
                {active.label}
              </div>
              <div className="text-white font-display font-bold text-xl mb-4">
                {active.tag}
              </div>
              <div className="flex gap-1.5">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: i === current ? 32 : 8,
                      background: i === current ? C.gold : 'rgba(255,255,255,0.3)',
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   TOP CAPABILITIES — Horizontal Scroll on Cream (Fixed Cards)
   ============================================================ */
function TopCapabilities() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const scroll = (dir) => {
    const el = document.getElementById('cap-scroll');
    if (el) {
      el.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 relative" style={{ background: C.cream }}>
      <motion.div style={{ y }} className="container-custom">
        <div className="flex items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px" style={{ background: C.gold }} />
              <span
                className="text-[11px] font-semibold tracking-[0.25em] uppercase"
                style={{ color: C.goldDark }}
              >
                Curated Excellence
              </span>
            </div>
            <h2
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ color: C.navy }}
            >
              Our Core Capabilities
            </h2>
            <p className="text-sm mt-3 max-w-xl" style={{ color: '#5A6068' }}>
              Discover our professional fabrication and mechanical execution services — delivered
              with precision.
            </p>
          </motion.div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center border-2 transition-colors hover:bg-[#0B1420] hover:text-white"
              style={{ borderColor: C.navy, color: C.navy }}
              aria-label="Scroll left"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center border-2 transition-colors hover:bg-[#0B1420] hover:text-white"
              style={{ borderColor: C.navy, color: C.navy }}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          id="cap-scroll"
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="snap-start flex-shrink-0 w-[300px] sm:w-[340px] h-full"
            >
              <div
                className="group border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col"
                style={{ borderColor: C.border, background: C.creamSoft }}
              >
                {/* Fixed image ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                  <img
                    src={`/${(i % 4) + 1}.jpeg`}
                    alt={cap.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1"
                    style={{ background: C.navy }}
                  >
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-white">
                      {cap.tag}
                    </span>
                  </div>
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1"
                    style={{ background: C.gold }}
                  >
                    <span className="text-[10px] font-bold text-black">{cap.discount} OFF</span>
                  </div>
                </div>

                {/* Content — flex-grow for consistent height */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: C.goldDark }}>
                    {cap.category}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 leading-tight" style={{ color: C.navy }}>
                    {cap.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={11} fill={C.gold} stroke={C.gold} />
                    <span className="text-[11px] font-semibold" style={{ color: C.navy }}>
                      {cap.rating}
                    </span>
                    <span className="text-[10px]" style={{ color: '#5A6068' }}>
                      ({cap.reviews})
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: '#5A6068' }}>
                    {cap.desc}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] uppercase group-hover:gap-2 transition-all mt-auto"
                    style={{ color: C.goldDark }}
                  >
                    View details
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   MIC DROP BANNER — Charcoal with gold
   ============================================================ */
function MicDrop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: C.charcoal }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, #C9A961 30px, #C9A961 31px)',
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: C.gold }}
      />

      <motion.div
        style={{ scale }}
        className="container-custom relative text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block px-4 py-2 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ background: C.gold, color: C.charcoal }}
          >
            ✦ Premium Industrial Grade ✦
          </div>

          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight mb-6"
            style={{ color: C.white }}
          >
            Bulk fabrication
            <br />
            <span style={{ color: C.gold }}>pricing available.</span>
          </h2>

          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Up to 30% off on select fabrication packages for bulk orders and shutdown projects.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#E8C77E]"
            style={{ background: C.gold }}
          >
            Request Quotation
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   FEATURED INDUSTRIES — Navy with gold borders (Fixed Cards)
   ============================================================ */
function FeaturedIndustries() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: C.navy }}>
      <motion.div style={{ y }} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            ✦ Featured Applications ✦
          </div>
          <h2
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: C.white }}
          >
            Where our work goes to
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_INDUSTRIES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group border transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
              style={{ borderColor: C.borderGold, background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Fixed image ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90"
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1" style={{ background: C.gold }}>
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: C.charcoal }}>
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: C.gold }}>
                  {item.subtitle}
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: C.white }}>
                  {item.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: C.borderGold }}>
                  <Star size={11} fill={C.gold} stroke={C.gold} />
                  <span className="text-xs font-semibold" style={{ color: C.gold }}>
                    {item.rating}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    ({item.reviews})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   BRANDS STRIP — Cream with navy borders
   ============================================================ */
function BrandsStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: C.creamSoft }}>
      <motion.div style={{ y }} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex flex-wrap items-center gap-2 mb-3 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border-2"
            style={{ borderColor: C.goldDark, color: C.goldDark }}
          >
            ✦ Exclusive · Premium · Industrial Grade ✦
          </div>
          <h2
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2"
            style={{ color: C.navy }}
          >
            Amit Engineering
          </h2>
          <p className="text-sm" style={{ color: '#5A6068' }}>
            Trusted industrial fabrication partners
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="border-2 p-4 flex items-center justify-center min-h-[80px] hover:shadow-lg transition-all cursor-pointer"
              style={{ borderColor: C.navy, background: C.cream }}
            >
              <span className="text-xs font-bold text-center" style={{ color: C.navy }}>
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   INDUSTRIES ROW — Navy with gold
   ============================================================ */
function IndustriesRow() {
  return (
    <section className="py-24 lg:py-32" style={{ background: C.navyLight }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            ✦ Industries We Serve ✦
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: C.white }}>
            Trusted by process plants
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES_STRIP.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 border flex flex-col gap-3 transition-all"
              style={{ borderColor: C.borderGold, background: 'rgba(201,169,97,0.03)' }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center border-2"
                style={{ borderColor: C.gold }}
              >
                <ind.icon size={18} style={{ color: C.gold }} strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold text-base mb-1" style={{ color: C.white }}>
                  {ind.title}
                </div>
                <div className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {ind.tag}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={11} fill={C.gold} stroke={C.gold} />
                  <span className="text-xs font-semibold" style={{ color: C.gold }}>
                    {ind.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   NEWSLETTER CTA — Charcoal with gold
   ============================================================ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: C.charcoal }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[140px] pointer-events-none"
        style={{ background: C.gold }}
      />

      <div className="container-custom max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ background: C.gold, color: C.charcoal }}
          >
            ✦ Join The Club ✦
          </div>

          <h2
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: C.white }}
          >
            Let's work together.
          </h2>

          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Sign up for project updates, fabrication insights and new product alerts.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-4 text-sm font-bold"
              style={{ background: 'rgba(201,169,97,0.15)', color: C.gold, border: `1px solid ${C.gold}` }}
            >
              <CheckCircle2 size={18} />
              Thank you — we'll be in touch soon.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 text-sm outline-none bg-transparent transition-colors focus:border-[#C9A961]"
                style={{
                  border: `2px solid ${C.borderGold}`,
                  color: C.white,
                }}
              />
              <button
                type="submit"
                className="px-7 py-4 text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#E8C77E]"
                style={{ background: C.gold }}
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1">✦ No spam, ever</span>
            <span className="flex items-center gap-1">✦ Unsubscribe anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   HOME
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <TopCapabilities />
      <MicDrop />
      <FeaturedIndustries />
      <BrandsStrip />
      <IndustriesRow />
      <Newsletter />
    </>
  );
}