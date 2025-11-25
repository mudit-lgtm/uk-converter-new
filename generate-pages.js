// Script to generate all converter pages
const fs = require('fs');
const path = require('path');

// Converter page configurations
const converters = [
    {
        slug: 'gas-m3-to-kwh',
        title: 'Gas M³ to kWh Converter',
        description: 'Convert cubic meters of gas to kilowatt-hours using UK standard calorific values. Free, accurate gas m3 to kwh calculator.',
        keywords: 'gas m3 to kwh, gas m3 to kwh calculator, m3 to kwh, gas meter conversion, uk gas converter',
        category: 'Gas & Energy',
        icon: 'fa-fire',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'm3-to-kwh',
        formula: 'm³ × 10.55 = kWh',
        explanation: 'The standard UK calorific value for natural gas is 39.5 MJ/m³, which equals 10.55 kWh/m³. This accounts for temperature and pressure corrections.',
        commonConversions: [
            { from: '1 m³', to: '10.55 kWh' },
            { from: '10 m³', to: '105.5 kWh' },
            { from: '50 m³', to: '527.5 kWh' },
            { from: '100 m³', to: '1,055 kWh' },
            { from: '500 m³', to: '5,275 kWh' },
            { from: '1,000 m³', to: '10,550 kWh' }
        ]
    },
    {
        slug: 'kwh-to-m3',
        title: 'kWh to M³ Converter',
        description: 'Convert kilowatt-hours back to cubic meters of gas. Reverse gas m3 to kwh conversion calculator for UK energy bills.',
        keywords: 'kwh to m3, kwh to m3 gas, kwh to cubic meters, reverse gas conversion',
        category: 'Gas & Energy',
        icon: 'fa-exchange-alt',
        fromUnit: 'Kilowatt-hours (kWh)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'm3-to-kwh',
        formula: 'kWh ÷ 10.55 = m³',
        explanation: 'To convert kWh back to cubic meters, divide by the standard UK calorific value of 10.55 kWh/m³.',
        commonConversions: [
            { from: '10.55 kWh', to: '1 m³' },
            { from: '105.5 kWh', to: '10 m³' },
            { from: '527.5 kWh', to: '50 m³' },
            { from: '1,055 kWh', to: '100 m³' },
            { from: '5,275 kWh', to: '500 m³' },
            { from: '10,550 kWh', to: '1,000 m³' }
        ]
    },
    {
        slug: 'gas-units-to-kwh',
        title: 'Gas Units to kWh Calculator',
        description: 'Convert imperial gas meter units (cubic feet) to kilowatt-hours. Essential for UK homes with imperial gas meters.',
        keywords: 'gas units to kwh, imperial gas meter, cubic feet to kwh, gas meter reading',
        category: 'Gas & Energy',
        icon: 'fa-tachometer-alt',
        fromUnit: 'Gas Units (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'gas-units-to-kwh',
        formula: 'ft³ × 2.83 × 10.55 = kWh',
        explanation: 'Imperial gas meters measure in cubic feet. First convert to m³ (×2.83), then to kWh (×10.55) using the UK calorific value.',
        commonConversions: [
            { from: '1 ft³', to: '0.30 kWh' },
            { from: '10 ft³', to: '2.99 kWh' },
            { from: '100 ft³', to: '29.86 kWh' },
            { from: '500 ft³', to: '149.32 kWh' },
            { from: '1,000 ft³', to: '298.64 kWh' },
            { from: '5,000 ft³', to: '1,493.19 kWh' }
        ]
    },
    {
        slug: 'cubic-feet-to-kwh',
        title: 'Cubic Feet to kWh Converter',
        description: 'Convert cubic feet of gas to kilowatt-hours. Perfect for understanding imperial gas meter readings.',
        keywords: 'cubic feet to kwh, ft3 to kwh, gas cubic feet conversion',
        category: 'Gas & Energy',
        icon: 'fa-cube',
        fromUnit: 'Cubic Feet (ft³)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'cubic-feet-to-kwh',
        formula: 'ft³ × 0.2986 = kWh',
        explanation: 'One cubic foot of natural gas equals approximately 0.2986 kWh (combining ft³ to m³ conversion and UK calorific value).',
        commonConversions: [
            { from: '1 ft³', to: '0.30 kWh' },
            { from: '10 ft³', to: '2.99 kWh' },
            { from: '100 ft³', to: '29.86 kWh' },
            { from: '500 ft³', to: '149.32 kWh' },
            { from: '1,000 ft³', to: '298.64 kWh' },
            { from: '10,000 ft³', to: '2,986.35 kWh' }
        ]
    },
    {
        slug: 'btu-to-kwh',
        title: 'BTU to kWh Converter',
        description: 'Convert British Thermal Units to kilowatt-hours. Essential energy conversion tool for heating calculations.',
        keywords: 'btu to kwh, british thermal units to kwh, energy conversion',
        category: 'Gas & Energy',
        icon: 'fa-bolt',
        fromUnit: 'British Thermal Units (BTU)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'btu-to-kwh',
        formula: 'BTU × 0.000293071 = kWh',
        explanation: 'One BTU (British Thermal Unit) equals 0.000293071 kWh. BTUs measure the energy required to heat one pound of water by one degree Fahrenheit.',
        commonConversions: [
            { from: '1,000 BTU', to: '0.29 kWh' },
            { from: '10,000 BTU', to: '2.93 kWh' },
            { from: '50,000 BTU', to: '14.65 kWh' },
            { from: '100,000 BTU', to: '29.31 kWh' },
            { from: '500,000 BTU', to: '146.54 kWh' },
            { from: '1,000,000 BTU', to: '293.07 kWh' }
        ]
    },
    {
        slug: 'therm-to-kwh',
        title: 'Therm to kWh Converter',
        description: 'Convert therms to kilowatt-hours. Useful for comparing US and UK energy measurements.',
        keywords: 'therm to kwh, therms conversion, gas therm calculator',
        category: 'Gas & Energy',
        icon: 'fa-thermometer-half',
        fromUnit: 'Therms',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'therm-to-kwh',
        formula: 'Therms × 29.3071 = kWh',
        explanation: 'One therm equals 29.3071 kWh. A therm is a unit of heat energy equal to 100,000 BTUs, commonly used in North America.',
        commonConversions: [
            { from: '1 therm', to: '29.31 kWh' },
            { from: '5 therms', to: '146.54 kWh' },
            { from: '10 therms', to: '293.07 kWh' },
            { from: '50 therms', to: '1,465.36 kWh' },
            { from: '100 therms', to: '2,930.71 kWh' },
            { from: '500 therms', to: '14,653.55 kWh' }
        ]
    },
    {
        slug: 'm3-to-ft3',
        title: 'M³ to FT³ Converter',
        description: 'Convert cubic meters to cubic feet. Essential volume conversion for gas and fluid measurements.',
        keywords: 'm3 to ft3, cubic meters to cubic feet, volume conversion',
        category: 'Volume Conversions',
        icon: 'fa-ruler-combined',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Cubic Feet (ft³)',
        conversionType: 'm3-to-ft3',
        formula: 'm³ × 35.3147 = ft³',
        explanation: 'One cubic meter equals 35.3147 cubic feet. This is a standard volume conversion used globally.',
        commonConversions: [
            { from: '1 m³', to: '35.31 ft³' },
            { from: '5 m³', to: '176.57 ft³' },
            { from: '10 m³', to: '353.15 ft³' },
            { from: '50 m³', to: '1,765.73 ft³' },
            { from: '100 m³', to: '3,531.47 ft³' },
            { from: '1,000 m³', to: '35,314.67 ft³' }
        ]
    },
    {
        slug: 'liter-to-m3',
        title: 'Liter to M³ Converter',
        description: 'Convert liters to cubic meters. Simple liquid volume conversion calculator.',
        keywords: 'liter to m3, litres to cubic meters, volume conversion',
        category: 'Volume Conversions',
        icon: 'fa-wine-bottle',
        fromUnit: 'Liters (L)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'liter-to-m3',
        formula: 'Liters ÷ 1,000 = m³',
        explanation: 'One cubic meter equals 1,000 liters. This is the standard metric volume conversion.',
        commonConversions: [
            { from: '1 L', to: '0.001 m³' },
            { from: '100 L', to: '0.1 m³' },
            { from: '500 L', to: '0.5 m³' },
            { from: '1,000 L', to: '1 m³' },
            { from: '5,000 L', to: '5 m³' },
            { from: '10,000 L', to: '10 m³' }
        ]
    },
    {
        slug: 'kw-to-m3hr',
        title: 'kW to M³/hr Converter',
        description: 'Convert kilowatts to cubic meters per hour for gas flow rate calculations.',
        keywords: 'kw to m3/hr, gas flow rate, power to volume conversion',
        category: 'Volume Conversions',
        icon: 'fa-clock',
        fromUnit: 'Kilowatts (kW)',
        toUnit: 'Cubic Meters per Hour (m³/hr)',
        conversionType: 'kw-to-m3hr',
        formula: 'kW ÷ 10.55 = m³/hr',
        explanation: 'To convert power (kW) to gas flow rate (m³/hr), divide by the energy content of natural gas (10.55 kWh/m³).',
        commonConversions: [
            { from: '1 kW', to: '0.09 m³/hr' },
            { from: '5 kW', to: '0.47 m³/hr' },
            { from: '10 kW', to: '0.95 m³/hr' },
            { from: '20 kW', to: '1.90 m³/hr' },
            { from: '50 kW', to: '4.74 m³/hr' },
            { from: '100 kW', to: '9.48 m³/hr' }
        ]
    },
    {
        slug: 'cfm-to-m3hr',
        title: 'CFM to M³/hr Converter',
        description: 'Convert cubic feet per minute to cubic meters per hour. Gas and air flow rate conversion.',
        keywords: 'cfm to m3/hr, cubic feet per minute, flow rate conversion',
        category: 'Volume Conversions',
        icon: 'fa-wind',
        fromUnit: 'Cubic Feet per Minute (CFM)',
        toUnit: 'Cubic Meters per Hour (m³/hr)',
        conversionType: 'cfm-to-m3hr',
        formula: 'CFM × 1.699 = m³/hr',
        explanation: 'One CFM (cubic foot per minute) equals 1.699 cubic meters per hour. Multiply CFM by 60 to get CFH, then divide by 35.3147 to get m³/hr.',
        commonConversions: [
            { from: '1 CFM', to: '1.70 m³/hr' },
            { from: '10 CFM', to: '16.99 m³/hr' },
            { from: '50 CFM', to: '84.95 m³/hr' },
            { from: '100 CFM', to: '169.90 m³/hr' },
            { from: '500 CFM', to: '849.51 m³/hr' },
            { from: '1,000 CFM', to: '1,699.01 m³/hr' }
        ]
    },
    {
        slug: 'm3hr-to-cfm',
        title: 'M³/hr to CFM Converter',
        description: 'Convert cubic meters per hour to cubic feet per minute. Reverse flow rate conversion.',
        keywords: 'm3/hr to cfm, cubic meters per hour, flow rate',
        category: 'Volume Conversions',
        icon: 'fa-arrow-right',
        fromUnit: 'Cubic Meters per Hour (m³/hr)',
        toUnit: 'Cubic Feet per Minute (CFM)',
        conversionType: 'cfm-to-m3hr',
        formula: 'm³/hr ÷ 1.699 = CFM',
        explanation: 'To convert cubic meters per hour to CFM, divide by 1.699. This is the reverse of CFM to m³/hr conversion.',
        commonConversions: [
            { from: '1.70 m³/hr', to: '1 CFM' },
            { from: '16.99 m³/hr', to: '10 CFM' },
            { from: '84.95 m³/hr', to: '50 CFM' },
            { from: '169.90 m³/hr', to: '100 CFM' },
            { from: '849.51 m³/hr', to: '500 CFM' },
            { from: '1,699.01 m³/hr', to: '1,000 CFM' }
        ]
    },
    {
        slug: 'm3-to-kg',
        title: 'M³ to KG Converter',
        description: 'Convert cubic meters of gas to kilograms. Gas density and weight calculation tool.',
        keywords: 'm3 to kg, gas weight, natural gas density, volume to mass',
        category: 'Weight & Density',
        icon: 'fa-balance-scale',
        fromUnit: 'Cubic Meters (m³)',
        toUnit: 'Kilograms (kg)',
        conversionType: 'm3-to-kg',
        formula: 'm³ × 0.717 = kg',
        explanation: 'Natural gas has a density of approximately 0.717 kg/m³ at standard temperature and pressure. Multiply volume by density to get mass.',
        commonConversions: [
            { from: '1 m³', to: '0.72 kg' },
            { from: '10 m³', to: '7.17 kg' },
            { from: '50 m³', to: '35.85 kg' },
            { from: '100 m³', to: '71.70 kg' },
            { from: '500 m³', to: '358.50 kg' },
            { from: '1,000 m³', to: '717.00 kg' }
        ]
    },
    {
        slug: 'kg-to-m3',
        title: 'KG to M³ Converter',
        description: 'Convert kilograms of gas to cubic meters. Reverse gas density conversion calculator.',
        keywords: 'kg to m3, gas volume, natural gas mass, mass to volume',
        category: 'Weight & Density',
        icon: 'fa-balance-scale-right',
        fromUnit: 'Kilograms (kg)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'm3-to-kg',
        formula: 'kg ÷ 0.717 = m³',
        explanation: 'To convert kilograms of natural gas to cubic meters, divide by the density (0.717 kg/m³ at STP).',
        commonConversions: [
            { from: '0.72 kg', to: '1 m³' },
            { from: '7.17 kg', to: '10 m³' },
            { from: '35.85 kg', to: '50 m³' },
            { from: '71.70 kg', to: '100 m³' },
            { from: '358.50 kg', to: '500 m³' },
            { from: '717.00 kg', to: '1,000 m³' }
        ]
    },
    {
        slug: 'ppm-to-ugm3',
        title: 'PPM to μg/m³ Converter',
        description: 'Convert parts per million to micrograms per cubic meter. Air quality concentration conversion.',
        keywords: 'ppm to μg/m3, ppm to micrograms, air quality conversion',
        category: 'Air Quality',
        icon: 'fa-microscope',
        fromUnit: 'Parts Per Million (PPM)',
        toUnit: 'Micrograms per Cubic Meter (μg/m³)',
        conversionType: 'ppm-to-ugm3',
        formula: 'PPM × (MW × 1000) / 24.45 = μg/m³',
        explanation: 'Conversion depends on molecular weight (MW) and temperature. For air (MW=28.97) at 25°C: PPM × 1,186 ≈ μg/m³.',
        commonConversions: [
            { from: '1 PPM', to: '1,186 μg/m³' },
            { from: '5 PPM', to: '5,930 μg/m³' },
            { from: '10 PPM', to: '11,860 μg/m³' },
            { from: '50 PPM', to: '59,300 μg/m³' },
            { from: '100 PPM', to: '118,600 μg/m³' },
            { from: '1,000 PPM', to: '1,186,000 μg/m³' }
        ]
    },
    {
        slug: 'ppm-to-mgm3',
        title: 'PPM to mg/m³ Converter',
        description: 'Convert parts per million to milligrams per cubic meter. Air pollutant concentration conversion.',
        keywords: 'ppm to mg/m3, air pollution, concentration conversion',
        category: 'Air Quality',
        icon: 'fa-vial',
        fromUnit: 'Parts Per Million (PPM)',
        toUnit: 'Milligrams per Cubic Meter (mg/m³)',
        conversionType: 'ppm-to-mgm3',
        formula: 'PPM × MW / 24.45 = mg/m³',
        explanation: 'For air (MW=28.97) at 25°C: PPM × 1.186 ≈ mg/m³. This conversion is temperature and pressure dependent.',
        commonConversions: [
            { from: '1 PPM', to: '1.19 mg/m³' },
            { from: '10 PPM', to: '11.86 mg/m³' },
            { from: '50 PPM', to: '59.30 mg/m³' },
            { from: '100 PPM', to: '118.60 mg/m³' },
            { from: '500 PPM', to: '593.00 mg/m³' },
            { from: '1,000 PPM', to: '1,186.00 mg/m³' }
        ]
    },
    {
        slug: 'mgm3-to-ppm',
        title: 'mg/m³ to PPM Converter',
        description: 'Convert milligrams per cubic meter to parts per million. Reverse air quality conversion.',
        keywords: 'mg/m3 to ppm, milligrams to ppm, air quality',
        category: 'Air Quality',
        icon: 'fa-exchange-alt',
        fromUnit: 'Milligrams per Cubic Meter (mg/m³)',
        toUnit: 'Parts Per Million (PPM)',
        conversionType: 'mgm3-to-ppm',
        formula: 'mg/m³ × 24.45 / MW = PPM',
        explanation: 'For air (MW=28.97) at 25°C: mg/m³ × 0.843 ≈ PPM. This is the reverse conversion of PPM to mg/m³.',
        commonConversions: [
            { from: '1.19 mg/m³', to: '1 PPM' },
            { from: '11.86 mg/m³', to: '10 PPM' },
            { from: '59.30 mg/m³', to: '50 PPM' },
            { from: '118.60 mg/m³', to: '100 PPM' },
            { from: '593.00 mg/m³', to: '500 PPM' },
            { from: '1,186.00 mg/m³', to: '1,000 PPM' }
        ]
    },
    {
        slug: 'ugm3-to-ppm',
        title: 'μg/m³ to PPM Converter',
        description: 'Convert micrograms per cubic meter to parts per million. Air quality measurement conversion.',
        keywords: 'μg/m3 to ppm, micrograms to ppm, air quality conversion',
        category: 'Air Quality',
        icon: 'fa-arrow-left',
        fromUnit: 'Micrograms per Cubic Meter (μg/m³)',
        toUnit: 'Parts Per Million (PPM)',
        conversionType: 'ugm3-to-ppm',
        formula: 'μg/m³ × 24.45 / (MW × 1000) = PPM',
        explanation: 'For air (MW=28.97) at 25°C: μg/m³ × 0.000843 ≈ PPM. This converts micrograms to parts per million.',
        commonConversions: [
            { from: '1,186 μg/m³', to: '1 PPM' },
            { from: '5,930 μg/m³', to: '5 PPM' },
            { from: '11,860 μg/m³', to: '10 PPM' },
            { from: '59,300 μg/m³', to: '50 PPM' },
            { from: '118,600 μg/m³', to: '100 PPM' },
            { from: '1,186,000 μg/m³', to: '1,000 PPM' }
        ]
    },
    {
        slug: 'btu-to-m3',
        title: 'BTU to M³ Converter',
        description: 'Convert British Thermal Units to cubic meters of gas. Energy to volume conversion.',
        keywords: 'btu to m3, btu to cubic meters, gas energy conversion',
        category: 'Advanced Energy',
        icon: 'fa-calculator',
        fromUnit: 'British Thermal Units (BTU)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'btu-to-m3',
        formula: 'BTU × 0.000293071 ÷ 10.55 = m³',
        explanation: 'Convert BTU to kWh first (×0.000293071), then divide by gas energy content (10.55 kWh/m³) to get m³.',
        commonConversions: [
            { from: '10,000 BTU', to: '0.28 m³' },
            { from: '50,000 BTU', to: '1.39 m³' },
            { from: '100,000 BTU', to: '2.78 m³' },
            { from: '500,000 BTU', to: '13.89 m³' },
            { from: '1,000,000 BTU', to: '27.78 m³' },
            { from: '10,000,000 BTU', to: '277.78 m³' }
        ]
    },
    {
        slug: 'mmbtu-to-mwh',
        title: 'MMBtu to MWh Converter',
        description: 'Convert million British Thermal Units to megawatt-hours. Large-scale energy conversion.',
        keywords: 'mmbtu to mwh, million btu to megawatt hours, energy conversion',
        category: 'Advanced Energy',
        icon: 'fa-bolt',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Megawatt-hours (MWh)',
        conversionType: 'mmbtu-to-mwh',
        formula: 'MMBtu × 0.293071 = MWh',
        explanation: 'One MMBtu (million BTU) equals 0.293071 MWh. This is commonly used in industrial and utility-scale energy trading.',
        commonConversions: [
            { from: '1 MMBtu', to: '0.29 MWh' },
            { from: '5 MMBtu', to: '1.47 MWh' },
            { from: '10 MMBtu', to: '2.93 MWh' },
            { from: '50 MMBtu', to: '14.65 MWh' },
            { from: '100 MMBtu', to: '29.31 MWh' },
            { from: '1,000 MMBtu', to: '293.07 MWh' }
        ]
    },
    {
        slug: 'mwh-to-mmbtu',
        title: 'MWh to MMBtu Converter',
        description: 'Convert megawatt-hours to million BTU. Reverse large-scale energy conversion.',
        keywords: 'mwh to mmbtu, megawatt hours to million btu',
        category: 'Advanced Energy',
        icon: 'fa-exchange-alt',
        fromUnit: 'Megawatt-hours (MWh)',
        toUnit: 'Million BTU (MMBtu)',
        conversionType: 'mmbtu-to-mwh',
        formula: 'MWh ÷ 0.293071 = MMBtu',
        explanation: 'To convert MWh to MMBtu, divide by 0.293071. This is the reverse of MMBtu to MWh conversion.',
        commonConversions: [
            { from: '0.29 MWh', to: '1 MMBtu' },
            { from: '1.47 MWh', to: '5 MMBtu' },
            { from: '2.93 MWh', to: '10 MMBtu' },
            { from: '14.65 MWh', to: '50 MMBtu' },
            { from: '29.31 MWh', to: '100 MMBtu' },
            { from: '293.07 MWh', to: '1,000 MMBtu' }
        ]
    },
    {
        slug: 'mwh-to-kwh',
        title: 'MWh to kWh Converter',
        description: 'Convert megawatt-hours to kilowatt-hours. Simple large to small energy unit conversion.',
        keywords: 'mwh to kwh, megawatt hours to kilowatt hours',
        category: 'Advanced Energy',
        icon: 'fa-arrow-down',
        fromUnit: 'Megawatt-hours (MWh)',
        toUnit: 'Kilowatt-hours (kWh)',
        conversionType: 'mwh-to-kwh',
        formula: 'MWh × 1,000 = kWh',
        explanation: 'One megawatt-hour equals 1,000 kilowatt-hours. This is a simple metric prefix conversion.',
        commonConversions: [
            { from: '0.001 MWh', to: '1 kWh' },
            { from: '0.01 MWh', to: '10 kWh' },
            { from: '0.1 MWh', to: '100 kWh' },
            { from: '1 MWh', to: '1,000 kWh' },
            { from: '10 MWh', to: '10,000 kWh' },
            { from: '100 MWh', to: '100,000 kWh' }
        ]
    },
    {
        slug: 'therm-to-mmbtu',
        title: 'Therm to MMBtu Converter',
        description: 'Convert therms to million BTU. Gas energy unit conversion for large quantities.',
        keywords: 'therm to mmbtu, therms to million btu',
        category: 'Advanced Energy',
        icon: 'fa-thermometer',
        fromUnit: 'Therms',
        toUnit: 'Million BTU (MMBtu)',
        conversionType: 'therm-to-mmbtu',
        formula: 'Therms ÷ 10 = MMBtu',
        explanation: 'One therm equals 100,000 BTU, so 10 therms equal 1 MMBtu (million BTU).',
        commonConversions: [
            { from: '10 therms', to: '1 MMBtu' },
            { from: '50 therms', to: '5 MMBtu' },
            { from: '100 therms', to: '10 MMBtu' },
            { from: '500 therms', to: '50 MMBtu' },
            { from: '1,000 therms', to: '100 MMBtu' },
            { from: '10,000 therms', to: '1,000 MMBtu' }
        ]
    },
    {
        slug: 'mmbtu-to-therm',
        title: 'MMBtu to Therm Converter',
        description: 'Convert million BTU to therms. Reverse gas energy conversion.',
        keywords: 'mmbtu to therm, million btu to therms',
        category: 'Advanced Energy',
        icon: 'fa-undo',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Therms',
        conversionType: 'therm-to-mmbtu',
        formula: 'MMBtu × 10 = Therms',
        explanation: 'To convert MMBtu to therms, multiply by 10. One MMBtu equals 10 therms.',
        commonConversions: [
            { from: '1 MMBtu', to: '10 therms' },
            { from: '5 MMBtu', to: '50 therms' },
            { from: '10 MMBtu', to: '100 therms' },
            { from: '50 MMBtu', to: '500 therms' },
            { from: '100 MMBtu', to: '1,000 therms' },
            { from: '1,000 MMBtu', to: '10,000 therms' }
        ]
    },
    {
        slug: 'therm-to-mwh',
        title: 'Therm to MWh Converter',
        description: 'Convert therms to megawatt-hours. Gas to electrical energy equivalence.',
        keywords: 'therm to mwh, therms to megawatt hours',
        category: 'Advanced Energy',
        icon: 'fa-fire-alt',
        fromUnit: 'Therms',
        toUnit: 'Megawatt-hours (MWh)',
        conversionType: 'therm-to-kwh',
        formula: 'Therms × 0.0293071 = MWh',
        explanation: 'One therm equals 0.0293071 MWh. Convert therms to kWh (×29.3071), then divide by 1,000 to get MWh.',
        commonConversions: [
            { from: '1 therm', to: '0.029 MWh' },
            { from: '10 therms', to: '0.293 MWh' },
            { from: '100 therms', to: '2.931 MWh' },
            { from: '500 therms', to: '14.654 MWh' },
            { from: '1,000 therms', to: '29.307 MWh' },
            { from: '10,000 therms', to: '293.071 MWh' }
        ]
    },
    {
        slug: 'mmbtu-to-mmscf',
        title: 'MMBtu to MMSCF Converter',
        description: 'Convert million BTU to million standard cubic feet. Natural gas trading unit conversion.',
        keywords: 'mmbtu to mmscf, million btu to million cubic feet',
        category: 'Advanced Energy',
        icon: 'fa-compress',
        fromUnit: 'Million BTU (MMBtu)',
        toUnit: 'Million Standard Cubic Feet (MMSCF)',
        conversionType: 'mmbtu-to-mmscf',
        formula: 'MMBtu ÷ 1.036 = MMSCF',
        explanation: 'Natural gas has approximately 1.036 MMBtu per MMSCF. This varies slightly based on gas composition.',
        commonConversions: [
            { from: '1 MMBtu', to: '0.97 MMSCF' },
            { from: '5 MMBtu', to: '4.83 MMSCF' },
            { from: '10 MMBtu', to: '9.65 MMSCF' },
            { from: '50 MMBtu', to: '48.26 MMSCF' },
            { from: '100 MMBtu', to: '96.53 MMSCF' },
            { from: '1,000 MMBtu', to: '965.25 MMSCF' }
        ]
    },
    {
        slug: 'm2-to-m3',
        title: 'M² to M³ Converter',
        description: 'Convert square meters to cubic meters. Area to volume conversion with height.',
        keywords: 'm2 to m3, square meters to cubic meters, area to volume',
        category: 'Specialized',
        icon: 'fa-expand',
        fromUnit: 'Square Meters (m²)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'm2-to-m3',
        formula: 'm² × height = m³',
        explanation: 'To convert area to volume, multiply by height (depth or thickness). Enter height in the additional input field.',
        commonConversions: [
            { from: '1 m² × 1m', to: '1 m³' },
            { from: '10 m² × 1m', to: '10 m³' },
            { from: '50 m² × 2m', to: '100 m³' },
            { from: '100 m² × 2.5m', to: '250 m³' },
            { from: '200 m² × 3m', to: '600 m³' },
            { from: '500 m² × 5m', to: '2,500 m³' }
        ]
    },
    {
        slug: 'sqft-to-m3',
        title: 'Sq Ft to M³ Converter',
        description: 'Convert square feet to cubic meters. Area to volume conversion with height.',
        keywords: 'sq ft to m3, square feet to cubic meters, area to volume',
        category: 'Specialized',
        icon: 'fa-square',
        fromUnit: 'Square Feet (ft²)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'sqft-to-m3',
        formula: 'ft² × 0.092903 × height = m³',
        explanation: 'Convert square feet to square meters (÷10.764), then multiply by height to get cubic meters.',
        commonConversions: [
            { from: '10 ft² × 1m', to: '0.93 m³' },
            { from: '100 ft² × 1m', to: '9.29 m³' },
            { from: '500 ft² × 2m', to: '92.90 m³' },
            { from: '1,000 ft² × 2.5m', to: '232.26 m³' },
            { from: '2,000 ft² × 3m', to: '557.42 m³' },
            { from: '5,000 ft² × 5m', to: '2,322.58 m³' }
        ]
    },
    {
        slug: 'ft-to-m3',
        title: 'FT to M³ Converter',
        description: 'Convert linear feet to cubic meters. Length to volume calculation.',
        keywords: 'ft to m3, feet to cubic meters, length to volume',
        category: 'Specialized',
        icon: 'fa-ruler',
        fromUnit: 'Feet (ft)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'ft-to-m3',
        formula: '(ft × 0.3048)³ = m³',
        explanation: 'For cubic calculations: convert feet to meters (×0.3048), then cube the result. For pipe volume, use cross-sectional area × length.',
        commonConversions: [
            { from: '1 ft³', to: '0.028 m³' },
            { from: '5 ft³', to: '0.142 m³' },
            { from: '10 ft³', to: '0.283 m³' },
            { from: '50 ft³', to: '1.416 m³' },
            { from: '100 ft³', to: '2.832 m³' },
            { from: '1,000 ft³', to: '28.317 m³' }
        ]
    },
    {
        slug: 'nm3-to-m3',
        title: 'Nm³ to M³ Converter',
        description: 'Convert normal cubic meters to actual cubic meters. Standard to actual gas volume.',
        keywords: 'nm3 to m3, normal cubic meters, standard cubic meters',
        category: 'Specialized',
        icon: 'fa-adjust',
        fromUnit: 'Normal Cubic Meters (Nm³)',
        toUnit: 'Cubic Meters (m³)',
        conversionType: 'nm3-to-m3',
        formula: 'Nm³ ≈ m³ (at standard conditions)',
        explanation: 'Nm³ measures gas at standard conditions (0°C, 1 atm). At actual conditions, the volume may differ. For UK calculations, they are approximately equal.',
        commonConversions: [
            { from: '1 Nm³', to: '1.00 m³' },
            { from: '10 Nm³', to: '10.00 m³' },
            { from: '100 Nm³', to: '100.00 m³' },
            { from: '500 Nm³', to: '500.00 m³' },
            { from: '1,000 Nm³', to: '1,000.00 m³' },
            { from: '10,000 Nm³', to: '10,000.00 m³' }
        ]
    }
];

// Generate converter page HTML
function generateConverterPage(converter) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${converter.title} - UK Converter</title>
    <meta name="description" content="${converter.description}">
    <meta name="keywords" content="${converter.keywords}">
    <meta name="conversion-type" content="${converter.conversionType}">
    <link rel="canonical" href="https://ukconverter.site/converters/${converter.slug}.html">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${converter.title}">
    <meta property="og:description" content="${converter.description}">
    <meta property="og:url" content="https://ukconverter.site/converters/${converter.slug}.html">
    
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
</head>
<body>
    <!-- Header with Navigation -->
    ${getHeaderHTML()}
    
    <!-- Main Container -->
    <div class="container">
        <!-- Sidebar -->
        ${getSidebarHTML(converter.category)}
        
        <!-- Main Content -->
        <main class="main-content">
            <!-- Page Header -->
            <header>
                <nav style="margin-bottom: 20px; font-size: 14px; color: var(--text-light);">
                    <a href="../index.html" style="color: var(--primary-color);">Home</a> » 
                    <span>${converter.category}</span> » 
                    <span>${converter.title}</span>
                </nav>
                
                <h1 style="font-size: 36px; margin-bottom: 15px; color: var(--text-dark);">
                    <i class="fas ${converter.icon}"></i> ${converter.title}
                </h1>
                <p style="font-size: 18px; color: var(--text-light); margin-bottom: 30px;">
                    ${converter.description}
                </p>
            </header>
            
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
            
            <!-- SEO Content Sections -->
            <section class="content-section">
                <h2>About the ${converter.title}</h2>
                <p>${converter.explanation}</p>
                
                <h3>How the Conversion Works</h3>
                <p>The ${converter.title.toLowerCase()} uses the following standard conversion factor: <strong>${converter.formula}</strong></p>
                
                <p>This conversion is essential for:</p>
                <ul>
                    <li>Understanding energy bills and consumption</li>
                    <li>Comparing different energy units</li>
                    <li>Engineering and technical calculations</li>
                    <li>Energy efficiency planning</li>
                    <li>Academic and research purposes</li>
                </ul>
            </section>
            
            <section class="content-section">
                <h2>Why Use Our ${converter.title}</h2>
                <p>Our converter tool provides instant, accurate results using official UK conversion factors. Whether you're a homeowner trying to understand your energy bill, a student learning about energy units, or a professional engineer performing calculations, this tool delivers reliable results every time.</p>
                
                <div class="tips-box">
                    <h3><i class="fas fa-lightbulb"></i> Key Benefits</h3>
                    <ul>
                        <li>Instant conversions as you type</li>
                        <li>Bidirectional conversion (convert both ways)</li>
                        <li>UK-standard conversion factors</li>
                        <li>No registration or downloads required</li>
                        <li>Mobile-friendly responsive design</li>
                        <li>Free to use forever</li>
                    </ul>
                </div>
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
                                <td>${conv.from}</td>
                                <td>${conv.to}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
            
            ${getFAQHTML(converter)}
            
            <section class="content-section">
                <h2>Tips for Using This Converter</h2>
                <div class="tips-box">
                    <h3><i class="fas fa-lightbulb"></i> Usage Tips</h3>
                    <ul>
                        <li>Enter any value in either field to see instant conversion</li>
                        <li>Use the swap button to quickly reverse the conversion direction</li>
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
                <div class="category-grid">
                    ${getRelatedConverters(converter)}
                </div>
            </section>
        </main>
    </div>
    
    <!-- Footer -->
    ${getFooterHTML()}
    
    <!-- Custom JS -->
    <script src="../js/converter.js"></script>
</body>
</html>`;
}

// Helper functions
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
                    <li><a href="../index.html"><i class="fas fa-home"></i> All Converters</a></li>
                </ul>
            </nav>
        </div>
    </header>`;
}

function getSidebarHTML(currentCategory) {
    return `<aside class="sidebar">
            <h3><i class="fas fa-list"></i> Quick Access</h3>
            
            <div class="sidebar-section">
                <h4>Popular Converters</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html"><i class="fas fa-star"></i> Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html"><i class="fas fa-star"></i> kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html"><i class="fas fa-star"></i> Gas Units to kWh</a></li>
                    <li><a href="btu-to-kwh.html"><i class="fas fa-star"></i> BTU to kWh</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Gas & Energy</h4>
                <ul class="sidebar-links">
                    <li><a href="gas-m3-to-kwh.html"><i class="fas fa-fire"></i> Gas M³ to kWh</a></li>
                    <li><a href="kwh-to-m3.html"><i class="fas fa-fire"></i> kWh to M³</a></li>
                    <li><a href="gas-units-to-kwh.html"><i class="fas fa-fire"></i> Gas Units to kWh</a></li>
                    <li><a href="cubic-feet-to-kwh.html"><i class="fas fa-fire"></i> Cubic Feet to kWh</a></li>
                    <li><a href="btu-to-kwh.html"><i class="fas fa-fire"></i> BTU to kWh</a></li>
                    <li><a href="therm-to-kwh.html"><i class="fas fa-fire"></i> Therm to kWh</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Volume Conversions</h4>
                <ul class="sidebar-links">
                    <li><a href="m3-to-ft3.html"><i class="fas fa-cube"></i> M³ to FT³</a></li>
                    <li><a href="liter-to-m3.html"><i class="fas fa-cube"></i> Liter to M³</a></li>
                    <li><a href="kw-to-m3hr.html"><i class="fas fa-cube"></i> kW to M³/hr</a></li>
                    <li><a href="cfm-to-m3hr.html"><i class="fas fa-cube"></i> CFM to M³/hr</a></li>
                    <li><a href="m3hr-to-cfm.html"><i class="fas fa-cube"></i> M³/hr to CFM</a></li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <h4>Air Quality</h4>
                <ul class="sidebar-links">
                    <li><a href="ppm-to-ugm3.html"><i class="fas fa-smog"></i> PPM to μg/m³</a></li>
                    <li><a href="ppm-to-mgm3.html"><i class="fas fa-smog"></i> PPM to mg/m³</a></li>
                    <li><a href="mgm3-to-ppm.html"><i class="fas fa-smog"></i> mg/m³ to PPM</a></li>
                    <li><a href="ugm3-to-ppm.html"><i class="fas fa-smog"></i> μg/m³ to PPM</a></li>
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

function getFAQHTML(converter) {
    const faqs = [
        {
            q: `How do I use the ${converter.title}?`,
            a: `Simply enter a value in either the ${converter.fromUnit} or ${converter.toUnit} field, and the conversion will happen automatically. The result updates in real-time as you type.`
        },
        {
            q: `What is the conversion formula?`,
            a: `The conversion formula is: ${converter.formula}. This uses ${converter.explanation.substring(0, 100)}...`
        },
        {
            q: `Is this converter accurate?`,
            a: `Yes, our converter uses official UK conversion factors and provides results accurate to 4 decimal places. The calculations are based on industry-standard formulas used by UK energy suppliers and engineers.`
        },
        {
            q: `Can I convert in reverse?`,
            a: `Absolutely! You can enter values in either field. The converter works bidirectionally, allowing you to convert from ${converter.fromUnit} to ${converter.toUnit} or vice versa.`
        }
    ];
    
    return `<section class="content-section">
                <h2>Frequently Asked Questions</h2>
                ${faqs.map(faq => `
                <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <h3 itemprop="name">${faq.q}</h3>
                    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">${faq.a}</p>
                    </div>
                </div>
                `).join('')}
            </section>
            
            <!-- FAQ Schema -->
            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    ${faqs.map(faq => `{
                        "@type": "Question",
                        "name": "${faq.q}",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "${faq.a}"
                        }
                    }`).join(',')}
                ]
            }
            </script>`;
}

function getRelatedConverters(current) {
    const related = converters.filter(c => 
        c.category === current.category && c.slug !== current.slug
    ).slice(0, 4);
    
    return related.map(conv => `
        <a href="${conv.slug}.html" class="category-card">
            <i class="fas ${conv.icon}"></i>
            <h3>${conv.title}</h3>
            <p>${conv.description.substring(0, 80)}...</p>
        </a>
    `).join('');
}

function getFooterHTML() {
    return `<footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>UK Converter</h3>
                <p>Professional conversion calculators for gas, energy, volume, and air quality measurements.</p>
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
                <p>Need help or have suggestions? We'd love to hear from you!</p>
                <a href="../trust/contact.html" style="color: var(--accent-color); font-weight: 600;">Get in Touch →</a>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 UK Converter. All rights reserved. | <a href="../sitemap.xml" style="color: #9ca3af;">Sitemap</a></p>
        </div>
    </footer>`;
}

// Generate all converter pages
console.log('Generating converter pages...');
const convertersDir = path.join(__dirname, 'converters');

converters.forEach(converter => {
    const html = generateConverterPage(converter);
    const filePath = path.join(convertersDir, `${converter.slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`✓ Generated: ${converter.slug}.html`);
});

console.log(`\n✅ Successfully generated ${converters.length} converter pages!`);
