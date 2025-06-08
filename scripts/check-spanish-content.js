const fetch = require('node-fetch');

const STRAPI_URL = 'http://localhost:1337';

async function main() {
  console.log('🚀 Iniciando configuración de contenido en español...');

  try {
    // Verificar conexión
    console.log('🔍 Verificando conexión con Strapi...');
    const healthCheck = await fetch(`${STRAPI_URL}/api/global`);
    if (!healthCheck.ok) {
      throw new Error('Strapi no responde correctamente');
    }
    console.log('✅ Conexión con Strapi establecida');

    // Obtener contenido global actual
    console.log('📋 Obteniendo contenido global...');
    const globalResponse = await fetch(`${STRAPI_URL}/api/global?populate=*`);
    const globalData = await globalResponse.json();
    
    console.log('📋 Contenido actual:', JSON.stringify(globalData, null, 2));

    // Verificar si existe contenido en español
    console.log('🔍 Verificando contenido en español...');
    const spanishResponse = await fetch(`${STRAPI_URL}/api/global?populate=*&locale=es`);
    const spanishData = await spanishResponse.json();
    
    console.log('🇪🇸 Contenido en español:', JSON.stringify(spanishData, null, 2));

    if (spanishData.data) {
      console.log('✅ ¡Contenido en español ya existe!');
    } else {
      console.log('❌ No existe contenido en español');
      console.log('📝 Necesitas crear manualmente el contenido en español en el admin panel');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
