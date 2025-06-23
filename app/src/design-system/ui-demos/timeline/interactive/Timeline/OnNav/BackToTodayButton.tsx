import React from 'react';
import { Button, type ButtonProps } from '../../../ui';

interface BackToTodayButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dayWidth: number;
  yearList: number[];
  startMonth: number;
  buttonText?: string;
}

/**
 * BackToTodayButton 组件
 * 
 * 一个简化的按钮组件，用于Timeline中的"回到今天"功能
 */
export const BackToTodayButton: React.FC<BackToTodayButtonProps> = ({
  containerRef,
  dayWidth,
  yearList,
  startMonth,
  buttonText = "Today",
  variant = "outline",
  size = "small",
  ...buttonProps
}) => {
  const scrollToToday = () => {
    // 简化的滚动到今天逻辑
    if (containerRef.current) {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();
      
      // 计算今天的位置
      let totalDays = 0;
      
      for (let yearIndex = 0; yearIndex < yearList.length; yearIndex++) {
        const year = yearList[yearIndex];
        if (year > todayYear) break;
        
        const monthStart = yearIndex === 0 ? startMonth : 0;
        const monthEnd = year === todayYear ? todayMonth : 11;
        
        for (let month = monthStart; month <= monthEnd; month++) {
          if (year === todayYear && month === todayMonth) {
            totalDays += todayDay - 1;
            break;
          } else {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            totalDays += daysInMonth;
          }
        }
      }
      
      const scrollLeft = totalDays * dayWidth;
      containerRef.current.scrollLeft = scrollLeft;
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={scrollToToday}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default BackToTodayButton; 