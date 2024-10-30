import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertVnd(amount: number) {
  return amount.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
