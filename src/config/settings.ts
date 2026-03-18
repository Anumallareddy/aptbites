// AptBites Configuration
export const config = {
  // Business Info
  businessName: 'AptBites',
  communityName: 'AptBites',
  apartmentCount: 400,

  // Contact Information
  whatsappNumber: '14092768534',
  smsNumber: '14092768534',
  email: 'getaptbites@gmail.com',
  phone: '409-276-8534',
  instagramUrl: 'https://www.instagram.com/aptbites/',

  // Optional Google Form
  googleFormUrl: '',

  // Delivery Settings
  deliverySlots: {
    morning: {
      label: 'Morning (8:00 AM - 10:00 AM)',
      value: 'morning',
      cutoffTime: 'Order before 10:00 PM for next morning delivery',
    },
    evening: {
      label: 'Evening (6:00 PM - 8:00 PM)',
      value: 'evening',
      cutoffTime: 'Order before 2:00 PM for evening delivery',
    },
  },

  // Payment Methods
  paymentMethods: ['Cash on Delivery', 'Venmo', 'Zelle'],

  // Tax Settings
  taxRate: 0.0825,
  taxExemptItems: ['Bottled Water', 'Water'],

  // Pricing
  deliveryFee: 0,

  // Features
  features: {
    whatsappCheckout: false,
    smsCheckout: true,
    emailCheckout: true,
    copyOrder: true,
    cashOnDelivery: true,
    sameDayDelivery: true,
    instagramEnabled: true,
  },
}

export default config