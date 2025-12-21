/**
 * Phone number utilities
 * Clean phone numbers for WhatsApp links
 */

/**
 * Clean phone number for WhatsApp links
 * Removes +, spaces, dashes, parentheses
 * Example: "+44 7405 147948" -> "447405147948"
 */
export function cleanPhoneNumber(phone: string | undefined | null): string {
    if (!phone) return "";
    
    // Remove all non-numeric characters except leading +
    let cleaned = phone.replace(/[^\d+]/g, "");
    
    // Remove + sign
    cleaned = cleaned.replace(/\+/g, "");
    
    return cleaned;
}

/**
 * Format WhatsApp link
 * Returns properly formatted WhatsApp URL
 */
export function formatWhatsAppLink(phone: string | undefined | null, message?: string): string {
    const cleanedPhone = cleanPhoneNumber(phone);
    
    if (!cleanedPhone) {
        return "#"; // Fallback if no phone number
    }
    
    const baseUrl = `https://wa.me/${cleanedPhone}`;
    
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    
    return baseUrl;
}
