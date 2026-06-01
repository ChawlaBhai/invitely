import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Invitely — Invitations That Feel Like Celebrations',
    short_name: 'Invitely',
    description: 'Animated, scrollytelling wedding and birthday invitations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0C0A09',
    theme_color: '#A16207',
    orientation: 'portrait',
    categories: ['lifestyle', 'social'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Create Invite',
        short_name: 'Create',
        description: 'Start building a new invitation',
        url: '/builder',
      },
      {
        name: 'My Invites',
        short_name: 'My Invites',
        description: 'View your recent invitations',
        url: '/my-invites',
      },
    ],
  }
}
