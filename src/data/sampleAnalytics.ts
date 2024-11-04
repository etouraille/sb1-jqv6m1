export const sampleAnalytics = {
  visitors: {
    today: {
      visitors: 1234,
      pageViews: 3456,
      uniqueVisitors: 987,
      bounceRate: 45
    },
    week: {
      visitors: 8765,
      pageViews: 23456,
      uniqueVisitors: 6543,
      bounceRate: 42
    },
    month: {
      visitors: 34567,
      pageViews: 98765,
      uniqueVisitors: 23456,
      bounceRate: 40
    }
  },
  adPerformance: {
    views: 12500,
    clicks: 850,
    ctr: 6.8,
    favorites: 320,
    messages: 145,
    trend: {
      views: 12,
      clicks: 8,
      ctr: 5,
      favorites: 15,
      messages: -3
    }
  },
  locations: [
    { city: 'Genève', count: 3456, percentage: 35 },
    { city: 'Lausanne', count: 2345, percentage: 25 },
    { city: 'Zürich', count: 1987, percentage: 20 },
    { city: 'Berne', count: 1234, percentage: 12 },
    { city: 'Bâle', count: 876, percentage: 8 }
  ],
  devices: {
    mobile: 5678,
    desktop: 3456,
    tablet: 987
  },
  recentActivity: [
    {
      id: '1',
      type: 'view',
      title: 'Pic de trafic',
      description: 'Augmentation significative des visites (+25%)',
      timestamp: new Date('2024-03-15T10:30:00Z')
    },
    {
      id: '2',
      type: 'message',
      title: 'Nouveau record',
      description: '150 nouveaux messages échangés aujourd\'hui',
      timestamp: new Date('2024-03-15T09:15:00Z')
    },
    {
      id: '3',
      type: 'favorite',
      title: 'Annonce populaire',
      description: 'iPhone 14 Pro ajouté aux favoris 50 fois',
      timestamp: new Date('2024-03-14T16:45:00Z')
    }
  ]
};