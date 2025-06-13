// Export types
export type {
  BaseComponentProps,
  Size,
  Color,
  InputProps,
  Theme
} from './components/types';

// Import styles
import './styles/_app.scss'

// Lili Design System - Main Entry Point
import './components/Button/Button.module.scss';
export { Button, type ButtonProps } from './components/Button/Button';

import './components/Icon/Icon.scss';
export { default as Icon, availableIcons, type IconProps } from './components/Icon/Icon';