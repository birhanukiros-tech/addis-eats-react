# TeleBirr Loyalty Points Module

A small loyalty-points module for a TeleBirr shop.

## Features

- Earn points based on ETB spent
- Redeem points
- Prevent the balance from going below zero
- Use a custom earn rule
- Keep the points balance private
- Allow multiple loyalty cards with independent balances

## How the balance stays private

The points balance is declared inside the `createLoyalty()` function:

    let points = 0;

Because `points` is inside the function, code outside the function cannot directly access or change it.

The returned functions `earn()`, `redeem()`, and `balance()` form a closure over `points`.

The only way to interact with the balance is through these exposed operations.

## Default Earn Rule

The default rule gives:

    1 point for every 10 ETB

For example:

    250 ETB = 25 points

## Redeeming

The redeem operation uses Math.max() to make sure the balance never becomes negative.

## Custom Earn Rule

A different earn rule can be passed into `createLoyalty()`.

Example:

    const holiday = createLoyalty(
        etb => Math.floor(etb / 10) * 2
    );

This gives double points during the holiday promotion.

## Testing

Run:

    node run.js