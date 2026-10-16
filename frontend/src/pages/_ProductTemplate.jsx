import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Check, Mail, Phone } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 50, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ============================================================
   TEMPLATE COMPONENT — pass productData as prop
   ============================================================ */
export const ProductPageTemplate = ({ productData }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 5 + Math.random() * 6,
        delay: Math.random() * 5,
        size: Math.random() > 0.7 ? 3 : 1.5,
      })),
    []
  );

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#050810]">
        <div className="absolute inset-0 z-0">
          <img
            src={productData.images[0]}
            alt={productData.title}
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
                'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.92) 35%, rgba(5,8,16,0.55) 65%, rgba(5,8,16,0.35) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-blue-900/25 mix-blend-overlay" />
        </div>

        <div
          className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px] pointer-events-none z-[2]"
        />

        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200/50 z-[3]"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
          />
        ))}

        <div className="container-custom relative z-10 pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8 text-xs tracking-[0.2em] uppercase flex-wrap"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            <Link to="/" className="text-white/40 hover:text-accent">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/products" className="text-white/40 hover:text-accent">Products</Link>
            <span className="text-white/20">/</span>
            <span className="text-accent font-bold">{productData.shortTitle}</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-7 h-4 bg-accent" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }} />
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {productData.code} · {productData.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight mb-8"
            >
              {productData.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              {productData.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide group shadow-lg shadow-accent/30"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
              >
                <Mail size={16} />
                <span>Send an Enquiry</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm hover:bg-white/5 hover:border-accent transition-all"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
              >
                <span>All Products</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1420] to-transparent z-[5] pointer-events-none" />
      </section>

      {/* IMAGE GALLERY */}
      <section className="relative py-16 bg-[#0B1420] overflow-hidden">
        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {productData.images.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative overflow-hidden border border-white/10 group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`${productData.title} ${i + 1}`}
                  className={`w-full object-cover ${i === 0 ? 'h-[300px] md:h-[520px]' : 'h-[250px]'} group-hover:scale-105 transition-transform duration-700`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0a1428 0%, #050810 100%)';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative py-24 lg:py-32 bg-[#0B1420] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="w-7 h-4 bg-accent" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }} />
                <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Overview
                </span>
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-white text-4xl md:text-5xl font-display font-extrabold leading-[1.05] tracking-tight mb-8">
                {productData.title}
              </motion.h2>

              <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-6">
                {productData.desc}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10">
                <h4 className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Typical Applications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {productData.applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check size={14} className="text-accent flex-shrink-0" strokeWidth={3} />
                      {app}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-5">
              <motion.div variants={fadeUp} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8">
                <div className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Materials Available
                </div>
                <div className="space-y-3 mb-8">
                  {productData.materials.map((mat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rotate-45" />
                      <span className="text-white text-sm font-semibold">{mat}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Our Scope
                  </div>
                  <ul className="space-y-2.5">
                    {productData.scope.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/70 text-xs">
                        <Check size={12} className="text-accent flex-shrink-0 mt-0.5" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ITEMS GRID */}
      <section className="relative py-24 bg-[#F5F6F8] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#0A1F44 1px, transparent 1px), linear-gradient(90deg, #0A1F44 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container-custom relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mb-14">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="eyebrow !mb-0">What We Fabricate</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-navy text-4xl md:text-5xl font-display font-extrabold leading-[1.05] tracking-tight">
              Our <span className="text-accent">range.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {productData.items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative bg-white border border-borderlight hover:border-accent p-7 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                <div
                  className="text-3xl font-display font-extrabold mb-4 text-accent/30 group-hover:text-accent transition-colors"
                  style={{ WebkitTextStroke: '1.5px #E67E22', WebkitTextFillColor: 'transparent' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 className="text-navy text-lg font-display font-bold mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed mb-4">{item.desc}</p>

                <div className="pt-4 border-t border-borderlight">
                  <span className="text-[10px] text-accent font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Materials
                  </span>
                  <div className="text-navy text-xs font-semibold mt-1">{item.materials}</div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#050810] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[130px] pointer-events-none"
        />

        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-7 h-4 bg-accent" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }} />
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Request a Quotation
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-6">
              Need {productData.shortTitle.toLowerCase()}?
              <br />
              <span className="text-accent">Send us your drawing.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Share your GA drawings, specifications or BOQ — our team will respond with a scope-based quotation within one working day.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide group shadow-lg shadow-accent/30"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
              >
                <Mail size={16} />
                <span>Send an Enquiry</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+91XXXXXXXXXX"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm hover:bg-white/5 hover:border-accent transition-all"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
              >
                <Phone size={16} />
                <span>Call Us</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};