import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import type { BaseComponentProps, Size } from '../../types';
import { Icon } from '../Icon';
import { HoverBox } from '../../shared/HoverBox';

export interface SearchBarProps extends BaseComponentProps {
  /** Search bar variant style */
  variant?: 'outlined' | 'filled' | 'ghost';
  /** Size of the search bar */
  size?: Size;
  /** Whether the search bar is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Use as button mode - clicking opens a fullscreen search instead of input */
  useAsButton?: boolean;
  /** Whether to show clear button when there's content */
  showClearButton?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
  
  // Event handlers
  /** Called when input value changes */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when search is triggered (Enter key or search icon click) */
  onSearch?: (value: string) => void;
  /** Called when search bar is clicked in useAsButton mode */
  onClick?: () => void;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Called when input is focused */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when Enter key is pressed */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  placeholder = 'Search...',
  value: controlledValue,
  useAsButton = false,
  showClearButton = true,
  autoFocus = false,
  style,
  onChange,
  onSearch,
  onClick,
  onClear,
  onFocus,
  onBlur,
  onKeyDown,
  className = '',
  'data-testid': dataTestId,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const hasValue = value.length > 0;
  
  useEffect(() => {
    if (autoFocus && !useAsButton && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, useAsButton]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue, event);
  };

  const handleClear = () => {
    const newValue = '';
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onClear?.();
    
    // If controlled, let parent handle the change
    if (controlledValue === undefined && onChange) {
      // Create a synthetic event for consistency
      const syntheticEvent = {
        target: { value: newValue },
        currentTarget: { value: newValue }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(newValue, syntheticEvent);
    }
    
    // Focus input after clearing
    if (!useAsButton && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !useAsButton) {
      onSearch?.(value);
    }
    
    if (event.key === 'Escape' && hasValue && showClearButton) {
      handleClear();
    }
    
    onKeyDown?.(event);
  };

  const handleSearchIconClick = () => {
    if (useAsButton) {
      onClick?.();
    } else {
      onSearch?.(value);
    }
  };

  const handleContainerClick = () => {
    if (useAsButton) {
      onClick?.();
    } else if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const baseClass = 'tristan-search-bar';
  const containerClasses = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    useAsButton && styles[`${baseClass}--button-mode`],
    disabled && styles[`${baseClass}--disabled`],
    hasValue && styles[`${baseClass}--has-value`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      onClick={handleContainerClick}
      data-testid={dataTestId}
      style={style}
      {...rest}
    >
      {/* Search Icon */}
      <button
        type="button"
        className={styles[`${baseClass}__search-icon`]}
        onClick={handleSearchIconClick}
        disabled={disabled}
        tabIndex={-1}
        aria-label="Search"
      >
        <Icon name="search" />
      </button>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        className={styles[`${baseClass}__input`]}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={useAsButton}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        aria-label={useAsButton ? 'Search trigger' : 'Search input'}
        style={{ cursor: useAsButton ? 'pointer' : 'text' }}
      />

      {/* Clear Button */}
      {hasValue && showClearButton && !useAsButton && (
        <button
          type="button"
          className={styles[`${baseClass}__clear-button`]}
          onClick={handleClear}
          disabled={disabled}
          tabIndex={-1}
          aria-label="Clear search"
        >
          <Icon name="close" />
        </button>
      )}

      {/* Button Mode Indicator */}
      {useAsButton && (
        <div className={styles[`${baseClass}__button-indicator`]}>
          <Icon name="arrow_drop_down" />
        </div>
      )}

      {/* Hover Effect */}
      <HoverBox className={styles['hover-box']} />
    </div>
  );
}; 