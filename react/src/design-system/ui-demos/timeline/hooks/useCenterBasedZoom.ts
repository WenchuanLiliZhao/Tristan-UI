/**
 * 为Timeline提供容器引用的缩放Hook
 * 简化版本，主要提供DOM元素引用
 */

import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCenterBasedZoom = (_zoomLevel: number) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return {
    containerRef
  };
}; 