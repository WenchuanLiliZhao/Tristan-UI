/**
 * 中心缩放Hook - 实现Timeline的"原地"中心点缩放功能
 * 
 * 这个Hook封装了中心缩放的DOM操作逻辑，使用独立的计算器进行数学计算。
 * 主要负责监听缩放级别变化、调用计算器、应用结果到DOM。
 * 
 * 🎯 职责分离：
 * - Hook：处理React生命周期、DOM操作、滚动行为控制
 * - Calculator：纯数学计算，可复用于其他场景
 * 
 * 📐 使用的计算器：
 * - calculateCenterZoomPosition: 核心缩放位置计算
 * - calculateScaleFactor: 缩放因子计算
 * - validateCenterZoomResult: 结果验证（开发模式）
 */

import { useRef, useEffect } from 'react';
import { 
  calculateCenterZoomPosition, 
  calculateScaleFactor,
  validateCenterZoomResult,
  type CenterZoomCalculationInput
} from '../utils/centerZoomCalculator';

// Timeline sidebar 宽度常量
const SIDEBAR_WIDTH = 240;

export const useCenterBasedZoom = (zoomLevel: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevZoomLevelRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 第一次初始化，只记录缩放级别
    if (!isInitializedRef.current) {
      prevZoomLevelRef.current = zoomLevel;
      isInitializedRef.current = true;
      console.log('🎯 CenterBasedZoom initialized with zoomLevel:', zoomLevel);
      return;
    }

    const prevZoomLevel = prevZoomLevelRef.current;
    
    // 缩放级别没有变化，直接返回
    if (prevZoomLevel === null || prevZoomLevel === zoomLevel) return;

    console.log('🔄 Zoom level changed:', { from: prevZoomLevel, to: zoomLevel });

    // 🎯 使用封装的计算器计算缩放因子
    const scaleFactor = calculateScaleFactor(zoomLevel, prevZoomLevel);
    
    console.log('📊 Scale factor:', scaleFactor);
    
    // 如果缩放因子无效（比如为1），跳过处理
    if (scaleFactor === 1) return;
    
    // 🔍 记录当前容器状态和Timeline宽度变化
    const beforeState = {
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      scrollWidth: container.scrollWidth,
      sidebarWidth: SIDEBAR_WIDTH
    };
    
    console.log('📐 Container state BEFORE:', beforeState);
    
    // 🔍 计算期望的Timeline宽度变化
    const expectedScrollWidth = Math.round(beforeState.scrollWidth * scaleFactor);
    const timelineWidthChange = expectedScrollWidth - beforeState.scrollWidth;
    
    console.log('📏 Timeline width analysis:', {
      'current scrollWidth': beforeState.scrollWidth,
      'expected scrollWidth': expectedScrollWidth,
      'width change': timelineWidthChange,
      'scale factor': scaleFactor,
      'dayWidth': { from: prevZoomLevel, to: zoomLevel }
    });

    // 🎯 准备计算器输入参数
    const calculationInput: CenterZoomCalculationInput = {
      currentScrollLeft: container.scrollLeft,
      containerWidth: container.clientWidth,
      sidebarWidth: SIDEBAR_WIDTH,
      scaleFactor: scaleFactor,
      maxScrollWidth: container.scrollWidth
    };
    
    // 🔍 分析当前滚动位置相对于边界的情况
    const maxScrollLeft = beforeState.scrollWidth - beforeState.clientWidth;
    const scrollPositionRatio = beforeState.scrollLeft / maxScrollLeft;
    
    console.log('📍 Scroll position analysis:', {
      'current scrollLeft': beforeState.scrollLeft,
      'max scrollLeft': maxScrollLeft,
      'position ratio': scrollPositionRatio.toFixed(3),
      'is near left edge': beforeState.scrollLeft < 100,
      'is near right edge': (maxScrollLeft - beforeState.scrollLeft) < 100
    });
    
    // 暂时禁用滚动动画
    const originalScrollBehavior = container.style.scrollBehavior;
    container.style.scrollBehavior = 'auto';
    
    // 等待DOM更新后执行缩放调整 - 额外延迟以确保Timeline DOM完全更新
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        // 🔍 记录DOM更新后的状态
        const afterState = {
          scrollLeft: container.scrollLeft,
          clientWidth: container.clientWidth,
          scrollWidth: container.scrollWidth
        };
        
        console.log('📐 Container state AFTER DOM update:', afterState);
        
        // 🔍 检查scrollWidth是否按预期变化
        const actualWidthChange = afterState.scrollWidth - beforeState.scrollWidth;
        const widthChangeError = Math.abs(actualWidthChange - timelineWidthChange);
        
        console.log('📏 Width change verification:', {
          'expected change': timelineWidthChange,
          'actual change': actualWidthChange,
          'error': widthChangeError,
          'scrollWidth updated correctly': widthChangeError < 50
        });
        
        // 🔍 检查是否触及边界
        const newMaxScrollLeft = afterState.scrollWidth - afterState.clientWidth;
        const hitLeftBoundary = beforeState.scrollLeft <= 0;
        const hitRightBoundary = beforeState.scrollLeft >= maxScrollLeft;
        
        console.log('🚨 Boundary analysis:', {
          'old max scroll': maxScrollLeft,
          'new max scroll': newMaxScrollLeft,
          'hit left boundary': hitLeftBoundary,
          'hit right boundary': hitRightBoundary,
          'boundary change': newMaxScrollLeft - maxScrollLeft
        });
        
        // 更新计算输入的maxScrollWidth
        calculationInput.maxScrollWidth = afterState.scrollWidth;
        
        // 🎯 使用封装的计算器计算新位置
        const result = calculateCenterZoomPosition(calculationInput);
        
        console.log('📈 Calculation result:', {
          newScrollLeft: result.newScrollLeft,
          originalCenterPoint: result.originalCenterPoint,
          newCenterPoint: result.newCenterPoint,
          isAtLeftBoundary: result.isAtLeftBoundary,
          isAtRightBoundary: result.isAtRightBoundary,
          contentAreaWidth: result.contentAreaWidth
        });
        
        // 🔍 分析计算结果的合理性
        const scrollLeftChange = result.newScrollLeft - beforeState.scrollLeft;
        const expectedCenterShift = (result.newCenterPoint - result.originalCenterPoint);
        
        console.log('🔍 Result analysis:', {
          'scroll left change': scrollLeftChange,
          'expected center shift': expectedCenterShift,
          'scroll change / center shift ratio': (scrollLeftChange / expectedCenterShift).toFixed(3),
          'result clamped to boundary': result.isAtLeftBoundary || result.isAtRightBoundary
        });
        
        // 🔍 开发模式下验证结果
        const isValid = validateCenterZoomResult(result, calculationInput);
        if (!isValid) {
          console.warn('⚠️ Center zoom calculation produced invalid result', {
            input: calculationInput,
            result
          });
        }
        
        // 🎯 应用计算结果到DOM
        console.log('📍 Applying scroll position:', { 
          from: container.scrollLeft, 
          to: result.newScrollLeft,
          difference: result.newScrollLeft - container.scrollLeft
        });
        
        container.scrollLeft = result.newScrollLeft;
        
        // 🔍 验证最终结果
        const finalScrollLeft = container.scrollLeft;
        const applicationError = Math.abs(finalScrollLeft - result.newScrollLeft);
        
        console.log('✅ Final verification:', {
          'target scroll': result.newScrollLeft,
          'actual scroll': finalScrollLeft,
          'application error': applicationError,
          'applied correctly': applicationError < 1
        });
        
        // 恢复滚动行为
        requestAnimationFrame(() => {
          container.style.scrollBehavior = originalScrollBehavior;
        });
      });
    });
    });
    
    // 更新记录的缩放级别
    prevZoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);

  return {
    containerRef
  };
}; 