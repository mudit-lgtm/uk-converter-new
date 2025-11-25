# UK Converter - Professional Conversion Calculators

## 🎯 Overview

UK Converter is a comprehensive static HTML website providing accurate, free conversion calculators for gas, energy, volume, and air quality measurements. Built with pure HTML, CSS, and JavaScript for maximum performance and SEO.

**Live Website:** https://ukconverter.site/
**Preview URL:** https://3000-ib8upci2q0hwmsh1ddf37-5c13a017.sandbox.novita.ai

## ✨ Features

- ✅ **29 Conversion Calculators** covering gas, energy, volume, weight, air quality, and specialized conversions
- ✅ **Server-Side Rendering (SSR)** - Pure static HTML for instant loading and perfect SEO
- ✅ **Responsive Design** - Mega menu navigation optimized for desktop, mobile, and tablets
- ✅ **Deep Interlinking** - Sidebar navigation for improved UX and SEO
- ✅ **Comprehensive SEO** - Meta tags, schema markup, FAQ schema, breadcrumbs
- ✅ **Trust Pages** - About, Contact, Privacy, Terms, Cookie Policy
- ✅ **Sitemap.xml** - Complete sitemap for search engine indexing
- ✅ **Domain Redirect** - Automatic 301 redirect from ukgasconverter.netlify.app to ukconverter.site

## 📁 Project Structure

```
webapp/
├── index.html              # Home page with SEO content
├── converters/            # 29 converter pages
│   ├── gas-m3-to-kwh.html
│   ├── kwh-to-m3.html
│   ├── gas-units-to-kwh.html
│   └── ... (26 more)
├── trust/                 # Trust factor pages
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   └── cookies.html
├── css/
│   └── style.css          # Responsive CSS with mobile-first design
├── js/
│   └── converter.js       # Client-side conversion logic
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── netlify.toml           # Netlify deployment configuration
└── _redirects             # Domain redirect rules
```

## 🚀 Deployment Instructions

### Deploy to Netlify

1. **Connect Repository:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select `uk-converter-new` repository

2. **Build Settings:**
   - Build command: (leave empty - no build needed)
   - Publish directory: `.` (root)
   - Click "Deploy site"

3. **Custom Domain Setup:**
   - Go to Site settings → Domain management
   - Add custom domain: `ukconverter.site`
   - Configure DNS:
     - A record: `75.2.60.5`
     - CNAME www: `[your-site].netlify.app`

4. **SSL Certificate:**
   - Netlify automatically provisions SSL certificate
   - Force HTTPS: Enable in Domain settings

### Automatic Redirects

The site automatically redirects all traffic from `ukgasconverter.netlify.app` to `ukconverter.site` via:
- `netlify.toml` configuration
- `_redirects` file
- 301 permanent redirects

## 🎨 Converter Categories

### Gas & Energy (6 converters)
- Gas M³ to kWh
- kWh to M³
- Gas Units to kWh
- Cubic Feet to kWh
- BTU to kWh
- Therm to kWh

### Volume Conversions (5 converters)
- M³ to FT³
- Liter to M³
- kW to M³/hr
- CFM to M³/hr
- M³/hr to CFM

### Weight & Density (2 converters)
- M³ to KG
- KG to M³

### Air Quality (4 converters)
- PPM to μg/m³
- PPM to mg/m³
- mg/m³ to PPM
- μg/m³ to PPM

### Advanced Energy (8 converters)
- BTU to M³
- MMBtu to MWh
- MWh to MMBtu
- MWh to kWh
- Therm to MMBtu
- MMBtu to Therm
- Therm to MWh
- MMBtu to MMSCF

### Specialized (4 converters)
- M² to M³
- Sq Ft to M³
- FT to M³
- Nm³ to M³

## 🔍 SEO Features

### On-Page SEO
- Optimized title tags with target keywords
- Compelling meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- H1-H6 hierarchy

### Schema Markup
- Organization schema
- WebSite schema
- BreadcrumbList schema
- FAQPage schema
- Question/Answer schema

### Content Structure
1. About the converter
2. How the conversion works
3. Why use our converter
4. Common conversions table
5. Frequently Asked Questions (with schema)
6. Tips for using the tool

### Performance
- Pure static HTML (no build process)
- Minimal CSS (11KB)
- Efficient JavaScript (9KB)
- CDN-hosted Font Awesome icons
- Fast loading times (<1s)

## 📊 SEO Keywords Targeted

Based on 90-day Google Search Console data:
- gas m3 to kwh calculator (26 clicks)
- gas units to kwh calculator (18 clicks)
- m3 to kwh (10 clicks)
- gas m3 to kwh calculator uk
- gas kwh to m3
- + 400+ additional long-tail keywords

## 🎯 Target Audience

- UK homeowners verifying energy bills
- Landlords calculating tenant usage
- Energy consultants and engineers
- Students learning about energy units
- Business accountants verifying costs

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icon library (CDN)
- **GitHub** - Version control
- **Netlify** - Static site hosting

## 📝 Development

### Local Development

```bash
# Clone repository
git clone https://github.com/mudit-lgtm/uk-converter-new.git
cd uk-converter-new

# Start local server
python3 -m http.server 3000

# Open browser
http://localhost:3000
```

### Generate New Converter Pages

```bash
# Edit generate-pages.js to add new converters
node generate-pages.js
```

## 🔄 Updates & Maintenance

### Update Conversion Factors
Edit `js/converter.js` and update the `conversionData` object.

### Add New Converter
1. Add configuration to `generate-pages.js`
2. Run `node generate-pages.js`
3. Update sitemap.xml
4. Commit and push

### Update SEO Content
Individual converter pages are in `/converters/`
Edit HTML directly or regenerate via script.

## 📈 Analytics & Monitoring

- Monitor traffic via Netlify Analytics
- Track search performance via Google Search Console
- Verify indexing status via Google Search Console
- Monitor redirects in Netlify logs

## 🔐 Security & Privacy

- No data collection
- No tracking cookies
- GDPR compliant
- All calculations client-side
- HTTPS enforced
- Security headers configured

## 📞 Contact

- **Website:** https://ukconverter.site/
- **Email:** hello@ukconverter.site
- **GitHub:** https://github.com/mudit-lgtm/uk-converter-new

## 📄 License

Copyright © 2024 UK Converter. All rights reserved.

## 🎉 Acknowledgments

Built with care for the UK energy consumer community.

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Status:** ✅ Live and Indexed
