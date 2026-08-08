// 1. VAT with a default parameter

function vat(amount, rate = 0.15) {
    return amount * (1 + rate);
}

const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);

console.log("1. VAT:", vat(1000));
console.log("   VAT arrow:", vatArrow(1000));


// 2. makeCounter closure

function makeCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();

console.log("2. Counter:", counter());
console.log("   Counter:", counter());
console.log("   Counter:", counter());

// count stays private because it is declared inside makeCounter()
// and can only be accessed through the returned function.


// 3. discountBy factory

function discountBy(rate) {
    return (price) => price * (1 - rate);
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("3. Member price:", memberPrice(1000), "ETB");
console.log("   Sale price:", salePrice(1000), "ETB");


// 4. Higher-order applyToAll

function applyToAll(list, fn) {
    return list.map(fn);
}

const prices = [100, 200, 300, 400];

const pricesWithVat = applyToAll(
    prices,
    (price) => vat(price)
);

console.log("4. Prices with VAT:", pricesWithVat);


// 5. forEach with Ethiopian cities

const cities = [
    "Addis Ababa",
    "Mekelle",
    "Bahir Dar",
    "Hawassa",
    "Gondar"
];

console.log("5. Ethiopian cities:");

cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});