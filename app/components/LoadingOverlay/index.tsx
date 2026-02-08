import type { FC } from 'react';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface LoadingOverlayProps {
  isVisible: boolean;
  className?: string;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isVisible, className }) => {
  if (!isVisible) return null;

  return (
    <div className={parseClassName('loading-overlay-component', className)}>
      <div className="loading-overlay-spinner">
        <span className="loading loading-spinner loading-xl" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
