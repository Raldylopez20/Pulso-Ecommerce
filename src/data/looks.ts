import type { Look } from '../types/catalog';
export const looks: Look[] = [
  {
    id: '01',
    name: 'The daily athlete',
    image: 'look-01',
    products: ['core-tee', 'training-short'],
  },
  { id: '02', name: 'Find your pace', image: 'look-02', products: ['essential-tee', 'pace-short'] },
  { id: '03', name: 'One more rep', image: 'look-03', products: ['oversized-tee', 'dual-short'] },
  { id: '04', name: 'Always in motion', image: 'look-04', products: ['motion-tank', 'track-pant'] },
  { id: '05', name: 'Built to lift', image: 'look-05', products: ['lift-tank', 'taper-pant'] },
  { id: '06', name: 'Everyday flow', image: 'look-06', products: ['core-tee', 'flow-jogger'] },
  {
    id: '07',
    name: 'Off-duty energy',
    image: 'look-07',
    products: ['essential-tee', 'rest-jogger'],
  },
  {
    id: '08',
    name: 'Light training',
    image: 'mix-white-short',
    products: ['essential-tee', 'training-short'],
  },
  { id: '09', name: 'All black', image: 'mix-black-jogger', products: ['core-tee', 'rest-jogger'] },
  {
    id: '10',
    name: 'Grey session',
    image: 'mix-grey-short',
    products: ['reference-tank', 'training-short'],
  },
  {
    id: '11',
    name: 'Grey recovery',
    image: 'mix-grey-jogger',
    products: ['reference-tank', 'rest-jogger'],
  },
];
