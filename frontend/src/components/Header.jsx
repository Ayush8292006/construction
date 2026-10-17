import { useState, useEffect, useRef, useId } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { NAV, CONTACT } from '../config/site';

/* ============================================================
   Header — Amit Engineering Co.
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1];
const NOTCH = 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const isActivePath = (pathname, to) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

/* ---------- scroll state ---------- */
function useScrollState() {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setState((s) => {
        const scrolled = y > 24;
        let hidden = s.hidden;
        if (y < 480) hidden = false;
        else if (delta > 6) hidden = true;
        else if (delta < -6) hidden = false;
        return scrolled === s.scrolled && hidden === s.hidden ? s : { scrolled, hidden };
      });
      lastY.current = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}

/* ---------- Logo: real mark + typeset name ---------- */
function Logo() {
  return (
    <Link
      to="/"
      aria-label="Amit Engineering Co. — Home"
      className={`group flex shrink-0 items-center gap-3 rounded-sm ${FOCUS}`}
    >
      {/* Logo mark */}
      <div className="relative w-11 h-11 shrink-0 rounded-sm overflow-hidden bg-white/5 border border-white/10 transition-transform duration-500 group-hover:-translate-y-0.5">
        <img
          src="/logo.jpeg"
          alt="Amit Engineering Co."
          className="w-full h-full object-contain p-0.5"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fb = e.currentTarget.nextSibling;
            if (fb) fb.style.display = 'flex';
          }}
        />
        {/* Fallback if logo not found */}
        <span
          className="hidden text-white font-extrabold text-xs w-full h-full items-center justify-center"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          AE
        </span>
      </div>

      {/* Wordmark */}
      <span className="leading-none hidden sm:block">
        <span
          className="block font-display text-[14px] font-extrabold tracking-[0.06em] text-white sm:text-[15px]"
          style={{ fontStretch: '115%' }}
        >
          AMIT ENGINEERING CO.
        </span>
        <span className="mt-1.5 flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
          <span
            aria-hidden
            className="h-px w-4 bg-accent transition-all duration-500 group-hover:w-7"
          />
          Fabrication · Erection
        </span>
      </span>
    </Link>
  );
}

/* ---------- Top info bar (desktop) ---------- */
function TopBar({ collapsed }) {
  return (
    <div
      className={`hidden overflow-hidden transition-[max-height,opacity] duration-500 lg:block ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
      }`}
    >
      <div className="border-b border-white/10">
        <div className="container-custom flex h-9 items-center justify-between gap-6 text-[12.5px] text-white/60">
          <p className="truncate">
            Industrial fabrication &amp; mechanical execution — Chemical · Pharma · EPC
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <a
              href={CONTACT.phoneHref}
              className={`inline-flex items-center gap-2 transition-colors hover:text-white ${FOCUS}`}
            >
              <Phone size={13} className="text-accent" aria-hidden />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`inline-flex items-center gap-2 transition-colors hover:text-white ${FOCUS}`}
            >
              <Mail size={13} className="text-accent" aria-hidden />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 transition-colors hover:text-white ${FOCUS}`}
            >
              <MessageCircle size={13} className="text-accent" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Desktop nav link ---------- */
function NavText({ label, active }) {
  return (
    <>
      <span className="relative">{label}</span>
      {active ? (
        <motion.span
          layoutId="nav-active"
          aria-hidden
          className="absolute inset-x-2.5 -bottom-px h-[2px] bg-accent"
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-x-2.5 -bottom-px h-px origin-left scale-x-0 bg-white/50 transition-transform duration-300 group-hover:scale-x-100"
        />
      )}
    </>
  );
}

const linkCls = (active) =>
  `group relative flex items-center px-2.5 py-2 text-[13.5px] font-medium transition-colors xl:px-3 ${
    active ? 'text-white' : 'text-white/75 hover:text-white'
  } ${FOCUS}`;

/* ---------- Products mega menu ---------- */
function ProductsMenu({ item, pathname, open, setOpen }) {
  const panelId = useId();
  const wrap = useRef(null);
  const btn = useRef(null);
  const closeTimer = useRef();
  const lastPointer = useRef('');
  const active = isActivePath(pathname, item.path);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false);
          btn.current?.focus();
        }
      }}
    >
      <div className="flex items-center">
        <NavLink
          to={item.path}
          className={linkCls(active)}
          aria-current={active ? 'page' : undefined}
        >
          <NavText label={item.label} active={active} />
        </NavLink>
        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Close' : 'Open'} ${item.label} menu`}
          onPointerDown={(e) => {
            lastPointer.current = e.pointerType;
          }}
          onClick={() => {
            if (lastPointer.current === 'mouse') setOpen(true);
            else setOpen((v) => !v);
            lastPointer.current = '';
          }}
          className={`-ml-1.5 grid h-8 w-6 place-items-center text-white/60 transition-colors hover:text-white ${FOCUS}`}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? 'rotate-180 text-accent' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: EASE }}
            style={{ x: '-50%' }}
            className="absolute left-1/2 top-full z-10 w-[min(700px,calc(100vw-48px))] pt-3"
          >
            <div className="grid grid-cols-[1.4fr_1fr] overflow-hidden border border-white/10 bg-navy-dark shadow-[0_28px_60px_-20px_rgba(0,0,0,0.75)]">
              <ul className="p-2">
                {item.children.map((child) => {
                  const Icon = child.icon;
                  const childActive = isActivePath(pathname, child.path);
                  return (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        onClick={() => setOpen(false)}
                        aria-current={childActive ? 'page' : undefined}
                        className={`group/item flex items-center gap-3.5 px-3 py-3 transition-colors hover:bg-white/[0.05] ${
                          childActive ? 'bg-white/[0.05]' : ''
                        } ${FOCUS}`}
                      >
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center transition-colors ${
                            childActive
                              ? 'bg-accent text-navy-dark'
                              : 'bg-white/[0.06] text-accent group-hover/item:bg-accent group-hover/item:text-navy-dark'
                          }`}
                        >
                          <Icon size={17} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[14px] font-semibold ${
                              childActive ? 'text-accent' : 'text-white'
                            }`}
                          >
                            {child.label}
                          </span>
                          <span className="mt-0.5 block truncate text-[12.5px] text-white/55">
                            {child.desc}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden
                          className="shrink-0 -translate-x-1 text-white/40 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="relative flex flex-col justify-between border-l border-white/10 bg-white/[0.03] p-6">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-accent" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Request a quotation
                  </p>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-white">
                    Have a drawing, BOQ or specification?
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                    Send it with your enquiry. We review the scope and come back with questions or a quotation.
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    style={{ clipPath: NOTCH }}
                    className={`group/cta inline-flex w-full items-center justify-between bg-accent px-4 py-3 text-[13px] font-bold text-navy-dark transition-colors hover:bg-accent-light ${FOCUS}`}
                  >
                    Send an Enquiry
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover/cta:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                  <a
                    href={CONTACT.phoneHref}
                    className={`flex items-center gap-2 text-[13px] text-white/70 hover:text-white ${FOCUS}`}
                  >
                    <Phone size={13} className="text-accent" aria-hidden />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Mobile drawer ---------- */
function MobileMenu({ open, onClose, pathname, reduce }) {
  const [expanded, setExpanded] = useState(() =>
    NAV.some((i) => i.children && isActivePath(pathname, i.path))
  );
  const firstLink = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => firstLink.current?.focus(), 60);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-navy-dark pb-[max(24px,env(safe-area-inset-bottom))] pt-[84px]"
          >
            <nav aria-label="Mobile" className="px-5">
              <ul className="border-t border-white/10">
                {NAV.map((item, idx) => {
                  const active = isActivePath(pathname, item.path);
                  return (
                    <li key={item.path} className="border-b border-white/10">
                      <div className="flex items-stretch">
                        <NavLink
                          ref={idx === 0 ? firstLink : undefined}
                          to={item.path}
                          end={item.path === '/'}
                          aria-current={active ? 'page' : undefined}
                          className={`relative flex-1 py-4 pl-4 text-[17px] font-semibold ${
                            active ? 'text-accent' : 'text-white'
                          } ${FOCUS}`}
                        >
                          {active && (
                            <span
                              aria-hidden
                              className="absolute bottom-3 left-0 top-3 w-[3px] bg-accent"
                            />
                          )}
                          {item.label}
                        </NavLink>
                        {item.children && (
                          <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            aria-controls="mobile-products"
                            aria-label={`${expanded ? 'Hide' : 'Show'} ${item.label}`}
                            className={`grid w-14 place-items-center border-l border-white/10 text-white/70 ${FOCUS}`}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                expanded ? 'rotate-180 text-accent' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {item.children && (
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul
                              id="mobile-products"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                              className="overflow-hidden"
                            >
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                const childActive = isActivePath(pathname, child.path);
                                return (
                                  <li key={child.path}>
                                    <Link
                                      to={child.path}
                                      aria-current={childActive ? 'page' : undefined}
                                      className={`flex items-center gap-3 py-3 pl-6 pr-3 ${
                                        childActive ? 'text-accent' : 'text-white/80'
                                      } ${FOCUS}`}
                                    >
                                      <Icon size={16} className="shrink-0 text-accent" aria-hidden />
                                      <span>
                                        <span className="block text-[15px]">{child.label}</span>
                                        <span className="block text-[12.5px] text-white/50">
                                          {child.desc}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                              <li className="h-2" aria-hidden />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto space-y-3 px-5 pt-8">
              <Link
                to="/contact"
                style={{ clipPath: NOTCH }}
                className={`flex w-full items-center justify-center gap-2 bg-accent px-6 py-4 text-[15px] font-bold text-navy-dark ${FOCUS}`}
              >
                Discuss Your Project <ArrowRight size={16} aria-hidden />
              </Link>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={CONTACT.phoneHref}
                  className={`flex flex-col items-center gap-1.5 border border-white/15 py-3 text-[12.5px] text-white/80 ${FOCUS}`}
                >
                  <Phone size={16} className="text-accent" aria-hidden /> Call
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex flex-col items-center gap-1.5 border border-white/15 py-3 text-[12.5px] text-white/80 ${FOCUS}`}
                >
                  <MessageCircle size={16} className="text-accent" aria-hidden /> WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={`flex flex-col items-center gap-1.5 border border-white/15 py-3 text-[12.5px] text-white/80 ${FOCUS}`}
                >
                  <Mail size={16} className="text-accent" aria-hidden /> Email
                </a>
              </div>
              <p className="pt-2 text-center text-[12.5px] text-white/45">
                {CONTACT.phone} · {CONTACT.email}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN HEADER
   ============================================================ */
export default function Header({ overHero = true }) {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const { scrolled, hidden } = useScrollState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const burger = useRef(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.3 });

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      burger.current?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || mobileOpen || !overHero;
  const hide = hidden && !mobileOpen && !productsOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 bg-accent px-4 py-2 text-sm font-bold text-navy-dark transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={false}
        animate={{ y: hide ? '-100%' : '0%' }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          solid
            ? 'border-b border-white/10 bg-navy-dark/95 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-navy-dark/70 to-transparent'
        }`}
      >
        <TopBar collapsed={scrolled} />

        <div className="container-custom">
          <div
            className={`flex items-center justify-between gap-6 transition-[height] duration-500 ${
              scrolled ? 'h-[68px]' : 'h-[80px]'
            }`}
          >
            <Logo />

            <nav aria-label="Main" className="hidden items-center lg:flex">
              {NAV.map((item) =>
                item.children ? (
                  <ProductsMenu
                    key={item.path}
                    item={item}
                    pathname={pathname}
                    open={productsOpen}
                    setOpen={setProductsOpen}
                  />
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={linkCls(isActivePath(pathname, item.path))}
                    aria-current={isActivePath(pathname, item.path) ? 'page' : undefined}
                  >
                    <NavText label={item.label} active={isActivePath(pathname, item.path)} />
                  </NavLink>
                )
              )}
              <Link
                to="/contact"
                style={{ clipPath: NOTCH }}
                className={`group ml-4 hidden items-center gap-2 bg-accent px-5 py-3 text-[13px] font-bold text-navy-dark transition-colors hover:bg-accent-light xl:inline-flex ${FOCUS}`}
              >
                Discuss Your Project
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </nav>

            <button
              ref={burger}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`grid h-11 w-11 place-items-center border border-white/20 text-white lg:hidden ${FOCUS}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* scroll progress bar */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        reduce={reduce}
      />
    </>
  );
}