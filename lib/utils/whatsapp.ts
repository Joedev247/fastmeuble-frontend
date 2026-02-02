// WhatsApp utility functions
import { CartItem } from '@/contexts/CartContext';
import { formatXAF } from './currency';

// WhatsApp number (Cameroon: 237 + 654366920)
export const WHATSAPP_NUMBER = '237654366920';

/**
 * Format cart items into a WhatsApp message
 */
export const formatCartMessage = (items: CartItem[]): string => {
  if (items.length === 0) {
    return 'Hello! I would like to place an order.';
  }

  let message = 'Hello! I would like to place an order for the following items:\n\n';
  
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${formatXAF(item.price)} each\n`;
    message += `   Subtotal: ${formatXAF(itemTotal)}\n\n`;
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `Total: ${formatXAF(total)}\n\n`;
  message += 'Please let me know about availability and delivery options. Thank you!';

  return message;
};

/**
 * Format a single product message for WhatsApp
 */
export const formatProductMessage = (productName: string, category: string, quantity: number = 1): string => {
  return `Hello! I'm interested in ordering:\n\nProduct: ${productName}\nCategory: ${category}\nQuantity: ${quantity}\n\nCan we discuss pricing and delivery options? Thank you!`;
};

/**
 * Open WhatsApp with a message
 */
export const openWhatsApp = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Open WhatsApp with cart items
 */
export const openWhatsAppWithCart = (items: CartItem[]): void => {
  const message = formatCartMessage(items);
  openWhatsApp(message);
};

/**
 * Open WhatsApp with a single product
 */
export const openWhatsAppWithProduct = (productName: string, category: string, quantity: number = 1): void => {
  const message = formatProductMessage(productName, category, quantity);
  openWhatsApp(message);
};

