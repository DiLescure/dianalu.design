import { type ComponentProps, useState } from 'react';

import { parseClassName } from '@/util/parse-class-name';

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
} & Omit<ComponentProps<'img'>, 'src' | 'alt' | 'loading'>;

const Image = ({ src, alt, className, loading = 'lazy', ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageClasses = parseClassName(
    'transition-opacity duration-300',
    isLoading ? 'opacity-0' : 'opacity-100',
    className,
  );

  return (
    <div className="image-component relative">
      {isLoading && !hasError && <div className="absolute inset-0 skeleton" />}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 text-base-content/50">
          Failed to load image
        </div>
      )}

      <img
        {...props}
        src={src}
        alt={alt}
        loading={loading}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default Image;
