import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  MapPin, Mail, Phone, Clock, ArrowRight, ArrowUp,
  Globe, MessageCircle, Send, Sparkles,
} from 'lucide-react';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ============================================================
   MAGNETIC SOCIAL ICON
   ============================================================ */
const SocialIcon = ({ Icon, href, label, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-10 h-10 border border-white/20 hover:border-accent flex items-center justify-center transition-all duration-300 overflow-hidden"
    >
      {/* Fill sweep on hover */}
      <motion.span
        className="absolute inset-0 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Glow */}
      {hovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-accent blur-lg"
        />
      )}

      <Icon size={16} className="relative text-white/60 group-hover:text-white transition-colors z-10" />

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/0 group-hover:border-white/40 transition-all" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/0 group-hover:border-white/40 transition-all" />
    </motion.a>
  );
};

/* ============================================================
   FOOTER LINK
   ============================================================ */
const FooterLink = ({ to, children, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
  >
    <Link
      to={to}
      className="group flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors py-1"
    >
      {/* Bullet */}
      <span className="relative w-1 h-1 flex-shrink-0">
        <span className="absolute inset-0 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 bg-white/30 rounded-full group-hover:opacity-0 transition-opacity" />
      </span>

      {/* Label */}
      <span className="relative inline-block">
        <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
          {children}
        </span>
        {/* Animated underline */}
        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      </span>
    </Link>
  </motion.li>
);

/* ============================================================
   MAIN FOOTER
   ============================================================ */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Products & Services', path: '/products' },
    { label: 'Industries We Serve', path: '/industries' },
    { label: 'Quality & Safety', path: '/quality-safety-infrastructure' },
    { label: 'Our Clientele', path: '/clientele' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const products = [
    { label: 'Tanks & Process Equipment', path: '/products/tanks-process-equipment' },
    { label: 'Piping', path: '/products/piping' },
    { label: 'Skids & Assemblies', path: '/products/skids-assemblies' },
    { label: 'Structural Fabrication', path: '/products/structural-fabrication' },
    { label: 'Mechanical Execution', path: '/products/mechanical-execution' },
  ];

  const socials = [
    { Icon: Globe, href: '#', label: 'Website' },
    { Icon: MessageCircle, href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
    { Icon: Send, href: '#', label: 'Telegram' },
  ];

  return (
    <footer className="relative bg-[#050810] text-white overflow-hidden">
      {/* ===== TOP ACCENT LINE ===== */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent origin-center z-20"
      />

      {/* ===== SUBTLE GRID PATTERN ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,180,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,180,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ===== FLOATING PARTICLES ===== */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ===== ORANGE GLOW BLOB ===== */}
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px] pointer-events-none"
      />

      {/* ===== BLUE GLOW BLOB ===== */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 right-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none"
      />

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-custom relative z-10 pt-20 pb-10">

        {/* ============ TOP CTA STRIP ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16 pb-12 border-b border-white/10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <motion.div variants={fadeUp} className="max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-7 h-4 bg-accent"
                  style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
                />
                <span
                  className="text-accent text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Let's Build Together
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.05] tracking-tight">
                Have a project in mind?
                <br />
                <span className="text-accent">Let's talk.</span>
              </h3>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-sm tracking-wide overflow-hidden shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all"
                style={{
                  clipPath:
                    'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.7 }}
                />
                <span className="relative flex items-center gap-2">
                  Send an Enquiry
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ============ 4 COLUMNS ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16"
        >

          {/* ===== COLUMN 1: COMPANY ===== */}
          <motion.div variants={fadeUp}>
            {/* Logo with 3D hover */}
            <Link to="/" className="group flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotateY: 360, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                className="relative w-12 h-12"
              >
                <div className="absolute inset-0 bg-accent blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-full h-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-display font-extrabold text-lg text-white shadow-lg shadow-accent/30">
                  AE
                </div>
              </motion.div>

              <div>
                <div className="font-display font-bold text-base leading-none tracking-tightest">
                  AMIT ENGINEERING
                </div>
                <div className="text-[9px] text-accent font-semibold tracking-[0.2em] uppercase mt-1">
                  Co. · Fabrication
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Industrial fabrication and mechanical execution for chemical,
              pharmaceutical, specialty chemical, process manufacturing and
              EPC projects.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 flex-wrap">
              {socials.map((social, i) => (
                <SocialIcon
                  key={social.label}
                  Icon={social.Icon}
                  href={social.href}
                  label={social.label}
                  delay={0.2 + i * 0.08}
                />
              ))}
            </div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-2 text-xs text-white/40"
            >
              <Sparkles size={12} className="text-accent" />
              <span>Trusted by 25+ industrial clients</span>
            </motion.div>
          </motion.div>

          {/* ===== COLUMN 2: QUICK LINKS ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-display font-bold text-sm mb-6 tracking-[0.15em] uppercase relative inline-block">
              Quick Links
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent origin-left"
              />
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <FooterLink key={link.path} to={link.path} delay={0.2 + i * 0.05}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ===== COLUMN 3: PRODUCTS ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-display font-bold text-sm mb-6 tracking-[0.15em] uppercase relative inline-block">
              Products
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent origin-left"
              />
            </h4>

            <ul className="space-y-2.5">
              {products.map((link, i) => (
                <FooterLink key={link.path} to={link.path} delay={0.3 + i * 0.05}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ===== COLUMN 4: CONTACT ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-display font-bold text-sm mb-6 tracking-[0.15em] uppercase relative inline-block">
              Get In Touch
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent origin-left"
              />
            </h4>

            <ul className="space-y-4">
              {/* Office */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-8 h-8 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-300">
                  <MapPin size={14} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div
                    className="text-[10px] text-accent/70 group-hover:text-accent tracking-[0.2em] uppercase mb-1 transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Office
                  </div>
                  <div className="text-white/60 group-hover:text-white text-sm leading-relaxed transition-colors">
                    Address to be added
                  </div>
                </div>
              </motion.li>

              {/* Workshop */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-8 h-8 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-300">
                  <MapPin size={14} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div
                    className="text-[10px] text-accent/70 group-hover:text-accent tracking-[0.2em] uppercase mb-1 transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Workshop
                  </div>
                  <div className="text-white/60 group-hover:text-white text-sm leading-relaxed transition-colors">
                    Address to be added
                  </div>
                </div>
              </motion.li>

              {/* Email */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-8 h-8 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Mail size={14} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div
                    className="text-[10px] text-accent/70 group-hover:text-accent tracking-[0.2em] uppercase mb-1 transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:enquiry@amitengineering.com"
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    enquiry@amitengineering.com
                  </a>
                </div>
              </motion.li>

              {/* Phone */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-8 h-8 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Phone size={14} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div
                    className="text-[10px] text-accent/70 group-hover:text-accent tracking-[0.2em] uppercase mb-1 transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:+91XXXXXXXXXX"
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    +91 XXXXX XXXXX
                  </a>
                </div>
              </motion.li>

              {/* Hours */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-8 h-8 border border-accent/30 group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Clock size={14} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div
                    className="text-[10px] text-accent/70 group-hover:text-accent tracking-[0.2em] uppercase mb-1 transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Hours
                  </div>
                  <div className="text-white/60 text-sm">Mon–Sat · Hours to be added</div>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ============ BOTTOM BAR ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear}{' '}
            <span className="text-white/60 font-semibold">Amit Engineering Co.</span>{' '}
            All rights reserved.
          </p>

          {/* Middle status */}
          <div className="flex items-center gap-6 text-xs text-white/40 flex-wrap justify-center">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Available for New Projects
            </span>

            <span className="hidden md:block w-px h-4 bg-white/20" />

            <span className="hidden md:block">
              Industrial Fabrication · Mechanical Execution
            </span>
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs text-accent hover:text-white font-bold tracking-wider uppercase transition-colors"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span className="relative w-9 h-9 border border-accent/40 group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-300 overflow-hidden">
              {/* Fill */}
              <span className="absolute inset-0 bg-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
              <ArrowUp size={14} className="relative text-accent group-hover:text-white transition-colors" />
            </span>
          </motion.button>
        </motion.div>

        {/* ============ BOTTOM DECORATIVE LINE ============ */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8, ease: EASE }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-center"
        />
      </div>
    </footer>
  );
};

export default Footer;