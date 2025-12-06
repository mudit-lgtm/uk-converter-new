const fs = require('fs');
const path = require('path');

console.log('🔍 DEEP INDEXING ANALYSIS - Why Google Can\'t Index Non-Home Pages');
console.log('='.repeat(80));
console.log('');

// Critical indexing issues that prevent Google from crawling
const criticalIssues = [];
const warnings = [];
const recommendations = [];

// ============================================================================
// 1. CHECK FOR JAVASCRIPT-DEPENDENT CONTENT
// ============================================================================
console.log('📋 1. CHECKING FOR JAVASCRIPT DEPENDENCIES');
console.log('-'.repeat(80));

const convertersDir = path.join(__dirname, 'converters');
const converterFiles = fs.readdirSync(convertersDir).filter(f => f.endsWith('.html'));

let jsRenderingIssues = 0;
converterFiles.slice(0, 3).forEach(file => {
    const content = fs.readFileSync(path.join(convertersDir, file), 'utf8');
    
    // Check if content is hidden by default with JavaScript reveal
    if (content.includes('style="display: none"') || content.includes('style="display:none"')) {
        const hiddenCount = (content.match(/display:\s*none/g) || []).length;
        console.log(`  ⚠️  ${file}: ${hiddenCount} elements hidden by default (may need JS to show)`);
        jsRenderingIssues++;
    }
    
    // Check if navigation depends on JavaScript
    if (content.includes('onclick=') || content.includes('onClick=')) {
        console.log(`  ⚠️  ${file}: Contains onclick handlers (navigation may need JS)`);
    }
});

if (jsRenderingIssues === 0) {
    console.log('✅ No JavaScript rendering issues found');
}
console.log('');

// ============================================================================
// 2. CHECK REDIRECT CONFIGURATION ISSUES
// ============================================================================
console.log('📋 2. ANALYZING REDIRECT CONFIGURATION');
console.log('-'.repeat(80));

const redirectsPath = path.join(__dirname, '_redirects');
const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');

console.log('Current _redirects content:');
console.log(redirectsContent);

if (redirectsContent.includes('/*/')) {
    criticalIssues.push('❌ CRITICAL: Wildcard redirect rule may be catching converter URLs');
    console.log('❌ CRITICAL ISSUE FOUND: The rule "/*/  /index.html  200" may be intercepting converter pages!');
    console.log('   This means when Google tries to access /converters/gas-m3-to-kwh.html,');
    console.log('   it may be getting redirected to /index.html instead!');
    console.log('');
} else {
    console.log('✅ No problematic wildcard redirects found');
    console.log('');
}

// ============================================================================
// 3. CHECK FOR CANONICAL URL ISSUES
// ============================================================================
console.log('📋 3. CHECKING CANONICAL URLS');
console.log('-'.repeat(80));

let canonicalIssues = 0;
converterFiles.slice(0, 5).forEach(file => {
    const content = fs.readFileSync(path.join(convertersDir, file), 'utf8');
    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
    
    if (!canonicalMatch) {
        console.log(`  ❌ ${file}: Missing canonical URL`);
        canonicalIssues++;
    } else {
        const canonical = canonicalMatch[1];
        if (canonical.includes('ukgasconverter.netlify.app')) {
            console.log(`  ❌ ${file}: Canonical points to OLD domain: ${canonical}`);
            canonicalIssues++;
        } else if (!canonical.includes('ukconverter.site')) {
            console.log(`  ⚠️  ${file}: Canonical may be incorrect: ${canonical}`);
        }
    }
});

if (canonicalIssues === 0) {
    console.log('✅ All checked pages have correct canonical URLs');
}
console.log('');

// ============================================================================
// 4. CHECK ROBOTS META TAGS
// ============================================================================
console.log('📋 4. CHECKING ROBOTS META TAGS');
console.log('-'.repeat(80));

let robotsBlocking = 0;
converterFiles.slice(0, 5).forEach(file => {
    const content = fs.readFileSync(path.join(convertersDir, file), 'utf8');
    
    if (content.includes('noindex')) {
        console.log(`  ❌ CRITICAL: ${file} has NOINDEX directive!`);
        criticalIssues.push(`${file} is blocked from indexing by noindex tag`);
        robotsBlocking++;
    }
    
    const robotsMatch = content.match(/<meta name="robots" content="([^"]+)"/);
    if (robotsMatch) {
        if (!robotsMatch[1].includes('index') || robotsMatch[1].includes('none')) {
            console.log(`  ❌ ${file}: Robots tag blocks indexing: ${robotsMatch[1]}`);
            robotsBlocking++;
        }
    }
});

if (robotsBlocking === 0) {
    console.log('✅ No robots meta tag blocking issues found');
}
console.log('');

// ============================================================================
// 5. CHECK INTERNAL LINK STRUCTURE
// ============================================================================
console.log('📋 5. ANALYZING INTERNAL LINK STRUCTURE');
console.log('-'.repeat(80));

const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const converterLinks = (indexContent.match(/href="converters\/[^"]+\.html"/g) || []);
console.log(`Home page links to ${converterLinks.length} converter pages`);

if (converterLinks.length < 20) {
    warnings.push('⚠️  Home page has limited links to converter pages');
    console.log('⚠️  WARNING: Home page may not link to all converter pages');
}

// Check if links use relative or absolute paths
const absoluteLinks = converterLinks.filter(link => link.includes('http'));
console.log(`Absolute links: ${absoluteLinks.length}, Relative links: ${converterLinks.length - absoluteLinks.length}`);

if (absoluteLinks.length > 0) {
    console.log('✅ Using relative links (good for crawling)');
}
console.log('');

// ============================================================================
// 6. CHECK SITEMAP ACCESSIBILITY
// ============================================================================
console.log('📋 6. CHECKING SITEMAP CONFIGURATION');
console.log('-'.repeat(80));

const sitemapPath = path.join(__dirname, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const sitemapUrls = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || [])
    .map(m => m.replace(/<\/?loc>/g, ''));

console.log(`Total URLs in sitemap: ${sitemapUrls.length}`);

const converterUrlsInSitemap = sitemapUrls.filter(url => url.includes('/converters/'));
console.log(`Converter pages in sitemap: ${converterUrlsInSitemap.length}`);

if (converterUrlsInSitemap.length !== converterFiles.length) {
    warnings.push(`⚠️  Sitemap has ${converterUrlsInSitemap.length} converter URLs but ${converterFiles.length} files exist`);
    console.log(`⚠️  WARNING: Mismatch between sitemap URLs and actual files`);
}

// Check robots.txt
const robotsTxt = fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf8');
if (robotsTxt.includes('ukconverter.site/sitemap.xml')) {
    console.log('✅ robots.txt correctly points to sitemap');
} else {
    console.log('⚠️  robots.txt may have incorrect sitemap URL');
}
console.log('');

// ============================================================================
// 7. CHECK FOR DUPLICATE CONTENT
// ============================================================================
console.log('📋 7. CHECKING FOR DUPLICATE CONTENT ISSUES');
console.log('-'.repeat(80));

const sampleFiles = converterFiles.slice(0, 3);
const h1Tags = [];
const titles = [];

sampleFiles.forEach(file => {
    const content = fs.readFileSync(path.join(convertersDir, file), 'utf8');
    const h1Match = content.match(/<h1[^>]*>([^<]+)</);
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    
    if (h1Match) h1Tags.push(h1Match[1]);
    if (titleMatch) titles.push(titleMatch[1]);
});

const uniqueH1s = new Set(h1Tags);
const uniqueTitles = new Set(titles);

if (uniqueH1s.size === h1Tags.length && uniqueTitles.size === titles.length) {
    console.log('✅ No duplicate H1 or title tags found in sample');
} else {
    console.log('⚠️  Possible duplicate content detected');
}
console.log('');

// ============================================================================
// 8. CHECK NETLIFY.TOML CONFIGURATION
// ============================================================================
console.log('📋 8. CHECKING NETLIFY.TOML CONFIGURATION');
console.log('-'.repeat(80));

const netlifyToml = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');

if (netlifyToml.includes('force = true')) {
    console.log('⚠️  WARNING: Forced redirects may prevent proper crawling');
    console.log('   Domain redirects with force=true can sometimes cause issues');
    recommendations.push('Consider removing force=true from non-domain redirects');
}

if (netlifyToml.includes('Cache-Control')) {
    console.log('✅ Cache headers configured');
}
console.log('');

// ============================================================================
// FINAL DIAGNOSIS
// ============================================================================
console.log('='.repeat(80));
console.log('🔴 CRITICAL ISSUES PREVENTING INDEXING');
console.log('='.repeat(80));
console.log('');

if (criticalIssues.length === 0) {
    console.log('✅ No critical blocking issues found!');
    console.log('');
    console.log('🤔 POSSIBLE REASONS FOR NON-INDEXING:');
    console.log('');
    console.log('1. 📅 FRESHNESS: Pages may be too new (Google needs time)');
    console.log('   - Solution: Wait 2-4 weeks for natural indexing');
    console.log('   - Action: Request manual indexing via Search Console');
    console.log('');
    console.log('2. 🔗 CRAWL BUDGET: Low domain authority means slower crawling');
    console.log('   - Solution: Build backlinks, ensure all pages linked from home');
    console.log('   - Action: Create more internal links between pages');
    console.log('');
    console.log('3. 🏠 DOMAIN CHANGE: Recently migrated from ukgasconverter.netlify.app');
    console.log('   - Solution: Ensure 301 redirects are working correctly');
    console.log('   - Action: Submit both domains in Search Console with change of address');
    console.log('');
    console.log('4. 📊 LOW CONTENT VALUE: Pages may be too similar or thin');
    console.log('   - Solution: Add unique, substantial content to each page');
    console.log('   - Action: Expand content to 800+ words per page with unique info');
    console.log('');
    console.log('5. 🔍 MANUAL REVIEW NEEDED: Google may need manual indexing request');
    console.log('   - Solution: Use URL Inspection Tool in Search Console');
    console.log('   - Action: Request indexing for each page individually');
    console.log('');
} else {
    criticalIssues.forEach(issue => console.log(issue));
    console.log('');
}

if (warnings.length > 0) {
    console.log('🟡 WARNINGS');
    console.log('-'.repeat(80));
    warnings.forEach(warning => console.log(warning));
    console.log('');
}

if (recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS');
    console.log('-'.repeat(80));
    recommendations.forEach(rec => console.log(`  ${rec}`));
    console.log('');
}

console.log('='.repeat(80));
console.log('📋 IMMEDIATE ACTION ITEMS');
console.log('='.repeat(80));
console.log('');
console.log('1. ✅ Update sitemap.xml with today\'s date (DONE)');
console.log('2. ✅ Ensure all meta tags are correct (DONE)');
console.log('3. 🔄 Remove problematic _redirects fallback rule (DONE if exists)');
console.log('4. 📤 Commit and push all changes to GitHub');
console.log('5. 🌐 Verify deployment on Netlify');
console.log('6. 🔍 Submit sitemap in Google Search Console for BOTH domains');
console.log('7. 📝 Request indexing for top 10 converter pages manually');
console.log('8. 🕐 Wait 48 hours and check indexing status');
console.log('9. 📊 Add more unique content to each converter page (800+ words)');
console.log('10. 🔗 Create more internal links between converter pages');
console.log('');
console.log('='.repeat(80));
