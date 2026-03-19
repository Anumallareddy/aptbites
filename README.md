# AptBites

AptBites is a simple apartment delivery store for snacks, drinks, and everyday essentials.

Built for apartment communities to order quickly without using complex delivery apps.

---

## 🚀 Live App

https://aptbites.vercel.app/

---

## 🛒 Features

### Shopping Experience
- Browse products by category
- Add items to cart
- Update quantities
- Cart saved in browser

### Checkout (MVP)
Customers can place orders using:
- SMS (primary)
- Email
- Copy order (paste anywhere like Instagram)

Order includes:
- Customer name
- Apartment number
- Items and total
- Delivery time

### Delivery Model
- Apartment-only delivery
- Morning and evening slots
- Free delivery inside community

### Pickup & Delivery Service
- Request items from nearby stores
- AptBites picks up and delivers
- Starting fee: $5+

### Admin Panel
- `/admin` route
- Add / edit products
- Data stored in browser (localStorage)

---

## ⚠️ Current Limitations

- No backend or database
- Products are stored per browser (not shared)
- No online payment system
- Orders are manual (SMS/email)

---

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Context API
- Vercel (deployment)

---

## 🧪 Local Setup

```bash
git clone https://github.com/Anumallareddy/aptbites.git
cd aptbites
npm install
npm run dev