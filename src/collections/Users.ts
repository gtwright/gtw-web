import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: authenticated,
    update: authenticated,
    delete: authenticated,
    create: authenticated,
    admin: authenticated,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    { name: 'updatedAt', type: 'date', admin: { readOnly: true } },
  ],
}
