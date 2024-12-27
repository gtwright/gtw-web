import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  console.log('users', user)
  return {
    _status: {
      equals: 'published',
    },
  }
}
