# AptBites - Online Convenience Store

AptBites is a modern e-commerce web application for an online convenience store serving **400+ apartments** in Fort Bend County, Texas. Built with Next.js, React, TypeScript, and Tailwind CSS.

## 🌟 About

AptBites brings the convenience store experience online for your apartment community. Order your favorite snacks, beverages, and household items with **free delivery** directly to your door!

**Perfect for apartment communities** - Designed specifically for serving 400+ apartments with multiple flexible ordering methods.

## ✨ Key Features

- 🛒 **Product Catalog** - Browse snacks, beverages, and household items
- 📱 **Multiple Order Methods** - SMS, WhatsApp, Email, or Copy to Clipboard
- 🛍️ **Shopping Cart** - Add items and manage quantities easily
- 🚚 **Free Delivery** - Free delivery within community (8:00 AM - 8:00 PM)
- 💰 **Flexible Payment** - Cash, Venmo, or Zelle accepted
- 🏠 **Apartment-Specific** - Delivery right to your apartment door
- 🔐 **Admin Dashboard** - Password-protected product management
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Products update instantly from admin panel
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## 📍 Service Area

**400+ Apartments Community - Fort Bend County, Texas**
- ✅ Free delivery on all orders
- ✅ Delivery Hours: 8:00 AM - 8:00 PM daily
- ✅ Texas sales tax (8.25%) applied correctly
- ✅ Water and essential beverages tax-exempt per Texas law
- ✅ Payment: Cash, Venmo, or Zelle at delivery

## 📦 Product Categories

- 🍿 **Snacks** - Chips, cookies, candy, and more
- 🥤 **Beverages** - Water, soda, juice, energy drinks
- 🧴 **Household** - Paper towels, toiletries, cleaning supplies

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm

**Need help installing?** See our **[Complete Installation Guide](./docs/setup/INSTALLATION.md)** for Mac, Windows & Linux.

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

4. **Access admin dashboard:**
- Go to `/admin`
- Password: `aptbites2026`
- Add/edit products as needed

**Having issues?** Check the [Installation Guide](./docs/setup/INSTALLATION.md) for detailed troubleshooting.

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

### 🎯 Getting Started
- **[Installation Guide](./docs/setup/INSTALLATION.md)** - **START HERE!** Complete setup for Mac, Windows & Linux
- **[Documentation Home](./docs/README.md)** - Complete documentation index
- **[MVP Setup Guide](./docs/setup/MVP_SETUP.md)** - Deploy to Vercel (production)

### 🎨 Features
- **[Features Overview](./docs/features/FEATURES.md)** - All available features
- **[Order Methods Setup](./docs/features/ORDER_METHODS_SETUP.md)** - Configure SMS, WhatsApp, Email
- **[Multi-Order Strategy](./docs/features/MULTI_ORDER_SUMMARY.md)** - Why multiple order methods work

### 🔧 Management
- **[Product Management](./docs/management/PRODUCT_MANAGEMENT.md)** - How to manage inventory

### 🚀 Launch
- **[Launch Checklist](./docs/launch/LAUNCH_CHECKLIST.md)** - Pre-launch verification
- **[Testing Guide](./docs/testing/TESTING.md)** - Testing procedures

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** React 18
- **State Management:** React Context API
- **Storage:** localStorage (products & cart)
- **Deployment:** Vercel (recommended)

## 📱 Ordering Methods

Customers can place orders using their preferred method:

1. **📲 SMS (Text Message)** - Primary method for US customers
2. **💬 WhatsApp** - For WhatsApp users
3. **📧 Email** - Traditional email orders
4. **📋 Copy to Clipboard** - Flexible option for any messaging app
5. **📝 Google Form** - Optional structured form (requires setup)

## 📂 Project Structure

```
aptbites/
├── docs/                    # 📚 Documentation
│   ├── setup/              # Deployment guides
│   ├── features/           # Feature documentation
│   ├── management/         # Product & operations guides
│   ├── launch/             # Launch checklists
│   └── testing/            # Testing procedures
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx        # Home page
│   │   ├── products/       # Products listing
│   │   ├── categories/     # Category pages
│   │   ├── cart/           # Shopping cart
│   │   ├── admin/          # Admin dashboard
│   │   └── about/          # About page
│   ├── components/         # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── CategorySection.tsx
│   ├── context/            # React Context
│   │   └── CartContext.tsx
│   ├── data/               # Data management
│   │   └── products.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── config/             # Configuration
│       └── settings.ts
├── public/                 # Static assets
└── .github/                # GitHub configs
```

## 📝 Available Scripts

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check code quality

## 🔐 Admin Access

- **URL:** `/admin`
- **Password:** `aptbites2026`
- **Features:**
  - Add new products
  - Edit existing products
  - Delete products
  - Updates reflect immediately on site

## 🚀 Deployment

### Recommended: Vercel (FREE)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

See the [MVP Setup Guide](./docs/setup/MVP_SETUP.md) for detailed deployment instructions.

## ⚙️ Configuration

Before launching, update contact information in `/src/app/cart/page.tsx`:

```typescript
// Line ~50: SMS Phone Number
const phoneNumber = '15551234567'

// Line ~43: WhatsApp Number
const whatsappNumber = '15551234567'

// Line ~57: Email Address
const email = 'hello@aptbites.com'
```

See [Order Methods Setup](./docs/features/ORDER_METHODS_SETUP.md) for complete configuration guide.

## 📊 Features Implemented

✅ Dynamic product catalog with real-time updates  
✅ Shopping cart with localStorage persistence  
✅ Multiple order methods (SMS, WhatsApp, Email, Copy)  
✅ Admin dashboard for product management  
✅ Tax calculation (8.25% with water exemption)  
✅ Category-based navigation  
✅ Responsive design (mobile & desktop)  
✅ Free delivery scheduling  
✅ Apartment-specific delivery fields  

## 🎯 Target Market

- **Primary:** 400+ apartment community residents
- **Location:** Fort Bend County, Texas
- **Delivery:** Within apartment community only
- **Hours:** 8:00 AM - 8:00 PM daily

## 💡 Usage

### For Customers:
1. Browse products by category
2. Add items to cart
3. Enter apartment number and delivery details
4. Choose preferred order method (SMS/WhatsApp/Email)
5. Complete order and wait for delivery

### For Admin:
1. Navigate to `/admin`
2. Enter password: `aptbites2026`
3. Add/edit/delete products
4. Changes appear instantly on the site

## 🤝 Support

For detailed help, check the [documentation](./docs/README.md) or refer to specific guides:
- [Launch Checklist](./docs/launch/LAUNCH_CHECKLIST.md) - Pre-launch tasks
- [Product Management](./docs/management/PRODUCT_MANAGEMENT.md) - Manage inventory
- [Testing Guide](./docs/testing/TESTING.md) - Quality assurance

## 📞 Contact

- **Email:** hello@aptbites.com
- **SMS/Text:** (Update in cart page)
- **WhatsApp:** (Update in cart page)

## 📄 License

MIT License - Feel free to use for your community!

---

**Built with ❤️ for apartment communities in Fort Bend County, Texas**

Last Updated: February 3, 2026
