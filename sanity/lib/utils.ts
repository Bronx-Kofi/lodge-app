import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/lib/api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source)
    .auto("format") // Auto WebP/AVIF
    .fit("max")
    .quality(85); // Increased to 85% for better quality
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").quality(85).url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

/**
 * Get video URL from Sanity file reference
 * @param source - Sanity file reference with asset._ref
 * @returns Full CDN URL for the video file
 */
export function urlForVideo(source: any): string | undefined {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const ref = source.asset._ref;
  // Sanity file references follow format: file-{assetId}-{extension}
  const [_file, assetId, extension] = ref.split("-");
  
  if (!assetId || !extension) {
    return undefined;
  }

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}

/**
 * Get file URL from Sanity file reference (generic)
 * Works for any file type including videos, PDFs, etc.
 */
export function urlForFile(source: any): string | undefined {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const ref = source.asset._ref;
  const [_file, assetId, extension] = ref.split("-");
  
  if (!assetId || !extension) {
    return undefined;
  }

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "post":
      return slug ? `/posts/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
