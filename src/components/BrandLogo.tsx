import React from 'react';

export type LogoVariant = 'green-on-paper' | 'white-on-green' | 'white-on-deep' | 'square-icon';

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  height?: number | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'green-on-paper',
  className = '',
  height,
}) => {
  let src = '/logo/logo-green.png';

  if (variant === 'white-on-green') {
    src = '/brand/youzersef-logo-white-on-green.png';
  } else if (variant === 'white-on-deep') {
    src = '/brand/youzersef-logo-white-on-deep.png';
  } else if (variant === 'square-icon') {
    src = '/brand/youzersef-icon-square.png';
  }

  const style = height !== undefined
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : undefined;

  return (
    <img
      src={src}
      alt="يوزرسيف"
      style={style}
      className={`w-auto object-contain select-none transition-transform duration-200 ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
