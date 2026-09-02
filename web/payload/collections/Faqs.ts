import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'product-slug'], hidden: true },
  access: { read: () => true },
  fields: [
    { name: 'product-slug', type: 'text', required: true },
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea' },
  ],
}
