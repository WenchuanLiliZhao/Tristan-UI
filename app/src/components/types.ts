// Design System Base Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Size variants
export type Size = 'small' | 'medium' | 'large';

// Color variants
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Button specific types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: Size;
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input specific types
export interface InputProps extends BaseComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  size?: Size;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
} 