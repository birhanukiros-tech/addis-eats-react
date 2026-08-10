 // 1 converting stiring to number
let bill = "800";
bill = Number(bill);

let partySize = 6;

// Tip
let tipAmount;

if (bill > 300) {
    tipAmount = bill * 0.10;
} else {
    tipAmount = bill * 0.05;
}

// Service fee
let paymentMethod = "TeleBirr";
let serviceFee;

switch (paymentMethod) {
    case "TeleBirr":
        serviceFee = bill * 0.02;
        break;

    case "CBE Birr":
        serviceFee = bill * 0.03;
        break;

    default:
        serviceFee = bill * 0.02;
}

// Total
let total = bill + tipAmount + serviceFee;

// Per person
let perPerson = total / partySize;

console.log(`
=== TeleBirr Tip and Split Calculator ===
Bill: ${bill} ETB
Tip: ${tipAmount} ETB
Service Fee: ${serviceFee} ETB
Total: ${total} ETB
Party Size: ${partySize}
Per Person: ${perPerson} ETB
`);