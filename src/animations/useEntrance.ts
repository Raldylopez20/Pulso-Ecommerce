import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

// Entrada única del titular. Se revierte al desmontar y respeta movimiento reducido.
export function useEntrance(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.from('[data-enter]', {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, ref);
    return () => context.revert();
  }, [ref]);
}
