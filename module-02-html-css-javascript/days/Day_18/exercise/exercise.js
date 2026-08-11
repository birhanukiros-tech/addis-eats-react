// 1. map + filter + reduce
const prices = [100, 250, 500, 800, 1200];

const pricesWithVat = prices.map(price => price * 1.15);
const under1000 = pricesWithVat.filter(price => price < 1000);
const grandTotal = under1000.reduce((sum, price) => sum + price, 0);

console.log("Prices with VAT:", pricesWithVat);
console.log("Prices under 1000 ETB:", under1000);
console.log("Grand total:", grandTotal, "ETB");


// 2. Object.entries + for...of
const customer = {
    name: "Birhanu",
    city: "Addis Ababa",
    balance: 2500
};

for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
}

// 3. Destructuring + parameter destructuring
const { name, city } = customer;

console.log(name);
console.log(city);

function greet({ name }) {
    console.log(`Hello, ${name}!`);
}

greet(customer);


// 4. Spread
const updatedCustomer = {
    ...customer,
    city: "Mekelle",
    phone: "0912345678"
};

console.log("Original:", customer);
console.log("Updated:", updatedCustomer);