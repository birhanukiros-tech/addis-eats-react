# Addis Eats - Manual Test Plan

**Tested By**: ______________
**Date**: ______________
**Browser**: ______________

---

## TEST 1: Add, Change Qty, Remove Item

### 1.1 Add a Dish
- [ ] Click "Add to Cart" on any restaurant
- [ ] Notification appears: "[Dish] added to cart!"
- [ ] Cart count increases by 1
- [ ] Cart shows item with quantity 1

### 1.2 Change Quantity
- [ ] Click "+" button in cart
- [ ] Quantity increases
- [ ] Total updates
- [ ] Click "-" button in cart
- [ ] Quantity decreases
- [ ] Total updates

### 1.3 Remove Item
- [ ] Click "✕" button in cart
- [ ] Item removed
- [ ] Total updates
- [ ] If last item, shows empty state

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 2: Search Empty State

### 2.1 Search Existing
- [ ] Type "Ethiopian" in search
- [ ] Only Ethiopian restaurants shown
- [ ] Count updates

### 2.2 Search Non-Existing
- [ ] Type "xyz123" in search
- [ ] Shows "No restaurants found"
- [ ] Empty state appears
- [ ] Clear Filters button works

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 3: Checkout Validation

### 3.1 Bad Phone Number
- [ ] Add item to cart
- [ ] Click "Proceed to Checkout"
- [ ] Enter name: "Test User"
- [ ] Enter phone: "123456789"
- [ ] Click "Place Order"
- [ ] Error message appears: "❌ Invalid phone number"
- [ ] Phone field has red border

### 3.2 Good Phone Number
- [ ] Enter phone: "0912345678"
- [ ] Green border appears
- [ ] No error message

### 3.3 Good Phone with +
- [ ] Enter phone: "+251912345678"
- [ ] Green border appears
- [ ] No error message

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 4: Empty Cart Checkout

### 4.1 Block Empty Checkout
- [ ] Ensure cart is empty
- [ ] Click "Proceed to Checkout"
- [ ] Notification: "Your cart is empty!"
- [ ] Checkout form does NOT appear

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 5: Place Valid Order

### 5.1 Complete Order
- [ ] Add at least 2 items to cart
- [ ] Click "Proceed to Checkout"
- [ ] Enter name: "Test User"
- [ ] Enter phone: "0912345678"
- [ ] Click "Place Order"
- [ ] Confirmation modal appears
- [ ] Shows order details with total
- [ ] Cart clears after confirmation

### 5.2 Order Details
- [ ] Shows customer name
- [ ] Shows phone number
- [ ] Shows items list
- [ ] Shows correct total

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 6: Persistence

### 6.1 Reload with Cart
- [ ] Add 2 items to cart
- [ ] Refresh page
- [ ] Cart items still present
- [ ] Count shows correct number
- [ ] Total is correct

### 6.2 Cart After Order
- [ ] Complete an order
- [ ] Cart is empty
- [ ] Refresh page
- [ ] Cart remains empty

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 7: Error Handling

### 7.1 Broken Data URL
- [ ] Rename `data/menu.json` to `data/menu.json.bak`
- [ ] Refresh page
- [ ] Shows "Failed to load restaurants"
- [ ] Retry button appears
- [ ] No console errors

### 7.2 Corrupt Data
- [ ] Manually corrupt localStorage
- [ ] Refresh page
- [ ] Handles gracefully
- [ ] No console errors

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 8: UI States

### 8.1 Loading State
- [ ] Open page or click Retry
- [ ] Shows spinner
- [ ] Shows "Loading restaurants..."

### 8.2 Error State
- [ ] Break data URL
- [ ] Shows error message
- [ ] Shows Retry button

### 8.3 Empty State
- [ ] Search for non-existent item
- [ ] Shows "No restaurants found"
- [ ] Shows Clear Filters button

### 8.4 Success State
- [ ] Complete order
- [ ] Shows confirmation
- [ ] Cart clears

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 9: Responsive Layout

### 9.1 Desktop (1920x1080)
- [ ] 3-4 columns in grid
- [ ] Proper spacing
- [ ] All elements visible

### 9.2 Tablet (768x1024)
- [ ] 2 columns in grid
- [ ] Proper spacing
- [ ] All elements visible

### 9.3 Mobile (375x667)
- [ ] 1 column in grid
- [ ] Full width
- [ ] All elements visible
- [ ] Cart sidebar full width

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 10: Keyboard Navigation

### 10.1 Tab Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Logical order

### 10.2 Escape Key
- [ ] Press Escape with cart open
- [ ] Cart closes
- [ ] Press Escape with confirmation open
- [ ] Confirmation closes

**Result**: ☐ PASS / ☐ FAIL

---

## TEST 11: No Console Errors

### 11.1 Check Console
- [ ] Open DevTools Console
- [ ] Navigate through all flows
- [ ] No errors or warnings
- [ ] Clean console output

**Result**: ☐ PASS / ☐ FAIL

---

## SUMMARY

| Test | Status | Notes |
|------|--------|-------|
| 1. Add/Change/Remove | ☐ PASS / ☐ FAIL | |
| 2. Search Empty State | ☐ PASS / ☐ FAIL | |
| 3. Checkout Validation | ☐ PASS / ☐ FAIL | |
| 4. Empty Cart Checkout | ☐ PASS / ☐ FAIL | |
| 5. Place Valid Order | ☐ PASS / ☐ FAIL | |
| 6. Persistence | ☐ PASS / ☐ FAIL | |
| 7. Error Handling | ☐ PASS / ☐ FAIL | |
| 8. UI States | ☐ PASS / ☐ FAIL | |
| 9. Responsive Layout | ☐ PASS / ☐ FAIL | |
| 10. Keyboard Navigation | ☐ PASS / ☐ FAIL | |
| 11. No Console Errors | ☐ PASS / ☐ FAIL | |

**Overall Status**: ☐ PASS / ☐ FAIL

**Bugs Found**: 
1. 
2. 
3. 

**Notes**: 