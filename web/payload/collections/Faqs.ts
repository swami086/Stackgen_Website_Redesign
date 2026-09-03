import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'product-slug', '_status'],
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
    { name: 'product-slug', type: 'text', required: true },
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea' },
  ],
}
