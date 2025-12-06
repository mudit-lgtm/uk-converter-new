const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING ALL SEO & INDEXING ISSUES');
console.log('='.repeat(80));
console.log('');

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// ============================================================================
// 1. ADD H1 TAGS TO ALL CONVERTER PAGES
// ============================================================================
console.log('📝 Step 1: Adding H1 tags to all converter pages...');

const converterConfig = {
    'gas-m3-to-kwh.html': 'Gas M³ to kWh Converter',
    'kwh-to-m3.html': 'kWh to M³ Converter',
    'gas-units-to-kwh.html': 'Gas Units to kWh Converter',
    'cubic-feet-to-kwh.html': 'Cubic Feet to kWh Converter',
    'btu-to-kwh.html': 'BTU to kWh Converter',
    'therm-to-kwh.html': 'Therm to kWh Converter',
    'm3-to-ft3.html': 'M³ to FT³ Converter',
    'liter-to-m3.html': 'Liter to M³ Converter',
    'kw-to-m3hr.html': 'kW to M³/hr Converter',
    'cfm-to-m3hr.html': 'CFM to M³/hr Converter',
    'm3hr-to-cfm.html': 'M³/hr to CFM Converter',
    'm3-to-kg.html': 'M³ to KG Converter',
    'kg-to-m3.html': 'KG to M³ Converter',
    'ppm-to-ugm3.html': 'PPM to μg/m³ Converter',
    'ppm-to-mgm3.html': 'PPM to mg/m³ Converter',
    'mgm3-to-ppm.html': 'mg/m³ to PPM Converter',
    'ugm3-to-ppm.html': 'μg/m³ to PPM Converter',
    'btu-to-m3.html': 'BTU to M³ Converter',
    'mmbtu-to-mwh.html': 'MMBtu to MWh Converter',
    'mwh-to-mmbtu.html': 'MWh to MMBtu Converter',
    'mwh-to-kwh.html': 'MWh to kWh Converter',
    'therm-to-mmbtu.html': 'Therm to MMBtu Converter',
    'mmbtu-to-therm.html': 'MMBtu to Therm Converter',
    'therm-to-mwh.html': 'Therm to MWh Converter',
    'mmbtu-to-mmscf.html': 'MMBtu to MMSCF Converter',
    'm2-to-m3.html': 'M² to M³ Converter',
    'sqft-to-m3.html': 'Square Feet to M³ Converter',
    'ft-to-m3.html': 'Feet to M³ Converter',
    'nm3-to-m3.html': 'Nm³ to M³ Converter'
};

const convertersDir = path.join(__dirname, 'converters');
let h1FixCount = 0;

Object.keys(converterConfig).forEach(filename => {
    const filePath = path.join(convertersDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  File not found: ${filename}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if H1 already exists
    if (content.match(/<h1[^>]*>/)) {
        console.log(`  ✓ ${filename} - H1 already exists`);
        return;
    }
    
    // Add H1 tag right after the main content div starts (before converter tool)
    const h1Tag = `
            <div class="page-header">
                <h1><i class="fas fa-calculator"></i> ${converterConfig[filename]}</h1>
                <p class="page-subtitle">Free, accurate, and instant conversion tool for UK users</p>
            </div>
            `;
    
    // Find the converter tool div and insert H1 before it
    const converterToolMatch = content.match(/(\s*)<!-- Converter Tool -->/);
    if (converterToolMatch) {
        content = content.replace('<!-- Converter Tool -->', h1Tag + '\n            <!-- Converter Tool -->');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ ${filename} - H1 added`);
        h1FixCount++;
    } else {
        console.log(`  ⚠️  ${filename} - Could not find insertion point`);
    }
});

console.log(`\n✅ Added H1 tags to ${h1FixCount} converter pages\n`);

// ============================================================================
// 2. UPDATE SITEMAP.XML WITH CURRENT DATE
// ============================================================================
console.log('📝 Step 2: Updating sitemap.xml lastmod dates...');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Update all lastmod dates to today
sitemap = sitemap.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`✅ Updated all lastmod dates to ${today}\n`);

// ============================================================================
// 3. ADD META ROBOTS AND STRUCTURED DATA TO TRUST PAGES
// ============================================================================
console.log('📝 Step 3: Enhancing trust pages with meta tags and structured data...');

const trustDir = path.join(__dirname, 'trust');
const trustPages = ['about.html', 'contact.html', 'privacy.html', 'terms.html', 'cookies.html'];

trustPages.forEach(filename => {
    const filePath = path.join(trustDir, filename);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add meta robots if missing
    if (!content.includes('name="robots"')) {
        content = content.replace(
            '<meta name="viewport"',
            '<meta name="robots" content="index, follow">\n    <meta name="viewport"'
        );
        console.log(`  ✅ ${filename} - Added meta robots`);
    }
    
    // Add canonical if missing
    const pageUrl = `https://ukconverter.site/trust/${filename}`;
    if (!content.includes('rel="canonical"')) {
        content = content.replace(
            '<meta name="robots"',
            `<link rel="canonical" href="${pageUrl}">\n    <meta name="robots"`
        );
        console.log(`  ✅ ${filename} - Added canonical URL`);
    }
    
    // Add Open Graph tags if missing
    if (!content.includes('og:title')) {
        const titleMatch = content.match(/<title>([^<]+)<\/title>/);
        const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
        
        if (titleMatch) {
            const ogTags = `
    <!-- Open Graph -->
    <meta property="og:title" content="${titleMatch[1]}">
    <meta property="og:description" content="${descMatch ? descMatch[1] : titleMatch[1]}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="website">
    `;
            content = content.replace('</head>', ogTags + '\n</head>');
            console.log(`  ✅ ${filename} - Added Open Graph tags`);
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('✅ Enhanced all trust pages\n');

// ============================================================================
// 4. FIX _REDIRECTS FILE (REMOVE PROBLEMATIC SPA FALLBACK)
// ============================================================================
console.log('📝 Step 4: Fixing _redirects file...');

const redirectsPath = path.join(__dirname, '_redirects');
const redirectsContent = `# Redirect old domain to new domain
https://ukgasconverter.netlify.app/* https://ukconverter.site/:splat 301!
http://ukgasconverter.netlify.app/* https://ukconverter.site/:splat 301!
`;

fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
console.log('✅ Fixed _redirects file (removed SPA fallback)\n');

// ============================================================================
// 5. CREATE HTML SITEMAP PAGE
// ============================================================================
console.log('📝 Step 5: Creating HTML sitemap page...');

const htmlSitemap = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <title>Sitemap - UK Converter</title>
    <meta name="description" content="Complete sitemap of all UK Converter tools including gas, energy, volume, and air quality conversion calculators.">
    <link rel="canonical" href="https://ukconverter.site/sitemap.html">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="header-container">
            <div class="header-top">
                <a href="/" class="logo">
                    <i class="fas fa-sync-alt"></i>
                    UK Converter
                </a>
            </div>
        </div>
    </header>
    
    <div class="container" style="max-width: 900px; margin: 40px auto; padding: 20px;">
        <h1>Sitemap - All Conversion Tools</h1>
        
        <section style="margin: 30px 0;">
            <h2>🏠 Main Pages</h2>
            <ul style="line-height: 2;">
                <li><a href="/">Home - UK Converter</a></li>
                <li><a href="/trust/about.html">About Us</a></li>
                <li><a href="/trust/contact.html">Contact</a></li>
                <li><a href="/trust/privacy.html">Privacy Policy</a></li>
                <li><a href="/trust/terms.html">Terms of Service</a></li>
                <li><a href="/trust/cookies.html">Cookie Policy</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>🔥 Gas & Energy Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/gas-m3-to-kwh.html">Gas M³ to kWh Converter</a></li>
                <li><a href="/converters/kwh-to-m3.html">kWh to M³ Converter</a></li>
                <li><a href="/converters/gas-units-to-kwh.html">Gas Units to kWh Converter</a></li>
                <li><a href="/converters/cubic-feet-to-kwh.html">Cubic Feet to kWh Converter</a></li>
                <li><a href="/converters/btu-to-kwh.html">BTU to kWh Converter</a></li>
                <li><a href="/converters/therm-to-kwh.html">Therm to kWh Converter</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>⚗️ Volume Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/m3-to-ft3.html">M³ to FT³ Converter</a></li>
                <li><a href="/converters/liter-to-m3.html">Liter to M³ Converter</a></li>
                <li><a href="/converters/kw-to-m3hr.html">kW to M³/hr Converter</a></li>
                <li><a href="/converters/cfm-to-m3hr.html">CFM to M³/hr Converter</a></li>
                <li><a href="/converters/m3hr-to-cfm.html">M³/hr to CFM Converter</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>⚖️ Weight & Density Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/m3-to-kg.html">M³ to KG Converter</a></li>
                <li><a href="/converters/kg-to-m3.html">KG to M³ Converter</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>🌫️ Air Quality Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/ppm-to-ugm3.html">PPM to μg/m³ Converter</a></li>
                <li><a href="/converters/ppm-to-mgm3.html">PPM to mg/m³ Converter</a></li>
                <li><a href="/converters/mgm3-to-ppm.html">mg/m³ to PPM Converter</a></li>
                <li><a href="/converters/ugm3-to-ppm.html">μg/m³ to PPM Converter</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>⚡ Advanced Energy Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/btu-to-m3.html">BTU to M³ Converter</a></li>
                <li><a href="/converters/mmbtu-to-mwh.html">MMBtu to MWh Converter</a></li>
                <li><a href="/converters/mwh-to-mmbtu.html">MWh to MMBtu Converter</a></li>
                <li><a href="/converters/mwh-to-kwh.html">MWh to kWh Converter</a></li>
                <li><a href="/converters/therm-to-mmbtu.html">Therm to MMBtu Converter</a></li>
                <li><a href="/converters/mmbtu-to-therm.html">MMBtu to Therm Converter</a></li>
                <li><a href="/converters/therm-to-mwh.html">Therm to MWh Converter</a></li>
                <li><a href="/converters/mmbtu-to-mmscf.html">MMBtu to MMSCF Converter</a></li>
            </ul>
        </section>
        
        <section style="margin: 30px 0;">
            <h2>🔧 Specialized Converters</h2>
            <ul style="line-height: 2;">
                <li><a href="/converters/m2-to-m3.html">M² to M³ Converter</a></li>
                <li><a href="/converters/sqft-to-m3.html">Square Feet to M³ Converter</a></li>
                <li><a href="/converters/ft-to-m3.html">Feet to M³ Converter</a></li>
                <li><a href="/converters/nm3-to-m3.html">Nm³ to M³ Converter</a></li>
            </ul>
        </section>
    </div>
    
    <footer style="text-align: center; padding: 40px 20px; background: #f8f9fa; margin-top: 60px;">
        <p>&copy; 2024 UK Converter. All rights reserved.</p>
        <p><a href="/">Back to Home</a></p>
    </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.html'), htmlSitemap, 'utf8');
console.log('✅ Created HTML sitemap page (sitemap.html)\n');

// ============================================================================
// 6. ADD SITEMAP.HTML TO SITEMAP.XML
// ============================================================================
console.log('📝 Step 6: Adding HTML sitemap to sitemap.xml...');

sitemap = fs.readFileSync(sitemapPath, 'utf8');
if (!sitemap.includes('sitemap.html')) {
    const htmlSitemapEntry = `    
    <!-- HTML Sitemap -->
    <url>
        <loc>https://ukconverter.site/sitemap.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;
    sitemap = sitemap.replace('</urlset>', htmlSitemapEntry + '\n</urlset>');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✅ Added HTML sitemap to sitemap.xml\n');
}

// ============================================================================
// 7. ADD CSS FOR PAGE HEADER
// ============================================================================
console.log('📝 Step 7: Adding CSS for page headers...');

const cssPath = path.join(__dirname, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('.page-header')) {
    const headerCSS = `
/* Page Header Styles */
.page-header {
    text-align: center;
    padding: 30px 20px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
    margin: 0 0 10px 0;
    font-size: 2em;
    font-weight: 700;
    color: white;
}

.page-header .page-subtitle {
    margin: 0;
    font-size: 1.1em;
    opacity: 0.95;
    color: white;
}

@media (max-width: 768px) {
    .page-header h1 {
        font-size: 1.5em;
    }
    
    .page-header .page-subtitle {
        font-size: 0.95em;
    }
}
`;
    
    fs.writeFileSync(cssPath, css + headerCSS, 'utf8');
    console.log('✅ Added page header CSS\n');
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('='.repeat(80));
console.log('✅ ALL SEO ISSUES FIXED!');
console.log('='.repeat(80));
console.log('');
console.log('Summary of changes:');
console.log(`  ✅ Added H1 tags to ${h1FixCount} converter pages`);
console.log(`  ✅ Updated all sitemap lastmod dates to ${today}`);
console.log('  ✅ Enhanced trust pages with meta robots and Open Graph tags');
console.log('  ✅ Fixed _redirects file');
console.log('  ✅ Created HTML sitemap page');
console.log('  ✅ Added page header CSS styles');
console.log('');
console.log('🎯 NEXT STEPS FOR GOOGLE INDEXING:');
console.log('  1. Commit and push changes to GitHub');
console.log('  2. Deploy to Netlify (automatic)');
console.log('  3. Submit sitemap in Google Search Console');
console.log('  4. Request indexing for all pages');
console.log('  5. Use URL Inspection Tool to verify fixes');
console.log('');
console.log('='.repeat(80));
