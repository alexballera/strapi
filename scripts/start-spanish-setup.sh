#!/bin/bash

# Script para iniciar el proyecto LaunchPad con configuración en español
echo "🇪🇸 Iniciando LaunchPad con configuración en español..."
echo "=================================================="

# Función para verificar si un puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Puerto $1 ya está en uso"
        return 0
    else
        return 1
    fi
}

# Verificar archivos de configuración
echo "🔍 Verificando configuración..."

# Verificar configuración de Next.js
if grep -q "defaultLocale: 'es'" next/i18n.config.ts; then
    echo "✅ Next.js i18n configurado correctamente"
else
    echo "❌ Error en configuración de Next.js i18n"
    exit 1
fi

# Verificar configuración de Strapi
if grep -q "defaultLocale: 'es'" strapi/config/plugins.ts; then
    echo "✅ Strapi i18n configurado correctamente"
else
    echo "❌ Error en configuración de Strapi i18n"
    exit 1
fi

echo ""
echo "🚀 Iniciando servidores..."
echo ""

# Verificar puertos
if check_port 1337; then
    echo "ℹ️  Strapi parece estar ejecutándose en puerto 1337"
else
    echo "🔵 Iniciando Strapi en puerto 1337..."
    cd strapi
    echo "📁 Directorio actual: $(pwd)"
    echo "⚡ Comando: yarn develop"
    echo ""
    echo "🔗 Strapi Admin: http://localhost:1337/admin"
    echo "📋 Configurar locales en: Settings > Internationalization"
    echo ""
    echo "⏳ Inicia Strapi con: cd strapi && yarn develop"
fi

echo ""

if check_port 3000; then
    echo "ℹ️  Next.js parece estar ejecutándose en puerto 3000"
else
    echo "🟢 Para iniciar Next.js:"
    echo "📁 cd next"
    echo "⚡ npm run dev"
    echo ""
    echo "🔗 Frontend: http://localhost:3000"
    echo "🌍 Español (por defecto): http://localhost:3000/es/"
    echo "🌍 Inglés: http://localhost:3000/en/"
    echo "🌍 Francés: http://localhost:3000/fr/"
fi

echo ""
echo "📚 Documentación completa:"
echo "   - PASOS_FINALES_ESPAÑOL.md"
echo "   - CONFIGURACION_COMPLETA_ESPAÑOL.md"
echo ""
echo "🎯 Próximos pasos manuales:"
echo "   1. Configurar locales en Strapi Admin"
echo "   2. Crear contenido en español"
echo "   3. Probar selector de idiomas"
echo ""
echo "✨ ¡Configuración en español lista!"
