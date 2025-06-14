// Export types
export type {
  BaseComponentProps,
  Size,
  Color,
  InputProps,
  Theme
} from './components/types';

// Import global styles
import './styles/_app.scss'

// Export all components (组件自己管理样式导入)
export * from './components/Navigation';
export * from './components/Button';
export * from './components/Icon';