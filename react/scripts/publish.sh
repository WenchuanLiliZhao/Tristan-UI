#!/bin/bash

# Tristan UI Multi-package Publishing Script
# This script builds and publishes all packages in the correct order

set -e

echo "🚀 Starting Tristan UI multi-package publishing..."

# 1. Clean all packages
echo "🧹 Cleaning all packages..."
npm run clean

# 2. Build core package first (no dependencies)
echo "📦 Building @tristan-ui/core..."
cd packages/core
npm run build
cd ../..

# 3. Build timeline package (depends on core)
echo "⏱️ Building @tristan-ui/timeline..."
cd packages/timeline  
npm run build
cd ../..

# 4. Build complete package (depends on both)
echo "🎯 Building tristan-ui (complete package)..."
cd packages/all
npm run build
cd ../..

echo "✅ All packages built successfully!"

# 5. Publish packages (optional - user confirmation)
read -p "Do you want to publish to npm? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📤 Publishing packages..."
    
    # Publish core first
    echo "Publishing @tristan-ui/core..."
    cd packages/core && npm publish && cd ../..
    
    # Publish timeline
    echo "Publishing @tristan-ui/timeline..."
    cd packages/timeline && npm publish && cd ../..
    
    # Publish complete package
    echo "Publishing tristan-ui..."
    cd packages/all && npm publish && cd ../..
    
    echo "🎉 All packages published successfully!"
else
    echo "📝 Packages built but not published. Run 'npm publish' in each package directory when ready."
fi 