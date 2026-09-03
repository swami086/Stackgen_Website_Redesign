import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Cards: CollectionConfig = {
  slug: 'cards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slot', 'product-slug', '_status'],
    hidden: true,
  },
  access: { read: authenticatedOrPublished },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 100,
  },
  fields: [
    { name: 'slot', type: 'text', required: true },
    { name: 'title', type: 'text' },
    { name: 'label', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'href', type: 'text' },
    { name: 'product-slug', type: 'text' },
  ],
}
