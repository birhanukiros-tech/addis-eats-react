const bill = Number(process.argv[2]);
const partySize = Number(process.argv[3]);

let tipRate;

if (bill > 300) {
    tipRate = 0.10;
} else {
    tipRate = 0.05;
}

const tip = bill * tipRate;
const total = bill + tip;
const perPerson = total / partySize;

let service;
switch (process.argv[4]) {
    case "TeleBirr":
        service = 10;
        break;

    case "CBE Birr":
        service = 5;
        break;

    default:
        service = 0;
}

const finalTotal = total + service;
const finalPerPerson = finalTotal / partySize;

console.log(`Bill: ${bill} ETB`);
console.log(`Tip: ${(tipRate * 100)}%`);
console.log(`Tip amount: ${tip.toFixed(2)} ETB`);
console.log(`Service fee: ${service.toFixed(2)} ETB`);
console.log(`Total: ${finalTotal.toFixed(2)} ETB`);
console.log(`Per person: ${finalPerPerson.toFixed(2)} ETB`);