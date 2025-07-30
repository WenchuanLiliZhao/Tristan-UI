import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import type { BaseComponentProps, Size } from '../../types';
import { Icon } from '../../general';
import { HoverBox } from '../../shared/HoverBox';

export interface NumericInputProps extends BaseComponentProps {
  /** Input variant style */
  variant?: 'outlined' | 'filled' | 'ghost';
  /** Size of the input */
  size?: Size;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Icon name for the input (using Lucide icons) */
  icon?: string;
  /** Label/name for the input */
  label?: string;
  /** Current numeric value */
  value?: number;
  /** Default value when uncontrolled */
  defaultValue?: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment for keyboard controls */
  step?: number;
  /** Unit to display after the value */
  unit?: string;
  /** Whether the value is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  
  // Event handlers
  /** Called when input value changes */
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when Enter key is pressed */
  onEnter?: (value: number) => void;
  /** Called when input is focused */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when any key is pressed */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  icon,
  label,
  value: controlledValue,
  defaultValue = 0,
  min,
  max,
  step = 1,
  unit,
  required = false,
  placeholder = '',
  style,
  onChange,
  onEnter,
  onFocus,
  onBlur,
  onKeyDown,
  className = '',
  'data-testid': dataTestId,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || 0;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter?.(value);
    }
    
    // Handle up/down arrow keys for step changes
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      
      const direction = event.key === 'ArrowUp' ? 1 : -1;
      const newValue = value + (direction * step);
      
      // Apply min/max constraints
      const constrainedValue = min !== undefined && newValue < min ? min :
                             max !== undefined && newValue > max ? max :
                             newValue;
      
      if (controlledValue === undefined) {
        setInternalValue(constrainedValue);
      }
      
      // Create a synthetic change event for consistency
      const syntheticEvent = {
        target: { value: constrainedValue.toString() },
        currentTarget: { value: constrainedValue.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange?.(constrainedValue, syntheticEvent);
    }
    
    onKeyDown?.(event);
  };

  const baseClass = 'tristan-numeric-input';
  const containerClasses = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    disabled && styles[`${baseClass}--disabled`],
    required && styles[`${baseClass}--required`],
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
      {/* Icon and Label */}
      {(icon || label) && (
        <div className={styles[`${baseClass}__header`]}>
          {icon && (
            <div className={styles[`${baseClass}__icon`]}>
              <Icon name={icon} />
            </div>
          )}
          {label && (
            <div className={styles[`${baseClass}__label`]}>
              {label}
              {required && <span className={styles[`${baseClass}__required`]}>*</span>}
            </div>
          )}
        </div>
      )}

      {/* Input Container */}
      <div className={styles[`${baseClass}__input-container`]}>
        {/* Input Field */}
        <input
          ref={inputRef}
          type="number"
          className={styles[`${baseClass}__input`]}
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          aria-label={label || 'Numeric input'}
        />

        {/* Unit Display */}
        {unit && (
          <div className={styles[`${baseClass}__unit`]}>
            {unit}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <HoverBox className={styles['hover-box']} />
    </div>
  );
}; 