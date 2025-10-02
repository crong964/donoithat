import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function CheckPhoneNumber(s: string) {
  return /^(0[3|5|7|8|9][0-9]{8})$/gm.test(s)
}