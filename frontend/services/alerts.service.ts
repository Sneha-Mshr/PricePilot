import { getToken } from "@/services/auth.service";
import { getWishlist } from "@/services/wishlist.service";

export interface PriceAlert {
  id: string;
  title: string;
  price: string;
  url: string;
  source: string;
  image: string | null;
  createdAt: string;
}

function getAlertsKey(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return `pricepilot_alerts_${payload.sub || payload.email}`;
  } catch {
    return null;
  }
}

export function getPriceAlerts(): PriceAlert[] {
  const key = getAlertsKey();
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addPriceAlert(
  item: Omit<PriceAlert, "id" | "createdAt">
): PriceAlert | null {
  const key = getAlertsKey();
  if (!key) return null;

  const alerts = getPriceAlerts();

  // Prevent duplicates by URL
  if (alerts.some((a) => a.url === item.url)) {
    return null;
  }

  const newAlert: PriceAlert = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  alerts.unshift(newAlert);
  localStorage.setItem(key, JSON.stringify(alerts));
  return newAlert;
}

export function removePriceAlert(id: string): boolean {
  const key = getAlertsKey();
  if (!key) return false;

  const alerts = getPriceAlerts();
  const filtered = alerts.filter((a) => a.id !== id);

  if (filtered.length === alerts.length) return false;

  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}

export function hasPriceAlert(url: string): boolean {
  const alerts = getPriceAlerts();
  return alerts.some((a) => a.url === url);
}

export interface PriceDropMatch {
  title: string;
  currentPrice: number;
  savedPrice: number;
  savings: number;
  source: string;
  url: string;
}

/**
 * Compare search results against saved alerts AND wishlist items.
 * Returns products whose current price is lower than when the user saved them.
 */
export function checkPriceDrops(
  products: { title: string; price: string; url: string; source: string }[]
): PriceDropMatch[] {
  // Get both alerts and wishlist items
  const alerts = getPriceAlerts();
  const wishlistItems = getWishlist();

  // Combine both lists
  const savedItems = [
    ...alerts.map((a) => ({ title: a.title, price: a.price, url: a.url, source: a.source })),
    ...wishlistItems.map((w) => ({ title: w.title, price: w.price, url: w.url, source: w.source })),
  ];

  if (savedItems.length === 0) return [];

  // Deduplicate by URL
  const uniqueItems = savedItems.filter(
    (item, idx, arr) => arr.findIndex((i) => i.url === item.url) === idx
  );

  const drops: PriceDropMatch[] = [];

  for (const product of products) {
    const currentPrice = parseFloat(product.price);
    if (!currentPrice || isNaN(currentPrice)) continue;

    // Match by URL or by similar title + same source
    const matched = uniqueItems.find((saved) => {
      // Exact URL match
      if (saved.url && product.url && saved.url === product.url) return true;

      // Fuzzy match: same source + title contains key words
      if (saved.source === product.source) {
        const savedWords = saved.title.toLowerCase().split(" ").filter((w) => w.length > 3);
        const productTitle = product.title.toLowerCase();
        const matchCount = savedWords.filter((w) => productTitle.includes(w)).length;
        return matchCount >= Math.min(3, savedWords.length);
      }

      return false;
    });

    if (matched) {
      const savedPrice = parseFloat(matched.price);
      if (savedPrice && !isNaN(savedPrice) && currentPrice < savedPrice) {
        drops.push({
          title: matched.title,
          currentPrice,
          savedPrice,
          savings: savedPrice - currentPrice,
          source: product.source,
          url: product.url,
        });
      }
    }
  }

  // Sort by biggest savings first
  drops.sort((a, b) => b.savings - a.savings);
  return drops;
}
