import { getToken } from "@/services/auth.service";

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
