#!/bin/bash

# Script para crear contenido global en español basado en el contenido inglés existente

echo "🚀 Creando contenido global en español..."

# Obtener el contenido en inglés
echo "📋 Obteniendo contenido en inglés..."
ENGLISH_CONTENT=$(curl -s "http://localhost:1337/api/global?locale=en&populate=*")

if echo "$ENGLISH_CONTENT" | grep -q '"data":null'; then
    echo "❌ No se encontró contenido en inglés. Necesitas crear contenido primero."
    exit 1
fi

echo "✅ Contenido en inglés encontrado"

# Crear contenido en español usando la API de Strapi
echo "🇪🇸 Creando contenido en español..."

# Crear el payload JSON para el contenido en español
cat > /tmp/spanish_global.json << 'EOF'
{
  "data": {
    "locale": "es",
    "seo": {
      "metaTitle": "LaunchPad - Lleva tu Contenido a la Órbita",
      "metaDescription": "LaunchPad es la solución definitiva para entregar contenido a velocidad warp. Explora cómo nuestra tecnología avanzada lanza tus activos digitales al espacio, asegurando que lleguen a tu audiencia más rápido y de manera más confiable.",
      "keywords": null,
      "metaRobots": null,
      "structuredData": null,
      "metaViewport": null,
      "canonicalURL": null
    },
    "navbar": {
      "logo": {
        "logoText": "LaunchPad",
        "logoUrl": "/"
      },
      "links": [
        {
          "url": "/",
          "newTab": false,
          "text": "Inicio"
        },
        {
          "url": "/blog",
          "newTab": false,
          "text": "Blog"
        },
        {
          "url": "/pricing",
          "newTab": false,
          "text": "Precios"
        },
        {
          "url": "/contact",
          "newTab": false,
          "text": "Contacto"
        }
      ],
      "button": {
        "url": "/contact",
        "newTab": false,
        "text": "Comenzar",
        "type": "primary"
      }
    },
    "footer": {
      "description": "LaunchPad es una plataforma de entrega rápida de contenido que te ayuda a entregar contenido a tus usuarios de manera rápida y eficiente.",
      "copyright": "Copyright © 2024 Strapi INC",
      "designed_developed_by": "Diseñado y Desarrollado por Strapi & Aceternity",
      "built_with": "construido con Strapi, Next.js, Tailwind CSS, Framer Motion, Aceternity UI, e icons8"
    }
  }
}
EOF

# Enviar el contenido a Strapi
echo "📤 Enviando contenido a Strapi..."
RESPONSE=$(curl -s -X POST "http://localhost:1337/api/global" \
  -H "Content-Type: application/json" \
  -d @/tmp/spanish_global.json)

if echo "$RESPONSE" | grep -q '"data"'; then
    echo "✅ ¡Contenido en español creado exitosamente!"
else
    echo "❌ Error creando contenido en español:"
    echo "$RESPONSE"
    
    # Intentar con PUT para actualizar
    echo "🔄 Intentando actualizar contenido existente..."
    PUT_RESPONSE=$(curl -s -X PUT "http://localhost:1337/api/global" \
      -H "Content-Type: application/json" \
      -d @/tmp/spanish_global.json)
    
    if echo "$PUT_RESPONSE" | grep -q '"data"'; then
        echo "✅ ¡Contenido en español actualizado exitosamente!"
    else
        echo "❌ Error actualizando contenido:"
        echo "$PUT_RESPONSE"
    fi
fi

# Limpiar archivo temporal
rm -f /tmp/spanish_global.json

# Verificar resultado
echo "🔍 Verificando contenido creado..."
VERIFICATION=$(curl -s "http://localhost:1337/api/global?locale=es&populate=*")

if echo "$VERIFICATION" | grep -q '"data".*"locale":"es"'; then
    echo "✅ ¡Verificación exitosa! El contenido en español está disponible."
    echo "🌐 Puedes visitar: http://localhost:3000/es"
else
    echo "⚠️  El contenido puede necesitar ser publicado manualmente:"
    echo "1. Ve a http://localhost:1337/admin"
    echo "2. Ve a Content Manager > Global"
    echo "3. Selecciona el contenido en español"
    echo "4. Haz clic en 'Publish'"
fi

echo "🎉 ¡Proceso completado!"
