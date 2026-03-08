# VMM – VendreMesMurs.fr

Plateforme premium de génération de leads pour propriétaires souhaitant vendre leurs murs commerciaux à Paris et en première couronne.

## Stack
- Next.js (App Router)
- Tailwind CSS
- Prisma + PostgreSQL (Supabase ou Neon)
- Nodemailer
- Vercel Blob (optionnel pour les uploads persistants)
- Zod

## Démarrage local
1. Installer les dépendances:
```bash
npm install
```

2. Copier les variables d'environnement:
```bash
cp .env.example .env
```

3. Renseigner les variables PostgreSQL et SMTP dans `.env`.

4. Générer le client Prisma et créer/appliquer les migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Lancer l'app:
```bash
npm run dev
```

## Variables d'environnement
- `DATABASE_URL` (pooling URL PostgreSQL)
- `DIRECT_URL` (URL directe PostgreSQL)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- `BLOB_READ_WRITE_TOKEN` (optionnel recommandé)

## PostgreSQL (Supabase / Neon)
### Option 1: Supabase
1. Créer un projet Supabase.
2. Récupérer l'URL PostgreSQL `pooler` pour `DATABASE_URL`.
3. Récupérer l'URL `direct connection` pour `DIRECT_URL`.
4. Vérifier que `sslmode=require` est présent.

### Option 2: Neon
1. Créer un projet Neon.
2. Récupérer l'URL `pooled` pour `DATABASE_URL`.
3. Récupérer l'URL `direct` pour `DIRECT_URL`.
4. Vérifier que `sslmode=require` est présent.

## Déploiement Vercel
1. Importer le repository dans Vercel.
2. Ajouter toutes les variables d'environnement.
3. Configurer `DATABASE_URL` et `DIRECT_URL` depuis Supabase ou Neon.
4. Optionnel: ajouter `BLOB_READ_WRITE_TOKEN` pour uploads persistants.
5. Le build utilise `vercel.json` avec:
```bash
npm run vercel-build
```
Ce script exécute:
```bash
prisma generate && prisma migrate deploy && next build
```

## Scripts utiles
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:migrate:deploy`
- `npm run vercel-build`
