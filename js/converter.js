// UK Converter - Main JavaScript

// Conversion factors and formulas
const conversionData = {
    // Gas & Energy conversions
    'm3-to-kwh': {
        formula: (value) => value * 10.55, // Standard UK calorific value
        reverse: (value) => value / 10.55,
        factor: 10.55,
        description: 'Using standard UK calorific value of 39.5 MJ/m³ (10.55 kWh/m³)'
    },
    'gas-units-to-kwh': {
        formula: (value, cv = 39.5) => value * cv * 1.02264 / 3.6,
        description: 'Gas units to kWh using imperial to metric conversion'
    },
    'cubic-feet-to-kwh': {
        formula: (value) => (value * 0.0283168 * 10.55),
        reverse: (value) => value / (0.0283168 * 10.55),
        description: 'Convert cubic feet to m³ then to kWh'
    },
    'btu-to-kwh': {
        formula: (value) => value * 0.000293071,
        reverse: (value) => value / 0.000293071,
        description: '1 BTU = 0.000293071 kWh'
    },
    'therm-to-kwh': {
        formula: (value) => value * 29.3071,
        reverse: (value) => value / 29.3071,
        description: '1 therm = 29.3071 kWh'
    },
    
    // Volume conversions
    'm3-to-ft3': {
        formula: (value) => value * 35.3147,
        reverse: (value) => value / 35.3147,
        description: '1 m³ = 35.3147 ft³'
    },
    'liter-to-m3': {
        formula: (value) => value / 1000,
        reverse: (value) => value * 1000,
        description: '1 m³ = 1000 liters'
    },
    'kw-to-m3hr': {
        formula: (value) => value / 10.55,
        reverse: (value) => value * 10.55,
        description: 'Based on gas energy content'
    },
    'cfm-to-m3hr': {
        formula: (value) => value * 1.699,
        reverse: (value) => value / 1.699,
        description: '1 CFM = 1.699 m³/hr'
    },
    
    // Weight & Density
    'm3-to-kg': {
        formula: (value, density = 0.717) => value * density,
        reverse: (value, density = 0.717) => value / density,
        description: 'Natural gas density ≈ 0.717 kg/m³ at STP'
    },
    
    // Air Quality
    'ppm-to-ugm3': {
        formula: (value, mw = 28.97, temp = 25) => (value * mw * 1000) / (24.45 * (1 + temp / 273)),
        description: 'PPM to μg/m³ using molecular weight and temperature'
    },
    'ppm-to-mgm3': {
        formula: (value, mw = 28.97, temp = 25) => (value * mw) / (24.45 * (1 + temp / 273)),
        description: 'PPM to mg/m³ using molecular weight and temperature'
    },
    'mgm3-to-ppm': {
        formula: (value, mw = 28.97, temp = 25) => (value * 24.45 * (1 + temp / 273)) / mw,
        description: 'mg/m³ to PPM'
    },
    'ugm3-to-ppm': {
        formula: (value, mw = 28.97, temp = 25) => (value * 24.45 * (1 + temp / 273)) / (mw * 1000),
        description: 'μg/m³ to PPM'
    },
    
    // Advanced Energy
    'btu-to-m3': {
        formula: (value) => value / (10.55 / 0.0283168),
        description: 'BTU to m³ via kWh conversion'
    },
    'mmbtu-to-mwh': {
        formula: (value) => value * 0.293071,
        reverse: (value) => value / 0.293071,
        description: '1 MMBtu = 0.293071 MWh'
    },
    'mwh-to-kwh': {
        formula: (value) => value * 1000,
        reverse: (value) => value / 1000,
        description: '1 MWh = 1000 kWh'
    },
    'therm-to-mmbtu': {
        formula: (value) => value / 10,
        reverse: (value) => value * 10,
        description: '1 MMBtu = 10 therms'
    },
    'mmbtu-to-mmscf': {
        formula: (value) => value / 1.036,
        reverse: (value) => value * 1.036,
        description: '1 MMSCF ≈ 1.036 MMBtu'
    },
    
    // Specialized
    'm2-to-m3': {
        formula: (value, height = 1) => value * height,
        description: 'Area to volume (requires height)'
    },
    'sqft-to-m3': {
        formula: (value, height = 1) => (value * 0.092903) * height,
        description: 'Square feet to m³ (requires height)'
    },
    'ft-to-m3': {
        formula: (value) => Math.pow(value * 0.3048, 3),
        description: 'Cubic feet calculation'
    },
    'nm3-to-m3': {
        formula: (value) => value * 1.0,
        description: 'Nm³ (normal cubic meter) to m³ - approximately equal at standard conditions'
    }
};

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
    }
    
    // Mobile dropdown toggle
    const menuItems = document.querySelectorAll('.mega-menu > li > a');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = item.parentElement;
                parent.classList.toggle('mobile-open');
            }
        });
    });
}

// Generic converter function
function convertValue(fromValue, conversionType, reverse = false) {
    if (!fromValue || isNaN(fromValue)) return 0;
    
    const converter = conversionData[conversionType];
    if (!converter) return 0;
    
    if (reverse && converter.reverse) {
        return converter.reverse(parseFloat(fromValue));
    } else {
        return converter.formula(parseFloat(fromValue));
    }
}

// Initialize converter on page
function initConverter(conversionType) {
    const form = document.getElementById('converter-form');
    if (!form) return;
    
    const fromInput = document.getElementById('from-value');
    const toInput = document.getElementById('to-value');
    const swapBtn = document.getElementById('swap-btn');
    const resultBox = document.getElementById('result-box');
    
    // Auto-convert on input
    if (fromInput) {
        fromInput.addEventListener('input', () => {
            const value = fromInput.value;
            if (value) {
                const result = convertValue(value, conversionType, false);
                if (toInput) toInput.value = result.toFixed(4);
                updateResult(value, result, conversionType);
            } else {
                if (toInput) toInput.value = '';
                if (resultBox) resultBox.style.display = 'none';
            }
        });
    }
    
    // Reverse conversion
    if (toInput) {
        toInput.addEventListener('input', () => {
            const value = toInput.value;
            if (value) {
                const result = convertValue(value, conversionType, true);
                if (fromInput) fromInput.value = result.toFixed(4);
                updateResult(result, value, conversionType);
            } else {
                if (fromInput) fromInput.value = '';
                if (resultBox) resultBox.style.display = 'none';
            }
        });
    }
    
    // Swap button
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
            
            if (fromInput.value) {
                const result = convertValue(fromInput.value, conversionType, false);
                toInput.value = result.toFixed(4);
                updateResult(fromInput.value, result, conversionType);
            }
        });
    }
}

// Update result display
function updateResult(fromValue, toValue, conversionType) {
    const resultBox = document.getElementById('result-box');
    const resultValue = document.getElementById('result-value');
    const resultText = document.getElementById('result-text');
    
    if (resultBox && resultValue) {
        resultBox.style.display = 'block';
        resultValue.textContent = toValue.toFixed(4);
        
        if (resultText && conversionData[conversionType]) {
            resultText.textContent = conversionData[conversionType].description;
        }
    }
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Get conversion type from meta tag
    const conversionMeta = document.querySelector('meta[name="conversion-type"]');
    if (conversionMeta) {
        const conversionType = conversionMeta.content;
        initConverter(conversionType);
    }
    
    // Highlight active sidebar link
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            link.getAttribute('href') === '.' + currentPath) {
            link.classList.add('active');
        }
    });
});

// Schema.org structured data helper
function addStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
}
