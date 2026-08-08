const createLoyalty = require("./loyalty");


// Normal loyalty card
const card = createLoyalty();

card.earn(250);
console.log("Card balance after earning:", card.balance());

card.redeem(10);
console.log("Card balance after redeeming:", card.balance());


// Holiday rule: double points
const holiday = createLoyalty(
    etb => Math.floor(etb / 10) * 2
);

holiday.earn(250);
console.log("Holiday card balance:", holiday.balance());


// Second card has its own independent balance
const secondCard = createLoyalty();

secondCard.earn(100);
console.log("Second card balance:", secondCard.balance());

console.log("First card balance:", card.balance());