import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import gsap from 'gsap';

export function useLookTransition(ref: RefObject<HTMLElement | null>, image: string) {
  const [displayed, setDisplayed] = useState(image);
  const [incoming, setIncoming] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  // Decodifica antes de revelar. Los clics rápidos conservan el barrido activo
  // y después preparan únicamente la última selección solicitada.
  useEffect(() => {
    if (incoming || image === displayed) return;
    let cancelled = false;
    setFailed(false);
    const next = new Image();
    next.onload = async () => {
      try {
        await next.decode();
        if (!cancelled) setIncoming(image);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    next.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    next.src = `${import.meta.env.BASE_URL}images/${image}.webp`;
    return () => {
      cancelled = true;
    };
  }, [image, displayed, incoming]);

  // Un mismo progreso controla la nueva foto y el centro de la luz.
  // Debajo del barrido permanece visible el look anterior.
  useLayoutEffect(() => {
    const stage = ref.current;
    if (!stage || !incoming) return;
    const complete = () => {
      setDisplayed(incoming);
      setIncoming(null);
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      complete();
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(
        stage,
        { '--look-reveal': '0%' },
        {
          '--look-reveal': '100%',
          duration: 1.05,
          ease: 'power2.inOut',
          onComplete: complete,
        },
      );
    }, ref);
    return () => context.revert();
  }, [ref, incoming]);
  return { displayed, incoming, failed };
}
