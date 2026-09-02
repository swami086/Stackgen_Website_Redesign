import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
    // Live Preview for all CMS-editable page content. Cards/Faqs preview on
    // their parent home or product page (no dedicated route).
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const base = serverURL || ''
        if (globalConfig?.slug === 'home') return `${base}/`
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        const productSlug =
          typeof data?.['product-slug'] === 'string' ? data['product-slug'] : ''
        if (collectionConfig?.slug === 'products' && slug) {
          return `${base}/product/${slug}`
        }
        if (collectionConfig?.slug === 'posts' && slug) {
          return `${base}/blog/${slug}`
        }
        if (collectionConfig?.slug === 'cards') {
          return productSlug ? `${base}/product/${productSlug}` : `${base}/`
        }
        if (collectionConfig?.slug === 'faqs' && productSlug) {
          return `${base}/product/${productSlug}`
        }
        return base || '/'
      },
      collections: ['products', 'posts', 'cards', 'faqs'],
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
  plugins: [],
})
