import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import type { BaseComponentProps, Size } from '../../types';
import { Icon } from '../../general';

export interface TimePickerProps extends BaseComponentProps {
  /** Size of the time picker */
  size?: Size;
  /** Whether the time picker is disabled */
  disabled?: boolean;
  /** Start date value in YYYY-MM-DD format */
  startDate?: string;
  /** End date value in YYYY-MM-DD format */
  endDate?: string;
  /** Placeholder for start date */
  startDatePlaceholder?: string;
  /** Placeholder for end date */
  endDatePlaceholder?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
  
  // Event handlers
  /** Called when start date changes */
  onStartDateChange?: (date: string) => void;
  /** Called when end date changes */
  onEndDateChange?: (date: string) => void;
  /** Called when any date changes */
  onChange?: (startDate: string, endDate: string) => void;
  /** Called when Enter key is pressed */
  onEnter?: (startDate: string, endDate: string) => void;
}

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  size: Size;
  autoFocus?: boolean;
  onEnter?: () => void;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  disabled,
  size,
  autoFocus = false,
  onEnter,
}) => {
  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  // Parse date string into components
  const [year, month, day] = value.split('-').concat(['', '', '']);

  useEffect(() => {
    if (autoFocus && yearRef.current) {
      yearRef.current.focus();
    }
  }, [autoFocus]);

  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, '').slice(0, 4);
    const newDate = `${newYear}-${month}-${day}`;
    onChange(newDate);

    // Auto focus to month when year is complete
    if (newYear.length === 4 && monthRef.current) {
      monthRef.current.focus();
    }
  }, [month, day, onChange]);

  const handleMonthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value.replace(/\D/g, '').slice(0, 2);
    
    // Only validate and pad if we have a complete entry or if it's empty
    let validMonth = newMonth;
    if (newMonth.length === 2) {
      // Validate month (01-12) and pad
      const monthNum = Math.max(1, Math.min(12, parseInt(newMonth, 10)));
      validMonth = monthNum.toString().padStart(2, '0');
    } else if (newMonth.length === 1 && parseInt(newMonth, 10) > 1) {
      // If single digit > 1, it's probably a complete month (like 2-9 becomes 02-09)
      const monthNum = Math.max(1, Math.min(12, parseInt(newMonth, 10)));
      validMonth = monthNum.toString().padStart(2, '0');
    }
    
    const newDate = `${year}-${validMonth}-${day}`;
    onChange(newDate);

    // Auto focus to day when month is complete (2 digits)
    if (validMonth.length === 2 && dayRef.current) {
      dayRef.current.focus();
    }
  }, [year, day, onChange]);

  const handleDayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value.replace(/\D/g, '').slice(0, 2);
    
    // Only validate and pad if we have a complete entry or if it's empty
    let validDay = newDay;
    if (newDay.length === 2) {
      // Validate day (01-31) and pad
      const dayNum = Math.max(1, Math.min(31, parseInt(newDay, 10)));
      validDay = dayNum.toString().padStart(2, '0');
    } else if (newDay.length === 1 && parseInt(newDay, 10) > 3) {
      // If single digit > 3, it's probably a complete day (like 4-9 becomes 04-09)
      const dayNum = Math.max(1, Math.min(31, parseInt(newDay, 10)));
      validDay = dayNum.toString().padStart(2, '0');
    }
    
    const newDate = `${year}-${month}-${validDay}`;
    onChange(newDate);

    // Call onEnter when day is complete (2 digits)
    if (validDay.length === 2 && onEnter) {
      onEnter();
    }
  }, [year, month, onChange, onEnter]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, nextRef?: React.RefObject<HTMLInputElement | null>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
      if (nextRef?.current) {
        e.preventDefault();
        nextRef.current.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      const target = e.target as HTMLInputElement;
      if (target === monthRef.current && yearRef.current) {
        e.preventDefault();
        yearRef.current.focus();
      } else if (target === dayRef.current && monthRef.current) {
        e.preventDefault();
        monthRef.current.focus();
      }
    }
  }, [onEnter]);

  const baseClass = 'tristan-date-input';

  return (
    <div className={`${styles[baseClass]} ${styles[`${baseClass}--${size}`]}`}>
      <input
        ref={yearRef}
        type="text"
        value={year}
        onChange={handleYearChange}
        onKeyDown={(e) => handleKeyDown(e, monthRef)}
        placeholder="YYYY"
        maxLength={4}
        disabled={disabled}
        className={styles[`${baseClass}__year`]}
        aria-label="Year"
      />
      <span className={styles[`${baseClass}__separator`]}>-</span>
      <input
        ref={monthRef}
        type="text"
        value={month}
        onChange={handleMonthChange}
        onKeyDown={(e) => handleKeyDown(e, dayRef)}
        placeholder="MM"
        maxLength={2}
        disabled={disabled}
        className={styles[`${baseClass}__month`]}
        aria-label="Month"
      />
      <span className={styles[`${baseClass}__separator`]}>-</span>
      <input
        ref={dayRef}
        type="text"
        value={day}
        onChange={handleDayChange}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="DD"
        maxLength={2}
        disabled={disabled}
        className={styles[`${baseClass}__day`]}
        aria-label="Day"
      />
    </div>
  );
};

export const TimePicker: React.FC<TimePickerProps> = ({
  size = 'medium',
  disabled = false,
  startDate = '',
  endDate = '',
  startDatePlaceholder = 'Start Date',
  endDatePlaceholder = 'End Date',
  autoFocus = false,
  style,
  onStartDateChange,
  onEndDateChange,
  onChange,
  onEnter,
  className = '',
  'data-testid': dataTestId,
  ...rest
}) => {
  const [internalStartDate, setInternalStartDate] = useState('');
  const [internalEndDate, setInternalEndDate] = useState('');
  const [focusedField, setFocusedField] = useState<'start' | 'end' | null>(null);

  // Use controlled values if provided, otherwise use internal state
  const currentStartDate = startDate !== undefined ? startDate : internalStartDate;
  const currentEndDate = endDate !== undefined ? endDate : internalEndDate;

  // Date validation function
  const validateDateRange = useCallback((start: string, end: string) => {
    // Only validate if both dates are complete (YYYY-MM-DD format)
    const isStartComplete = start && start.match(/^\d{4}-\d{2}-\d{2}$/);
    const isEndComplete = end && end.match(/^\d{4}-\d{2}-\d{2}$/);
    
    if (isStartComplete && isEndComplete) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      
      // Check if dates are valid
      if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
        if (startDateObj > endDateObj) {
          alert('⚠️ 警告：开始日期不能晚于结束日期！\n\n开始日期: ' + start + '\n结束日期: ' + end);
          return false;
        }
      }
    }
    
    return true;
  }, []);

  const handleStartDateChange = useCallback((newStartDate: string) => {
    if (startDate === undefined) {
      setInternalStartDate(newStartDate);
    }
    onStartDateChange?.(newStartDate);
    onChange?.(newStartDate, currentEndDate);
    
    // Validate date range after state update
    setTimeout(() => {
      validateDateRange(newStartDate, currentEndDate);
    }, 0);
  }, [startDate, currentEndDate, onStartDateChange, onChange, validateDateRange]);

  const handleEndDateChange = useCallback((newEndDate: string) => {
    if (endDate === undefined) {
      setInternalEndDate(newEndDate);
    }
    onEndDateChange?.(newEndDate);
    onChange?.(currentStartDate, newEndDate);
    
    // Validate date range after state update
    setTimeout(() => {
      validateDateRange(currentStartDate, newEndDate);
    }, 0);
  }, [endDate, currentStartDate, onEndDateChange, onChange, validateDateRange]);

  const handleStartDateComplete = useCallback(() => {
    setFocusedField('end');
  }, []);

  const handleEnter = useCallback(() => {
    onEnter?.(currentStartDate, currentEndDate);
  }, [currentStartDate, currentEndDate, onEnter]);

  const baseClass = 'tristan-time-picker';
  const containerClasses = [
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      data-testid={dataTestId}
      style={style}
      {...rest}
    >
      <div className={styles[`${baseClass}__field`]}>
        <label className={styles[`${baseClass}__label`]}>{startDatePlaceholder}</label>
        <DateInput
          value={currentStartDate}
          onChange={handleStartDateChange}
          disabled={disabled}
          size={size}
          autoFocus={autoFocus}
          onEnter={handleStartDateComplete}
        />
      </div>

      <div className={styles[`${baseClass}__arrow`]}>
        <Icon name="arrow_forward" />
      </div>

      <div className={styles[`${baseClass}__field`]}>
        <label className={styles[`${baseClass}__label`]}>{endDatePlaceholder}</label>
        <DateInput
          value={currentEndDate}
          onChange={handleEndDateChange}
          disabled={disabled}
          size={size}
          autoFocus={focusedField === 'end'}
          onEnter={handleEnter}
        />
      </div>
    </div>
  );
}; 