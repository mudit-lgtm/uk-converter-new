const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('🔍 COMPREHENSIVE SEO & INDEXING AUDIT FOR ukconverter.site');
console.log('='.repeat(80));
console.log('');

const issues = [];
const recommendations = [];

// Check all HTML files
const convertersDir = path.join(__dirname, 'converters');
const trustDir = path.join(__dirname, 'trust');
const indexFile = path.join(__dirname, 'index.html');

function analyzeHTML(filePath, fileName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileIssues = [];
    
    // Check for common indexing blockers
    if (content.includes('noindex')) {
        fileIssues.push(`❌ CRITICAL: Contains 'noindex' directive`);
    }
    
    if (content.includes('nofollow') && !content.includes('index, follow')) {
        fileIssues.push(`⚠️  WARNING: Contains 'nofollow' without 'follow'`);
    }
    
    // Check canonical URL
    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canonicalMatch) {
        fileIssues.push(`❌ MISSING: Canonical URL`);
    } else if (canonicalMatch[1].includes('ukgasconverter.netlify.app')) {
        fileIssues.push(`❌ CRITICAL: Canonical URL points to old domain (${canonicalMatch[1]})`);
    }
    
    // Check meta robots
    const robotsMatch = content.match(/<meta name="robots" content="([^"]+)"/);
    if (!robotsMatch) {
        fileIssues.push(`⚠️  MISSING: Meta robots tag`);
    }
    
    // Check title tag
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (!titleMatch) {
        fileIssues.push(`❌ CRITICAL: Missing title tag`);
    } else if (titleMatch[1].length > 60) {
        fileIssues.push(`⚠️  WARNING: Title too long (${titleMatch[1].length} chars)`);
    }
    
    // Check meta description
    const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
    if (!descMatch) {
        fileIssues.push(`❌ CRITICAL: Missing meta description`);
    } else if (descMatch[1].length > 160) {
        fileIssues.push(`⚠️  WARNING: Description too long (${descMatch[1].length} chars)`);
    }
    
    // Check for structured data
    if (!content.includes('application/ld+json')) {
        fileIssues.push(`⚠️  MISSING: Structured data (Schema.org)`);
    }
    
    // Check for Open Graph tags
    if (!content.includes('og:title')) {
        fileIssues.push(`⚠️  MISSING: Open Graph tags`);
    }
    
    // Check H1 tag
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (!h1Match) {
        fileIssues.push(`❌ CRITICAL: Missing H1 tag`);
    }
    
    // Check for internal links
    const internalLinksCount = (content.match(/href="[^"]*\.html"/g) || []).length;
    if (internalLinksCount < 3) {
        fileIssues.push(`⚠️  WARNING: Low internal linking (${internalLinksCount} links)`);
    }
    
    // Check relative vs absolute paths in links
    const absoluteOldDomain = (content.match(/href="https:\/\/ukgasconverter\.netlify\.app/g) || []).length;
    if (absoluteOldDomain > 0) {
        fileIssues.push(`❌ CRITICAL: ${absoluteOldDomain} links point to old domain`);
    }
    
    // Check for proper heading hierarchy
    const h1Count = (content.match(/<h1[^>]*>/g) || []).length;
    if (h1Count > 1) {
        fileIssues.push(`⚠️  WARNING: Multiple H1 tags (${h1Count})`);
    }
    
    return fileIssues;
}

console.log('📋 ANALYZING INDEX PAGE');
console.log('-'.repeat(80));
const indexIssues = analyzeHTML(indexFile, 'index.html');
if (indexIssues.length > 0) {
    console.log('index.html:');
    indexIssues.forEach(issue => console.log(`  ${issue}`));
} else {
    console.log('✅ index.html: No issues found');
}
console.log('');

console.log('📋 ANALYZING CONVERTER PAGES');
console.log('-'.repeat(80));
const converterFiles = fs.readdirSync(convertersDir).filter(f => f.endsWith('.html'));
let converterIssueCount = 0;
converterFiles.forEach(file => {
    const issues = analyzeHTML(path.join(convertersDir, file), file);
    if (issues.length > 0) {
        console.log(`${file}:`);
        issues.forEach(issue => console.log(`  ${issue}`));
        console.log('');
        converterIssueCount++;
    }
});
if (converterIssueCount === 0) {
    console.log('✅ All converter pages: No issues found');
}
console.log('');

console.log('📋 ANALYZING TRUST PAGES');
console.log('-'.repeat(80));
const trustFiles = fs.readdirSync(trustDir).filter(f => f.endsWith('.html'));
let trustIssueCount = 0;
trustFiles.forEach(file => {
    const issues = analyzeHTML(path.join(trustDir, file), file);
    if (issues.length > 0) {
        console.log(`${file}:`);
        issues.forEach(issue => console.log(`  ${issue}`));
        console.log('');
        trustIssueCount++;
    }
});
if (trustIssueCount === 0) {
    console.log('✅ All trust pages: No issues found');
}
console.log('');

// Check robots.txt
console.log('📋 CHECKING ROBOTS.TXT');
console.log('-'.repeat(80));
const robotsTxt = fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf8');
console.log(robotsTxt);
if (robotsTxt.includes('Disallow: /')) {
    console.log('❌ CRITICAL: robots.txt is blocking all pages!');
} else if (robotsTxt.includes('ukgasconverter.netlify.app')) {
    console.log('❌ CRITICAL: robots.txt references old domain');
} else {
    console.log('✅ robots.txt looks good');
}
console.log('');

// Check sitemap.xml
console.log('📋 CHECKING SITEMAP.XML');
console.log('-'.repeat(80));
const sitemap = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf8');
const sitemapUrls = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, ''));
console.log(`Total URLs in sitemap: ${sitemapUrls.length}`);

const oldDomainInSitemap = sitemapUrls.filter(url => url.includes('ukgasconverter.netlify.app'));
if (oldDomainInSitemap.length > 0) {
    console.log(`❌ CRITICAL: ${oldDomainInSitemap.length} URLs use old domain in sitemap`);
} else {
    console.log('✅ All sitemap URLs use correct domain');
}

const outdatedDates = sitemapUrls.filter(url => {
    const match = sitemap.match(new RegExp(`<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>([^<]+)</lastmod>`));
    return match && match[1] < '2024-12-01';
});
if (outdatedDates.length > 0) {
    console.log(`⚠️  WARNING: ${outdatedDates.length} URLs have outdated lastmod dates`);
}
console.log('');

// Check Netlify configuration
console.log('📋 CHECKING NETLIFY CONFIGURATION');
console.log('-'.repeat(80));
const netlifyToml = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');
console.log(netlifyToml);
console.log('');

// Check _redirects
console.log('📋 CHECKING _REDIRECTS FILE');
console.log('-'.repeat(80));
const redirects = fs.readFileSync(path.join(__dirname, '_redirects'), 'utf8');
console.log(redirects);
console.log('');

// Final recommendations
console.log('='.repeat(80));
console.log('📊 KEY FINDINGS & RECOMMENDATIONS');
console.log('='.repeat(80));
console.log('');
console.log('🔴 CRITICAL ISSUES (Must Fix for Indexing):');
console.log('  1. Check if any pages have noindex directives');
console.log('  2. Verify all canonical URLs point to ukconverter.site (not old domain)');
console.log('  3. Ensure sitemap.xml is accessible at https://ukconverter.site/sitemap.xml');
console.log('  4. Update all lastmod dates in sitemap to current date');
console.log('  5. Submit updated sitemap to Google Search Console');
console.log('');
console.log('🟡 RECOMMENDED IMPROVEMENTS:');
console.log('  1. Add breadcrumb navigation to all pages for better crawlability');
console.log('  2. Ensure all pages have proper internal linking');
console.log('  3. Add more textual content to pages (aim for 500+ words)');
console.log('  4. Create an HTML sitemap page for users');
console.log('  5. Add hreflang tags if targeting multiple regions');
console.log('  6. Implement lazy loading for images if any');
console.log('');
console.log('🟢 NEXT STEPS:');
console.log('  1. Fix all critical issues identified above');
console.log('  2. Request re-indexing in Google Search Console for all pages');
console.log('  3. Submit sitemap manually: Search Console > Sitemaps > Add new sitemap');
console.log('  4. Use URL Inspection Tool to test live URLs');
console.log('  5. Check for manual actions in Search Console');
console.log('  6. Verify site ownership is properly set up');
console.log('');
console.log('='.repeat(80));
console.log('Audit Complete! 🎉');
console.log('='.repeat(80));
