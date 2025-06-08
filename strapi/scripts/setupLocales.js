const fs = require('fs');
const path = require('path');

console.log('🌍 Configurando locales para Strapi...');

// Script para configurar locales en Strapi
const localesConfig = [
  {
    code: 'es',
    name: 'Español',
    isDefault: true
  },
  {
    code: 'en', 
    name: 'English',
    isDefault: false
  },
  {
    code: 'fr',
    name: 'Français', 
    isDefault: false
  }
];

// Crear archivo de configuración de locales para importar
const localesData = {
  version: 2,
  data: {
    'plugin::i18n.locale': localesConfig.map((locale, index) => ({
      id: index + 1,
      code: locale.code,
      name: locale.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDefault: locale.isDefault
    }))
  }
};

// Guardar configuración
const outputPath = path.join(__dirname, '../data/locales-config.json');
fs.writeFileSync(outputPath, JSON.stringify(localesData, null, 2));

console.log('✅ Configuración de locales guardada en:', outputPath);
console.log('📋 Locales configurados:');
localesConfig.forEach(locale => {
  console.log(`   - ${locale.name} (${locale.code})${locale.isDefault ? ' [POR DEFECTO]' : ''}`);
});

console.log('\n🚀 Instrucciones:');
console.log('1. Iniciar Strapi: yarn develop');
console.log('2. Ir a Settings > Internationalization');
console.log('3. Configurar manualmente los locales mostrados arriba');
console.log('4. Establecer español (es) como idioma por defecto');
