# Changelog

All notable changes to this project will be documented in this file.

## [0.4.46] - 2025-01-06

### Added
- React Router v7 compatibility support
- Error boundary for navigation components to handle router context issues
- Automatic fallback mechanism for `TristanNavLink` component
- Updated peer dependencies to support React Router DOM v6 and v7

### Fixed
- Fixed "Cannot destructure property 'future' of 'w.useContext(...)' as it is null" error in React Router v7
- Improved navigation component stability across different router versions

### Changed
- Updated README documentation with React Router compatibility information
- Enhanced `TristanNavLink` component with error boundary and fallback navigation
- Updated peer dependencies to include `react-router-dom: ">=6.0.0 <8.0.0"`

### Technical Details
- Implemented `NavLinkErrorBoundary` class component to catch router context errors
- Added graceful fallback to basic anchor navigation when router context is unavailable
- Maintained backward compatibility with React Router v6 while supporting v7

## [0.4.45] - Previous Release
- Previous features and fixes... 