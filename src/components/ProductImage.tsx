import './ProductImage.css';
interface Props {
  image: string;
  alt: string;
  crop?: 'top' | 'bottom' | 'full';
  eager?: boolean;
}
export function ProductImage({ image, alt, crop = 'full', eager = false }: Props) {
  return (
    <div className={`product-photo product-photo--${crop}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/${image}.webp`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
