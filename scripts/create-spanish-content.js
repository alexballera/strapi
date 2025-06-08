const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Configuración de contenido en español
const spanishContent = {
  global: {
    navbar: {
      logo: {
        logoText: "LaunchPad",
        logoUrl: "/"
      },
      links: [
        { url: "/", newTab: false, text: "Inicio" },
        { url: "/blog", newTab: false, text: "Blog" },
        { url: "/pricing", newTab: false, text: "Precios" },
        { url: "/contact", newTab: false, text: "Contacto" }
      ],
      button: { url: "/contact", newTab: false, text: "Comenzar", type: "primary" }
    },
    footer: {
      footerLogo: {
        logoText: "LaunchPad",
        logoUrl: "/"
      },
      menuLinks: [
        {
          columnLinks: [
            { url: "/", newTab: false, text: "Inicio" },
            { url: "/blog", newTab: false, text: "Blog" },
            { url: "/pricing", newTab: false, text: "Precios" }
          ]
        }
      ],
      legalLinks: [
        { url: "/privacy", newTab: false, text: "Política de Privacidad" },
        { url: "/terms", newTab: false, text: "Términos de Servicio" }
      ],
      socialLinks: [
        { url: "https://twitter.com", newTab: true, text: "Twitter" },
        { url: "https://facebook.com", newTab: true, text: "Facebook" }
      ],
      categoryLinks: [
        { url: "/category/tech", newTab: false, text: "Tecnología" },
        { url: "/category/business", newTab: false, text: "Negocios" }
      ]
    },
    metadata: {
      metaTitle: "LaunchPad - Plataforma de Lanzamiento",
      metaDescription: "La mejor plataforma para lanzar tu proyecto"
    }
  }
};

async function checkStrapiConnection() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/global`);
    console.log('✅ Conexión con Strapi establecida');
    return true;
  } catch (error) {
    console.error('❌ No se puede conectar con Strapi:', error.message);
    return false;
  }
}

async function getExistingGlobalContent() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/global?populate=*&locale=en`);
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo contenido global:', error.message);
    return null;
  }
}

async function createSpanishLocalization(englishContent) {
  try {
    console.log('🔧 Creando localización en español...');
    
    // Crear versión en español basada en el contenido inglés
    const spanishData = {
      ...englishContent.attributes,
      ...spanishContent.global,
      locale: 'es',
      localizations: [englishContent.id] // Referenciar el contenido en inglés
    };

    // Intentar crear la localización usando POST
    const response = await axios.post(
      `${STRAPI_URL}/api/global`,
      { data: spanishData },
      {
        headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}
      }
    );

    console.log('✅ Localización en español creada exitosamente');
    return response.data;
  } catch (error) {
    console.error('❌ Error creando localización en español:', error.response?.data || error.message);
    
    // Si falla, intentar con PUT (actualización)
    try {
      console.log('🔄 Intentando actualizar localización existente...');
      const putResponse = await axios.put(
        `${STRAPI_URL}/api/global`,
        { data: { ...spanishContent.global, locale: 'es' } },
        {
          headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}
        }
      );
      console.log('✅ Localización en español actualizada');
      return putResponse.data;
    } catch (putError) {
      console.error('❌ Error en actualización:', putError.response?.data || putError.message);
      return null;
    }
  }
}

async function verifySpanishContent() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/global?populate=*&locale=es`);
    if (response.data.data) {
      console.log('✅ Contenido en español verificado');
      return true;
    }
  } catch (error) {
    console.log('❌ No se encontró contenido en español');
  }
  return false;
}

async function main() {
  console.log('🚀 Iniciando configuración automática de contenido en español...');

  // Verificar conexión
  if (!(await checkStrapiConnection())) {
    console.log('\n📋 Para iniciar Strapi:');
    console.log('cd /home/alexballera/proyectos/strapi/strapi && npm run develop');
    return;
  }

  // Verificar si ya existe contenido en español
  if (await verifySpanishContent()) {
    console.log('✅ El contenido en español ya existe');
    return;
  }

  // Obtener contenido en inglés como base
  const englishContent = await getExistingGlobalContent();
  if (!englishContent) {
    console.error('❌ No se encontró contenido global en inglés');
    return;
  }

  console.log('📋 Contenido en inglés encontrado:', englishContent.attributes);

  // Crear localización en español
  await createSpanishLocalization(englishContent);

  // Verificar resultado
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
  const success = await verifySpanishContent();
  
  if (success) {
    console.log('\n🎉 ¡Configuración completada exitosamente!');
    console.log('El sitio ahora debería funcionar correctamente en español.');
    console.log('\n🌐 Visita: http://localhost:3000/es');
  } else {
    console.log('\n⚠️  Configuración manual requerida:');
    console.log('1. Ve a http://localhost:1337/admin');
    console.log('2. Ve a Content Manager > Global');
    console.log('3. Crea una nueva entrada para español');
    console.log('4. Copia el contenido sugerido de arriba');
    console.log('5. Publica el contenido');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createSpanishLocalization, spanishContent };
