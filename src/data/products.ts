import { Product } from '@/types'

const PRODUCTS_STORAGE_KEY = 'aptbites-products'

export const defaultProducts: Product[] = [
  // Beverages
  {
    id: 1,
    name: 'Coca-Cola 12 oz Can',
    price: 1.99,
    category: 'Beverages',
    image: '/coke.png',
    rating: 4.7,
    stock: 100,
  },
  {
    id: 2,
    name: 'Pepsi 12 oz Can',
    price: 1.99,
    category: 'Beverages',
    image: '/pepsi.png',
    rating: 4.5,
    stock: 90,
  },
  {
    id: 3,
    name: 'Sprite 12 oz Can',
    price: 1.99,
    category: 'Beverages',
    image: '/sprite.png',
    rating: 4.6,
    stock: 85,
  },
  {
    id: 4,
    name: 'Gatorade 20 oz Bottle',
    price: 2.99,
    category: 'Beverages',
    image: '/gatorade.png',
    rating: 4.5,
    stock: 75,
  },
  {
    id: 5,
    name: 'Bottled Water 16.9 oz',
    price: 1.25,
    category: 'Beverages',
    image: '/water.png',
    rating: 4.9,
    stock: 200,
  },

  // Snacks - Chips
  {
    id: 6,
    name: "Lay’s Classic 1 oz Bag",
    price: 2.29,
    category: 'Snacks',
    image: '/lays.png',
    rating: 4.6,
    stock: 50,
  },
  {
    id: 7,
    name: "Lay’s BBQ 1 oz Bag",
    price: 2.29,
    category: 'Snacks',
    image: '/lays-bbq.png',
    rating: 4.5,
    stock: 45,
  },
  {
    id: 8,
    name: 'Doritos Nacho Cheese 1.5 oz',
    price: 2.49,
    category: 'Snacks',
    image: '/doritos.png',
    rating: 4.7,
    stock: 60,
  },
  {
    id: 9,
    name: 'Cheetos Crunchy 1 oz',
    price: 2.29,
    category: 'Snacks',
    image: '/cheetos.png',
    rating: 4.6,
    stock: 55,
  },
  {
    id: 10,
    name: 'Pringles Original 2.3 oz',
    price: 2.99,
    category: 'Snacks',
    image: '/pringles.png',
    rating: 4.5,
    stock: 40,
  },

  // Snacks - Candy
  {
    id: 11,
    name: 'Snickers 1.86 oz Bar',
    price: 1.99,
    category: 'Snacks',
    image: '/snickers.png',
    rating: 4.7,
    stock: 80,
  },
  {
    id: 12,
    name: 'KitKat 1.5 oz Bar',
    price: 1.99,
    category: 'Snacks',
    image: '/kitkat.png',
    rating: 4.6,
    stock: 70,
  },
  {
    id: 13,
    name: 'Twix 1.79 oz Bar',
    price: 1.99,
    category: 'Snacks',
    image: '/twix.png',
    rating: 4.6,
    stock: 65,
  },
  {
    id: 14,
    name: "Reese’s 1.5 oz Pack",
    price: 1.99,
    category: 'Snacks',
    image: '/reeses.png',
    rating: 4.7,
    stock: 60,
  },
  {
    id: 15,
    name: "M&M’s 1.69 oz Pack",
    price: 1.99,
    category: 'Snacks',
    image: '/mms.png',
    rating: 4.5,
    stock: 75,
  },

  // Household
  {
    id: 16,
    name: 'Paper Towels (1 Roll)',
    price: 2.99,
    category: 'Household',
    image: '/papertowels.png',
    rating: 4.6,
    stock: 40,
  },
  {
    id: 17,
    name: 'Toilet Paper (2 Rolls)',
    price: 3.99,
    category: 'Household',
    image: '/toiletpaper.png',
    rating: 4.6,
    stock: 40,
  },
  {
    id: 18,
    name: 'Dish Soap 12 oz',
    price: 3.99,
    category: 'Household',
    image: '/dishsoap.png',
    rating: 4.7,
    stock: 35,
  },
  {
    id: 19,
    name: 'Laundry Detergent 37 oz',
    price: 8.99,
    category: 'Household',
    image: '/detergent.png',
    rating: 4.8,
    stock: 30,
  },
  {
    id: 20,
    name: 'Trash Bags (20 Count)',
    price: 5.99,
    category: 'Household',
    image: '/trashbags.png',
    rating: 4.5,
    stock: 45,
  },
]

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') {
    return defaultProducts
  }

  try {
    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (savedProducts) {
      return JSON.parse(savedProducts)
    }
  } catch (error) {
    console.error('Failed to load products from localStorage:', error)
    localStorage.removeItem(PRODUCTS_STORAGE_KEY)
  }

  return defaultProducts
}

export const saveProducts = (products: Product[]) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Failed to save products to localStorage:', error)
  }
}

export const products =
  typeof window !== 'undefined' ? getProducts() : defaultProducts