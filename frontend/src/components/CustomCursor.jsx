import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const outerX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.5 });
  const outerY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.5 });

  const innerX = useSpring(mouseX, { stiffness: 600, damping: 30, mass: 0.3 });
  const innerY = useSpring(mouseY, { stiffness: 600, damping: 30, mass: 0.3 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const over = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]');
      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* ============ OUTER RING ============ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : isClicking ? 0.85 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="relative"
          style={{ width: 24, height: 24 }}
        >
          {/* Main dark-gold circle border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1.5px solid #B8860B',
              boxShadow:
                '0 0 12px rgba(184,134,11,0.8), inset 0 0 6px rgba(184,134,11,0.4)',
            }}
          />

          {/* Dashed outer ring — darker gold */}
          <div
            className="absolute rounded-full"
            style={{
              inset: -4,
              border: '1px dashed rgba(184,134,11,0.6)',
            }}
          />

          {/* Orbit dot — dark gold */}
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: -2,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#DAA520',
              boxShadow: '0 0 8px #B8860B, 0 0 14px #B8860B',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ============ INNER DOT ============ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0.6 : isClicking ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-1 h-1 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #DAA520, #B8860B)',
            boxShadow: '0 0 8px rgba(184,134,11,0.9)',
          }}
        />
      </motion.div>

      {/* ============ AMBIENT GLOW ============ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? (isHovering ? 0.5 : 0.3) : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="w-14 h-14 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(184,134,11,0.6) 0%, rgba(184,134,11,0) 70%)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;