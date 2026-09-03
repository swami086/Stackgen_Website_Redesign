import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'slug', defaultColumns: ['slug', 'hero-heading', '_status'] },
  access: { read: authenticatedOrPublished },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 100,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'hero-heading', type: 'text' },
    { name: 'hero-subhead', type: 'textarea' },
    { name: 'problem-heading', type: 'text' },
    { name: 'problem-body', type: 'textarea' },
    { name: 'final-cta-heading', type: 'text' },
    { name: 'final-cta-subhead', type: 'textarea' },
    { name: 'faq-heading', type: 'text' },
  ],
}
