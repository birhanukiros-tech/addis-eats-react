export function withVat(amount) {
    return amount * 1.15;
}

export function format(amount) {
    return `${amount.toFixed(2)} ETB`;
}

export function total(price, qty) {
    return price * qty;
}