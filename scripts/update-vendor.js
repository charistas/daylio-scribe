/**
 * Updates vendor files from node_modules after npm install/update
 * Run with: npm run update-vendor
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const vendorDir = path.join(__dirname, '..', 'vendor');
const rootDir = path.join(__dirname, '..');

const filesToCopy = [
    {
        src: 'node_modules/jszip/dist/jszip.min.js',
        dest: 'jszip.min.js'
    },
    {
        src: 'node_modules/quill/dist/quill.js',
        dest: 'quill.js'
    },
    {
        src: 'node_modules/quill/dist/quill.snow.css',
        dest: 'quill.snow.css'
    },
    {
        src: 'node_modules/html2canvas/dist/html2canvas.min.js',
        dest: 'html2canvas.min.js'
    }
];

// Ensure vendor directory exists
if (!fs.existsSync(vendorDir)) {
    fs.mkdirSync(vendorDir, { recursive: true });
}

// Copy files
filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(rootDir, src);
    const destPath = path.join(vendorDir, dest);

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${src} → vendor/${dest}`);
    } else {
        console.error(`✗ Source not found: ${src}`);
    }
});

// Bundle emoji-picker-element (ES module needs bundling for file:// protocol)
console.log('\nBundling emoji-picker-element...');
try {
    execSync(
        `npx esbuild node_modules/emoji-picker-element/index.js --bundle --format=iife --global-name=EmojiPicker --outfile=vendor/emoji-picker-element.bundle.js`,
        { cwd: rootDir, stdio: 'inherit' }
    );
    console.log('✓ Bundled emoji-picker-element → vendor/emoji-picker-element.bundle.js');
} catch (error) {
    console.error('✗ Failed to bundle emoji-picker-element:', error.message);
}

console.log('\nVendor files updated successfully!');
