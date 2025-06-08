#!/usr/bin/env node
/**
 * Script para traducir la interfaz administrativa de Strapi al español
 * Modifica los displayName, pluralName y otros textos de la estructura
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as tar from 'tar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Traducciones para la interfaz administrativa
const ADMIN_TRANSLATIONS = {
  // Collection Types
  "Articles": "Artículos",
  "Categories": "Categorías", 
  "FAQ": "Preguntas Frecuentes",
  "Plans": "Planes",
  "Products": "Productos",
  "Pages": "Páginas",
  "Testimonials": "Testimonios",
  "Logos": "Logotipos",
  
  // Plurales
  "articles": "artículos",
  "categories": "categorías",
  "faqs": "preguntas-frecuentes",
  "plans": "planes", 
  "products": "productos",
  "pages": "páginas",
  "testimonials": "testimonios",
  "logos": "logotipos",
  
  // Singulares
  "article": "artículo",
  "category": "categoría",
  "faq": "pregunta-frecuente",
  "plan": "plan",
  "product": "producto", 
  "page": "página",
  "testimonial": "testimonio",
  "logo": "logotipo",
  
  // Single Types
  "Global": "Global",
  "Blog": "Blog",
  
  // Campos comunes
  "Title": "Título",
  "Description": "Descripción",
  "Content": "Contenido",
  "Name": "Nombre",
  "Image": "Imagen",
  "Slug": "Slug",
  "SEO": "SEO",
  "Dynamic Zone": "Zona Dinámica",
  "Published": "Publicado",
  "Created": "Creado",
  "Updated": "Actualizado",
  
  // Componentes Dynamic Zone
  "Hero": "Héroe",
  "Features": "Características", 
  "How it works": "Cómo funciona",
  "Brands": "Marcas",
  "Pricing": "Precios",
  "Launches": "Lanzamientos",
  "CTA": "Llamada a la Acción",
  "Form next to section": "Formulario al lado de sección",
  "Related Articles": "Artículos Relacionados",
  "Related Products": "Productos Relacionados",
  
  // Tipos de componentes
  "sections.hero": "secciones.heroe",
  "sections.features": "secciones.caracteristicas",
  "sections.testimonials": "secciones.testimonios",
  "sections.how-it-works": "secciones.como-funciona",
  "sections.brands": "secciones.marcas",
  "sections.pricing": "secciones.precios",
  "sections.launches": "secciones.lanzamientos",
  "sections.cta": "secciones.cta",
  "sections.form-next-to-section": "secciones.formulario-junto-a-seccion",
  "sections.related-articles": "secciones.articulos-relacionados",
  "sections.related-products": "secciones.productos-relacionados",
  
  // Otros
  "File": "Archivo",
  "Folder": "Carpeta",
  "User": "Usuario",
  "Permission": "Permiso",
  "Role": "Rol",
  "Token": "Token",
  "Locale": "Idioma",
  "Transfer": "Transferencia",
  "Workflow": "Flujo de trabajo",
  "Stage": "Etapa",
  "Release": "Versión",
  "Action": "Acción"
} as const;

interface StrapiSchema {
  info?: {
    displayName?: string;
    pluralName?: string;
    singularName?: string;
    description?: string;
  };
  attributes?: Record<string, any>;
}

interface StrapiEntity {
  type?: string;
  data?: {
    schema?: StrapiSchema;
    uid?: string;
  };
}

interface StrapiMetadata {
  metadata?: {
    contentTypes?: Record<string, { schema?: StrapiSchema }>;
    components?: Record<string, { schema?: StrapiSchema }>;
  };
}

async function translateAdminStructure(exportPath: string, outputPath: string): Promise<boolean> {
  console.log("🔄 Extrayendo archivo de exportación...");
  
  const tempDir = path.join(process.cwd(), 'temp_strapi_admin');
  
  try {
    // Crear directorio temporal
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });
    
    // Extraer el archivo tar.gz
    await tar.extract({
      file: exportPath,
      cwd: tempDir
    });
    
    // Buscar archivos necesarios
    let metadataFile: string | null = null;
    let entitiesFile: string | null = null;
    
    const findFiles = (dir: string) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findFiles(fullPath);
        } else {
          if (file.startsWith('metadata') && file.endsWith('.json')) {
            metadataFile = fullPath;
          } else if (file.startsWith('entities') && file.endsWith('.jsonl')) {
            entitiesFile = fullPath;
          }
        }
      }
    };
    
    findFiles(tempDir);
    
    if (!metadataFile) {
      console.log("❌ No se encontró archivo de metadatos");
      return false;
    }
    
    if (!entitiesFile) {
      console.log("❌ No se encontró archivo de entidades");
      return false;
    }
    
    // Leer y modificar metadatos
    console.log("📝 Traduciendo metadatos...");
    const metadataContent = fs.readFileSync(metadataFile, 'utf-8');
    const metadata: StrapiMetadata = JSON.parse(metadataContent);
    
    let translatedCount = 0;
    
    // Traducir content-types en metadatos
    if (metadata.metadata?.contentTypes) {
      for (const [key, contentType] of Object.entries(metadata.metadata.contentTypes)) {
        if (contentType.schema?.info) {
          const info = contentType.schema.info;
          
          // Traducir displayName
          if (info.displayName && ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS]) {
            const original = info.displayName;
            info.displayName = ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS];
            console.log(`  ✅ ${original} → ${info.displayName}`);
            translatedCount++;
          }
          
          // Traducir pluralName
          if (info.pluralName && ADMIN_TRANSLATIONS[info.pluralName as keyof typeof ADMIN_TRANSLATIONS]) {
            info.pluralName = ADMIN_TRANSLATIONS[info.pluralName as keyof typeof ADMIN_TRANSLATIONS];
          }
          
          // Traducir singularName
          if (info.singularName && ADMIN_TRANSLATIONS[info.singularName as keyof typeof ADMIN_TRANSLATIONS]) {
            info.singularName = ADMIN_TRANSLATIONS[info.singularName as keyof typeof ADMIN_TRANSLATIONS];
          }
        }
      }
    }
    
    // Traducir componentes en metadatos
    if (metadata.metadata?.components) {
      for (const [key, component] of Object.entries(metadata.metadata.components)) {
        if (component.schema?.info?.displayName) {
          const original = component.schema.info.displayName;
          if (ADMIN_TRANSLATIONS[original as keyof typeof ADMIN_TRANSLATIONS]) {
            component.schema.info.displayName = ADMIN_TRANSLATIONS[original as keyof typeof ADMIN_TRANSLATIONS];
            console.log(`  ✅ Componente: ${original} → ${component.schema.info.displayName}`);
            translatedCount++;
          }
        }
      }
    }
    
    // Guardar metadatos modificados
    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
    
    // Procesar entidades
    console.log("📝 Procesando entidades...");
    
    const entitiesContent = fs.readFileSync(entitiesFile, 'utf-8');
    const lines = entitiesContent.split('\n');
    const updatedLines: string[] = [];
    
    let entitiesCount = 0;
    let entityTranslatedCount = 0;
    
    for (const line of lines) {
      if (line.trim()) {
        try {
          const entity: StrapiEntity = JSON.parse(line);
          entitiesCount++;
          
          let entityModified = false;
          
          // Traducir content-types
          if (entity.type === 'strapi::content-types' && entity.data?.schema?.info) {
            const info = entity.data.schema.info;
            
            if (info.displayName && ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS]) {
              const original = info.displayName;
              info.displayName = ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS];
              console.log(`  ✅ Entidad: ${original} → ${info.displayName}`);
              entityModified = true;
            }
            
            if (info.pluralName && ADMIN_TRANSLATIONS[info.pluralName as keyof typeof ADMIN_TRANSLATIONS]) {
              info.pluralName = ADMIN_TRANSLATIONS[info.pluralName as keyof typeof ADMIN_TRANSLATIONS];
              entityModified = true;
            }
            
            if (info.singularName && ADMIN_TRANSLATIONS[info.singularName as keyof typeof ADMIN_TRANSLATIONS]) {
              info.singularName = ADMIN_TRANSLATIONS[info.singularName as keyof typeof ADMIN_TRANSLATIONS];
              entityModified = true;
            }
          }
          
          // Traducir componentes
          else if (entity.type === 'strapi::components' && entity.data?.schema?.info) {
            const info = entity.data.schema.info;
            
            if (info.displayName && ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS]) {
              const original = info.displayName;
              info.displayName = ADMIN_TRANSLATIONS[info.displayName as keyof typeof ADMIN_TRANSLATIONS];
              console.log(`  ✅ Componente entidad: ${original} → ${info.displayName}`);
              entityModified = true;
            }
          }
          
          if (entityModified) {
            entityTranslatedCount++;
          }
          
          updatedLines.push(JSON.stringify(entity));
        } catch (error) {
          // Mantener líneas que no son JSON válido
          updatedLines.push(line);
        }
      } else {
        updatedLines.push(line);
      }
    }
    
    // Escribir entidades actualizadas
    fs.writeFileSync(entitiesFile, updatedLines.join('\n'));
    
    console.log(`📊 Procesadas ${entitiesCount} entidades, ${entityTranslatedCount} traducciones aplicadas`);
    
    // Crear nuevo archivo tar.gz
    console.log("📦 Creando nuevo archivo de exportación...");
    
    await tar.create(
      {
        gzip: true,
        file: outputPath,
        cwd: tempDir
      },
      ['.']
    );
    
    console.log(`✅ Archivo traducido creado: ${outputPath}`);
    return true;
    
  } catch (error) {
    console.error("❌ Error durante la traducción:", error);
    return false;
  } finally {
    // Limpiar directorio temporal
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  }
}

async function updatePackageJsonSeed(newExportFile: string) {
  const packageJsonPath = path.join(__dirname, '../strapi/package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const fileName = path.basename(newExportFile);
    
    // Actualizar el script seed
    packageJson.scripts.seed = `yarn strapi import -f ./data/${fileName} --force`;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`📦 package.json actualizado para usar: ${fileName}`);
  }
}

async function main() {
  // Rutas de archivos
  const translatedExport = path.join(__dirname, '../strapi/data/export_spanish_admin.tar.gz');
  
  console.log("🌐 TRADUCTOR DE INTERFAZ ADMINISTRATIVA DE STRAPI");
  console.log("=".repeat(60));
  console.log(`📦 Archivo traducido existente: ${translatedExport}`);
  console.log();
  
  if (!fs.existsSync(translatedExport)) {
    console.log(`❌ Error: No se encuentra el archivo traducido ${translatedExport}`);
    console.log(`💡 Este script requiere un archivo de exportación original para traducir.`);
        console.log(`💡 Este script requiere un archivo de exportación original para traducir.`);
    console.log(`   Si necesitas traducir un nuevo archivo, modifica la variable 'originalExport' en el código.`);
    process.exit(1);
  }
  
  console.log("✅ El archivo traducido ya existe y está listo para usar.");
  console.log();
  console.log("📋 PARA USAR EL ARCHIVO TRADUCIDO:");
  console.log("   cd strapi && yarn seed");
  console.log();
  console.log("🔧 TRADUCCIONES INCLUIDAS:");
  console.log("   • Articles → Artículos");
  console.log("   • Categories → Categorías"); 
  console.log("   • FAQ → Preguntas Frecuentes");
  console.log("   • Products → Productos");
    console.log("   • Componentes Dynamic Zone traducidos");
  console.log("   • Y muchos más...");
  console.log();
  console.log("💡 Para traducir un nuevo archivo, modifica la función main() con las rutas correctas.");
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
