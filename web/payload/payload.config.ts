import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { createPuckPlugin } from '@delmaredigital/payload-puck/plugin'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Cards } from './collections/Cards'
import { Faqs } from './collections/Faqs'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { migrations } from './migrations'
import { isProductSlug } from '../lib/products'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// Remote admin requires absolute URL — never localhost in production.
const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  undefined

export default buildConfig({
  // serverURL: absolute links in admin (emails, OG, redirects).
  // cors: allow the public origin for API fetches that send Origin.
  // Do NOT set csrf here for same-origin embedded admin. Payload's
  // extractJWT rejects cookies when csrf is non-empty AND Origin is
  // missing AND Sec-Fetch-Site is absent — which is exactly what
  // document navigations to /admin look like over plain HTTP IP, so
  // login succeeds then /admin immediately bounces back to /admin/login.
  ...(serverURL ? { serverURL, cors: [serverURL] } : {}),
  admin: {
    user: Users.slug,
    importMap: {
      // web/ root — importMap lives under app/(payload)/admin
      baseDir: path.resolve(dirname, '..'),
    },
    components: {
      providers: ['@/components/admin/PuckProvider'],
    },
    // Live Preview for pages, products, posts, and home global.
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const base = serverURL || ''
        if (globalConfig?.slug === 'home') return `${base}/`
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        if (collectionConfig?.slug === 'pages' && slug) {
          const doc = data as { isHomepage?: boolean }
          if (doc.isHomepage) return `${base}/`
          if (slug === 'puck-demo') return `${base}/puck-demo`
          if (isProductSlug(slug)) return `${base}/product/${slug}`
          // Blog post slugs are long SEO paths; product slugs are fixed four.
          if (slug.includes('-') && slug.length > 24) return `${base}/blog/${slug}`
          return `${base}/${slug}`
        }
        if (collectionConfig?.slug === 'products' && slug) {
          return `${base}/product/${slug}`
        }
        if (collectionConfig?.slug === 'posts' && slug) {
          return `${base}/blog/${slug}`
        }
        return base || '/'
      },
      collections: ['pages', 'products', 'posts'],
      globals: ['home'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1194 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Cards, Posts, Products, Faqs],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    createPuckPlugin({
      pagesCollection: 'pages',
      editorStylesheets: ['/puck-editor-styles.css'],
      previewUrl: (page) => `/${page.slug || ''}`,
    }),
  ],
})
