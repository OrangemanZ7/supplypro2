// This file contains utility functions that are used throughout the application. The cn function is a helper function that combines class names using the clsx and tailwind-merge libraries. It takes in any number of class values and returns a single string of class names that can be used in the className prop of React components. This allows for easier management of conditional class names and ensures that Tailwind CSS classes are properly merged without conflicts.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
