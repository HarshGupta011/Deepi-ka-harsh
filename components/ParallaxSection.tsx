'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  fadeIn?: boolean;
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  fadeIn = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onResize = () => {
      setElementTop(element.offsetTop);
      setClientHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);

  const yRange = direction === 'up'
    ? [100 * speed, -100 * speed]
    : [-100 * speed, 100 * speed];

  const y = useTransform(scrollY, [initial, final], yRange);
  const opacity = useTransform(
    scrollY,
    [initial, initial + clientHeight * 0.3, final - clientHeight * 0.3, final],
    fadeIn ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating decorative element with parallax
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  range?: number;
}

export function FloatingElement({
  children,
  className = '',
  delay = 0,
  duration = 6,
  range = 20,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-range / 2, range / 2, -range / 2],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax background layer
interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
  children?: ReactNode;
}

export function ParallaxBackground({
  className = '',
  speed = 0.3,
  children,
}: ParallaxBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div
      style={{ y }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
