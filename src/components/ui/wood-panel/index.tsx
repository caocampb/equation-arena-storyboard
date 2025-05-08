import React from 'react';
import { cn } from '@/lib/utils';
import styles from './wood-panel.module.css';

export interface WoodPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  panelTitle?: React.ReactNode;
  nailPositions?: {
    topLeft?: [number, number]; // [top, left] in pixels
    topRight?: [number, number]; // [top, right] in pixels
    bottomLeft?: [number, number]; // [bottom, left] in pixels
    bottomRight?: [number, number]; // [bottom, right] in pixels
  };
  innerClassName?: string;
  titleClassName?: string;
  children: React.ReactNode;
}

export const WoodPanel = ({
  panelTitle,
  nailPositions,
  className,
  innerClassName,
  titleClassName,
  children,
  ...props
}: WoodPanelProps) => {
  // Default nail positions
  const defaultNailPositions = {
    topLeft: [8, 8],
    topRight: [8, 8],
    bottomLeft: [8, 8],
    bottomRight: [8, 8],
  };

  // Merge provided positions with defaults
  const mergedPositions = {
    ...defaultNailPositions,
    ...nailPositions,
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      <div className={styles.panel}>
        {/* Nails with custom positioning */}
        <div 
          className={styles.nail} 
          style={{ 
            top: `${mergedPositions.topLeft[0]}px`, 
            left: `${mergedPositions.topLeft[1]}px` 
          }}
        />
        <div 
          className={styles.nail} 
          style={{ 
            top: `${mergedPositions.topRight[0]}px`, 
            right: `${mergedPositions.topRight[1]}px` 
          }}
        />
        <div 
          className={styles.nail} 
          style={{ 
            bottom: `${mergedPositions.bottomLeft[0]}px`, 
            left: `${mergedPositions.bottomLeft[1]}px` 
          }}
        />
        <div 
          className={styles.nail} 
          style={{ 
            bottom: `${mergedPositions.bottomRight[0]}px`, 
            right: `${mergedPositions.bottomRight[1]}px` 
          }}
        />

        {/* Optional title */}
        {panelTitle && (
          <div className={styles.titleBar}>
            <h3 className={cn(styles.title, titleClassName)}>
              {panelTitle}
            </h3>
          </div>
        )}

        {/* Content area */}
        <div className={cn(styles.inner, innerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default WoodPanel; 