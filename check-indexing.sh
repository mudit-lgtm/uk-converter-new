#!/bin/bash
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

for page in "${pages[@]}"; do
    curl -s "https://www.google.com/search?q=site:ukconverter.site/$page" | grep -q "$page" && echo "✅ $page indexed" || echo "❌ $page NOT indexed"
    sleep 2  # Be nice to Google
done

echo ""
echo "Total indexed pages estimate:"
curl -s "https://www.google.com/search?q=site:ukconverter.site" | grep -oP 'About \K[0-9,]+(?= results)' || echo "Could not determine"

echo ""
echo "==================================="
echo "Run this script daily to track indexing progress"
