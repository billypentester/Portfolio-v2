import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Developer Portfolio',
    short_name: 'Portfolio',
    description: 'Bilal Ahmad Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
        {
          "src": "/images/manifest-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/images/manifest-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/images/manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
    ]
  }
}