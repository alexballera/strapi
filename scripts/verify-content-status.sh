#!/bin/bash

# Script para verificar y crear contenido faltante en Strapi

echo "🔍 Verificando estado del contenido en Strapi..."

# Verificar Global content
echo "📋 Verificando contenido Global..."

echo "🇺🇸 Inglés:"
curl -s "http://localhost:1337/api/global?locale=en&populate=*" | jq '.data.navbar' 2>/dev/null || echo "Sin jq, usando curl básico..."

echo "🇪🇸 Español:"
curl -s "http://localhost:1337/api/global?locale=es&populate=*" | jq '.data.navbar' 2>/dev/null || echo "Sin jq, usando curl básico..."

echo "🇫🇷 Francés:"
curl -s "http://localhost:1337/api/global?locale=fr&populate=*" | jq '.data.navbar' 2>/dev/null || echo "Sin jq, usando curl básico..."

# Verificar Pages content
echo ""
echo "📋 Verificando contenido de Pages..."

echo "🇺🇸 Homepage en inglés:"
curl -s "http://localhost:1337/api/pages?filters[slug]=homepage&locale=en" | head -3

echo "🇪🇸 Homepage en español:"
curl -s "http://localhost:1337/api/pages?filters[slug]=homepage&locale=es" | head -3

echo ""
echo "📋 URLs de prueba:"
echo "🌐 Frontend:"
echo "  - http://localhost:3000/en"
echo "  - http://localhost:3000/es"
echo "  - http://localhost:3000/fr"
echo ""
echo "🔧 Backend Admin:"
echo "  - http://localhost:1337/admin"
echo ""
echo "🎯 Estado actual: El sitio debería cargar ahora con mensaje por defecto si no hay contenido."
echo "✨ Para configurar contenido completo, ve a: http://localhost:1337/admin"
