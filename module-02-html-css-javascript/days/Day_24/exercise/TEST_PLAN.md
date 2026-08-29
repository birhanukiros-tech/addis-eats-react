# Addis Eats - Test Plan

## Test Environment
- Browser: Chrome, Firefox, Safari, Edge
- Devices: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

---

## 1. DATA LOADING TESTS

### Test 1.1: Initial Load
- **Action**: Open index.html
- **Expected**: Loading spinner appears, then restaurants display
- **Pass/Fail**: _____

### Test 1.2: Error Handling
- **Action**: Rename data/menu.json
- **Expected**: Error message with Retry button
- **Pass/Fail**: _____

### Test 1.3: Retry
- **Action**: Click Retry after error
- **Expected**: Reloads data successfully
- **Pass/Fail**: _____

---

## 2. SEARCH & FILTER TESTS

### Test 2.1: Live Search
- **Action**: Type "Ethiopian" in search
- **Expected**: Results filter live
- **Pass/Fail**: _____

### Test 2.2: Empty Search
- **Action**: Search for "xyz123"
- **Expected**: Shows "No restaurants found"
- **Pass/Fail**: _____

### Test 2.3: Clear Filters
- **Action**: Click "Clear Filters"
- **Expected**: All restaurants shown
- **Pass/Fail**: _____

### Test 2.4: Cuisine Filter
- **Action**: Select "Ethiopian"
- **Expected**: Only Ethiopian restaurants
- **Pass/Fail**: _____

### Test 2.5: Combined Filters
- **Action**: Search + Budget + 4.0+
- **Expected**: All filters applied
- **Pass/Fail**: _____

---

## 3. CART TESTS

### Test 3.1: Add to Cart
- **Action**: Click "Add to Cart"
- **Expected**: Notification appears, count increases
- **Pass/Fail**: _____

### Test 3.2: Multiple Items
- **Action**: Add same item multiple times
- **Expected**: Quantity increases, not duplicates
- **Pass/Fail**: _____

### Test 3.3: Increase Quantity
- **Action**: Click "+" in cart
- **Expected**: Quantity increases, total updates
- **Pass/Fail**: _____

### Test 3.4: Decrease Quantity
- **Action**: Click "-" in cart
- **Expected**: Quantity decreases, total updates
- **Pass/Fail**: _____

### Test 3.5: Remove Item
- **Action**: Click "✕" in cart
- **Expected**: Item removed, total updates
- **Pass/Fail**: _____

### Test 3.6: Cart Total
- **Action**: Add 2 items at 150 ETB each
- **Expected**: Total shows 300.00 ETB
- **Pass/Fail**: _____

### Test 3.7: Persistence
- **Action**: Refresh page with items in cart
- **Expected**: Cart items persist
- **Pass/Fail**: _____

---

## 4. CHECKOUT TESTS (Step 3)

### Test 4.1: Show Checkout Form
- **Action**: Click "Proceed to Checkout" with items
- **Expected**: Checkout form appears
- **Pass/Fail**: _____

### Test 4.2: Empty Cart Checkout
- **Action**: Click "Proceed to Checkout" with empty cart
- **Expected**: Notification "Your cart is empty!"
- **Pass/Fail**: _____

### Test 4.3: Name Validation
- **Action**: Submit with name < 2 characters
- **Expected**: Error "Name must be at least 2 characters"
- **Pass/Fail**: _____

### Test 4.4: Phone Validation - Valid
- **Action**: Enter "0912345678"
- **Expected**: Field shows success (green border)
- **Pass/Fail**: _____

### Test 4.5: Phone Validation - Valid with +
- **Action**: Enter "+251912345678"
- **Expected**: Field shows success (green border)
- **Pass/Fail**: _____

### Test 4.6: Phone Validation - Invalid
- **Action**: Enter "123456789"
- **Expected**: Error message appears
- **Pass/Fail**: _____

### Test 4.7: Order Confirmation (Step 4)
- **Action**: Submit valid checkout
- **Expected**: Confirmation modal with order details
- **Pass/Fail**: _____

### Test 4.8: Cart Cleared After Order
- **Action**: Complete order
- **Expected**: Cart is empty, total reset
- **Pass/Fail**: _____

---

## 5. UI/UX TESTS

### Test 5.1: Desktop Layout
- **Action**: View on desktop
- **Expected**: 3-4 columns, proper spacing
- **Pass/Fail**: _____

### Test 5.2: Tablet Layout
- **Action**: View on tablet
- **Expected**: 2 columns, proper spacing
- **Pass/Fail**: _____

### Test 5.3: Mobile Layout
- **Action**: View on mobile
- **Expected**: 1 column, full width
- **Pass/Fail**: _____

### Test 5.4: Dark Mode
- **Action**: Click theme toggle
- **Expected**: Colors invert
- **Pass/Fail**: _____

### Test 5.5: Cart Sidebar
- **Action**: Click cart button
- **Expected**: Sidebar slides in
- **Pass/Fail**: _____

### Test 5.6: Keyboard Shortcut
- **Action**: Press Escape key
- **Expected**: Closes modals
- **Pass/Fail**: _____

---

## TEST SUMMARY

| Section | Pass | Fail | Notes |
|---------|------|------|-------|
| Data Loading | | | |
| Search & Filter | | | |
| Cart | | | |
| Checkout | | | |
| UI/UX | | | |

**Overall Status**: ☐ PASS / ☐ FAIL

**Tested By**: ______________

**Date**: ______________

**Bugs Found**: 
1. 
2. 
3. 

**Notes**: 