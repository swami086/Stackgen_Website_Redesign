import type { Access } from 'payload'

/** Public reads published only; authenticated users see drafts too. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
