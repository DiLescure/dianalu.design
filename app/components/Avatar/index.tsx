import React from 'react';

import { parseClassName } from '@/util/parse-class-name';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  online?: boolean;
}

const sizeClasses = {
  xs: 'w-6',
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-16',
  xl: 'w-24',
};

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-3xl',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className,
  online,
}) => {
  const containerClass = parseClassName(
    'avatar',
    !src ? 'placeholder' : undefined,
    online !== undefined ? (online ? 'online' : 'offline') : undefined,
    className,
  );

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const textSizeClass = textSizeClasses[size] || textSizeClasses.md;

  return (
    <div className={containerClass}>
      <div
        className={parseClassName(
          'rounded-full',
          sizeClass,
          !src ? 'bg-neutral text-neutral-content flex justify-center items-center' : undefined,
        )}
      >
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span className={textSizeClass}>
            {initials || alt?.substring(0, 2).toUpperCase() || 'U'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
