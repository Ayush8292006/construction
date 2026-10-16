import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Factory,
  Workflow,
  Boxes,
  Building2,
  Wrench,
} from 'lucide-react';

/* ============================================================
   CONFIG
   ============================================================ */
const PHONE = '+91 XXXXX XXXXX';
const EMAIL = 'info@yourdomain.com';
const WHATSAPP = 'https://wa.me/91XXXXXXXXXX';

const HEX = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

/* ============================================================
   NAVIGATION ITEMS
   ============================================================ */
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Products & Services',
    path: '/products',
    children: [
      { label: 'Tanks & Process Equipment', path: '/products/tanks-process-equipment', icon: Factory },
      { label: 'Piping', path: '/products/piping', icon: Workflow },
      { label: 'Skids & Equipment Assemblies', path: '/products/skids-assemblies', icon: Boxes },
      { label: 'Structural Fabrication', path: '/products/structural-fabrication', icon: Building2 },
      { label: 'Mechanical Execution', path: '/products/mechanical-execution', icon: Wrench },
    ],
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Quality & Safety', path: '/quality-safety-infrastructure' },
  { label: 'Clientele', path: '/clientele' },
  { label: 'Contact', path: '/contact' },
];

const isPathActive = (pathname, to) =>
  to === '/' ? pathname === '/' : pathname.startsWith(to);

/* ============================================================
   LOGO — unchanged
   ============================================================ */
const Logo = ({ reduce }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 28);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 28);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <Link
      to="/"
      ref={ref}
      aria-label="Amit Engineering Co. — Home"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex items-center gap-3.5 flex-shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
      style={{ perspective: '900px' }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-12 h-12 flex-shrink-0"
      >
        <motion.div
          animate={{ opacity: hovered ? 0.9 : 0.45, scale: hovered ? 1.5 : 1.2 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-accent rounded-lg blur-2xl"
        />

        {!reduce && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-2xl border border-dashed border-accent/50"
          />
        )}

        <motion.div
          animate={{ z: hovered ? 36 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          <div
            className="absolute inset-0 bg-black/60 translate-y-1"
            style={{ clipPath: HEX, transform: 'translateZ(-10px) translateY(4px)' }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent-light via-accent to-navy"
            style={{ clipPath: HEX }}
          />
          <div
            className="absolute inset-[3px] bg-gradient-to-br from-navy-dark to-navy flex items-center justify-center overflow-hidden"
            style={{ clipPath: HEX, transform: 'translateZ(8px)' }}
          >
            <img
              src="/logo.jpeg"
              alt=""
              className="w-[80%] h-[80%] object-contain"
              style={{ filter: 'drop-shadow(0 0 6px rgba(230,126,34,0.8))' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = e.currentTarget.nextSibling;
                if (fb) fb.style.display = 'flex';
              }}
            />
            <span
              className="hidden text-white font-extrabold text-lg leading-none items-center justify-center w-full h-full absolute"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 20px rgba(230,126,34,0.8)',
              }}
            >
              AE
            </span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
            style={{ clipPath: HEX, transform: 'translateZ(12px)' }}
            initial={{ x: '-110%' }}
            animate={{ x: hovered ? '110%' : '-110%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </motion.div>

        {hovered &&
          !reduce &&
          [...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                x: Math.cos((i * Math.PI * 2) / 6) * 46,
                y: Math.sin((i * Math.PI * 2) / 6) * 46,
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-accent rounded-full"
              style={{ boxShadow: '0 0 10px #E67E22' }}
            />
          ))}
      </motion.div>

      <div className="leading-none hidden sm:block">
        <motion.div
          animate={{ backgroundPosition: hovered ? '200% center' : '0% center' }}
          transition={{ duration: 0.9 }}
          className="font-extrabold text-[15px] uppercase bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-[#2C1810] via-[#5C3A21] to-[#1A0F0A]"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.02em',
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))',
          }}
        >
          Amit Engineering
        </motion.div>
        <div className="flex items-center gap-2 mt-1.5">
          <motion.span
            animate={{ width: hovered ? 34 : 18 }}
            transition={{ duration: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-accent to-accent-light"
          />
          <span
            className="text-[9px] text-accent font-bold tracking-[0.25em] uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Fabrication · Erection
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ============================================================
   MAGNETIC CTA — unchanged
   ============================================================ */
const MagneticButton = ({ to, children, reduce }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="ml-2"
    >
      <Link
        to={to}
        className="relative inline-flex overflow-hidden rounded-md p-[1.5px] shadow-[0_0_24px_-4px_rgba(230,126,34,0.6)] hover:shadow-[0_0_34px_-2px_rgba(230,126,34,0.85)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute -inset-[150%]"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0 70%, #F5A962 85%, #fff 100%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <span className="relative flex items-center gap-2 overflow-hidden px-5 py-3 rounded-[5px] bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-bold tracking-wide">
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-120%' }}
            animate={{ x: hovered ? '120%' : '-120%' }}
            transition={{ duration: 0.8 }}
          />
          <span className="relative flex items-center gap-2">
            {children}
            <motion.span animate={{ x: hovered ? 4 : 0 }}>
              <ArrowRight size={14} />
            </motion.span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
};

/* ============================================================
   NAV ITEM — compact dropdown
   ============================================================ */
const NavItem = ({ item, hovered, setHovered, open, setOpen, reduce }) => {
  const { pathname } = useLocation();
  const active = isPathActive(pathname, item.path);
  const hasKids = !!item.children;
  const isOpen = open === item.path;

  const textColor = active || isOpen
    ? 'text-accent'
    : 'text-white hover:text-accent';

  const pillBg = 'bg-white/8 ring-1 ring-white/10';

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setHovered(item.path);
        if (hasKids) setOpen(item.path);
      }}
      onMouseLeave={() => {
        setHovered(null);
        setOpen(null);
      }}
      onFocus={() => hasKids && setOpen(item.path)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null);
      }}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}
    >
      <NavLink
        to={item.path}
        aria-haspopup={hasKids ? 'true' : undefined}
        aria-expanded={hasKids ? isOpen : undefined}
        className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${textColor}`}
      >
        {hovered === item.path && (
          <motion.span
            layoutId="navPill"
            className={`absolute inset-0 rounded-md ${pillBg}`}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{item.label}</span>
        {hasKids && (
          <motion.span
            className="relative z-10"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown size={13} />
          </motion.span>
        )}
        {active && (
          <motion.span
            layoutId="navActive"
            className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </NavLink>

      {/* COMPACT DROPDOWN */}
      {hasKids && (
        <AnimatePresence>
          {isOpen && (
            <div className="absolute top-full left-0 pt-2 w-[280px]">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-navy-dark/98 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]"
              >
                <div className="h-[2px] bg-gradient-to-r from-accent via-accent to-transparent" />

                <div className="py-2">
                  {item.children.map((child, i) => {
                    const Icon = child.icon;
                    return (
                      <motion.div
                        key={child.path}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 + i * 0.03, duration: 0.2 }}
                      >
                        <Link
                          to={child.path}
                          onClick={() => setOpen(null)}
                          className="group/link flex items-center gap-3 px-4 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex-shrink-0 w-7 h-7 grid place-items-center rounded-md bg-white/[0.05] text-accent group-hover/link:bg-accent group-hover/link:text-white transition-colors">
                            <Icon size={14} />
                          </span>
                          <span className="flex-1 truncate">{child.label}</span>
                          <ArrowUpRight
                            size={12}
                            className="flex-shrink-0 opacity-0 -translate-x-1 group-hover/link:opacity-60 group-hover/link:translate-x-0 transition-all"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 p-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(null)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    Request a quote <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

/* ============================================================
   FLOATING PARTICLES — unchanged
   ============================================================ */
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      [...Array(14)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
        size: 1 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent/40"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '-100%', opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   MAIN HEADER
   ============================================================ */
const Header = () => {
  const reduce = useReducedMotion();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);

  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const hx = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${hx}px 50%, rgba(230,126,34,0.12), transparent 70%)`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 420);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(false);
    setOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpen(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const onHeaderMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      hx.set(e.clientX - rect.left);
    },
    [hx]
  );

  const hideNow = hidden && !mobileOpen && !open;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hideNow ? '-110%' : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={onHeaderMove}
        onMouseLeave={() => hx.set(-300)}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[150%] pointer-events-none bg-gradient-to-b from-navy-dark/70 via-navy/30 to-transparent backdrop-blur-xl"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, #000 40%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, #000 40%, transparent 100%)',
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: spotlight }}
          />
        )}

        {!scrolled && !reduce && <FloatingParticles />}

        <div className="container-custom relative">
          <motion.div
            animate={{ height: scrolled ? 70 : 88 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <Logo reduce={reduce} />

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  hovered={hovered}
                  setHovered={setHovered}
                  open={open}
                  setOpen={setOpen}
                  reduce={reduce}
                />
              ))}
              <MagneticButton to="/contact" reduce={reduce}>
                Discuss Your Project
              </MagneticButton>
            </nav>

            <button
              className="lg:hidden relative text-white p-2.5 rounded-md border border-white/15 bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'menu'}
                  className="block"
                  initial={{ rotate: mobileOpen ? -90 : 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: mobileOpen ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress, boxShadow: '0 0 12px #E67E22' }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent-dark via-accent to-accent-light"
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-navy-dark/98 backdrop-blur-2xl overflow-y-auto"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="container-custom relative pt-28 pb-10">
              <nav aria-label="Mobile" className="space-y-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + idx * 0.05 }}
                  >
                    <div className="flex items-stretch">
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          `flex-1 py-3.5 px-4 text-lg font-medium border-l-2 transition-all ${
                            isActive
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-transparent text-white hover:border-accent/50 hover:bg-white/5'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                      {item.children && (
                        <button
                          onClick={() => setMobileExpanded((v) => !v)}
                          aria-label="Toggle products submenu"
                          aria-expanded={mobileExpanded}
                          className="px-4 text-white/80 border-l border-white/10 hover:text-accent"
                        >
                          <motion.span
                            className="block"
                            animate={{ rotate: mobileExpanded ? 180 : 0 }}
                          >
                            <ChevronDown size={18} />
                          </motion.span>
                        </button>
                      )}
                    </div>

                    {item.children && (
                      <AnimatePresence initial={false}>
                        {mobileExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 my-1 border-l border-accent/30 bg-white/[0.03]">
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className="flex items-center gap-3 py-3 px-4 text-sm text-white/80 hover:text-accent transition-colors"
                                  >
                                    <Icon size={16} className="text-accent flex-shrink-0" />
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + navItems.length * 0.05 }}
                className="pt-8 space-y-3"
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-md bg-gradient-to-r from-accent to-accent-dark text-white font-bold"
                >
                  <ArrowRight size={16} />
                  Discuss Your Project
                </Link>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-md border-2 border-white/20 text-white font-bold hover:bg-white/5 hover:border-accent transition-all"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-md bg-white/5 text-white/80 text-sm hover:text-accent"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-md bg-white/5 text-white/80 text-sm hover:text-accent"
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;