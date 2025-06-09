# Spanish Localization System

This project includes a complete Spanish localization system for the Strapi CMS and Next.js frontend.

## 🌐 Available Locales

- **English**: `/en` (default)
- **Spanish**: `/es`

## 🚀 Quick Start

### Development Servers

```bash
# Start both Strapi and Next.js
npm run dev

# Or start individually
npm run strapi    # Strapi CMS on http://localhost:1337
npm run next      # Next.js on http://localhost:3000
```

### Access URLs

- **English Site**: http://localhost:3000/en
- **Spanish Site**: http://localhost:3000/es  
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

## 📋 Spanish Content Management

### Create Spanish Content

```bash
# Create all Spanish translations from English content
npm run create:spanish
```

### Check Spanish Content Status

```bash
# Verify Spanish content exists and get statistics
npm run check:spanish
```

### Backup/Restore Spanish Content

```bash
# Export Spanish content to backup file
npm run export

# Import Spanish content from backup file
npm run seed
```

## 📁 Key Files

### Scripts
- `scripts/create-complete-spanish-content.js` - Creates Spanish translations
- `scripts/check-spanish-content.js` - Verifies Spanish content status
- `scripts/copy-env.mts` - Environment setup utility
- `scripts/translate-strapi-admin.ts` - Admin interface translations

### Backup
- `strapi/data/spanish_content_backup.tar.gz` - Complete Spanish content backup

### Configuration
- `package.json` - Contains Spanish localization scripts
- `next/i18n.config.ts` - Next.js internationalization config
- `next/middleware.ts` - Locale routing middleware

## 🔧 Technical Details

### Content Types Localized
- **Products** - Names, descriptions, slugs, perks
- **Categories** - Category names and slugs  
- **Plans** - Plan names, pricing text, features
- **Dynamic Components** - UI text and headings

### Translation Features
- Automatic slug generation with `-es` suffix
- Comprehensive product descriptions in Spanish
- Localized pricing and feature text
- Properly linked content relationships
- Dynamic zone component translations

### API Usage
```bash
# Get Spanish products
curl http://localhost:1337/api/products?locale=es

# Get English products (default)
curl http://localhost:1337/api/products?locale=en
```

## 🛠️ Troubleshooting

### Servers Not Running
```bash
# Restart Strapi
cd strapi && npm run develop

# Restart Next.js  
cd next && npm run dev
```

### Missing Spanish Content
```bash
# Recreate all Spanish content
npm run create:spanish

# Check what content exists
npm run check:spanish
```

### Reset Spanish Content
```bash
# Delete and recreate Spanish content
npm run create:spanish
```

## 📊 Spanish Translations

The system includes comprehensive Spanish translations for:

- **Product Names**: "Content Rocket Booster" → "Potenciador de Cohete de Contenido"
- **Descriptions**: Full Spanish descriptions for all products
- **Categories**: "rocket" → "cohete", "analytics" → "análisis"
- **Plans**: "Pro Rocket" → "Cohete Pro", "Starter Shuttle" → "Lanzadera Inicial"
- **Features**: All product perks and plan features in Spanish
- **UI Components**: Related products, CTAs, and dynamic content

## 🎯 Production Deployment

Before deploying:

1. Export Spanish content: `npm run export`
2. Test both locales: `/en` and `/es`
3. Verify admin translations in Strapi
4. Include backup file in deployment

The Spanish localization system is production-ready and includes automated content management tools.
