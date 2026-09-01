import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || undefined
// ponytail: allow LB on :80 and :3002 without a second deploy variable
const publicOrigins = serverURL
  ? Array.from(
      new Set([
        serverURL,
        serverURL.includes(':3002')
          ? serverURL.replace(':3002', '')
          : `${serverURL.replace(/\/$/, '')}:3002`,
      ]),
    )
  : undefined

export default buildConfig({
  ...(publicOrigins
    ? { serverURL, cors: publicOrigins, csrf: publicOrigins }
    : {}),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
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
