import { client } from "@/sanity/lib/client";
import { QueryParams } from "next-sanity";
import { cache } from "react";

/**
 * Cached Sanity fetch function
 * Uses React cache() for request-level deduplication
 */
export const cachedFetch = cache(async <T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = [],
  revalidate: number = 300 // 5 minutes default
): Promise<T> => {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
});

/**
 * Fetch with specific cache duration
 */
export async function fetchWithCache<T>(
  query: string,
  params: QueryParams = {},
  options: {
    tags?: string[];
    revalidate?: number;
  } = {}
): Promise<T> {
  const { tags = [], revalidate = 300 } = options;
  
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
