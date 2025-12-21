import { urlForImage, urlForVideo } from "@/sanity/lib/utils";
import { GalleryItem } from "@/app/(marketing)/rooms/[slug]/_components/RoomGallery";

/**
 * Transform Sanity gallery data to GalleryItem format
 * Handles both galleryImage documents (references) and inline gallery references
 */
export function transformGalleryData(galleryData: any[]): GalleryItem[] {
    if (!galleryData || !Array.isArray(galleryData)) {
        return [];
    }

    const items = galleryData
        .map((item): GalleryItem | null => {
            // Handle galleryImage document reference (WordPress-style media library)
            if (item._type === "galleryImage" || item.mediaType) {
                const mediaType = item.mediaType || "image";

                if (mediaType === "video") {
                    // Video item
                    const videoSrc = item.video?.asset?.url || urlForVideo(item.video);
                    const videoUrl = item.videoUrl;
                    const poster = item.image?.asset?.url || urlForImage(item.image)?.url();

                    if (!videoSrc && !videoUrl) {
                        return null; // Skip if no video source
                    }

                    return {
                        type: "video" as const,
                        src: videoSrc || "",
                        videoUrl: videoUrl,
                        poster: poster,
                        alt: item.caption || item.title,
                    };
                } else {
                    // Image item
                    const imageSrc = item.image?.asset?.url || urlForImage(item.image)?.url();
                    
                    if (!imageSrc) {
                        return null; // Skip if no image source
                    }

                    return {
                        type: "image" as const,
                        src: imageSrc,
                        alt: item.image?.alt || item.caption || item.title,
                    };
                }
            }

            // Handle legacy simple image references (backward compatibility)
            if (item.asset || item._type === "image") {
                const imageSrc = item.asset?.url || urlForImage(item)?.url();
                
                if (!imageSrc) {
                    return null;
                }

                return {
                    type: "image" as const,
                    src: imageSrc,
                    alt: item.alt || "",
                };
            }

            // Handle direct URL strings (mock data compatibility)
            if (typeof item === "string") {
                return {
                    type: "image" as const,
                    src: item,
                    alt: "",
                };
            }

            return null;
        });

    return items.filter((item): item is GalleryItem => item !== null);
}

/**
 * Get video URL from various video source formats
 */
export function getVideoUrl(videoData: any): string | undefined {
    if (!videoData) return undefined;

    // Direct URL from Sanity
    if (videoData.asset?.url) {
        return videoData.asset.url;
    }

    // Use utility function
    return urlForVideo(videoData);
}
