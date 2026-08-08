function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
    let points = 0;

    return {
        earn(etb) {
            points += earnRule(etb);
        },

        redeem(amount) {
            points = Math.max(0, points - amount);
        },

        balance() {
            return points;
        }
    };
}

module.exports = createLoyalty;