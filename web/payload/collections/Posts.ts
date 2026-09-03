import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', '_status'] },
  access: { read: authenticatedOrPublished },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 100,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'name', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'textarea' },
    { name: 'published-on-2', type: 'date' },
  ],
}
