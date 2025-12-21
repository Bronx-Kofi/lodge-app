'use client';

import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';

interface Review {
  _id: string;
  guestName: string;
  overallRating: number;
  title?: string;
  body: string;
  photos?: any[];
  verified: boolean;
  createdAt: string;
  propertyResponse?: string;
  categoryRatings?: {
    cleanliness?: number;
    communication?: number;
    checkIn?: number;
    accuracy?: number;
    location?: number;
    value?: number;
  };
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-orange fill-current' : 'text-neutral-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-dark">{review.guestName}</h3>
            {review.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            {renderStars(review.overallRating)}
            <span>·</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="font-semibold text-dark mb-2">{review.title}</h4>
      )}

      {/* Body */}
      <p className="text-neutral-700 leading-relaxed mb-4">{review.body}</p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {review.photos.slice(0, 4).map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={urlForImage(photo)?.url() || ''}
                alt={`Review photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Category Ratings */}
      {review.categoryRatings && (
        <div className="grid grid-cols-2 gap-3 py-4 border-t border-neutral-200">
          {Object.entries(review.categoryRatings).map(([key, value]) => (
            value && (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="flex items-center gap-1">
                  {renderStars(value)}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Property Response */}
      {review.propertyResponse && (
        <div className="mt-4 pt-4 border-t border-neutral-200 bg-neutral-50 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm text-dark mb-1">Response from Miky Hillside Lodge</div>
              <p className="text-sm text-neutral-700">{review.propertyResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
