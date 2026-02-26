#!/bin/bash
# Verification script for Step 8.2: Verify web build works without Electron

echo "==================================="
echo "Web Build Verification Script"
echo "==================================="
echo ""

# Check if dist directory exists
echo "1. Checking if dist/ directory exists..."
if [ -d "dist" ]; then
    echo "✅ dist/ directory exists"
else
    echo "❌ dist/ directory not found"
    exit 1
fi

# Check for required files
echo ""
echo "2. Checking for required build artifacts..."
required_files=("dist/index.html" "dist/js" "dist/css")
for file in "${required_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ Found: $file"
    else
        echo "❌ Missing: $file"
    fi
done

# List dist contents
echo ""
echo "3. Contents of dist/ directory:"
ls -lah dist/

# Check for Electron references in built files
echo ""
echo "4. Checking for Electron-specific code in built files..."
if grep -r "electron" dist/ 2>/dev/null | grep -v "electron-builder" | grep -v "<!-- built files"; then
    echo "⚠️  Warning: Found Electron references in built files"
else
    echo "✅ No Electron-specific code found in build output"
fi

# Check file sizes
echo ""
echo "5. Build artifact sizes:"
du -sh dist/

echo ""
echo "==================================="
echo "Verification complete!"
echo "==================================="
echo ""
echo "To test the built app locally, run:"
echo "  npx serve -s dist"
echo "  or"
echo "  python3 -m http.server --directory dist 8080"
