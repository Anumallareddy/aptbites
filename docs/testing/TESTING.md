# AptBites - End-to-End Testing Guide

## 🌐 Application URL
**Main URL:** http://localhost:3000

---

## ✅ Complete Feature Test Checklist

### 1. **Home Page** - http://localhost:3000
- [ ] Hero section displays with gradient background
- [ ] "Shop Now" button works → redirects to /products
- [ ] 3 category cards display (Snacks, Beverages, Household)
- [ ] Clicking category card → redirects to /categories/{slug}
- [ ] Featured products section shows high-rated items
- [ ] All products have "Add to Cart" button
- [ ] Header shows cart icon with count badge
- [ ] Footer displays with all links

### 2. **Products Page** - http://localhost:3000/products
- [ ] All 18 products display in grid
- [ ] Category filter dropdown works:
  - [ ] Select "Snacks" → Shows only 6 snack items
  - [ ] Select "Beverages" → Shows only 6 beverage items
  - [ ] Select "Household" → Shows only 6 household items
  - [ ] Select "All Categories" → Shows all 18 items
- [ ] Search bar filters products by name
- [ ] Sort dropdown works:
  - [ ] "Price: Low to High" → Products sorted by ascending price
  - [ ] "Price: High to Low" → Products sorted by descending price
  - [ ] "Rating" → Products sorted by rating
- [ ] All filters work together (category + search + sort)
- [ ] Empty state shows when no products match filters

### 3. **Category Pages** 
#### http://localhost:3000/categories/snacks
- [ ] Snacks header displays with 🍿 icon
- [ ] Only snack products show (6 items)
- [ ] "Back to All Products" link works
- [ ] Add to cart works on all products

#### http://localhost:3000/categories/beverages
- [ ] Beverages header displays with 🥤 icon
- [ ] Only beverage products show (6 items)
- [ ] All functionality works

#### http://localhost:3000/categories/household
- [ ] Household header displays with 🧴 icon
- [ ] Only household products show (6 items)
- [ ] All functionality works

### 4. **Shopping Cart** - http://localhost:3000/cart

#### Empty Cart State:
- [ ] Shows empty cart message
- [ ] "Browse Products" button redirects to /products

#### With Items:
- [ ] Added items display correctly
- [ ] Product image, name, price, category shown
- [ ] Quantity controls work:
  - [ ] "+" button increases quantity
  - [ ] "-" button decreases quantity
  - [ ] Decreasing to 0 removes item
- [ ] Remove button (🗑️) deletes item
- [ ] Subtotal calculates correctly
- [ ] Tax (8%) calculates correctly
- [ ] Shipping logic:
  - [ ] Shows $4.99 if subtotal < $50
  - [ ] Shows "FREE" if subtotal ≥ $50
  - [ ] Shows "Add $X more for free shipping" message
- [ ] Total calculates correctly (subtotal + tax + shipping)
- [ ] "Clear Cart" button works (with confirmation)
- [ ] "Continue Shopping" redirects to /products

### 5. **Header** (All Pages)
- [ ] Logo "🛒 AptBites" redirects to home
- [ ] Navigation links work:
  - [ ] Home → /
  - [ ] Products → /products
  - [ ] About → /about
- [ ] Cart icon shows correct count
- [ ] Cart count updates when items added
- [ ] Cart count badge appears only when count > 0
- [ ] "View Cart" button redirects to /cart

### 6. **About Page** - http://localhost:3000/about
- [ ] Page displays correctly
- [ ] All sections visible (Our Story, Why Choose Us, Our Values)
- [ ] No console errors

### 7. **Add to Cart Flow** (Critical Test)
1. [ ] Start with empty cart (cart count = 0)
2. [ ] Go to Products page
3. [ ] Click "Add to Cart" on a product
4. [ ] Button shows "✓ Added!" feedback
5. [ ] Header cart count updates to 1
6. [ ] Add same product again → count becomes 2
7. [ ] Add different product → count increases
8. [ ] Go to Cart page
9. [ ] Both products show with correct quantities
10. [ ] Totals calculate correctly

### 8. **Cart Persistence** (Critical Test)
1. [ ] Add 3 items to cart
2. [ ] Note the cart count in header
3. [ ] Refresh the page (F5 or Cmd+R)
4. [ ] Cart count still shows 3
5. [ ] Go to cart page
6. [ ] All 3 items still there with correct quantities
7. [ ] Totals still correct

### 9. **Product Card Interactions**
- [ ] Hover effect on product card (shadow increases)
- [ ] Product image has hover scale effect
- [ ] Rating displays correctly (⭐ + number)
- [ ] Price displays with $ and 2 decimals
- [ ] Category badge displays
- [ ] Low stock warning shows (if stock < 20)
- [ ] "Add to Cart" button hover effect

### 10. **Responsive Design**
- [ ] Desktop view (1920px) - All elements visible
- [ ] Tablet view (768px) - Grid adjusts
- [ ] Mobile view (375px) - Single column layout
- [ ] Header adapts to screen size
- [ ] Navigation works on mobile

### 11. **Error Handling**
- [ ] Invalid category URL shows 404 or error page
- [ ] No console errors in browser
- [ ] Images load correctly (emojis)

### 12. **Performance**
- [ ] Pages load quickly (< 2 seconds)
- [ ] No flickering or layout shifts
- [ ] Smooth animations and transitions
- [ ] Cart updates are instant

---

## 🐛 Known Limitations (Future Enhancements)

- No user authentication yet
- Checkout is placeholder (shows alert)
- No backend/database (all data is frontend)
- No payment processing
- No order history
- No email notifications
- No product detail pages

---

## 📊 Test Results

**Date:** _________
**Tester:** _________
**Browser:** _________

**Total Tests:** 100+
**Passed:** ___
**Failed:** ___

**Notes:**
_____________________________________
_____________________________________
_____________________________________

---

## 🚀 Quick Test Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Start production server
npm run start
```

---

## ✨ Success Criteria

All features work as expected:
✅ Shopping cart is fully functional
✅ Filters work dynamically
✅ Cart persists across page refreshes
✅ All navigation links work
✅ Calculations are accurate
✅ No console errors
✅ Responsive on all devices
