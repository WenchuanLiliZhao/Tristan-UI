import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { BaseComponentProps } from '../../types';

// Create a mapping from Material Icons names to Lucide icons
const iconMapping: Record<string, keyof typeof LucideIcons> = {
  // Navigation icons
  'home': 'Home',
  'menu': 'Menu',
  'search': 'Search',
  'settings': 'Settings',
  'arrow_back': 'ArrowLeft',
  'arrow_forward': 'ArrowRight',
  'expand_more': 'ChevronDown',
  'expand_less': 'ChevronUp',
  'chevron_left': 'ChevronLeft',
  'chevron_right': 'ChevronRight',
  
  // User and social
  'person': 'User',
  'people': 'Users',
  'favorite': 'Heart',
  'star': 'Star',
  'share': 'Share',
  
  // Actions
  'add': 'Plus',
  'remove': 'Minus',
  'edit': 'Edit',
  'delete': 'Trash2',
  'close': 'X',
  'check': 'Check',
  'save': 'Save',
  'copy': 'Copy',
  'cut': 'Scissors',
  'paste': 'Clipboard',
  
  // File operations
  'download': 'Download',
  'upload': 'Upload',
  'folder': 'Folder',
  'file': 'File',
  'attach_file': 'Paperclip',
  
  // Visibility
  'visibility': 'Eye',
  'visibility_off': 'EyeOff',
  
  // Status and feedback
  'info': 'Info',
  'warning': 'AlertTriangle',
  'error': 'AlertCircle',
  'check_circle': 'CheckCircle',
  'cancel': 'XCircle',
  
  // Media controls
  'play_arrow': 'Play',
  'pause': 'Pause',
  'stop': 'Square',
  'volume_up': 'Volume2',
  'volume_off': 'VolumeX',
  
  // Communication
  'email': 'Mail',
  'phone': 'Phone',
  'message': 'MessageSquare',
  
  // Common UI
  'more_vert': 'MoreVertical',
  'more_horiz': 'MoreHorizontal',
  'keyboard_arrow_down': 'ChevronDown',
  'keyboard_arrow_up': 'ChevronUp',
  'keyboard_arrow_left': 'ChevronLeft',
  'keyboard_arrow_right': 'ChevronRight',
};

export interface IconProps extends BaseComponentProps {
  /** Icon name - uses Material Symbols official names, mapped to Lucide icons */
  name: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Whether to use filled (filled) mode - simulated with Lucide icons */
  filled?: boolean;
  /** Icon size in pixels, inherits parent font-size if not specified */
  size?: number;
}

/**
 * Icon Component - Based on Lucide React icons with Material Icons name compatibility
 * 
 * @example
 * ```tsx
 * <Icon name="home" />
 * <Icon name="person" filled />
 * <Icon name="settings" size={24} />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style,
  filled = false,
  size,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Map Material Icons name to Lucide icon
  const lucideIconName = iconMapping[name];
  
  if (!lucideIconName) {
    console.warn(`Icon "${name}" not found in mapping. Available icons:`, Object.keys(iconMapping));
    // Fallback to a default icon
    const FallbackIcon = LucideIcons.HelpCircle;
    return (
      <FallbackIcon
        className={className}
        style={{
          fontSize: size ? `${size}px` : 'inherit',
          width: size ? `${size}px` : '1em',
          height: size ? `${size}px` : '1em',
          ...style,
        }}
        data-testid={dataTestId}
        {...rest}
      />
    );
  }
  
  const LucideIcon = LucideIcons[lucideIconName] as React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    'data-testid'?: string;
    fill?: string;
  }>;
  
  // For filled mode, we can adjust the styling or use filled variants where available
  const iconStyle: React.CSSProperties = {
    fontSize: size ? `${size}px` : 'inherit',
    width: size ? `${size}px` : '1em',
    height: size ? `${size}px` : '1em',
    // Simulate filled effect by making the icon a bit bolder/darker
    ...(filled && { fontWeight: 'bold', opacity: 0.9 }),
    ...style,
  };
  
  return (
    <LucideIcon
      className={className}
      style={iconStyle}
      data-testid={dataTestId}
      fill={filled ? 'currentColor' : 'none'}
      {...rest}
    />
  );
}; 