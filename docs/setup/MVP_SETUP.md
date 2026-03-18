# 🏢 AptBites - Community Convenience Store MVP

Welcome to AptBites! This is your apartment community's convenience store, delivering snacks, beverages, and household essentials right to your door.

## 🚀 MVP Features

✅ **WhatsApp Checkout** - Orders sent directly via WhatsApp  
✅ **Apartment Delivery** - Apartment number field for easy delivery  
✅ **Flexible Payment** - Cash, Venmo, or Zelle  
✅ **Same-Day Delivery** - Morning (8-10 AM) or Evening (6-8 PM)  
✅ **Admin Dashboard** - Easy product management  
✅ **No Database Required** - Perfect for starting with 400 apartments  

---

## ⚙️ Quick Setup

### 1. Update WhatsApp Number

Edit `/src/config/settings.ts`:
```typescript
whatsappNumber: "YOUR_NUMBER_HERE", // Format: 1234567890 (no spaces, no +)
```

Also update in:
- `/src/app/cart/page.tsx` (line 32)
- `/src/app/about/page.tsx` (WhatsApp links)
- `/src/components/Footer.tsx` (WhatsApp links)

### 2. Update Contact Info

In `/src/config/settings.ts`:
```typescript
email: "your-email@domain.com",
phone: "(your) phone-number",
```

### 3. Customize Community Name (Optional)

Search and replace "AptBites" with your preferred name across:
- Home page (`/src/app/page.tsx`)
- About page (`/src/app/about/page.tsx`)
- Footer (`/src/components/Footer.tsx`)

---

## 📱 How Orders Work (MVP)

1. **Customer browses products** → Adds to cart
2. **Fills delivery details** → Name, Apartment #, Phone, Delivery time
3. **Clicks "Order via WhatsApp"** → Opens WhatsApp with formatted message
4. **You receive order on WhatsApp** → Confirm and process manually
5. **Deliver to apartment** → Collect payment (Cash/Venmo/Zelle)

---

## 🛠️ Admin Dashboard

Access: `http://localhost:3000/admin`  
Password: `aptbites2026`

**Features:**
- Add new products
- Edit prices, stock, descriptions
- Delete products
- Changes appear immediately on the site

---

## 📦 Product Management

### Option 1: Admin Dashboard (Recommended)
1. Go to `/admin`
2. Click "Add Product" or "Edit" on existing products
3. Changes save to localStorage automatically

### Option 2: Edit Code
Edit `/src/data/products.ts` for default products

---

## 🚀 Deployment (FREE)

### Deploy to Vercel (Recommended - FREE)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Your site will be live at: `https://aptbites.vercel.app` (or custom domain)

### What's FREE on Vercel:
- Hosting
- SSL Certificate
- Global CDN
- 100GB bandwidth/month (enough for thousands of visitors)
- Automatic deployments from GitHub

---

## 💰 Cost Breakdown (MVP)

| Item | Cost | Notes |
|------|------|-------|
| Hosting (Vercel) | **$0/month** | Free tier sufficient |
| Domain (optional) | $12/year | aptbites.com |
| WhatsApp Business | **$0** | Free app |
| Total | **~$1/month** | Or $0 with Vercel subdomain |

---

## 📊 Tracking Orders (Manual MVP)

Since there's no database yet:

### Option 1: Google Sheets
Create spreadsheet with columns:
- Date/Time
- Customer Name
- Apartment #
- Items
- Total
- Payment Method
- Delivery Time
- Status (Pending/Delivered)

### Option 2: WhatsApp Business Features
- Use WhatsApp Business labels (New Order, Delivered, etc.)
- Star important messages
- Use chat folders

### Option 3: Notion/Airtable
- Free plans available
- Better organization than spreadsheets
- Can create order forms

---

## 🎯 Next Steps After MVP

### When to Upgrade (50+ orders/day):

1. **Add Database** (Supabase/PlanetScale - FREE tier)
   - Store orders automatically
   - Customer accounts
   - Order history
   - Inventory tracking

2. **Add Payment Gateway** (Stripe)
   - Online payments
   - ~2.9% + $0.30 per transaction

3. **Add SMS Notifications** (Twilio)
   - Order confirmations
   - Delivery updates

4. **Add Analytics** (Google Analytics - FREE)
   - Track popular products
   - Peak ordering times
   - Customer behavior

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `/src/config/settings.ts` | Main configuration (WhatsApp, contact info) |
| `/src/app/cart/page.tsx` | Checkout page with WhatsApp integration |
| `/src/app/admin/page.tsx` | Product management dashboard |
| `/src/data/products.ts` | Default products list |
| `/src/context/CartContext.tsx` | Shopping cart logic |

---

## 🎨 Customization

### Change Colors
Edit `/tailwind.config.ts`:
```typescript
colors: {
  primary: '#10B981',    // Main color
  secondary: '#059669',  // Accent color
  accent: '#F59E0B',     // Highlight color
}
```

### Add/Remove Categories
Edit `/src/components/CategorySection.tsx`

### Delivery Times
Edit `/src/config/settings.ts` → deliverySlots

---

## 🆘 Support

**Questions?**
- Check `/FEATURES.md` for feature documentation
- Check `/TESTING.md` for testing checklist
- Check `/PRODUCT_MANAGEMENT.md` for product guide

**Issues?**
1. Clear browser cache
2. Check browser console for errors
3. Restart dev server: `pkill -f "next dev" && npm run dev`

---

## 📈 Growth Milestones

- **0-50 orders/week**: Current MVP setup (FREE)
- **50-200 orders/week**: Add database, keep manual processing
- **200+ orders/week**: Add online payments, automated notifications
- **Expand to more communities**: Multi-tenant system

---

## 🎉 You're Ready!

1. ✅ Update WhatsApp number in config
2. ✅ Add your products via admin dashboard
3. ✅ Deploy to Vercel
4. ✅ Share link with your community
5. ✅ Start taking orders!

**Your MVP is live! Now grow it based on real customer feedback.**

---

Made with ❤️ for apartment communities
