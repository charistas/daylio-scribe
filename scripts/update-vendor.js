/**
 * Updates vendor files from node_modules after npm install/update
 * Run with: npm run update-vendor
 */

const fs = require('fs');
const path = require('path');

const vendorDir = path.join(__dirname, '..', 'daylio-scribe', 'vendor');

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
        src: 'node_modules/emoji-picker-element/index.js',
        dest: 'emoji-picker-element.js'
    },
    {
        src: 'node_modules/emoji-picker-element/picker.js',
        dest: 'picker.js'
    },
    {
        src: 'node_modules/emoji-picker-element/database.js',
        dest: 'database.js'
    }
];

// Ensure vendor directory exists
if (!fs.existsSync(vendorDir)) {
    fs.mkdirSync(vendorDir, { recursive: true });
}

// Copy files
filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(__dirname, '..', src);
    const destPath = path.join(vendorDir, dest);

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${src} → vendor/${dest}`);
    } else {
        console.error(`✗ Source not found: ${src}`);
    }
});

console.log('\nVendor files updated successfully!');
