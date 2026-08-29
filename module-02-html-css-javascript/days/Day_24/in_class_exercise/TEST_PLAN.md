# Addis Eats - Test Plan

## Test Environment
- Browser: Chrome, Firefox, Safari, Edge
- Devices: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- Network: Online/Offline

---

## 1. DATA LOADING TESTS

### Test 1.1: Initial Load
- **Action**: Open index.html
- **Expected**: Loading spinner appears, then restaurants display
- **Pass/Fail**: _____

### Test 1.2: Data Load Success
- **Action**: Check console
- **Expected**: "✅ Loaded X restaurants" message
- **Pass/Fail**: _____

### Test 1.3: Error Handling
- **Action**: Rename data/menu.json to data/menu.json.bak
- **Expected**: Error message "Failed to load restaurants" with Retry button
- **Pass/Fail**: _____

### Test 1.4: Retry
- **Action**: Click Retry button after error
- **Expected**: Reloads data
- **Pass/Fail**: _____

---

## 2. SEARCH & FILTER TESTS

### Test 2.1: Live Search
- **Action**: Type "Ethiopian" in search
- **Expected**: Results filter live, count updates
- **Pass/Fail**: _____

### Test 2.2: Empty Search
- **Action**: Search for "xyz123"
- **Expected**: Shows "No restaurants found" empty state
- **Pass/Fail**: _____

### Test 2.3: Clear Filters
- **Action**: Click "Clear Filters" button
- **Expected**: All filters reset, all restaurants shown
- **Pass/Fail**: _____

### Test 2.4: Cuisine Filter
- **Action**: Select "Ethiopian" from cuisine filter
- **Expected**: Only Ethiopian restaurants shown
- **Pass/Fail**: _____

### Test 2.5: Price Filter
- **Action**: Select "Budget" from price filter
- **Expected**: Only budget restaurants shown
- **Pass/Fail**: _____

### Test 2.6: Rating Filter
- **Action**: Select "4.5+" from rating filter
- **Expected**: Only restaurants with 4.5+ rating shown
- **Pass/Fail**: _____

### Test 2.7: Combined Filters
- **Action**: Search "Ethiopian" + Budget + 4.0+
- **Expected**: All filters applied correctly
- **Pass/Fail**: _____

---

## 3. CART TESTS

### Test 3.1: Add to Cart
- **Action**: Click "Add to Cart" on a restaurant
- **Expected**: Notification appears, cart count increases
- **Pass/Fail**: _____

### Test 3.2: Multiple Items
- **Action**: Add same item multiple times
- **Expected**: Quantity increases, not duplicate entries
- **Pass/Fail**: _____

### Test 3.3: Increase Quantity
- **Action**: Click "+" button in cart
- **Expected**: Quantity increases, total updates
- **Pass/Fail**: _____

### Test 3.4: Decrease Quantity
- **Action**: Click "-" button in cart
- **Expected**: Quantity decreases, total updates
- **Pass/Fail**: _____

### Test 3.5: Remove Item
- **Action**: Click "✕" button in cart
- **Expected**: Item removed, total updates
- **Pass/Fail**: _____

### Test 3.6: Cart Total
- **Action**: Add 2 items at 150 ETB each
- **Expected**: Total shows 300.00 ETB
- **Pass/Fail**: _____

### Test 3.7: Empty Cart
- **Action**: Remove all items
- **Expected**: Shows "Your cart is empty" message
- **Pass/Fail**: _____

---

## 4. PERSISTENCE TESTS

### Test 4.1: Save to localStorage
- **Action**: Add items to cart, inspect localStorage
- **Expected**: 'addis_cart' key exists with data
- **Pass/Fail**: _____

### Test 4.2: Load from localStorage
- **Action**: Refresh page after adding items
- **Expected**: Cart items persist
- **Pass/Fail**: _____

### Test 4.3: Corrupt Data
- **Action**: Manually corrupt localStorage data
- **Expected**: App handles gracefully, resets to empty
- **Pass/Fail**: _____

---

## 5. CHECKOUT TESTS

### Test 5.1: Show Checkout Form
- **Action**: Click "Proceed to Checkout" with items in cart
- **Expected**: Checkout form appears
- **Pass/Fail**: _____

### Test 5.2: Empty Cart Checkout
- **Action**: Click "Proceed to Checkout" with empty cart
- **Expected**: Notification "Your cart is empty!"
- **Pass/Fail**: _____

### Test 5.3: Name Validation
- **Action**: Submit checkout with name < 2 characters
- **Expected**: Error "Name must be at least 2 characters"
- **Pass/Fail**: _____

### Test 5.4: Phone Validation - Valid
- **Action**: Enter "0912345678"
- **Expected**: Field shows success (green border)
- **Pass/Fail**: _____

### Test 5.5: Phone Validation - Valid with +
- **Action**: Enter "+251912345678"
- **Expected**: Field shows success (green border)
- **Pass/Fail**: _____

### Test 5.6: Phone Validation - Invalid
- **Action**: Enter "123456789"
- **Expected**: Error message appears
- **Pass/Fail**: _____

### Test 5.7: Order Confirmation
- **Action**: Submit valid checkout
- **Expected**: Confirmation modal shows with order details
- **Pass/Fail**: _____

### Test 5.8: Cart Cleared After Order
- **Action**: Complete order
- **Expected**: Cart is empty, total reset
- **Pass/Fail**: _____

---

## 6. UI/UX TESTS

### Test 6.1: Desktop Layout
- **Action**: View on desktop (1920x1080)
- **Expected**: 3-4 columns, proper spacing
- **Pass/Fail**: _____

### Test 6.2: Tablet Layout
- **Action**: View on tablet (768x1024)
- **Expected**: 2 columns, proper spacing
- **Pass/Fail**: _____

### Test 6.3: Mobile Layout
- **Action**: View on mobile (375x667)
- **Expected**: 1 column, full width
- **Pass/Fail**: _____

### Test 6.4: Dark Mode
- **Action**: Click theme toggle
- **Expected**: Colors invert, toggle changes
- **Pass/Fail**: _____

### Test 6.5: Cart Sidebar
- **Action**: Click cart button
- **Expected**: Sidebar slides in from right
- **Pass/Fail**: _____

### Test 6.6: Keyboard Shortcut
- **Action**: Press Escape key
- **Expected**: Closes cart and confirmation modals
- **Pass/Fail**: _____

---

## 7. ACCESSIBILITY TESTS

### Test 7.1: ARIA Labels
- **Action**: Inspect elements
- **Expected**: aria-label, role attributes present
- **Pass/Fail**: _____

### Test 7.2: Keyboard Navigation
- **Action**: Tab through all interactive elements
- **Expected**: Focus order is logical
- **Pass/Fail**: _____

### Test 7.3: Screen Reader
- **Action**: Run screen reader
- **Expected**: All content is announced
- **Pass/Fail**: _____

---

## 8. PERFORMANCE TESTS

### Test 8.1: Load Time
- **Action**: Reload page with DevTools Network tab open
- **Expected**: < 1s for initial load
- **Pass/Fail**: _____

### Test 8.2: Search Performance
- **Action**: Type rapidly in search
- **Expected**: No lag, smooth filtering
- **Pass/Fail**: _____

### Test 8.3: Image Loading
- **Action**: Check images load lazily
- **Expected**: Images load as scrolled
- **Pass/Fail**: _____

---

## TEST SUMMARY

| Section | Pass | Fail | Notes |
|---------|------|------|-------|
| Data Loading | | | |
| Search & Filter | | | |
| Cart | | | |
| Persistence | | | |
| Checkout | | | |
| UI/UX | | | |
| Accessibility | | | |
| Performance | | | |

**Overall Status**: ☐ PASS / ☐ FAIL

**Tested By**: ______________

**Date**: ______________

**Bugs Found**: 
1. 
2. 
3. 

**Notes**: 