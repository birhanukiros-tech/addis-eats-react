function getDeliveryFee(total) {
    if (total >= 1000) {
        return 0;
    }
    if (total >= 500) {
        return 50;
    }
    return 80;
}
function getDeliveryTime() {
    return "30–45 minutes";
}

export { getDeliveryFee, getDeliveryTime };