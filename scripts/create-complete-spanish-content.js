import axios from 'axios';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Traducciones para productos
const productTranslations = {
  "Content Rocket Booster": "Potenciador de Cohete de Contenido",
  "Analytics Insight Pack": "Paquete de Análisis Avanzado",
  "Enterprise Integration Kit": "Kit de Integración Empresarial",
  "Mission Control Plus": "Control de Misión Plus",
  "Payload Manager Pro": "Gestor de Carga Útil Pro"
};

const descriptionTranslations = {
  "Enhance the speed and performance of your content delivery with our Rocket Booster. Perfect for high-traffic websites needing rapid deployment.": 
    "Mejora la velocidad y el rendimiento de tu entrega de contenido con nuestro Potenciador de Cohete. Perfecto para sitios web de alto tráfico que necesitan despliegue rápido.",
  
  "Gain deeper insights into your content performance with the Analytics Insight Pack. Provides comprehensive analytics and reporting features.":
    "Obtén información más profunda sobre el rendimiento de tu contenido con el Paquete de Análisis Avanzado. Proporciona características completas de análisis y reportes.",
    
  "Seamlessly integrate LaunchPad with your existing enterprise systems using the Enterprise Integration Kit. Designed for large organizations with complex needs.":
    "Integra perfectamente LaunchPad con tus sistemas empresariales existentes usando el Kit de Integración Empresarial. Diseñado para organizaciones grandes con necesidades complejas.",
    
  "Upgrade your control center with Mission Control Plus. Offers enhanced monitoring and management features for your content launches.":
    "Actualiza tu centro de control con Control de Misión Plus. Ofrece características mejoradas de monitoreo y gestión para tus lanzamientos de contenido.",
    
  "Streamline your content organization and management with the Payload Manager Pro. Ideal for teams handling large volumes of content.":
    "Optimiza la organización y gestión de tu contenido con el Gestor de Carga Útil Pro. Ideal para equipos que manejan grandes volúmenes de contenido."
};

const perksTranslations = {
  "Increases delivery speed by 50%": "Aumenta la velocidad de entrega en un 50%",
  "Optimized for heavy content loads": "Optimizado para cargas de contenido pesadas",
  "Easy integration with existing payloads": "Fácil integración con cargas útiles existentes",
  "Detailed performance reports": "Reportes detallados de rendimiento",
  "Customizable analytics dashboard": "Panel de análisis personalizable",
  "Integration with third-party analytics tools": "Integración con herramientas de análisis de terceros",
  "Customizable integration options": "Opciones de integración personalizables",
  "Support for multiple platforms and services": "Soporte para múltiples plataformas y servicios",
  "Dedicated integration support": "Soporte de integración dedicado",
  "Advanced monitoring tools": "Herramientas de monitoreo avanzadas",
  "Real-time status updates": "Actualizaciones de estado en tiempo real",
  "Automated alerts and notifications": "Alertas y notificaciones automatizadas",
  "Advanced content organization tools": "Herramientas avanzadas de organización de contenido",
  "Collaborative workspace": "Espacio de trabajo colaborativo",
  "Real-time updates and tracking": "Actualizaciones y seguimiento en tiempo real"
};

const categoryTranslations = {
  "booster": "potenciador",
  "rocket": "cohete",
  "dashboard": "panel",
  "analytics": "análisis",
  "integration": "integración",
  "software": "software"
};

const componentTranslations = {
  "Related Products": "Productos Relacionados",
  "You might be interested by these products": "Te pueden interesar estos productos",
  "Recently rose to popularity": "Recientemente ganaron popularidad"
};

const planTranslations = {
  "Pro Rocket": "Cohete Pro",
  "Starter Shuttle": "Lanzadera Inicial",
  "Team Explorer": "Explorador de Equipo",
  "Enterprise Shuttle": "Lanzadera Empresarial"
};

const planPerkTranslations = {
  "Launch up to 100,000 content items": "Lanza hasta 100,000 elementos de contenido",
  "Advanced Mission Control Dashboard": "Panel de Control de Misión Avanzado",
  "High Speed Delivery": "Entrega de Alta Velocidad",
  "Advanced analytics": "Análisis avanzados",
  "Priority Support": "Soporte Prioritario",
  "Everything included from Starter Shuttle": "Todo incluido de Lanzadera Inicial",
  "Launch up to 1,000 content items": "Lanza hasta 1,000 elementos de contenido",
  "Basic Mission Control Dashboard": "Panel de Control de Misión Básico",
  "Standard Delivery": "Entrega Estándar",
  "Basic analytics": "Análisis básicos",
  "Launch up to 1,000,000 content items": "Lanza hasta 1,000,000 elementos de contenido",
  "Collaborative Mission Control Dashboard": "Panel de Control de Misión Colaborativo",
  "High-Speed Delivery": "Entrega de Alta Velocidad",
  "Advanced analytics and reporting": "Análisis avanzados y reportes",
  "Team collaboration tools": "Herramientas de colaboración en equipo",
  "Everything included from Pro Rocket": "Todo incluido de Cohete Pro",
  "Unlimited content items per launch": "Elementos de contenido ilimitados por lanzamiento",
  "Customizable Mission Control Dashboard": "Panel de Control de Misión Personalizable",
  "Ultra-Speed Delivery": "Entrega Ultra Rápida",
  "Comprehensive analytics and reporting": "Análisis y reportes comprensivos",
  "Dedicated Support Team": "Equipo de Soporte Dedicado",
  "Custom Integrations and Solutions": "Integraciones y Soluciones Personalizadas",
  "Everything included from Team Explorer": "Todo incluido de Explorador de Equipo"
};

async function checkStrapiConnection() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/products`);
    console.log('✅ Conexión con Strapi establecida');
    return true;
  } catch (error) {
    console.error('❌ No se puede conectar con Strapi:', error.message);
    return false;
  }
}

async function getAllProducts() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/products?locale=all&populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo productos:', error.message);
    return [];
  }
}

async function getAllCategories() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/categories?locale=all&populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo categorías:', error.message);
    return [];
  }
}

async function getAllPlans() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/plans?locale=all&populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo planes:', error.message);
    return [];
  }
}

function translateText(text, translationMap) {
  return translationMap[text] || text;
}

function translatePerks(perks) {
  return perks.map(perk => ({
    ...perk,
    text: translateText(perk.text, perksTranslations)
  }));
}

function translateDynamicZone(dynamicZone) {
  return dynamicZone.map(component => {
    if (component.__component === 'dynamic-zone.related-products') {
      return {
        ...component,
        heading: translateText(component.heading, componentTranslations),
        sub_heading: translateText(component.sub_heading, componentTranslations)
      };
    }
    return component;
  });
}

async function createSpanishCategory(englishCategory) {
  try {
    console.log(`🔧 Creando categoría en español: ${englishCategory.name}`);
    
    const spanishData = {
      name: translateText(englishCategory.name, categoryTranslations),
      locale: 'es',
      localizations: [englishCategory.id]
    };

    const response = await axios.post(
      `${STRAPI_URL}/api/categories`,
      { data: spanishData },
      {
        headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}
      }
    );

    console.log(`✅ Categoría creada: ${englishCategory.name} → ${spanishData.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creando categoría ${englishCategory.name}:`, error.response?.data || error.message);
    return null;
  }
}

async function createSpanishPlan(englishPlan) {
  try {
    console.log(`🔧 Creando plan en español: ${englishPlan.name}`);
    
    const spanishData = {
      name: translateText(englishPlan.name, planTranslations),
      price: englishPlan.price,
      sub_text: englishPlan.sub_text === 'launch' ? 'lanzamiento' : englishPlan.sub_text,
      featured: englishPlan.featured,
      locale: 'es',
      localizations: [englishPlan.id]
    };

    // Traducir CTA si existe
    if (englishPlan.CTA) {
      spanishData.CTA = {
        ...englishPlan.CTA,
        text: englishPlan.CTA.text === 'Get Started' ? 'Comenzar' : 
              englishPlan.CTA.text === 'Contact us' ? 'Contáctanos' : englishPlan.CTA.text
      };
    }

    // Traducir perks si existen
    if (englishPlan.perks) {
      spanishData.perks = translatePerks(englishPlan.perks);
    }

    // Traducir additional_perks si existen
    if (englishPlan.additional_perks) {
      spanishData.additional_perks = translatePerks(englishPlan.additional_perks);
    }

    const response = await axios.post(
      `${STRAPI_URL}/api/plans`,
      { data: spanishData },
      {
        headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}
      }
    );

    console.log(`✅ Plan creado: ${englishPlan.name} → ${spanishData.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creando plan ${englishPlan.name}:`, error.response?.data || error.message);
    return null;
  }
}

async function createSpanishProduct(englishProduct) {
  try {
    console.log(`🔧 Creando producto en español: ${englishProduct.name}`);
    
    const spanishData = {
      name: translateText(englishProduct.name, productTranslations),
      price: englishProduct.price,
      description: translateText(englishProduct.description, descriptionTranslations),
      slug: englishProduct.slug + '-es',
      featured: englishProduct.featured,
      locale: 'es',
      localizations: [englishProduct.id]
    };

    // Mantener las mismas imágenes
    if (englishProduct.images) {
      spanishData.images = englishProduct.images.map(img => img.id);
    }

    // Traducir perks
    if (englishProduct.perks) {
      spanishData.perks = translatePerks(englishProduct.perks);
    }

    // Mantener referencias a planes (se traducirán por separado)
    if (englishProduct.plans) {
      spanishData.plans = englishProduct.plans.map(plan => plan.id);
    }

    // Mantener referencias a categorías (se traducirán por separado)
    if (englishProduct.categories) {
      spanishData.categories = englishProduct.categories.map(cat => cat.id);
    }

    // Traducir dynamic zone
    if (englishProduct.dynamic_zone) {
      spanishData.dynamic_zone = translateDynamicZone(englishProduct.dynamic_zone);
    }

    const response = await axios.post(
      `${STRAPI_URL}/api/products`,
      { data: spanishData },
      {
        headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}
      }
    );

    console.log(`✅ Producto creado: ${englishProduct.name} → ${spanishData.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creando producto ${englishProduct.name}:`, error.response?.data || error.message);
    return null;
  }
}

async function checkSpanishContent() {
  try {
    const productsResponse = await axios.get(`${STRAPI_URL}/api/products?locale=es`);
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/categories?locale=es`);
    const plansResponse = await axios.get(`${STRAPI_URL}/api/plans?locale=es`);
    
    return {
      products: productsResponse.data.data.length,
      categories: categoriesResponse.data.data.length,
      plans: plansResponse.data.data.length
    };
  } catch (error) {
    console.log('❌ Error verificando contenido en español');
    return { products: 0, categories: 0, plans: 0 };
  }
}

async function main() {
  console.log('🚀 Iniciando creación de contenido completo en español...');

  // Verificar conexión
  if (!(await checkStrapiConnection())) {
    console.log('\n📋 Para iniciar Strapi:');
    console.log('cd /home/alexballera/proyectos/strapi/strapi && npm run develop');
    return;
  }

  // Verificar contenido existente en español
  const existingSpanish = await checkSpanishContent();
  console.log(`📊 Contenido existente en español:`);
  console.log(`   • Productos: ${existingSpanish.products}`);
  console.log(`   • Categorías: ${existingSpanish.categories}`);
  console.log(`   • Planes: ${existingSpanish.plans}`);

  // Obtener contenido en inglés
  console.log('\n📋 Obteniendo contenido en inglés...');
  const englishProducts = await getAllProducts();
  const englishCategories = await getAllCategories();
  const englishPlans = await getAllPlans();

  console.log(`📊 Contenido en inglés encontrado:`);
  console.log(`   • Productos: ${englishProducts.length}`);
  console.log(`   • Categorías: ${englishCategories.length}`);
  console.log(`   • Planes: ${englishPlans.length}`);

  // Crear categorías en español
  console.log('\n🏷️ Creando categorías en español...');
  for (const category of englishCategories) {
    await createSpanishCategory(category);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pausa entre requests
  }

  // Crear planes en español
  console.log('\n📋 Creando planes en español...');
  for (const plan of englishPlans) {
    await createSpanishPlan(plan);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pausa entre requests
  }

  // Crear productos en español
  console.log('\n🎯 Creando productos en español...');
  for (const product of englishProducts) {
    await createSpanishProduct(product);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pausa entre requests
  }

  // Verificar resultado final
  console.log('\n🔍 Verificando contenido final...');
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
  
  const finalSpanish = await checkSpanishContent();
  console.log(`📊 Contenido final en español:`);
  console.log(`   • Productos: ${finalSpanish.products}`);
  console.log(`   • Categorías: ${finalSpanish.categories}`);
  console.log(`   • Planes: ${finalSpanish.plans}`);

  if (finalSpanish.products > 0) {
    console.log('\n🎉 ¡Contenido en español creado exitosamente!');
    console.log('El sitio ahora debería funcionar correctamente en español.');
    console.log('\n🌐 Visita: http://localhost:3000/es');
    console.log('🔧 Admin: http://localhost:1337/admin');
  } else {
    console.log('\n⚠️  Algunos elementos no se pudieron crear. Revisa los errores arriba.');
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch(console.error);
}

export { 
  createSpanishProduct, 
  createSpanishCategory, 
  createSpanishPlan,
  productTranslations,
  descriptionTranslations
};
