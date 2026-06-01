import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://invitely.in'
  const templateIds = [
    'wedding-sona-v2', 'wedding-cinematic', 'wedding-petal', 'wedding-cosmos', 'wedding-modern-elegant', 'wedding-traditional-indian', 'wedding-celestial',
    'wedding-mountain', 'wedding-beach', 'wedding-garden', 'wedding-royal',
    'wedding-bohemian', 'wedding-retro-bollywood',
    'birthday-celestial', 'birthday-modern-elegant', 'birthday-bohemian',
    'birthday-mountain', 'birthday-beach', 'birthday-traditional-indian', 'birthday-midnight',
  ]
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/builder`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-planners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/my-invites`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/wedding-invitation-maker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${base}/birthday-invitation-maker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${base}/whatsapp-wedding-invitation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/digital-wedding-card`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/online-wedding-invitation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 },
    ...templateIds.map(id => ({
      url: `${base}/preview/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
