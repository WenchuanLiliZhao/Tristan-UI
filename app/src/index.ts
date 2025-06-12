// Lili Design System - Main Entry Point
export { default as Button } from './components/Button/Button';

// Export types
export type {
  BaseComponentProps,
  Size,
  Color,
  ButtonProps,
  InputProps,
  Theme
} from './components/types';

// Export theme and utilities (to be implemented)
// export { defaultTheme } from './theme';
// export { ThemeProvider } from './theme/ThemeProvider';

// Re-export all components
export * from './components'; 