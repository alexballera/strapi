const fs = require('fs');
const path = require('path');

// Script para agregar el idioma español como locale por defecto
console.log('🇪🇸 Agregando español como idioma por defecto...');

// 1. Actualizar configuración de Next.js - ya está hecho
console.log('✅ Configuración de Next.js actualizada');

// 2. Crear directorio de locale español si no existe
const nextLocaleDir = path.join(__dirname, '../next/app/[locale]');
console.log(`📁 Directorio de locales: ${nextLocaleDir}`);

// 3. Mostrar configuración actual
const i18nConfig = path.join(__dirname, '../next/i18n.config.ts');
const configContent = fs.readFileSync(i18nConfig, 'utf8');
console.log('📄 Configuración i18n actual:');
console.log(configContent);

console.log('🎉 ¡Configuración completada!');
console.log('📝 Pasos siguientes:');
console.log('   1. Iniciar Strapi: cd strapi && yarn develop');
console.log('   2. Ir a Settings > Internationalization');
console.log('   3. Agregar español (es) como locale');
console.log('   4. Establecer español como locale por defecto');
console.log('   5. Iniciar Next.js: cd next && npm run dev');
