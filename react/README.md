# 🎨 Tristan Design System

[![npm version](https://badge.fury.io/js/tristan-ui.svg)](https://badge.fury.io/js/tristan-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern React component library and design system built with TypeScript and SCSS.

## 🚀 Requirements

- **React**: >=18.0.0
- **React DOM**: >=18.0.0  
- **React Router DOM**: >=6.0.0 <8.0.0 (supports both v6 and v7)

## 📦 Installation

```bash
npm install tristan-ui
```

Note: Make sure you have React Router DOM installed as a peer dependency:

```bash
npm install react-router-dom
```

## 🔄 React Router Compatibility

This library supports both React Router v6 and v7. The navigation components (`TristanNavLink`, etc.) include automatic fallback mechanisms to ensure compatibility across different router versions.

If you encounter any router context issues, the components will gracefully fall back to basic navigation functionality while logging helpful warnings.

## 🎯 Usage

```jsx
import { TristanNavLink, TopNav, Button } from 'tristan-ui';
import 'tristan-ui/style.css';

function App() {
  return (
    <TopNav
      left={[<Logo />]}
      right={[
        <TristanNavLink to="/" name="Home" />,
        <TristanNavLink to="/about" name="About" />
      ]}
    />
  );
}
```

## 📚 Documentation

For detailed component documentation and examples, please visit our documentation site.

