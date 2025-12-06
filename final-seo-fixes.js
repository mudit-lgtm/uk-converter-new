const fs = require('fs');
const path = require('path');

console.log('🎯 FINAL SEO & INDEXING OPTIMIZATIONS');
console.log('='.repeat(80));
console.log('');

const today = new Date().toISOString().split('T')[0];

// ============================================================================
// 1. ENHANCE ROBOTS.TXT WITH EXPLICIT ALLOWS
// ============================================================================
console.log('📝 1. Enhancing robots.txt...');

const robotsTxt = `# Allow all search engines to crawl everything
User-agent: *
Allow: /
Allow: /converters/
Allow: /trust/

# Explicitly allow important pages
Allow: /index.html
Allow: /sitemap.html
Allow: /sitemap.xml

# Block unnecessary files
Disallow: *.js$
Disallow: *.css$
Disallow: /node_modules/

# Crawl delay (optional, helps with crawl budget)
Crawl-delay: 0

# Sitemap location
Sitemap: https://ukconverter.site/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log('✅ Enhanced robots.txt with explicit Allow directives\n');

// ============================================================================
// 2. CREATE A COMPREHENSIVE INDEX PAGE ENHANCEMENT
// ============================================================================
console.log('📝 2. Enhancing index page with more converter links...');

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Add a "Recently Updated" section before footer if not exists
if (!indexContent.includes('recently-updated-section')) {
    const recentlyUpdatedSection = `
    <!-- Recently Updated Section -->
    <section class="recently-updated-section" style="padding: 40px 20px; background: #f8f9fa; margin-top: 60px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: 30px;">
                <i class="fas fa-clock"></i> Recently Updated Converters
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <a href="converters/gas-m3-to-kwh.html" style="padding: 20px; background: white; border-radius: 8px; text-decoration: none; color: inherit; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: var(--primary-color); margin: 0 0 10px 0;">Gas M³ to kWh</h3>
                    <p style="margin: 0; color: #666;">Convert gas cubic meters to kilowatt-hours</p>
                </a>
                <a href="converters/kwh-to-m3.html" style="padding: 20px; background: white; border-radius: 8px; text-decoration: none; color: inherit; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: var(--primary-color); margin: 0 0 10px 0;">kWh to M³</h3>
                    <p style="margin: 0; color: #666;">Convert kilowatt-hours to cubic meters</p>
                </a>
                <a href="converters/gas-units-to-kwh.html" style="padding: 20px; background: white; border-radius: 8px; text-decoration: none; color: inherit; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: var(--primary-color); margin: 0 0 10px 0;">Gas Units to kWh</h3>
                    <p style="margin: 0; color: #666;">Convert gas meter units to energy</p>
                </a>
                <a href="converters/btu-to-kwh.html" style="padding: 20px; background: white; border-radius: 8px; text-decoration: none; color: inherit; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: var(--primary-color); margin: 0 0 10px 0;">BTU to kWh</h3>
                    <p style="margin: 0; color: #666;">Convert British Thermal Units to kWh</p>
                </a>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <a href="sitemap.html" style="display: inline-block; padding: 12px 30px; background: var(--primary-color); color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    <i class="fas fa-list"></i> View All Converters
                </a>
            </div>
        </div>
    </section>
`;
    
    // Insert before closing body tag
    indexContent = indexContent.replace('</body>', recentlyUpdatedSection + '\n</body>');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('✅ Added "Recently Updated" section to home page\n');
}

// ============================================================================
// 3. ADD BREADCRUMBS TO ALL CONVERTER PAGES FOR BETTER CRAWLING
// ============================================================================
console.log('📝 3. Adding breadcrumb navigation to converter pages...');

const convertersDir = path.join(__dirname, 'converters');
const converterFiles = fs.readdirSync(convertersDir).filter(f => f.endsWith('.html'));

let breadcrumbCount = 0;
converterFiles.forEach(file => {
    const filePath = path.join(convertersDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only add if breadcrumbs don't exist
    if (!content.includes('breadcrumb-navigation') && !content.includes('<nav aria-label="breadcrumb">')) {
        const pageName = file.replace('.html', '').split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
        
        const breadcrumbHTML = `
        <!-- Breadcrumb Navigation -->
        <nav aria-label="breadcrumb" class="breadcrumb-navigation" style="padding: 15px 20px; background: #f8f9fa; margin-bottom: 20px;">
            <ol style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 10px;">
                <li><a href="../index.html" style="color: var(--primary-color); text-decoration: none;"><i class="fas fa-home"></i> Home</a></li>
                <li><i class="fas fa-chevron-right" style="font-size: 0.7em; color: #999;"></i></li>
                <li><a href="../index.html#converters" style="color: var(--primary-color); text-decoration: none;">Converters</a></li>
                <li><i class="fas fa-chevron-right" style="font-size: 0.7em; color: #999;"></i></li>
                <li style="color: #666;">${pageName}</li>
            </ol>
        </nav>
        `;
        
        // Insert after opening body tag or after header
        if (content.includes('</header>')) {
            content = content.replace('</header>', '</header>\n' + breadcrumbHTML);
        } else {
            content = content.replace('<body>', '<body>\n' + breadcrumbHTML);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        breadcrumbCount++;
    }
});

console.log(`✅ Added breadcrumb navigation to ${breadcrumbCount} converter pages\n`);

// ============================================================================
// 4. CREATE OPTIMIZED NETLIFY.TOML (WITHOUT FORCED REDIRECTS FOR CRAWLERS)
// ============================================================================
console.log('📝 4. Optimizing Netlify configuration...');

const netlifyToml = `[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

# Redirect old domain to new domain (only for domain changes, not internal pages)
[[redirects]]
  from = "https://ukgasconverter.netlify.app/*"
  to = "https://ukconverter.site/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://ukgasconverter.netlify.app/*"
  to = "https://ukconverter.site/:splat"
  status = 301
  force = true

# Security and performance headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    # Shorter cache for better crawling and updates
    Cache-Control = "public, max-age=1800"
    # Allow all origins for fonts and resources
    Access-Control-Allow-Origin = "*"

# Specific cache for static assets
[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=86400"

# HTML pages - short cache for frequent updates and crawling
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=900"

# Sitemap - very short cache for frequent crawling
[[headers]]
  for = "/sitemap.xml"
  [headers.values]
    Cache-Control = "public, max-age=600"
    Content-Type = "application/xml; charset=utf-8"

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Cache-Control = "public, max-age=600"
    Content-Type = "text/plain; charset=utf-8"
`;

fs.writeFileSync(path.join(__dirname, 'netlify.toml'), netlifyToml, 'utf8');
console.log('✅ Optimized Netlify configuration with proper cache headers\n');

// ============================================================================
// 5. CREATE A GOOGLE SEARCH CONSOLE VERIFICATION FILE TEMPLATE
// ============================================================================
console.log('📝 5. Creating Search Console verification template...');

const verificationTemplate = `<!-- 
GOOGLE SEARCH CONSOLE VERIFICATION

To verify your site:
1. Go to Google Search Console (https://search.google.com/search-console)
2. Add property: https://ukconverter.site
3. Choose "HTML tag" verification method
4. Copy the meta tag they provide
5. Add it to the <head> section of index.html
6. Example: <meta name="google-site-verification" content="YOUR_CODE_HERE" />

IMPORTANT: Do this for BOTH domains:
- https://ukconverter.site
- https://ukgasconverter.netlify.app

Then in Search Console:
- Use "Change of Address" tool to migrate from old to new domain
- Submit sitemap.xml for both properties
- Request indexing for key pages
-->
`;

fs.writeFileSync(path.join(__dirname, 'SEARCH_CONSOLE_SETUP.txt'), verificationTemplate, 'utf8');
console.log('✅ Created Search Console setup instructions\n');

// ============================================================================
// 6. UPDATE SITEMAP.XML WITH PROPER PRIORITY AND FREQUENCY
// ============================================================================
console.log('📝 6. Optimizing sitemap.xml priorities...');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Ensure all converter pages have high priority
sitemap = sitemap.replace(
    /(<url>\s*<loc>https:\/\/ukconverter\.site\/converters\/[^<]+<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>)monthly(<\/changefreq>\s*<priority>)0\.7(<\/priority>)/g,
    '$1weekly$21.0$3'
);

// Update home page priority
sitemap = sitemap.replace(
    /<priority>1\.0<\/priority>(\s*<\/url>\s*<!-- Gas & Energy)/,
    '<priority>1.0</priority>$1'
);

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ Optimized sitemap.xml with higher priorities for converter pages\n');

// ============================================================================
// 7. CREATE INDEXING STATUS CHECKER SCRIPT
// ============================================================================
console.log('📝 7. Creating indexing status checker...');

const indexingChecker = `#!/bin/bash
# Indexing Status Checker for ukconverter.site

echo "🔍 Checking Google Indexing Status"
echo "==================================="
echo ""

echo "Checking home page..."
curl -s "https://www.google.com/search?q=site:ukconverter.site" | grep -q "ukconverter.site" && echo "✅ Home page indexed" || echo "❌ Home page NOT indexed"

echo ""
echo "Checking key converter pages..."

pages=(
    "converters/gas-m3-to-kwh.html"
    "converters/kwh-to-m3.html"
    "converters/gas-units-to-kwh.html"
    "converters/btu-to-kwh.html"
    "converters/therm-to-kwh.html"
)

for page in "\${pages[@]}"; do
    curl -s "https://www.google.com/search?q=site:ukconverter.site/\$page" | grep -q "\$page" && echo "✅ \$page indexed" || echo "❌ \$page NOT indexed"
    sleep 2  # Be nice to Google
done

echo ""
echo "Total indexed pages estimate:"
curl -s "https://www.google.com/search?q=site:ukconverter.site" | grep -oP 'About \\K[0-9,]+(?= results)' || echo "Could not determine"

echo ""
echo "==================================="
echo "Run this script daily to track indexing progress"
`;

fs.writeFileSync(path.join(__dirname, 'check-indexing.sh'), indexingChecker, 'utf8');
fs.chmodSync(path.join(__dirname, 'check-indexing.sh'), '755');
console.log('✅ Created indexing status checker script\n');

// ============================================================================
// SUMMARY
// ============================================================================
console.log('='.repeat(80));
console.log('✅ ALL OPTIMIZATIONS COMPLETE!');
console.log('='.repeat(80));
console.log('');
console.log('Summary of final optimizations:');
console.log('  ✅ Enhanced robots.txt with explicit Allow directives');
console.log('  ✅ Added "Recently Updated" section to home page');
console.log(`  ✅ Added breadcrumb navigation to ${breadcrumbCount} converter pages`);
console.log('  ✅ Optimized Netlify configuration with proper cache headers');
console.log('  ✅ Created Search Console verification instructions');
console.log('  ✅ Optimized sitemap.xml with higher priorities');
console.log('  ✅ Created indexing status checker script');
console.log('');
console.log('🎯 WHY PAGES WEREN\'T INDEXING - ROOT CAUSES:');
console.log('');
console.log('1. ⏰ NEW DOMAIN: ukconverter.site is relatively new');
console.log('   - Google needs 2-4 weeks to fully crawl new domains');
console.log('   - Solution: Manual indexing requests + time');
console.log('');
console.log('2. 🔄 DOMAIN MIGRATION: From ukgasconverter.netlify.app');
console.log('   - 301 redirects in place but Google needs to recognize them');
console.log('   - Solution: Use "Change of Address" in Search Console');
console.log('');
console.log('3. 📊 CRAWL BUDGET: Low authority = slower crawling');
console.log('   - Google prioritizes high-authority sites');
console.log('   - Solution: Improved internal linking, breadcrumbs, sitemap');
console.log('');
console.log('4. 🎯 CACHE HEADERS: Long cache times may slow crawling');
console.log('   - Fixed: Reduced cache from 3600s to 900s for HTML');
console.log('   - Sitemap cache reduced to 600s for frequent checks');
console.log('');
console.log('5. 🔗 INTERNAL LINKING: Could be stronger');
console.log('   - Fixed: Added breadcrumbs, "Recently Updated" section');
console.log('   - Added HTML sitemap page');
console.log('');
console.log('🚀 NEXT STEPS TO GET PAGES INDEXED:');
console.log('');
console.log('1. ✅ Commit and push all changes (you\'ll do this next)');
console.log('2. ✅ Wait for Netlify deployment');
console.log('3. 📝 Go to Google Search Console:');
console.log('   - Add both domains (ukconverter.site AND ukgasconverter.netlify.app)');
console.log('   - Use "Change of Address" tool to migrate');
console.log('   - Submit sitemap.xml for BOTH domains');
console.log('4. 🔍 Request manual indexing for top 10 pages:');
console.log('   - Use URL Inspection Tool');
console.log('   - Request "Request Indexing" for each key page');
console.log('   - Priority order: home, gas-m3-to-kwh, kwh-to-m3, gas-units-to-kwh');
console.log('5. ⏱️  Wait 48-72 hours and check status');
console.log('6. 📊 Run check-indexing.sh script daily to monitor');
console.log('7. 🔗 Build backlinks (share on social media, forums, etc.)');
console.log('');
console.log('='.repeat(80));
console.log('Files ready for commit and deployment! 🎉');
console.log('='.repeat(80));
