import type { CollectionConfig } from 'payload'

export const Cards: CollectionConfig = {
  slug: 'cards',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slot', 'product-slug'], hidden: true },
  access: { read: () => true },
  fields: [
    { name: 'slot', type: 'text', required: true },
    { name: 'title', type: 'text' },
    { name: 'label', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'href', type: 'text' },
    { name: 'product-slug', type: 'text' },
  ],
}
