const fs = require('fs');
const path = require('path');

// All converter page definitions with SEO data
const converters = [
    // Gas & Energy
    {
        filename: 'gas-m3-to-kwh.html',
        title: 'Gas M³ to kWh Converter',
        description: 'Convert cubic meters of gas to kilowatt-hours using UK standard calorific values. Free, accurate gas m3 to kwh calculator.',
        keywords: 'gas m3 to kwh, gas m3 to kwh calculator, m3 to kwh, gas meter conversion, uk gas converter, gas units, energy conversion',
        category: 'Gas & Energy',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'm³ × 10.55 = kWh',
        factor: 10.55,
        reverse: false,
        relatedPages: ['kwh-to-m3.html', 'gas-units-to-kwh.html', 'cubic-feet-to-kwh.html', 'btu-to-kwh.html']
    },
    {
        filename: 'kwh-to-m3.html',
        title: 'kWh to M³ Converter',
        description: 'Convert kilowatt-hours to cubic meters of gas. Reverse gas m3 to kwh conversion using UK standards.',
        keywords: 'kwh to m3, kwh to cubic meters, gas conversion, energy calculator, uk gas meter',
        category: 'Gas & Energy',
        fromUnit: 'Kilowatt-hours (kWh)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'kWh ÷ 10.55 = m³',
        factor: 0.0948,
        reverse: true,
        relatedPages: ['gas-m3-to-kwh.html', 'gas-units-to-kwh.html', 'btu-to-kwh.html', 'therm-to-kwh.html']
    },
    {
        filename: 'gas-units-to-kwh.html',
        title: 'Gas Units to kWh Calculator',
        description: 'Convert imperial gas meter units (cubic feet) to kilowatt-hours. Essential for UK gas bill calculations.',
        keywords: 'gas units to kwh, gas meter reading, imperial gas meter, cubic feet to kwh, uk gas calculator',
        category: 'Gas & Energy',
        fromUnit: 'Gas Units (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'ft³ × 2.83 × 1.02264 × 39.5 ÷ 3.6 = kWh',
        factor: 0.2986,
        reverse: false,
        relatedPages: ['gas-m3-to-kwh.html', 'cubic-feet-to-kwh.html', 'kwh-to-m3.html', 'btu-to-kwh.html']
    },
    {
        filename: 'cubic-feet-to-kwh.html',
        title: 'Cubic Feet to kWh Converter',
        description: 'Convert cubic feet of gas to kilowatt-hours. Perfect for understanding imperial gas meter readings.',
        keywords: 'cubic feet to kwh, ft3 to kwh, gas conversion, imperial gas meter, energy calculator',
        category: 'Gas & Energy',
        fromUnit: 'Cubic Feet (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'ft³ × 0.2986 = kWh',
        factor: 0.2986,
        reverse: false,
        relatedPages: ['gas-units-to-kwh.html', 'gas-m3-to-kwh.html', 'btu-to-kwh.html', 'm3-to-ft3.html']
    },
    {
        filename: 'btu-to-kwh.html',
        title: 'BTU to kWh Converter',
        description: 'Convert British Thermal Units to kilowatt-hours. Essential energy conversion tool for UK users.',
        keywords: 'btu to kwh, british thermal units, energy conversion, heat calculator, uk energy units',
        category: 'Gas & Energy',
        fromUnit: 'British Thermal Units (BTU)',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'BTU × 0.000293071 = kWh',
        factor: 0.000293071,
        reverse: false,
        relatedPages: ['gas-m3-to-kwh.html', 'therm-to-kwh.html', 'btu-to-m3.html', 'mmbtu-to-mwh.html']
    },
    {
        filename: 'therm-to-kwh.html',
        title: 'Therm to kWh Converter',
        description: 'Convert therms to kilowatt-hours. Quick and accurate energy unit conversion for UK gas calculations.',
        keywords: 'therm to kwh, therms to kilowatt hours, gas energy conversion, uk energy calculator',
        category: 'Gas & Energy',
        fromUnit: 'Therms',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'Therms × 29.3071 = kWh',
        factor: 29.3071,
        reverse: false,
        relatedPages: ['btu-to-kwh.html', 'gas-m3-to-kwh.html', 'therm-to-mmbtu.html', 'therm-to-mwh.html']
    },
    // Volume Conversions
    {
        filename: 'm3-to-ft3.html',
        title: 'M³ to FT³ Converter',
        description: 'Convert cubic meters to cubic feet. Fast volume conversion tool for metric to imperial units.',
        keywords: 'm3 to ft3, cubic meters to cubic feet, volume conversion, metric to imperial',
        category: 'Volume Conversions',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Cubic Feet (ft³)',
        formula: 'm³ × 35.3147 = ft³',
        factor: 35.3147,
        reverse: false,
        relatedPages: ['liter-to-m3.html', 'cubic-feet-to-kwh.html', 'ft-to-m3.html', 'sqft-to-m3.html']
    },
    {
        filename: 'liter-to-m3.html',
        title: 'Liter to M³ Converter',
        description: 'Convert liters to cubic meters. Simple volume conversion for liquid measurements.',
        keywords: 'liter to m3, liters to cubic meters, volume converter, liquid measurement',
        category: 'Volume Conversions',
        fromUnit: 'Liters (L)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'L ÷ 1000 = m³',
        factor: 0.001,
        reverse: false,
        relatedPages: ['m3-to-ft3.html', 'kw-to-m3hr.html', 'm3-to-kg.html', 'nm3-to-m3.html']
    },
    {
        filename: 'kw-to-m3hr.html',
        title: 'kW to M³/hr Converter',
        description: 'Convert kilowatts to cubic meters per hour for gas flow rate calculations.',
        keywords: 'kw to m3/hr, kilowatt to cubic meter, gas flow rate, energy flow conversion',
        category: 'Volume Conversions',
        fromUnit: 'Kilowatts (kW)',
        toUnit: 'Cubic Meters per Hour (m³/hr)',
        formula: 'kW ÷ 10.55 = m³/hr',
        factor: 0.0948,
        reverse: false,
        relatedPages: ['cfm-to-m3hr.html', 'm3hr-to-cfm.html', 'gas-m3-to-kwh.html', 'liter-to-m3.html']
    },
    {
        filename: 'cfm-to-m3hr.html',
        title: 'CFM to M³/hr Converter',
        description: 'Convert cubic feet per minute to cubic meters per hour. Flow rate conversion tool.',
        keywords: 'cfm to m3/hr, cubic feet per minute, flow rate conversion, ventilation calculator',
        category: 'Volume Conversions',
        fromUnit: 'Cubic Feet per Minute (CFM)',
        toUnit: 'Cubic Meters per Hour (m³/hr)',
        formula: 'CFM × 1.699 = m³/hr',
        factor: 1.699,
        reverse: false,
        relatedPages: ['m3hr-to-cfm.html', 'kw-to-m3hr.html', 'm3-to-ft3.html', 'cubic-feet-to-kwh.html']
    },
    {
        filename: 'm3hr-to-cfm.html',
        title: 'M³/hr to CFM Converter',
        description: 'Convert cubic meters per hour to cubic feet per minute. Reverse flow rate conversion.',
        keywords: 'm3/hr to cfm, flow rate converter, ventilation calculation, air flow conversion',
        category: 'Volume Conversions',
        fromUnit: 'Cubic Meters per Hour (m³/hr)',
        toUnit: 'Cubic Feet per Minute (CFM)',
        formula: 'm³/hr ÷ 1.699 = CFM',
        factor: 0.5886,
        reverse: true,
        relatedPages: ['cfm-to-m3hr.html', 'kw-to-m3hr.html', 'm3-to-ft3.html', 'liter-to-m3.html']
    },
    // Weight & Density
    {
        filename: 'm3-to-kg.html',
        title: 'M³ to KG Converter',
        description: 'Convert cubic meters to kilograms. Volume to weight conversion based on material density.',
        keywords: 'm3 to kg, cubic meters to kilograms, volume to weight, density calculator',
        category: 'Weight & Density',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Kilograms (kg)',
        formula: 'm³ × density = kg',
        factor: 1000, // Default for water
        reverse: false,
        relatedPages: ['kg-to-m3.html', 'liter-to-m3.html', 'm3-to-ft3.html', 'gas-m3-to-kwh.html']
    },
    {
        filename: 'kg-to-m3.html',
        title: 'KG to M³ Converter',
        description: 'Convert kilograms to cubic meters. Weight to volume conversion using material density.',
        keywords: 'kg to m3, kilograms to cubic meters, weight to volume, density conversion',
        category: 'Weight & Density',
        fromUnit: 'Kilograms (kg)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'kg ÷ density = m³',
        factor: 0.001, // Default for water
        reverse: true,
        relatedPages: ['m3-to-kg.html', 'liter-to-m3.html', 'm3-to-ft3.html', 'gas-m3-to-kwh.html']
    },
    // Air Quality
    {
        filename: 'ppm-to-ugm3.html',
        title: 'PPM to μg/m³ Converter',
        description: 'Convert parts per million to micrograms per cubic meter for air quality measurements.',
        keywords: 'ppm to ug/m3, parts per million, air quality, pollution measurement, concentration converter',
        category: 'Air Quality',
        fromUnit: 'Parts Per Million (PPM)',
        toUnit: 'Micrograms per Cubic Meter (μg/m³)',
        formula: 'PPM × (molecular weight × 1000) ÷ 24.45 = μg/m³',
        factor: 1000, // Varies by gas
        reverse: false,
        relatedPages: ['ppm-to-mgm3.html', 'ugm3-to-ppm.html', 'mgm3-to-ppm.html']
    },
    {
        filename: 'ppm-to-mgm3.html',
        title: 'PPM to mg/m³ Converter',
        description: 'Convert parts per million to milligrams per cubic meter for air quality and gas concentration.',
        keywords: 'ppm to mg/m3, parts per million, air quality converter, gas concentration',
        category: 'Air Quality',
        fromUnit: 'Parts Per Million (PPM)',
        toUnit: 'Milligrams per Cubic Meter (mg/m³)',
        formula: 'PPM × molecular weight ÷ 24.45 = mg/m³',
        factor: 1, // Varies by gas
        reverse: false,
        relatedPages: ['ppm-to-ugm3.html', 'mgm3-to-ppm.html', 'ugm3-to-ppm.html']
    },
    {
        filename: 'mgm3-to-ppm.html',
        title: 'mg/m³ to PPM Converter',
        description: 'Convert milligrams per cubic meter to parts per million. Reverse air quality conversion.',
        keywords: 'mg/m3 to ppm, milligrams per cubic meter, air quality, pollution calculator',
        category: 'Air Quality',
        fromUnit: 'Milligrams per Cubic Meter (mg/m³)',
        toUnit: 'Parts Per Million (PPM)',
        formula: 'mg/m³ × 24.45 ÷ molecular weight = PPM',
        factor: 1, // Varies by gas
        reverse: true,
        relatedPages: ['ppm-to-mgm3.html', 'ugm3-to-ppm.html', 'ppm-to-ugm3.html']
    },
    {
        filename: 'ugm3-to-ppm.html',
        title: 'μg/m³ to PPM Converter',
        description: 'Convert micrograms per cubic meter to parts per million for air quality measurements.',
        keywords: 'ug/m3 to ppm, micrograms per cubic meter, air quality converter, pollution measurement',
        category: 'Air Quality',
        fromUnit: 'Micrograms per Cubic Meter (μg/m³)',
        toUnit: 'Parts Per Million (PPM)',
        formula: 'μg/m³ × 24.45 ÷ (molecular weight × 1000) = PPM',
        factor: 0.001, // Varies by gas
        reverse: true,
        relatedPages: ['ppm-to-ugm3.html', 'mgm3-to-ppm.html', 'ppm-to-mgm3.html']
    },
    // Advanced Energy
    {
        filename: 'btu-to-m3.html',
        title: 'BTU to M³ Converter',
        description: 'Convert British Thermal Units to cubic meters of natural gas. Energy to volume conversion.',
        keywords: 'btu to m3, british thermal units, gas volume, energy conversion calculator',
        category: 'Advanced Energy',
        fromUnit: 'British Thermal Units (BTU)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'BTU ÷ 37,000 = m³',
        factor: 0.000027,
        reverse: false,
        relatedPages: ['btu-to-kwh.html', 'gas-m3-to-kwh.html', 'mmbtu-to-mwh.html', 'therm-to-kwh.html']
    },
    {
        filename: 'mmbtu-to-mwh.html',
        title: 'MMBtu to MWh Converter',
        description: 'Convert million BTU to megawatt-hours. Large-scale energy conversion tool.',
        keywords: 'mmbtu to mwh, million btu, megawatt hours, energy conversion, industrial calculator',
        category: 'Advanced Energy',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Megawatt-hours (MWh)',
        formula: 'MMBtu × 0.293071 = MWh',
        factor: 0.293071,
        reverse: false,
        relatedPages: ['mwh-to-mmbtu.html', 'btu-to-kwh.html', 'mwh-to-kwh.html', 'mmbtu-to-therm.html']
    },
    {
        filename: 'mwh-to-mmbtu.html',
        title: 'MWh to MMBtu Converter',
        description: 'Convert megawatt-hours to million BTU. Reverse large-scale energy conversion.',
        keywords: 'mwh to mmbtu, megawatt hours, million btu, energy calculator, industrial conversion',
        category: 'Advanced Energy',
        fromUnit: 'Megawatt-hours (MWh)',
        toUnit: 'Million BTU (MMBtu)',
        formula: 'MWh ÷ 0.293071 = MMBtu',
        factor: 3.412,
        reverse: true,
        relatedPages: ['mmbtu-to-mwh.html', 'mwh-to-kwh.html', 'btu-to-kwh.html', 'therm-to-mwh.html']
    },
    {
        filename: 'mwh-to-kwh.html',
        title: 'MWh to kWh Converter',
        description: 'Convert megawatt-hours to kilowatt-hours. Simple large to small energy unit conversion.',
        keywords: 'mwh to kwh, megawatt hours, kilowatt hours, energy conversion, power calculator',
        category: 'Advanced Energy',
        fromUnit: 'Megawatt-hours (MWh)',
        toUnit: 'Kilowatt-hours (kWh)',
        formula: 'MWh × 1000 = kWh',
        factor: 1000,
        reverse: false,
        relatedPages: ['mmbtu-to-mwh.html', 'mwh-to-mmbtu.html', 'gas-m3-to-kwh.html', 'btu-to-kwh.html']
    },
    {
        filename: 'therm-to-mmbtu.html',
        title: 'Therm to MMBtu Converter',
        description: 'Convert therms to million BTU. Natural gas energy unit conversion.',
        keywords: 'therm to mmbtu, therms, million btu, gas energy conversion, heating calculator',
        category: 'Advanced Energy',
        fromUnit: 'Therms',
        toUnit: 'Million BTU (MMBtu)',
        formula: 'Therms × 0.1 = MMBtu',
        factor: 0.1,
        reverse: false,
        relatedPages: ['mmbtu-to-therm.html', 'therm-to-kwh.html', 'mmbtu-to-mwh.html', 'therm-to-mwh.html']
    },
    {
        filename: 'mmbtu-to-therm.html',
        title: 'MMBtu to Therm Converter',
        description: 'Convert million BTU to therms. Reverse natural gas energy conversion.',
        keywords: 'mmbtu to therm, million btu, therms, gas conversion, energy calculator',
        category: 'Advanced Energy',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Therms',
        formula: 'MMBtu ÷ 0.1 = Therms',
        factor: 10,
        reverse: true,
        relatedPages: ['therm-to-mmbtu.html', 'mmbtu-to-mwh.html', 'therm-to-kwh.html', 'btu-to-kwh.html']
    },
    {
        filename: 'therm-to-mwh.html',
        title: 'Therm to MWh Converter',
        description: 'Convert therms to megawatt-hours. Natural gas to electrical energy conversion.',
        keywords: 'therm to mwh, therms, megawatt hours, energy conversion, gas to electricity',
        category: 'Advanced Energy',
        fromUnit: 'Therms',
        toUnit: 'Megawatt-hours (MWh)',
        formula: 'Therms × 0.0293071 = MWh',
        factor: 0.0293071,
        reverse: false,
        relatedPages: ['therm-to-kwh.html', 'mwh-to-mmbtu.html', 'therm-to-mmbtu.html', 'mwh-to-kwh.html']
    },
    {
        filename: 'mmbtu-to-mmscf.html',
        title: 'MMBtu to MMSCF Converter',
        description: 'Convert million BTU to million standard cubic feet of natural gas.',
        keywords: 'mmbtu to mmscf, million btu, natural gas, volume conversion, energy calculator',
        category: 'Advanced Energy',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Million Standard Cubic Feet (MMSCF)',
        formula: 'MMBtu ÷ 1.037 = MMSCF',
        factor: 0.964,
        reverse: false,
        relatedPages: ['mmbtu-to-mwh.html', 'btu-to-m3.html', 'mmbtu-to-therm.html', 'gas-m3-to-kwh.html']
    },
    // Specialized
    {
        filename: 'm2-to-m3.html',
        title: 'M² to M³ Converter',
        description: 'Convert square meters to cubic meters. Area to volume conversion with height.',
        keywords: 'm2 to m3, square meters to cubic meters, area to volume, construction calculator',
        category: 'Specialized',
        fromUnit: 'Square Meters (m²)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'm² × height = m³',
        factor: 1, // Requires height input
        reverse: false,
        relatedPages: ['sqft-to-m3.html', 'ft-to-m3.html', 'm3-to-ft3.html', 'liter-to-m3.html']
    },
    {
        filename: 'sqft-to-m3.html',
        title: 'Sq Ft to M³ Converter',
        description: 'Convert square feet to cubic meters. Imperial area to metric volume conversion.',
        keywords: 'sqft to m3, square feet to cubic meters, area to volume, imperial to metric',
        category: 'Specialized',
        fromUnit: 'Square Feet (ft²)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'ft² × 0.0929 × height(m) = m³',
        factor: 0.0929,
        reverse: false,
        relatedPages: ['m2-to-m3.html', 'ft-to-m3.html', 'm3-to-ft3.html', 'liter-to-m3.html']
    },
    {
        filename: 'ft-to-m3.html',
        title: 'FT to M³ Converter',
        description: 'Convert linear feet to cubic meters. Length to volume conversion for pipes and tubes.',
        keywords: 'ft to m3, feet to cubic meters, pipe volume, tube calculator, length to volume',
        category: 'Specialized',
        fromUnit: 'Feet (ft)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'ft × 0.3048 × cross-section = m³',
        factor: 0.3048,
        reverse: false,
        relatedPages: ['m3-to-ft3.html', 'sqft-to-m3.html', 'm2-to-m3.html', 'liter-to-m3.html']
    },
    {
        filename: 'nm3-to-m3.html',
        title: 'Nm³ to M³ Converter',
        description: 'Convert normal cubic meters to actual cubic meters. Standard to actual volume conversion.',
        keywords: 'nm3 to m3, normal cubic meters, standard conditions, gas volume, pressure correction',
        category: 'Specialized',
        fromUnit: 'Normal Cubic Meters (Nm³)',
        toUnit: 'Cubic Meters (m³)',
        formula: 'Nm³ × (T/273.15) × (101.325/P) = m³',
        factor: 1.0, // Depends on temperature and pressure
        reverse: false,
        relatedPages: ['m3-to-ft3.html', 'gas-m3-to-kwh.html', 'liter-to-m3.html', 'kw-to-m3hr.html']
    }
];

// Generate consistent header HTML
function generateHeader(currentPage = '') {
    return `    <header>
        <div class="header-container">
            <div class="header-top">
                <a href="${currentPage ? '../' : ''}index.html" class="logo">
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
                            <a href="${currentPage ? '' : 'converters/'}gas-m3-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-calculator"></i>
                                <span><strong>Gas M³ to kWh</strong> Converter</span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}kwh-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-exchange-alt"></i>
                                <span><strong>kWh to M³</strong> Converter</span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}gas-units-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span><strong>Gas Units to kWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}cubic-feet-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-cube"></i>
                                <span><strong>Cubic Feet to kWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}btu-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-bolt"></i>
                                <span><strong>BTU to kWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}therm-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-thermometer-half"></i>
                                <span><strong>Therm to kWh</strong></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-flask"></i> Volume Conversions</a>
                        <div class="mega-menu-dropdown">
                            <a href="${currentPage ? '' : 'converters/'}m3-to-ft3.html" class="mega-menu-item">
                                <i class="fas fa-ruler-combined"></i>
                                <span><strong>M³ to FT³</strong> Converter</span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}liter-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-wine-bottle"></i>
                                <span><strong>Liter to M³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}kw-to-m3hr.html" class="mega-menu-item">
                                <i class="fas fa-clock"></i>
                                <span><strong>kW to M³/hr</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}cfm-to-m3hr.html" class="mega-menu-item">
                                <i class="fas fa-wind"></i>
                                <span><strong>CFM to M³/hr</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}m3hr-to-cfm.html" class="mega-menu-item">
                                <i class="fas fa-arrow-right"></i>
                                <span><strong>M³/hr to CFM</strong></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-weight"></i> Weight & Density</a>
                        <div class="mega-menu-dropdown">
                            <a href="${currentPage ? '' : 'converters/'}m3-to-kg.html" class="mega-menu-item">
                                <i class="fas fa-balance-scale"></i>
                                <span><strong>M³ to KG</strong> Converter</span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}kg-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-balance-scale-right"></i>
                                <span><strong>KG to M³</strong> Converter</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-smog"></i> Air Quality</a>
                        <div class="mega-menu-dropdown">
                            <a href="${currentPage ? '' : 'converters/'}ppm-to-ugm3.html" class="mega-menu-item">
                                <i class="fas fa-microscope"></i>
                                <span><strong>PPM to μg/m³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}ppm-to-mgm3.html" class="mega-menu-item">
                                <i class="fas fa-vial"></i>
                                <span><strong>PPM to mg/m³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mgm3-to-ppm.html" class="mega-menu-item">
                                <i class="fas fa-exchange-alt"></i>
                                <span><strong>mg/m³ to PPM</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}ugm3-to-ppm.html" class="mega-menu-item">
                                <i class="fas fa-arrow-left"></i>
                                <span><strong>μg/m³ to PPM</strong></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-chart-line"></i> Advanced Energy</a>
                        <div class="mega-menu-dropdown">
                            <a href="${currentPage ? '' : 'converters/'}btu-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-calculator"></i>
                                <span><strong>BTU to M³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mmbtu-to-mwh.html" class="mega-menu-item">
                                <i class="fas fa-bolt"></i>
                                <span><strong>MMBtu to MWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mwh-to-mmbtu.html" class="mega-menu-item">
                                <i class="fas fa-exchange-alt"></i>
                                <span><strong>MWh to MMBtu</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mwh-to-kwh.html" class="mega-menu-item">
                                <i class="fas fa-arrow-down"></i>
                                <span><strong>MWh to kWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}therm-to-mmbtu.html" class="mega-menu-item">
                                <i class="fas fa-thermometer"></i>
                                <span><strong>Therm to MMBtu</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mmbtu-to-therm.html" class="mega-menu-item">
                                <i class="fas fa-undo"></i>
                                <span><strong>MMBtu to Therm</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}therm-to-mwh.html" class="mega-menu-item">
                                <i class="fas fa-fire-alt"></i>
                                <span><strong>Therm to MWh</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}mmbtu-to-mmscf.html" class="mega-menu-item">
                                <i class="fas fa-compress"></i>
                                <span><strong>MMBtu to MMSCF</strong></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-cogs"></i> Specialized</a>
                        <div class="mega-menu-dropdown">
                            <a href="${currentPage ? '' : 'converters/'}m2-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-expand"></i>
                                <span><strong>M² to M³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}sqft-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-square"></i>
                                <span><strong>Sq Ft to M³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}ft-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-ruler"></i>
                                <span><strong>FT to M³</strong></span>
                            </a>
                            <a href="${currentPage ? '' : 'converters/'}nm3-to-m3.html" class="mega-menu-item">
                                <i class="fas fa-adjust"></i>
                                <span><strong>Nm³ to M³</strong></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="${currentPage ? '../' : ''}index.html"><i class="fas fa-home"></i> Home</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>`;
}

// Generate consistent footer HTML
function generateFooter(currentPage = '') {
    return `    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>UK Converter</h3>
                <p>Professional <strong>conversion calculators</strong> for <strong>gas</strong>, <strong>energy</strong>, <strong>volume</strong>, and <strong>air quality measurements</strong>. Accurate, fast, and free.</p>
            </div>
            
            <div class="footer-section">
                <h3>Popular Tools</h3>
                <ul class="footer-links">
                    <li><a href="${currentPage ? '' : 'converters/'}gas-m3-to-kwh.html"><strong>Gas M³ to kWh</strong></a></li>
                    <li><a href="${currentPage ? '' : 'converters/'}kwh-to-m3.html"><strong>kWh to M³</strong></a></li>
                    <li><a href="${currentPage ? '' : 'converters/'}gas-units-to-kwh.html"><strong>Gas Units to kWh</strong></a></li>
                    <li><a href="${currentPage ? '' : 'converters/'}btu-to-kwh.html"><strong>BTU to kWh</strong></a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="${currentPage ? '../' : ''}trust/about.html">About Us</a></li>
                    <li><a href="${currentPage ? '../' : ''}trust/contact.html">Contact</a></li>
                    <li><a href="${currentPage ? '../' : ''}trust/privacy.html">Privacy Policy</a></li>
                    <li><a href="${currentPage ? '../' : ''}trust/terms.html">Terms of Service</a></li>
                    <li><a href="${currentPage ? '../' : ''}trust/cookies.html">Cookie Policy</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Connect</h3>
                <p>Need help or have suggestions?<br>We'd love to hear from you!</p>
                <a href="${currentPage ? '../' : ''}trust/contact.html" style="color: var(--accent-color); font-weight: 600;">Get in Touch →</a>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 <strong>UK Converter</strong>. All rights reserved. | <a href="${currentPage ? '../' : ''}sitemap.xml" style="color: #9ca3af;">Sitemap</a></p>
        </div>
    </footer>`;
}

// Generate sidebar HTML
function generateSidebar(currentFilename = '') {
    return `        <aside class="sidebar">
            <h3><i class="fas fa-list"></i> Quick Access</h3>
            
            <div class="sidebar-section">
                <h4>Popular Converters</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html"${currentFilename === 'gas-m3-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-star"></i> <strong>Gas M³ to kWh</strong></a></li>
                    <li><a href="kwh-to-m3.html"${currentFilename === 'kwh-to-m3.html' ? ' class="active"' : ''}><i class="fas fa-star"></i> <strong>kWh to M³</strong></a></li>
                    <li><a href="gas-units-to-kwh.html"${currentFilename === 'gas-units-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-star"></i> <strong>Gas Units to kWh</strong></a></li>
                    <li><a href="btu-to-kwh.html"${currentFilename === 'btu-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-star"></i> <strong>BTU to kWh</strong></a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Gas & Energy</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html"${currentFilename === 'gas-m3-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html"${currentFilename === 'kwh-to-m3.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html"${currentFilename === 'gas-units-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> Gas Units to kWh</a></li>
                    <li><a href="cubic-feet-to-kwh.html"${currentFilename === 'cubic-feet-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> Cubic Feet to kWh</a></li>
                    <li><a href="btu-to-kwh.html"${currentFilename === 'btu-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> BTU to kWh</a></li>
                    <li><a href="therm-to-kwh.html"${currentFilename === 'therm-to-kwh.html' ? ' class="active"' : ''}><i class="fas fa-fire"></i> Therm to kWh</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Volume Conversions</h4>
                <ul class="sidebar-links">
                    <li><a href="m3-to-ft3.html"${currentFilename === 'm3-to-ft3.html' ? ' class="active"' : ''}><i class="fas fa-cube"></i> M³ to FT³</a></li>
                    <li><a href="liter-to-m3.html"${currentFilename === 'liter-to-m3.html' ? ' class="active"' : ''}><i class="fas fa-cube"></i> Liter to M³</a></li>
                    <li><a href="kw-to-m3hr.html"${currentFilename === 'kw-to-m3hr.html' ? ' class="active"' : ''}><i class="fas fa-cube"></i> kW to M³/hr</a></li>
                    <li><a href="cfm-to-m3hr.html"${currentFilename === 'cfm-to-m3hr.html' ? ' class="active"' : ''}><i class="fas fa-cube"></i> CFM to M³/hr</a></li>
                    <li><a href="m3hr-to-cfm.html"${currentFilename === 'm3hr-to-cfm.html' ? ' class="active"' : ''}><i class="fas fa-cube"></i> M³/hr to CFM</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Weight & Density</h4>
                <ul class="sidebar-links">
                    <li><a href="m3-to-kg.html"${currentFilename === 'm3-to-kg.html' ? ' class="active"' : ''}><i class="fas fa-weight"></i> M³ to KG</a></li>
                    <li><a href="kg-to-m3.html"${currentFilename === 'kg-to-m3.html' ? ' class="active"' : ''}><i class="fas fa-weight"></i> KG to M³</a></li>
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

// Generate complete converter page
function generateConverterPage(converter) {
    const relatedLinksHTML = converter.relatedPages.map(page => {
        const relatedConverter = converters.find(c => c.filename === page);
        if (!relatedConverter) return '';
        return `<a href="${page}" class="category-card">
            <i class="fas fa-calculator"></i>
            <h3><strong>${relatedConverter.title}</strong></h3>
            <p>${relatedConverter.description.substring(0, 100)}...</p>
        </a>`;
    }).join('\n                ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${converter.title} - UK Converter</title>
    <meta name="description" content="${converter.description}">
    <meta name="keywords" content="${converter.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://ukconverter.site/converters/${converter.filename}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${converter.title} - UK Converter">
    <meta property="og:description" content="${converter.description}">
    <meta property="og:url" content="https://ukconverter.site/converters/${converter.filename}">
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
            "item": "https://ukconverter.site/#${converter.category.toLowerCase().replace(/\s+/g, '-')}"
        },{
            "@type": "ListItem",
            "position": 3,
            "name": "${converter.title}",
            "item": "https://ukconverter.site/converters/${converter.filename}"
        }]
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I use the ${converter.title}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply enter a value in either the <strong>${converter.fromUnit}</strong> or <strong>${converter.toUnit}</strong> field, and the conversion will happen automatically. The result updates in real-time as you type."
                }
            },
            {
                "@type": "Question",
                "name": "What is the conversion formula?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The conversion formula is: <strong>${converter.formula}</strong>. This uses standard UK conversion factors for accurate results."
                }
            },
            {
                "@type": "Question",
                "name": "Is this converter accurate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our <strong>converter</strong> uses official <strong>UK conversion factors</strong> and provides results accurate to 4 decimal places. The calculations are based on industry-standard formulas used by UK energy suppliers and professional engineers."
                }
            },
            {
                "@type": "Question",
                "name": "Can I convert in reverse?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! You can enter values in either field. The converter works bidirectionally, allowing you to convert from <strong>${converter.fromUnit}</strong> to <strong>${converter.toUnit}</strong> or vice versa instantly."
                }
            }
        ]
    }
    </script>
</head>
<body>
${generateHeader('converter')}
    
    <div class="container">
${generateSidebar(converter.filename)}
        
        <main class="main-content">
            <nav style="margin-bottom: 20px; font-size: 14px; color: var(--text-light);">
                <a href="../index.html" style="color: var(--primary-color);"><strong>Home</strong></a> » 
                <a href="../index.html#${converter.category.toLowerCase().replace(/\s+/g, '-')}" style="color: var(--primary-color);"><strong>${converter.category}</strong></a> » 
                <span><strong>${converter.title}</strong></span>
            </nav>
            
            <h1 style="font-size: 32px; margin-bottom: 15px;"><strong>${converter.title}</strong> - Convert <strong>${converter.fromUnit}</strong> to <strong>${converter.toUnit}</strong></h1>
            <p style="font-size: 18px; color: var(--text-light); margin-bottom: 30px;">
                ${converter.description}
            </p>
            
            <!-- Converter Tool -->
            <div class="converter-tool">
                <form id="converter-form" onsubmit="return false;">
                    <div class="converter-form">
                        <div class="form-group">
                            <label for="from-value"><strong>${converter.fromUnit}</strong></label>
                            <input type="number" id="from-value" placeholder="Enter value" step="any">
                        </div>
                        
                        <button type="button" id="swap-btn" class="swap-btn" title="Swap units">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        
                        <div class="form-group">
                            <label for="to-value"><strong>${converter.toUnit}</strong></label>
                            <input type="number" id="to-value" placeholder="Result" step="any">
                        </div>
                    </div>
                    
                    <div id="result-box" class="result-box" style="display: none;">
                        <h3><i class="fas fa-check-circle"></i> <strong>Conversion Result</strong></h3>
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
                <h2>About the <strong>${converter.title}</strong></h2>
                <p>The <strong>${converter.title}</strong> is an essential tool for <strong>UK users</strong> who need to convert between <strong>${converter.fromUnit}</strong> and <strong>${converter.toUnit}</strong>. This <strong>converter</strong> uses official <strong>UK standards</strong> and <strong>conversion factors</strong> to ensure accurate results.</p>
                
                <p>This <strong>${converter.title.toLowerCase()}</strong> is essential for:</p>
                <ul>
                    <li>Understanding <strong>UK energy bills</strong> and consumption patterns</li>
                    <li>Comparing different <strong>energy units</strong> and <strong>measurements</strong> accurately</li>
                    <li>Performing <strong>engineering calculations</strong> for heating and energy systems</li>
                    <li><strong>Energy efficiency planning</strong> and cost optimization</li>
                    <li>Academic research and educational purposes</li>
                </ul>
                
                <p>For more information on <strong>energy conversions</strong>, you can also check our <a href="../index.html" style="color: var(--primary-color); font-weight: 600;"><strong>homepage</strong></a> and explore related <strong>conversion tools</strong>.</p>
            </section>
            
            <section class="content-section">
                <h2>How the <strong>Conversion</strong> Works</h2>
                <p>The <strong>${converter.title.toLowerCase()}</strong> uses the following <strong>formula</strong>:</p>
                <p style="background: var(--bg-light); padding: 15px; border-left: 4px solid var(--primary-color); font-size: 18px; font-weight: 600;">
                    ${converter.formula}
                </p>
                
                <h3>Why Use Our <strong>${converter.title}</strong>?</h3>
                <p>Our <strong>converter tool</strong> provides instant, accurate results using official <strong>UK conversion factors</strong>. Whether you're a homeowner trying to understand your <strong>energy bill</strong>, a student learning about <strong>energy units</strong>, or a professional engineer performing calculations, this tool delivers reliable results every time.</p>
                
                <p>The <strong>conversion</strong> happens automatically as you type, making it quick and easy to perform multiple calculations. You can convert in both directions by entering values in either field.</p>
            </section>
            
            <section class="content-section">
                <h2>Common <strong>${converter.fromUnit}</strong> to <strong>${converter.toUnit}</strong> Conversions</h2>
                <div class="conversion-table">
                    <table>
                        <thead>
                            <tr>
                                <th><strong>${converter.fromUnit}</strong></th>
                                <th><strong>${converter.toUnit}</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1</strong></td>
                                <td><strong>${converter.factor.toFixed(4)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>10</strong></td>
                                <td><strong>${(converter.factor * 10).toFixed(4)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>50</strong></td>
                                <td><strong>${(converter.factor * 50).toFixed(4)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>100</strong></td>
                                <td><strong>${(converter.factor * 100).toFixed(4)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>500</strong></td>
                                <td><strong>${(converter.factor * 500).toFixed(4)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>1,000</strong></td>
                                <td><strong>${(converter.factor * 1000).toLocaleString('en-GB', {maximumFractionDigits: 2})}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <p>These common <strong>conversions</strong> are used daily by thousands of <strong>UK residents</strong> to understand their <strong>energy consumption</strong> and costs. For additional <strong>conversions</strong>, explore our <a href="../index.html" style="color: var(--primary-color); font-weight: 600;"><strong>complete converter collection</strong></a>.</p>
            </section>
            
            <section class="content-section">
                <h2><strong>Frequently Asked Questions</strong></h2>
                
                <div class="faq-item">
                    <h3>How do I use the <strong>${converter.title}</strong>?</h3>
                    <p>Simply enter a value in either the <strong>${converter.fromUnit}</strong> or <strong>${converter.toUnit}</strong> field, and the <strong>conversion</strong> will happen automatically. The result updates in real-time as you type, making it quick and easy to perform multiple conversions.</p>
                </div>
                
                <div class="faq-item">
                    <h3>What is the <strong>conversion formula</strong>?</h3>
                    <p>The <strong>conversion formula</strong> is: <strong>${converter.formula}</strong>. This uses standard <strong>UK conversion factors</strong> for accurate results.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Is this <strong>converter</strong> accurate?</h3>
                    <p>Yes! Our <strong>converter</strong> uses official <strong>UK conversion factors</strong> and provides results accurate to 4 decimal places. The calculations are based on industry-standard formulas used by <strong>UK energy suppliers</strong> and professional engineers.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Can I convert in reverse?</h3>
                    <p>Absolutely! You can enter values in either field. The <strong>converter</strong> works bidirectionally, allowing you to convert from <strong>${converter.fromUnit}</strong> to <strong>${converter.toUnit}</strong> or vice versa instantly.</p>
                </div>
            </section>
            
            <section class="content-section">
                <h2><strong>Tips</strong> for Using This Converter</h2>
                <div class="tips-box">
                    <h3><i class="fas fa-lightbulb"></i> <strong>Usage Tips</strong></h3>
                    <ul>
                        <li>Enter any value in either field to see <strong>instant conversion</strong></li>
                        <li>Use the <strong>swap button</strong> to quickly reverse the conversion direction</li>
                        <li>Results are accurate to 4 decimal places for <strong>precision</strong></li>
                        <li>Bookmark this page for quick access to your most-used <strong>conversion</strong></li>
                        <li>Works offline once loaded (Progressive Web App ready)</li>
                        <li>All calculations happen in your browser - no data sent to servers</li>
                    </ul>
                </div>
            </section>
            
            <!-- Related Converters -->
            <section class="content-section">
                <h2><strong>Related Converters</strong></h2>
                <p>Explore these related <strong>conversion tools</strong> for comprehensive <strong>energy calculations</strong> and <strong>unit conversions</strong>:</p>
                <div class="category-grid">
                ${relatedLinksHTML}
                </div>
            </section>
        </main>
    </div>
    
${generateFooter('converter')}
    
    <script src="../js/converter.js"></script>
</body>
</html>`;
}

// Main execution
console.log('Starting page regeneration...');
const convertersDir = path.join(__dirname, 'converters');

// Ensure converters directory exists
if (!fs.existsSync(convertersDir)) {
    fs.mkdirSync(convertersDir, { recursive: true });
}

let successCount = 0;
let errorCount = 0;

converters.forEach(converter => {
    try {
        const html = generateConverterPage(converter);
        const filepath = path.join(convertersDir, converter.filename);
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`✓ Generated: ${converter.filename}`);
        successCount++;
    } catch (error) {
        console.error(`✗ Error generating ${converter.filename}:`, error.message);
        errorCount++;
    }
});

console.log(`\nRegeneration complete!`);
console.log(`Success: ${successCount} pages`);
console.log(`Errors: ${errorCount} pages`);
console.log(`\nAll converter pages now have:`);
console.log(`- Consistent header and footer`);
console.log(`- Proper FAQ schema markup`);
console.log(`- Deep interlinking (sidebar + related converters)`);
console.log(`- Contextual inbound/outbound links`);
console.log(`- Bolded keywords throughout content`);
console.log(`- Mobile-responsive design (sidebar hidden on mobile)`);
