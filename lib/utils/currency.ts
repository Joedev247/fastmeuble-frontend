/**
 * Currency utilities for XAF (Central African CFA Franc)
 * Used throughout the Fast Meuble application
 */

/**
 * Format a number as XAF currency
 * @param amount - The amount to format
 * @param showSymbol - Whether to show the currency symbol (default: true)
 * @returns Formatted currency string (e.g., "50,000 FCFA" or "50,000 XAF")
 */
export function formatXAF(amount: number, showSymbol: boolean = true): string {
  // Format number with thousand separators
  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (showSymbol) {
    return `${formatted} FCFA`;
  }
  return formatted;
}

/**
 * Format a number as XAF currency with XAF symbol
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "50,000 XAF")
 */
export function formatXAFWithSymbol(amount: number): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} XAF`;
}

/**
 * Parse XAF currency string to number
 * @param currencyString - Currency string (e.g., "50,000 FCFA")
 * @returns Number value
 */
export function parseXAF(currencyString: string): number {
  // Remove currency symbols and spaces, then replace comma separators
  const cleaned = currencyString
    .replace(/FCFA|XAF|F\s*CFA/gi, '')
    .replace(/\s/g, '')
    .replace(/,/g, '');
  
  return parseFloat(cleaned) || 0;
}

/**
 * Get currency symbol
 */
export const CURRENCY_SYMBOL = 'FCFA';
export const CURRENCY_CODE = 'XAF';


