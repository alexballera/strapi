#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del idioma español...\n');

// Verificar archivos de configuración
const checks = [
  {
    name: 'Next.js i18n config',
    file: '../next/i18n.config.ts',
    contains: ["defaultLocale: 'es'", "locales: ['es', 'en', 'fr']"]
  },
  {
    name: 'Next.js config general',
    file: '../next/config.ts',
    contains: ['defaultLocale = "es"', 'locales = ["es", "en", "fr"]']
  },
  {
    name: 'Strapi plugins config',
    file: '../strapi/config/plugins.ts',
    contains: ["defaultLocale: 'es'", "locales: ['es', 'en', 'fr']"]
  },
  {
    name: 'Strapi admin config',
    file: '../strapi/src/admin/app.tsx',
    contains: ["'es'", "'en'", "'fr'"]
  },
  {
    name: 'Traducciones españolas',
    file: '../next/lib/translations/es.ts',
    contains: ['home: "Inicio"', 'welcome: "Bienvenido"']
  }
];

let allPassed = true;

checks.forEach(check => {
  const filePath = path.join(__dirname, check.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${check.name}: Archivo no encontrado`);
    allPassed = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const passed = check.contains.every(text => content.includes(text));
  
  if (passed) {
    console.log(`✅ ${check.name}: Configurado correctamente`);
  } else {
    console.log(`❌ ${check.name}: Configuración incompleta`);
    allPassed = false;
  }
});

console.log('\n📋 Estado de la configuración:');
if (allPassed) {
  console.log('🎉 ¡Todas las configuraciones están correctas!');
  console.log('\n🚀 Pasos para iniciar:');
  console.log('1. Terminal 1: cd strapi && yarn develop');
  console.log('2. Terminal 2: cd next && npm run dev');
  console.log('3. Configurar locales en Strapi Admin (Settings > Internationalization)');
  console.log('4. Visitar http://localhost:3000 (debería redirigir a /es/)');
} else {
  console.log('⚠️  Hay problemas en la configuración. Revisar archivos.');
}

console.log('\n📄 Documentación completa en: CONFIGURACION_COMPLETA_ESPAÑOL.md');
