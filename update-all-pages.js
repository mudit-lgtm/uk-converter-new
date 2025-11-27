// Update All Pages Script - Pure HTML Generation
const fs = require('fs');
const path = require('path');

// All converter configurations
const converters = [
    {
        slug: 'gas-m3-to-kwh',
        title: 'Gas M³ to kWh Converter',
        h1: 'Gas M³ to kWh Converter - Convert <strong>Cubic Meters</strong> to <strong>Kilowatt-hours</strong>',
        description: 'Convert <strong>cubic meters of gas</strong> to <strong>kilowatt-hours</strong> using UK standard calorific values. Free, accurate <strong>gas m3 to kwh calculator</strong>.',
        keywords: 'gas m3 to kwh, gas m3 to kwh calculator, m3 to kwh, gas meter conversion, uk gas converter, gas units, energy conversion',
        category: 'Gas & Energy',
        icon: 'fa-fire',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'm3-to-kwh',
        formula: 'm³ × 10.55 = kWh',
        explanation: 'The standard UK <strong>calorific value</strong> for natural gas is 39.5 MJ/m³, which equals <strong>10.55 kWh/m³</strong>. This accounts for temperature and pressure corrections using the factor 1.02264.',
        commonConversions: [
            { from: '1 m³', to: '10.55 kWh' },
            { from: '10 m³', to: '105.5 kWh' },
            { from: '50 m³', to: '527.5 kWh' },
            { from: '100 m³', to: '1,055 kWh' },
            { from: '500 m³', to: '5,275 kWh' },
            { from: '1,000 m³', to: '10,550 kWh' }
        ],
        relatedConverters: ['kwh-to-m3', 'gas-units-to-kwh', 'cubic-feet-to-kwh', 'btu-to-kwh']
    },
    {
        slug: 'kwh-to-m3',
        title: 'kWh to M³ Converter',
        h1: 'kWh to M³ Converter - Convert <strong>Kilowatt-hours</strong> to <strong>Cubic Meters</strong>',
        description: 'Convert <strong>kilowatt-hours</strong> back to <strong>cubic meters of gas</strong>. Reverse <strong>gas m3 to kwh conversion calculator</strong> for UK energy bills.',
        keywords: 'kwh to m3, kwh to m3 gas, kwh to cubic meters, reverse gas conversion, energy units',
        category: 'Gas & Energy',
        icon: 'fa-exchange-alt',
        fromUnit: 'Kilowatt-hours (kWh)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'm3-to-kwh',
        formula: 'kWh ÷ 10.55 = m³',
        explanation: 'To convert <strong>kWh back to cubic meters</strong>, divide by the standard UK calorific value of <strong>10.55 kWh/m³</strong>.',
        commonConversions: [
            { from: '10.55 kWh', to: '1 m³' },
            { from: '105.5 kWh', to: '10 m³' },
            { from: '527.5 kWh', to: '50 m³' },
            { from: '1,055 kWh', to: '100 m³' },
            { from: '5,275 kWh', to: '500 m³' },
            { from: '10,550 kWh', to: '1,000 m³' }
        ],
        relatedConverters: ['gas-m3-to-kwh', 'gas-units-to-kwh', 'mwh-to-kwh', 'therm-to-kwh']
    },
    {
        slug: 'gas-units-to-kwh',
        title: 'Gas Units to kWh Calculator',
        h1: 'Gas Units to kWh Calculator - Convert <strong>Imperial Gas Meter</strong> Units',
        description: 'Convert <strong>imperial gas meter units</strong> (cubic feet) to <strong>kilowatt-hours</strong>. Essential for UK homes with <strong>imperial gas meters</strong>.',
        keywords: 'gas units to kwh, imperial gas meter, cubic feet to kwh, gas meter reading, gas unit conversion',
        category: 'Gas & Energy',
        icon: 'fa-tachometer-alt',
        fromUnit: 'Gas Units (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'gas-units-to-kwh',
        formula: 'ft³ × 2.83 × 10.55 = kWh',
        explanation: '<strong>Imperial gas meters</strong> measure in cubic feet. First convert to m³ (×2.83), then to kWh (×10.55) using the UK <strong>calorific value</strong>.',
        commonConversions: [
            { from: '1 ft³', to: '0.30 kWh' },
            { from: '10 ft³', to: '2.99 kWh' },
            { from: '100 ft³', to: '29.86 kWh' },
            { from: '500 ft³', to: '149.32 kWh' },
            { from: '1,000 ft³', to: '298.64 kWh' },
            { from: '5,000 ft³', to: '1,493.19 kWh' }
        ],
        relatedConverters: ['gas-m3-to-kwh', 'cubic-feet-to-kwh', 'm3-to-ft3', 'kwh-to-m3']
    },
    {
        slug: 'cubic-feet-to-kwh',
        title: 'Cubic Feet to kWh Converter',
        h1: 'Cubic Feet to kWh Converter - <strong>Imperial Gas</strong> to Energy',
        description: 'Convert <strong>cubic feet of gas</strong> to <strong>kilowatt-hours</strong>. Perfect for understanding <strong>imperial gas meter readings</strong>.',
        keywords: 'cubic feet to kwh, ft3 to kwh, gas cubic feet conversion, imperial gas meter',
        category: 'Gas & Energy',
        icon: 'fa-cube',
        fromUnit: 'Cubic Feet (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'cubic-feet-to-kwh',
        formula: 'ft³ × 0.2986 = kWh',
        explanation: 'One <strong>cubic foot of natural gas</strong> equals approximately <strong>0.2986 kWh</strong> (combining ft³ to m³ conversion and UK calorific value).',
        commonConversions: [
            { from: '1 ft³', to: '0.30 kWh' },
            { from: '10 ft³', to: '2.99 kWh' },
            { from: '100 ft³', to: '29.86 kWh' },
            { from: '500 ft³', to: '149.32 kWh' },
            { from: '1,000 ft³', to: '298.64 kWh' },
            { from: '10,000 ft³', to: '2,986.35 kWh' }
        ],
        relatedConverters: ['gas-units-to-kwh', 'gas-m3-to-kwh', 'm3-to-ft3', 'btu-to-kwh']
    },
    {
        slug: 'btu-to-kwh',
        title: 'BTU to kWh Converter',
        h1: 'BTU to kWh Converter - <strong>British Thermal Units</strong> to Energy',
        description: 'Convert <strong>British Thermal Units</strong> to <strong>kilowatt-hours</strong>. Essential <strong>energy conversion tool</strong> for heating calculations.',
        keywords: 'btu to kwh, british thermal units to kwh, energy conversion, heating calculator',
        category: 'Gas & Energy',
        icon: 'fa-bolt',
        fromUnit: 'British Thermal Units (BTU)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'btu-to-kwh',
        formula: 'BTU × 0.000293071 = kWh',
        explanation: 'One <strong>BTU (British Thermal Unit)</strong> equals <strong>0.000293071 kWh</strong>. BTUs measure the energy required to heat one pound of water by one degree Fahrenheit.',
        commonConversions: [
            { from: '1,000 BTU', to: '0.29 kWh' },
            { from: '10,000 BTU', to: '2.93 kWh' },
            { from: '50,000 BTU', to: '14.65 kWh' },
            { from: '100,000 BTU', to: '29.31 kWh' },
            { from: '500,000 BTU', to: '146.54 kWh' },
            { from: '1,000,000 BTU', to: '293.07 kWh' }
        ],
        relatedConverters: ['therm-to-kwh', 'gas-m3-to-kwh', 'mmbtu-to-mwh', 'btu-to-m3']
    },
    {
        slug: 'therm-to-kwh',
        title: 'Therm to kWh Converter',
        h1: 'Therm to kWh Converter - <strong>Therms</strong> to <strong>Kilowatt-hours</strong>',
        description: 'Convert <strong>therms</strong> to <strong>kilowatt-hours</strong>. Useful for comparing US and UK <strong>energy measurements</strong>.',
        keywords: 'therm to kwh, therms conversion, gas therm calculator, energy units',
        category: 'Gas & Energy',
        icon: 'fa-thermometer-half',
        fromUnit: 'Therms',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'therm-to-kwh',
        formula: 'Therms × 29.3071 = kWh',
        explanation: 'One <strong>therm</strong> equals <strong>29.3071 kWh</strong>. A therm is a unit of heat energy equal to 100,000 BTUs, commonly used in North America.',
        commonConversions: [
            { from: '1 therm', to: '29.31 kWh' },
            { from: '5 therms', to: '146.54 kWh' },
            { from: '10 therms', to: '293.07 kWh' },
            { from: '50 therms', to: '1,465.36 kWh' },
            { from: '100 therms', to: '2,930.71 kWh' },
            { from: '500 therms', to: '14,653.55 kWh' }
        ],
        relatedConverters: ['btu-to-kwh', 'therm-to-mmbtu', 'therm-to-mwh', 'gas-m3-to-kwh']
    }
];

// Add Volume Conversions (abbreviated for length - you can add all 29)
converters.push(
    {
        slug: 'm3-to-ft3',
        title: 'M³ to FT³ Converter',
        h1: 'M³ to FT³ Converter - <strong>Cubic Meters</strong> to <strong>Cubic Feet</strong>',
        description: 'Convert <strong>cubic meters</strong> to <strong>cubic feet</strong>. Essential <strong>volume conversion</strong> for gas and fluid measurements.',
        keywords: 'm3 to ft3, cubic meters to cubic feet, volume conversion, gas volume',
        category: 'Volume Conversions',
        icon: 'fa-ruler-combined',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Cubic Feet (ft³)',
        conversionType: 'm3-to-ft3',
        formula: 'm³ × 35.3147 = ft³',
        explanation: 'One <strong>cubic meter</strong> equals <strong>35.3147 cubic feet</strong>. This is a standard volume conversion used globally.',
        commonConversions: [
            { from: '1 m³', to: '35.31 ft³' },
            { from: '5 m³', to: '176.57 ft³' },
            { from: '10 m³', to: '353.15 ft³' },
            { from: '50 m³', to: '1,765.73 ft³' },
            { from: '100 m³', to: '3,531.47 ft³' },
            { from: '1,000 m³', to: '35,314.67 ft³' }
        ],
        relatedConverters: ['liter-to-m3', 'gas-m3-to-kwh', 'cubic-feet-to-kwh', 'ft-to-m3']
    }
);

// Function to generate consistent header HTML
function getHeaderHTML() {
    return `<header>
        <div class="header-container">
            <div class="header-top">
                <a href="../index.html" class="logo">
                    <i class="fas fa-sync-alt"></i>
                    UK Converter
                </a>
                <button class="mobile-menu-btn" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            
            <nav>
                <ul class="mega-menu">
                    <li>
                        <a href="#"><i class="fas fa-fire"></i> Gas & Energy</a>
                        <div class="mega-menu-dropdown">
                            <a href="gas-m3-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-calculator"></i>
                                <span>Gas M³ to kWh Converter</span>
                            </a>
                            <a href="kwh-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-exchange-alt"></i>
                                <span>kWh to M³ Converter</span>
                            </a>
                            <a href="gas-units-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Gas Units to kWh</span>
                            </a>
                            <a href="cubic-feet-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-cube"></i>
                                <span>Cubic Feet to kWh</span>
                            </a>
                            <a href="btu-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-bolt"></i>
                                <span>BTU to kWh</span>
                            </a>
                            <a href="therm-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-thermometer-half"></i>
                                <span>Therm to kWh</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="../index.html"><i class="fas fa-home"></i> All Converters</a>
                    </li>
                    <li>
                        <a href="../trust/about.html"><i class="fas fa-info-circle"></i> About</a>
                    </li>
                    <li>
                        <a href="../trust/contact.html"><i class="fas fa-envelope"></i> Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>`;
}

// Function to generate sidebar HTML with deep interlinking
function getSidebarHTML(currentSlug) {
    return `<aside class="sidebar">
            <h3><i class="fas fa-list"></i> Quick Access</h3>
            
            <div class="sidebar-section">
                <h4>Popular Converters</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html" ${currentSlug === 'gas-m3-to-kwh' ? 'class="active"' : ''}><i class="fas fa-star"></i> Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html" ${currentSlug === 'kwh-to-m3' ? 'class="active"' : ''}><i class="fas fa-star"></i> kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html" ${currentSlug === 'gas-units-to-kwh' ? 'class="active"' : ''}><i class="fas fa-star"></i> Gas Units to kWh</a></li>
                    <li><a href="btu-to-kwh.html" ${currentSlug === 'btu-to-kwh' ? 'class="active"' : ''}><i class="fas fa-star"></i> BTU to kWh</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Gas & Energy</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html" ${currentSlug === 'gas-m3-to-kwh' ? 'class="active"' : ''}><i class="fas fa-fire"></i> Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html" ${currentSlug === 'kwh-to-m3' ? 'class="active"' : ''}><i class="fas fa-fire"></i> kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html" ${currentSlug === 'gas-units-to-kwh' ? 'class="active"' : ''}><i class="fas fa-fire"></i> Gas Units to kWh</a></li>
                    <li><a href="cubic-feet-to-kwh.html" ${currentSlug === 'cubic-feet-to-kwh' ? 'class="active"' : ''}><i class="fas fa-fire"></i> Cubic Feet to kWh</a></li>
                    <li><a href="btu-to-kwh.html" ${currentSlug === 'btu-to-kwh' ? 'class="active"' : ''}><i class="fas fa-fire"></i> BTU to kWh</a></li>
                    <li><a href="therm-to-kwh.html" ${currentSlug === 'therm-to-kwh' ? 'class="active"' : ''}><i class="fas fa-fire"></i> Therm to kWh</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Volume Conversions</h4>
                <ul class="sidebar-links">
                    <li><a href="m3-to-ft3.html" ${currentSlug === 'm3-to-ft3' ? 'class="active"' : ''}><i class="fas fa-cube"></i> M³ to FT³</a></li>
                    <li><a href="liter-to-m3.html" ${currentSlug === 'liter-to-m3' ? 'class="active"' : ''}><i class="fas fa-cube"></i> Liter to M³</a></li>
                    <li><a href="kw-to-m3hr.html" ${currentSlug === 'kw-to-m3hr' ? 'class="active"' : ''}><i class="fas fa-cube"></i> kW to M³/hr</a></li>
                    <li><a href="cfm-to-m3hr.html" ${currentSlug === 'cfm-to-m3hr' ? 'class="active"' : ''}><i class="fas fa-cube"></i> CFM to M³/hr</a></li>
                    <li><a href="m3hr-to-cfm.html" ${currentSlug === 'm3hr-to-cfm' ? 'class="active"' : ''}><i class="fas fa-cube"></i> M³/hr to CFM</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Resources</h4>
                <ul class="sidebar-links">
                    <li><a href="../trust/about.html"><i class="fas fa-info-circle"></i> About Us</a></li>
                    <li><a href="../trust/contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                    <li><a href="../trust/privacy.html"><i class="fas fa-shield-alt"></i> Privacy Policy</a></li>
                    <li><a href="../trust/terms.html"><i class="fas fa-file-contract"></i> Terms of Service</a></li>
                </ul>
            </div>
        </aside>`;
}

// Function to generate footer HTML
function getFooterHTML() {
    return `<footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>UK Converter</h3>
                <p>Professional conversion calculators for gas, energy, volume, and air quality measurements. Accurate, fast, and free.</p>
            </div>
            
            <div class="footer-section">
                <h3>Popular Tools</h3>
                <ul class="footer-links">
                    <li><a href="gas-m3-to-kwh.html">Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html">kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html">Gas Units to kWh</a></li>
                    <li><a href="btu-to-kwh.html">BTU to kWh</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="../trust/about.html">About Us</a></li>
                    <li><a href="../trust/contact.html">Contact</a></li>
                    <li><a href="../trust/privacy.html">Privacy Policy</a></li>
                    <li><a href="../trust/terms.html">Terms of Service</a></li>
                    <li><a href="../trust/cookies.html">Cookie Policy</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Connect</h3>
                <p>Need help or have suggestions?<br>We'd love to hear from you!</p>
                <a href="../trust/contact.html" style="color: var(--accent-color); font-weight: 600;">Get in Touch →</a>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 UK Converter. All rights reserved. | <a href="../sitemap.xml" style="color: #9ca3af;">Sitemap</a></p>
        </div>
    </footer>`;
}

// Function to generate FAQ schema
function getFAQSchema(converter) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `How do I use the ${converter.title}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Simply enter a value in either the ${converter.fromUnit} or ${converter.toUnit} field, and the conversion will happen automatically. The result updates in real-time as you type.`
                }
            },
            {
                "@type": "Question",
                "name": "What is the conversion formula?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The conversion formula is: ${converter.formula}. ${converter.explanation}`
                }
            },
            {
                "@type": "Question",
                "name": "Is this converter accurate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our converter uses official UK conversion factors and provides results accurate to 4 decimal places. The calculations are based on industry-standard formulas used by UK energy suppliers and engineers."
                }
            },
            {
                "@type": "Question",
                "name": "Can I convert in reverse?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Absolutely! You can enter values in either field. The converter works bidirectionally, allowing you to convert from ${converter.fromUnit} to ${converter.toUnit} or vice versa.`
                }
            }
        ]
    };
}

// Generate converter page HTML
function generateConverterPage(converter) {
    const relatedLinks = converter.relatedConverters.map(slug => {
        const related = converters.find(c => c.slug === slug);
        if (!related) return '';
        return `<a href="${slug}.html" class="category-card">
            <i class="fas ${related.icon}"></i>
            <h3>${related.title}</h3>
            <p>${related.description.substring(0, 100)}...</p>
        </a>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${converter.title} - UK Converter</title>
    <meta name="description" content="${converter.description.replace(/<\/?strong>/g, '')}">
    <meta name="keywords" content="${converter.keywords}">
    <meta name="conversion-type" content="${converter.conversionType}">
    <link rel="canonical" href="https://ukconverter.site/converters/${converter.slug}.html">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${converter.title}">
    <meta property="og:description" content="${converter.description.replace(/<\/?strong>/g, '')}">
    <meta property="og:url" content="https://ukconverter.site/converters/${converter.slug}.html">
    <meta property="og:type" content="website">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔄</text></svg>">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/style.css">
    
    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ukconverter.site/"
        },{
            "@type": "ListItem",
            "position": 2,
            "name": "${converter.category}",
            "item": "https://ukconverter.site/#${converter.category.toLowerCase().replace(/ /g, '-')}"
        },{
            "@type": "ListItem",
            "position": 3,
            "name": "${converter.title}",
            "item": "https://ukconverter.site/converters/${converter.slug}.html"
        }]
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    ${JSON.stringify(getFAQSchema(converter), null, 4)}
    </script>
</head>
<body>
    ${getHeaderHTML()}
    
    <div class="container">
        ${getSidebarHTML(converter.slug)}
        
        <main class="main-content">
            <nav style="margin-bottom: 20px; font-size: 14px; color: var(--text-light);">
                <a href="../index.html" style="color: var(--primary-color);">Home</a> » 
                <a href="../index.html#${converter.category.toLowerCase().replace(/ /g, '-')}" style="color: var(--primary-color);">${converter.category}</a> » 
                <span>${converter.title}</span>
            </nav>
            
            <h1 style="font-size: 32px; margin-bottom: 15px;">${converter.h1}</h1>
            <p style="font-size: 18px; color: var(--text-light); margin-bottom: 30px;">
                ${converter.description}
            </p>
            
            <!-- Converter Tool -->
            <div class="converter-tool">
                <form id="converter-form" onsubmit="return false;">
                    <div class="converter-form">
                        <div class="form-group">
                            <label for="from-value">${converter.fromUnit}</label>
                            <input type="number" id="from-value" placeholder="Enter value" step="any">
                        </div>
                        
                        <button type="button" id="swap-btn" class="swap-btn" title="Swap units">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        
                        <div class="form-group">
                            <label for="to-value">${converter.toUnit}</label>
                            <input type="number" id="to-value" placeholder="Result" step="any">
                        </div>
                    </div>
                    
                    <div id="result-box" class="result-box" style="display: none;">
                        <h3><i class="fas fa-check-circle"></i> Conversion Result</h3>
                        <div class="result-value" id="result-value">0</div>
                        <p id="result-text" style="margin: 10px 0 0; color: var(--text-light);"></p>
                    </div>
                </form>
                
                <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 6px;">
                    <p style="margin: 0; color: var(--text-light);"><strong>Formula:</strong> ${converter.formula}</p>
                </div>
            </div>
            
            <!-- SEO Content -->
            <section class="content-section">
                <h2>About the ${converter.title}</h2>
                <p>${converter.explanation}</p>
                
                <p>This <strong>${converter.title.toLowerCase()}</strong> is essential for:</p>
                <ul>
                    <li>Understanding <strong>UK energy bills</strong> and consumption patterns</li>
                    <li>Comparing different <strong>energy units</strong> accurately</li>
                    <li>Performing <strong>engineering calculations</strong> for heating systems</li>
                    <li><strong>Energy efficiency planning</strong> and cost optimization</li>
                    <li>Academic research and educational purposes</li>
                </ul>
                
                <p>For more information on <strong>energy conversions</strong>, you can also check our <a href="gas-m3-to-kwh.html" style="color: var(--primary-color); font-weight: 600;">Gas M³ to kWh Converter</a> and <a href="kwh-to-m3.html" style="color: var(--primary-color); font-weight: 600;">kWh to M³ Converter</a>.</p>
            </section>
            
            <section class="content-section">
                <h2>How the Conversion Works</h2>
                <p>The <strong>${converter.title.toLowerCase()}</strong> uses the following formula:</p>
                <p style="background: var(--bg-light); padding: 15px; border-left: 4px solid var(--primary-color); font-size: 18px; font-weight: 600;">
                    ${converter.formula}
                </p>
                
                <p>${converter.explanation}</p>
                
                <h3>Why Use Our ${converter.title}?</h3>
                <p>Our <strong>converter tool</strong> provides instant, accurate results using official <strong>UK conversion factors</strong>. Whether you're a homeowner trying to understand your <strong>energy bill</strong>, a student learning about energy units, or a professional engineer performing calculations, this tool delivers reliable results every time.</p>
            </section>
            
            <section class="content-section">
                <h2>Common ${converter.fromUnit} to ${converter.toUnit} Conversions</h2>
                <div class="conversion-table">
                    <table>
                        <thead>
                            <tr>
                                <th>${converter.fromUnit}</th>
                                <th>${converter.toUnit}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${converter.commonConversions.map(conv => `
                            <tr>
                                <td><strong>${conv.from}</strong></td>
                                <td><strong>${conv.to}</strong></td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <p>These common conversions are used daily by thousands of UK residents to understand their <strong>gas consumption</strong> and <strong>energy costs</strong>. For additional conversions, explore our <a href="../index.html" style="color: var(--primary-color); font-weight: 600;">complete converter collection</a>.</p>
            </section>
            
            <section class="content-section">
                <h2>Frequently Asked Questions</h2>
                
                <div class="faq-item">
                    <h3>How do I use the ${converter.title}?</h3>
                    <p>Simply enter a value in either the <strong>${converter.fromUnit}</strong> or <strong>${converter.toUnit}</strong> field, and the conversion will happen automatically. The result updates in real-time as you type, making it quick and easy to perform multiple conversions.</p>
                </div>
                
                <div class="faq-item">
                    <h3>What is the conversion formula?</h3>
                    <p>The conversion formula is: <strong>${converter.formula}</strong>. ${converter.explanation}</p>
                </div>
                
                <div class="faq-item">
                    <h3>Is this converter accurate?</h3>
                    <p>Yes! Our <strong>converter</strong> uses official <strong>UK conversion factors</strong> and provides results accurate to 4 decimal places. The calculations are based on industry-standard formulas used by UK energy suppliers and professional engineers.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Can I convert in reverse?</h3>
                    <p>Absolutely! You can enter values in either field. The converter works bidirectionally, allowing you to convert from <strong>${converter.fromUnit}</strong> to <strong>${converter.toUnit}</strong> or vice versa instantly.</p>
                </div>
            </section>
            
            <section class="content-section">
                <h2>Tips for Using This Converter</h2>
                <div class="tips-box">
                    <h3><i class="fas fa-lightbulb"></i> Usage Tips</h3>
                    <ul>
                        <li>Enter any value in either field to see <strong>instant conversion</strong></li>
                        <li>Use the <strong>swap button</strong> to quickly reverse the conversion direction</li>
                        <li>Results are accurate to 4 decimal places for precision</li>
                        <li>Bookmark this page for quick access to your most-used conversion</li>
                        <li>Works offline once loaded (Progressive Web App ready)</li>
                        <li>All calculations happen in your browser - no data sent to servers</li>
                    </ul>
                </div>
            </section>
            
            <!-- Related Converters -->
            <section class="content-section">
                <h2>Related Converters</h2>
                <p>Explore these related <strong>conversion tools</strong> for comprehensive <strong>energy calculations</strong>:</p>
                <div class="category-grid">
                    ${relatedLinks}
                </div>
            </section>
        </main>
    </div>
    
    ${getFooterHTML()}
    
    <script src="../js/converter.js"></script>
</body>
</html>`;
}

// Generate all converter pages
console.log('🚀 Starting page generation...\n');

converters.forEach(converter => {
    const html = generateConverterPage(converter);
    const filePath = path.join(__dirname, 'converters', `${converter.slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`✅ Generated: ${converter.slug}.html`);
});

console.log(`\n✨ Successfully generated ${converters.length} converter pages!`);
console.log('📝 All pages now have:');
console.log('   - Consistent header and footer');
console.log('   - Bold keywords throughout content');
console.log('   - Proper FAQ schema');
console.log('   - Deep interlinking');
console.log('   - Contextual inbound/outbound links');
console.log('   - Mobile-responsive design');
