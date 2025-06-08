#!/bin/bash

# Script para configurar Strapi con locale español
echo "🚀 Iniciando configuración de Strapi con locale español..."

# Verificar que Strapi esté corriendo
if ! curl -s http://localhost:1337/api/global > /dev/null; then
    echo "❌ Strapi no está corriendo. Por favor inicia Strapi primero:"
    echo "   cd strapi && npm run develop"
    exit 1
fi

echo "✅ Strapi está corriendo"

# Ejecutar script de configuración de locales
echo "🔧 Configurando locales en Strapi..."
cd /home/alexballera/proyectos/strapi/strapi
node scripts/setupLocales.js

echo "📝 Para completar la configuración:"
echo "1. Ve a http://localhost:1337/admin"
echo "2. Ve a Content Manager > Global"
echo "3. Crea una nueva entrada para español (es)"
echo "4. Llena los campos navbar y footer"
echo "5. Publica el contenido"

echo "🎉 Configuración completada"
