import { withVat, format, total } from "./pricing.js";
import { orders } from "./orders.js";

// Calculate total for each order
const ordersWithTotals = orders.map(order => {
    const orderTotal = order.items.reduce((sum, { price, qty }) => {
        return sum + total(price, qty);
    }, 0);

    return {
        ...order,
        total: orderTotal
    };
});

// Orders over 500 ETB
const largeOrders = ordersWithTotals.filter(order => order.total > 500);

// Grand total
const grandTotal = ordersWithTotals.reduce((sum, order) => {
    return sum + order.total;
}, 0);

// Print summary
console.log("=== Addis Market Order Summary ===");

ordersWithTotals.forEach(order => {
    console.log(
        `Order #${order.id} - ${order.customer}: ${format(withVat(order.total))}`
    );
});

console.log("\nOrders over 500 ETB:");

largeOrders.forEach(order => {
    console.log(
        `Order #${order.id} - ${order.customer}: ${format(withVat(order.total))}`
    );
});

console.log(`\nGrand Total: ${format(withVat(grandTotal))}`);