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
   CONFIG — apna real data yahan daalo
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
      {
        label: 'Tanks & Process Equipment',
        desc: 'Storage tanks and process vessels',
        path: '/products/tanks-process-equipment',
        icon: Factory,
      },
      {
        label: 'Piping',
        desc: 'Fabrication and erection of piping systems',
        path: '/products/piping',
        icon: Workflow,
      },
      {
        label: 'Skids & Equipment Assemblies',
        desc: 'Pre-assembled, ready-to-install skids',
        path: '/products/skids-assemblies',
        icon: Boxes,
      },
      {
        label: 'Structural Fabrication',
        desc: 'Steel structures built to drawing',
        path: '/products/structural-fabrication',
        icon: Building2,
      },
      {
        label: 'Mechanical Execution',
        desc: 'On-site installation and commissioning support',
        path: '/products/mechanical-execution',
        icon: Wrench,
      },
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
   LOGO — 3D tilt hexagon
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
        {/* Glow */}
        <motion.div
          animate={{ opacity: hovered ? 0.9 : 0.45, scale: hovered ? 1.5 : 1.2 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-accent rounded-lg blur-2xl"
        />

        {/* Orbit ring */}
        {!reduce && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-2xl border border-dashed border-accent/50"
          />
        )}

        {/* Hexagon stack (depth layers for 3D feel) */}
        <motion.div
          animate={{ z: hovered ? 36 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          {/* back shadow layer */}
          <div
            className="absolute inset-0 bg-black/60 translate-y-1"
            style={{ clipPath: HEX, transform: 'translateZ(-10px) translateY(4px)' }}
          />
          {/* outer hex */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent-light via-accent to-navy"
            style={{ clipPath: HEX }}
          />
          {/* inner hex + logo */}
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
          {/* shine sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
            style={{ clipPath: HEX, transform: 'translateZ(12px)' }}
            initial={{ x: '-110%' }}
            animate={{ x: hovered ? '110%' : '-110%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Sparks */}
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

      {/* Wordmark */}
      <div className="leading-none hidden sm:block">
        <motion.div
          animate={{ backgroundPosition: hovered ? '200% center' : '0% center' }}
          transition={{ duration: 0.9 }}
          className="font-extrabold text-[15px] uppercase bg-gradient-to-r from-white via-accent-light to-white bg-[length:200%_auto] bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.02em' }}
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
   MAGNETIC CTA
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
        {/* rotating light along the border */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute -inset-[150%]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0 70%, #F5A962 85%, #fff 100%)',
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
   MEGA MENU CARD — 3D tilt + cursor spotlight
   ============================================================ */
const MegaCard = ({ child, index, reduce, onNavigate }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sy = useSpring(ry, { stiffness: 220, damping: 20 });
  const mx = useMotionValue(60);
  const my = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(160px circle at ${mx}px ${my}px, rgba(230,126,34,0.28), transparent 70%)`;
  const Icon = child.icon;

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    if (!reduce) {
      ry.set((px / rect.width - 0.5) * 12);
      rx.set(-(py / rect.height - 0.5) * 12);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
      style={{ perspective: '700px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        <Link
          to={child.path}
          onClick={onNavigate}
          className="group/card relative flex h-full gap-3.5 p-4 rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden hover:border-accent/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
            style={{ background: glow }}
          />
          <span
            className="relative flex-shrink-0 w-10 h-10 grid place-items-center rounded-md bg-gradient-to-br from-accent/30 to-accent/5 border border-accent/30 text-accent group-hover/card:from-accent group-hover/card:to-accent-dark group-hover/card:text-white transition-all duration-300"
            style={{ transform: 'translateZ(24px)' }}
          >
            <Icon size={18} />
          </span>
          <span className="relative min-w-0" style={{ transform: 'translateZ(14px)' }}>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-white group-hover/card:text-accent transition-colors">
              {child.label}
              <ArrowUpRight
                size={13}
                className="opacity-0 -translate-x-1 translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:translate-y-0 transition-all"
              />
            </span>
            <span className="block mt-1 text-xs leading-relaxed text-white/60">
              {child.desc}
            </span>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   NAV ITEM (desktop) — sliding pill + mega menu
   ============================================================ */
const NavItem = ({ item, hovered, setHovered, open, setOpen, reduce }) => {
  const { pathname } = useLocation();
  const active = isPathActive(pathname, item.path);
  const hasKids = !!item.children;
  const isOpen = open === item.path;

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
        className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
          active || isOpen ? 'text-accent' : 'text-white/90 hover:text-white'
        }`}
      >
        {hovered === item.path && (
          <motion.span
            layoutId="navPill"
            className="absolute inset-0 rounded-md bg-gradient-to-b from-white/15 to-white/5 ring-1 ring-white/15 backdrop-blur-sm"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{item.label}</span>
        {hasKids && (
          <motion.span
            className="relative z-10"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={13} />
          </motion.span>
        )}
        {active && (
          <motion.span
            layoutId="navActive"
            className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-accent via-accent-light to-accent"
            style={{ boxShadow: '0 0 12px #E67E22' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </NavLink>

      {/* MEGA MENU */}
      {hasKids && (
        <AnimatePresence>
          {isOpen && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(860px,92vw)]"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                initial={{ opacity: 0, y: -16, rotateX: reduce ? 0 : -18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, rotateX: reduce ? 0 : -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top center' }}
                className="relative overflow-hidden rounded-xl border border-accent/30 bg-navy-dark/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              >
                <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="relative grid grid-cols-[1fr_240px] gap-5 p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {item.children.map((child, i) => (
                      <MegaCard
                        key={child.path}
                        child={child}
                        index={i}
                        reduce={reduce}
                        onNavigate={() => setOpen(null)}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col justify-between rounded-lg p-5 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent border border-accent/20">
                    <div>
                      <p className="text-white font-semibold leading-snug">
                        Project ka drawing ya requirement hai?
                      </p>
                      <p className="mt-2 text-xs text-white/60 leading-relaxed">
                        Share karein, hum scope aur timeline ke saath reply karenge.
                      </p>
                    </div>
                    <div className="mt-5 space-y-2">
                      <Link
                        to="/contact"
                        onClick={() => setOpen(null)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-bold"
                      >
                        Request a quote <ArrowRight size={13} />
                      </Link>
                      <Link
                        to="/products"
                        onClick={() => setOpen(null)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-white/20 text-white/90 text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
                      >
                        View all products
                      </Link>
                    </div>
                  </div>
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
   FLOATING PARTICLES (stable — no re-randomising on re-render)
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

  /* cursor spotlight across the header */
  const hx = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${hx}px 50%, rgba(230,126,34,0.12), transparent 70%)`;

  /* scroll: compact state + hide on scroll down / show on scroll up */
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

  /* close everything on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(false);
    setOpen(null);
  }, [location.pathname]);

  /* body lock + Escape */
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

  /* auto-close mobile drawer when resizing to desktop */
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
        {/* soft fade veil — no edge, dissolves into the page (only appears after scroll for readability) */}
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

        {/* cursor spotlight */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: spotlight }}
          />
        )}

        {/* particles only at the top */}
        {!scrolled && !reduce && <FloatingParticles />}

        <div className="container-custom relative">
          <motion.div
            animate={{ height: scrolled ? 70 : 88 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <Logo reduce={reduce} />

            {/* DESKTOP NAV */}
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

            {/* MOBILE TOGGLE */}
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

        {/* scroll progress — weld line */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress, boxShadow: '0 0 12px #E67E22' }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent-dark via-accent to-accent-light"
        />
      </motion.header>

      {/* MOBILE DRAWER — outside header so transforms don't trap `fixed` */}
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