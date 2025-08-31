import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


export function isToday(dateStr: string) {
  if (!dateStr) return false;
  const now = new Date();
  const sel = new Date(dateStr + "T00:00:00");
  return (
    now.getFullYear() === sel.getFullYear() &&
    now.getMonth() === sel.getMonth() &&
    now.getDate() === sel.getDate()
  );
}

export function isPastForToday(slotHHmm: string) {
  const [hh, mm] = slotHHmm.split(":").map(Number);
  const now = new Date();
  if (hh < now.getHours()) return true;
  if (hh === now.getHours() && mm <= now.getMinutes()) return true;
  return false;
}