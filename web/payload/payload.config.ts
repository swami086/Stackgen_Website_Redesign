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
// Same origin as the marketing site — admin lives at /admin on this Next app.
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || undefined

export default buildConfig({
  ...(serverURL ? { serverURL, cors: [serverURL], csrf: [serverURL] } : {}),
  admin: {
    user: Users.slug,
    importMap: {
      // web/ root — importMap lives under app/(payload)/admin
      baseDir: path.resolve(dirname, '..'),
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
