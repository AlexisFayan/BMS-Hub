import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function relativeTimeFr(dateStr: string): string {
  try {
    const now = Date.now();
    const date = new Date(dateStr).getTime();
    const diffMs = now - date;
    if (diffMs < 0) return "à l'instant";
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `il y a ${Math.max(1, diffMin)} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `il y a ${diffH} heure${diffH > 1 ? "s" : ""}`;
    if (diffH < 48) return "hier";
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `il y a ${diffD} jours`;
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
