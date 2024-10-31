import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertVnd(amount: number) {
  return amount.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}

export const convertBreadcrumb = (breadcrumb: string) => {
  return breadcrumb
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toLowerCase();
};
