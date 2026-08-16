# TeleBirr Transaction Report

A small JavaScript  mini project report that process an array of TeleBirr transactions from an Addis shop.

## Modules

### transactions.js

Contains and exports the transaction data array.

Each transaction contains:

* `id`
* `customer`
* `amount`
* `type`

The transaction type can be `credit` or `debit`.

### report.js
Contains and exports reusabel summary functions.

It uses:

* `filter()` to separate transactions by type
* `reduce()` to calculate totals
* `map()` to create formatted receipt strings
* destructuring to access transaction properties
* spread syntax to create an updated transaction without changing the original

### app.js

Imports the transaction data and report functions, then runs the report and prints the results.

## How to Run

Make sure the project uses ES modules, then run:

```bash
node app.js
```

## Concepts Practiced

* JavaScript modules
* `import` and `export`
* `map()`
* `filter()`
* `reduce()`
* Destructuring
* Spread syntax
* Objects and arrays
* Template literals
