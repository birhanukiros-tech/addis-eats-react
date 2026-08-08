const {
    subtotal,
    discountBy,
    withVat,
    makeReceiptMaker
} = require("./order");

const memberDiscount = discountBy(0.10);
const makeReceipt = makeReceiptMaker();

const order1 = subtotal(120, 200);
const total1 = withVat(order1);
console.log(makeReceipt(total1));

const order2 = subtotal(300, 150);
const discounted2 = memberDiscount(order2);
const total2 = withVat(discounted2);
console.log(makeReceipt(total2));

const order3 = subtotal(100, 250, 200);
const discounted3 = memberDiscount(order3);
const total3 = withVat(discounted3);
console.log(makeReceipt(total3));