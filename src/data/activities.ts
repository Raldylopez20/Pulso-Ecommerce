import type { Localized } from '../types/catalog';
export const activities: Record<string, { label: Localized; ids: string[] }> = {
  training: {
    label: { es: 'Entrenamiento', en: 'Training' },
    ids: ['core-tee', 'training-short', 'oversized-tee', 'dual-short', 'motion-tank', 'lift-tank'],
  },
  running: {
    label: { es: 'Running', en: 'Running' },
    ids: ['essential-tee', 'pace-short', 'taper-pant', 'flow-jogger'],
  },
  everyday: {
    label: { es: 'Día a día', en: 'Everyday' },
    ids: ['essential-tee', 'oversized-tee', 'track-pant', 'flow-jogger', 'rest-jogger'],
  },
};
