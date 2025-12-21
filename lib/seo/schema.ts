interface HotelSchema {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
  };
  phone?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
}

export function generateHotelSchema(data: HotelSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: data.name,
    description: data.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.region,
      addressCountry: data.address.country,
    },
    ...(data.phone && { telephone: data.phone }),
    ...(data.email && { email: data.email }),
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(data.priceRange && { priceRange: data.priceRange }),
  };
}

interface RoomSchema {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
}

export function generateRoomSchema(data: RoomSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.images,
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency,
      availability: 'https://schema.org/InStock',
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

interface ReviewSchema {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed: string;
}

export function generateReviewSchema(data: ReviewSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: data.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: data.reviewBody,
    datePublished: data.datePublished,
    itemReviewed: {
      '@type': 'Product',
      name: data.itemReviewed,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Miky Hillside Lodge',
    description: 'Off-grid luxury accommodation in Ghana\'s Bono Region with stunning hillside views, modern amenities, and authentic Ghanaian hospitality.',
    image: 'https://mikyhillside.com/hero-fallback.jpg',
    '@id': 'https://mikyhillside.com',
    url: 'https://mikyhillside.com',
    telephone: '+233-XXX-XXX-XXX',
    priceRange: 'GH₵200-GH₵800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sunyani-Dumasua Road',
      addressLocality: 'Sunyani',
      addressRegion: 'Bono Region',
      postalCode: '',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.3392,
      longitude: -2.3247,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi (Starlink)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Solar Power',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Restaurant',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Parking',
        value: true,
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
