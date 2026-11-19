import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const easeArchitectural = EASE;

export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const revealSlow: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.09): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const viewport = { once: true, margin: '-80px' } as const;
