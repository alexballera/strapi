import axios from 'axios';

const STRAPI_URL = 'http://localhost:1337';

async function testSpanishContent() {
  console.log('🔍 Testing Spanish content...');
  
  try {
    console.log('🔌 Connecting to Strapi at:', STRAPI_URL);
    
    // Check products in Spanish
    console.log('📦 Checking products...');
    const productsResponse = await axios.get(`${STRAPI_URL}/api/products?locale=es`);
    console.log(`📊 Spanish products: ${productsResponse.data.data.length}`);
    
    // Check categories in Spanish  
    console.log('📂 Checking categories...');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/categories?locale=es`);
    console.log(`📊 Spanish categories: ${categoriesResponse.data.data.length}`);
    
    // Check plans in Spanish
    console.log('📋 Checking plans...');
    const plansResponse = await axios.get(`${STRAPI_URL}/api/plans?locale=es`);
    console.log(`📊 Spanish plans: ${plansResponse.data.data.length}`);
    
    if (productsResponse.data.data.length > 0) {
      console.log('✅ Spanish content already exists!');
      console.log('🌐 Visit: http://localhost:3000/es');
      console.log('🔧 Admin: http://localhost:1337/admin');
    } else {
      console.log('❌ No Spanish content found. Creation needed.');
    }
    
  } catch (error) {
    console.error('❌ Error checking Spanish content:', error.message);
  }
}

testSpanishContent();
