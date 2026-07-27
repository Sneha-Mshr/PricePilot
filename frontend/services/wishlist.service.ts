import { WishlistItem } from "@/types/wishlist";
import { getToken } from "@/services/auth.service";

/**
 * Wishlist is stored locally per user (keyed by email).
 * This keeps it simple without needing a backend wishlist API —
 * users get persistence via localStorage tied to their account.
 */

function getWishlistKey(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return `pricepilot_wishlist_${payload.sub || payload.email}`;
  } catch {
    return null;
  }
}

export function getWishlist(): WishlistItem[] {
  const key = getWishlistKey();
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWishlist(item: Omit<WishlistItem, "id" | "addedAt">): WishlistItem | null {
  const key = getWishlistKey();
  if (!key) return null;

  const wishlist = getWishlist();

  // Prevent duplicates by URL
  if (wishlist.some((w) => w.url === item.url)) {
    return null;
  }

  const newItem: WishlistItem = {
    ...item,
    id: crypto.randomUUID(),
    addedAt: new Date().toISOString(),
  };

  wishlist.unshift(newItem);
  localStorage.setItem(key, JSON.stringify(wishlist));
  return newItem;
}

export function removeFromWishlist(id: string): boolean {
  const key = getWishlistKey();
  if (!key) return false;

  const wishlist = getWishlist();
  const filtered = wishlist.filter((w) => w.id !== id);

  if (filtered.length === wishlist.length) return false;

  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}

export function isInWishlist(url: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some((w) => w.url === url);
}

export function clearWishlist(): void {
  const key = getWishlistKey();
  if (key) localStorage.removeItem(key);
}
