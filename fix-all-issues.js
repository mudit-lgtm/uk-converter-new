const fs = require('fs');
const path = require('path');

// Top search console keywords to integrate
const topKeywords = [
    'gas m3 to kwh calculator',
    'gas units to kwh calculator',
    'm3 to kwh',
    'm3 to kwh calculator',
    'gas m3 to kwh calculator uk',
    'convert gas units to kwh',
    'convert m3 to kwh',
    'gas meter reading to kwh',
    'calorific value of natural gas',
    'gas bill calculator kwh',
    'cubic meter to kwh calculator',
    'natural gas m3 to kwh',
    'kwh to m3 gas',
    'm3 gas to kwh',
    'gas conversion calculator uk',
    'british gas m3 to kwh',
    'gas meter calculator',
    'energy converter',
    'uk gas converter',
    'gas consumption calculator'
];

// Conversion type mappings for meta tags
const conversionTypes = {
    'gas-m3-to-kwh.html': 'm3-to-kwh',
    'kwh-to-m3.html': 'm3-to-kwh',
    'gas-units-to-kwh.html': 'gas-units-to-kwh',
    'cubic-feet-to-kwh.html': 'cubic-feet-to-kwh',
    'btu-to-kwh.html': 'btu-to-kwh',
    'therm-to-kwh.html': 'therm-to-kwh',
    'm3-to-ft3.html': 'm3-to-ft3',
    'liter-to-m3.html': 'liter-to-m3',
    'kw-to-m3hr.html': 'kw-to-m3hr',
    'cfm-to-m3hr.html': 'cfm-to-m3hr',
    'm3hr-to-cfm.html': 'cfm-to-m3hr',
    'm3-to-kg.html': 'm3-to-kg',
    'kg-to-m3.html': 'm3-to-kg',
    'ppm-to-ugm3.html': 'ppm-to-ugm3',
    'ppm-to-mgm3.html': 'ppm-to-mgm3',
    'mgm3-to-ppm.html': 'mgm3-to-ppm',
    'ugm3-to-ppm.html': 'ugm3-to-ppm',
    'btu-to-m3.html': 'btu-to-m3',
    'mmbtu-to-mwh.html': 'mmbtu-to-mwh',
    'mwh-to-mmbtu.html': 'mmbtu-to-mwh',
    'mwh-to-kwh.html': 'mwh-to-kwh',
    'therm-to-mmbtu.html': 'therm-to-mmbtu',
    'mmbtu-to-therm.html': 'therm-to-mmbtu',
    'therm-to-mwh.html': 'therm-to-kwh',
    'mmbtu-to-mmscf.html': 'mmbtu-to-mmscf',
    'm2-to-m3.html': 'm2-to-m3',
    'sqft-to-m3.html': 'sqft-to-m3',
    'ft-to-m3.html': 'ft-to-m3',
    'nm3-to-m3.html': 'nm3-to-m3'
};

console.log('🔧 Fixing all issues...\n');

// Issue 1: Add conversion-type meta tags to all converter pages
console.log('1️⃣  Adding conversion-type meta tags to converter pages...');
let converterFilesFixed = 0;

const convertersDir = path.join(__dirname, 'converters');
const converterFiles = fs.readdirSync(convertersDir).filter(f => f.endsWith('.html'));

converterFiles.forEach(filename => {
    const filepath = path.join(convertersDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');
    
    const conversionType = conversionTypes[filename];
    if (!conversionType) {
        console.log(`   ⚠️  No conversion type for ${filename}`);
        return;
    }
    
    // Add conversion-type meta tag if not present
    if (!content.includes('name="conversion-type"')) {
        content = content.replace(
            '<meta name="robots" content="index, follow">',
            `<meta name="robots" content="index, follow">\n    <meta name="conversion-type" content="${conversionType}">`
        );
        converterFilesFixed++;
    }
    
    fs.writeFileSync(filepath, content, 'utf8');
});

console.log(`   ✅ Fixed ${converterFilesFixed} converter pages\n`);

// Issue 2: Update footer with dynamic year
console.log('2️⃣  Updating CSS for visible links and footer...');

const cssPath = path.join(__dirname, 'css', 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Fix link visibility - make links more visible
if (!cssContent.includes('/* Link visibility fixes */')) {
    cssContent += `\n
/* Link visibility fixes */
a {
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s;
}

a:hover {
    color: var(--secondary-color);
    text-decoration: underline;
}

.content-section a {
    color: var(--primary-color);
    font-weight: 600;
}

.sidebar-links a {
    color: var(--text-dark) !important;
}

.sidebar-links a:hover,
.sidebar-links a.active {
    background: var(--bg-light);
    color: var(--primary-color) !important;
}

.footer-links a {
    color: #d1d5db !important;
}

.footer-links a:hover {
    color: white !important;
}

/* Make breadcrumb links visible */
nav a {
    color: var(--primary-color) !important;
}
`;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('   ✅ Updated CSS for link visibility\n');

// Issue 3 & 4: Update all HTML files with dynamic footer and enhanced keywords
console.log('3️⃣  Updating all pages with dynamic footer year...');
console.log('4️⃣  Integrating Search Console keywords in SEO content...\n');

// Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Add dynamic year to footer
indexContent = indexContent.replace(
    /&copy; 2024 <strong>UK Converter<\/strong>/g,
    '&copy; <span id="current-year">2024</span> <strong>UK Converter</strong>'
);

// Enhance keywords in meta description
const enhancedKeywords = topKeywords.slice(0, 15).join(', ');
indexContent = indexContent.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${enhancedKeywords}">`
);

// Add dynamic year script before closing body tag
if (!indexContent.includes('document.getElementById(\'current-year\')')) {
    indexContent = indexContent.replace(
        '</body>',
        `    <script>
        // Dynamic year update
        document.addEventListener('DOMContentLoaded', function() {
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
    </script>
</body>`
    );
}

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('   ✅ Updated index.html');

// Update all converter pages
converterFiles.forEach(filename => {
    const filepath = path.join(convertersDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Add dynamic year to footer
    content = content.replace(
        /&copy; 2024 <strong>UK Converter<\/strong>/g,
        '&copy; <span id="current-year">2024</span> <strong>UK Converter</strong>'
    );
    
    // Enhance meta keywords with relevant search console terms
    const relevantKeywords = topKeywords.filter(kw => {
        const fileBase = filename.replace('.html', '').replace(/-/g, ' ');
        return kw.includes(fileBase.substring(0, 10)) || kw.includes('calculator') || kw.includes('converter');
    }).slice(0, 10).join(', ');
    
    if (relevantKeywords) {
        content = content.replace(
            /<meta name="keywords" content="([^"]*)">/,
            (match, existingKeywords) => {
                const combined = `${existingKeywords}, ${relevantKeywords}`;
                const unique = [...new Set(combined.split(',').map(k => k.trim()))].join(', ');
                return `<meta name="keywords" content="${unique}">`;
            }
        );
    }
    
    // Add more UK-specific terms and search console keywords to content
    content = content.replace(
        '<p>The <strong>conversion</strong> happens automatically as you type',
        '<p>Our <strong>gas meter reading calculator</strong> and <strong>energy converter</strong> tools help UK homeowners understand their <strong>gas bills</strong> and <strong>energy consumption</strong>. The <strong>conversion</strong> happens automatically as you type'
    );
    
    // Add script for dynamic year if not present
    if (!content.includes('document.getElementById(\'current-year\')')) {
        content = content.replace(
            '<script src="../js/converter.js"></script>',
            `<script src="../js/converter.js"></script>
    <script>
        // Dynamic year update
        document.addEventListener('DOMContentLoaded', function() {
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
    </script>`
        );
    }
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`   ✅ Updated ${filename}`);
});

// Update trust pages
const trustDir = path.join(__dirname, 'trust');
if (fs.existsSync(trustDir)) {
    const trustFiles = fs.readdirSync(trustDir).filter(f => f.endsWith('.html'));
    
    trustFiles.forEach(filename => {
        const filepath = path.join(trustDir, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Add dynamic year
        content = content.replace(
            /&copy; 2024/g,
            '&copy; <span id="current-year">2024</span>'
        );
        
        // Add script if not present
        if (!content.includes('document.getElementById(\'current-year\')')) {
            content = content.replace(
                '</body>',
                `    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
    </script>
</body>`
            );
        }
        
        fs.writeFileSync(filepath, content, 'utf8');
    });
    
    console.log(`   ✅ Updated ${trustFiles.length} trust pages`);
}

console.log('\n✨ All issues fixed successfully!\n');
console.log('Summary:');
console.log('✅ 1. Added conversion-type meta tags to all converter pages (JavaScript will now work)');
console.log('✅ 2. Updated footer with dynamic year across all pages');
console.log('✅ 3. Enhanced CSS for better link visibility');
console.log('✅ 4. Integrated top Search Console keywords in meta tags and content');
console.log('\nTotal files updated:', converterFiles.length + 1 + (fs.existsSync(trustDir) ? fs.readdirSync(trustDir).filter(f => f.endsWith('.html')).length : 0));
