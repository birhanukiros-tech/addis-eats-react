// imports everything and generates the report

import { transactions } from './transactions.js';
import {
    totalByType,
    generateReceipts,
    getTotals,
    updateTransaction,
    filterByType,
    getCustomerSummary
} from './report.js';

// 1. Display totals

console.log('\n' + '='.repeat(50));
console.log('TELEBIRR TRANSACTION REPORT');
console.log('='.repeat(50));

const totals = getTotals(transactions);

console.log(`\n Total Credit: ${totals.totalCredit} ETB`);
console.log(` Total Debit: ${totals.totalDebit} ETB`);
console.log(` Net Balance: ${totals.netBalance} ETB`);

// 2. Display receipts

console.log('\n' + '-'.repeat(50));
console.log('🧾 RECEIPTS');
console.log('-'.repeat(50));

const receipts = generateReceipts(transactions);
receipts.forEach(receipt => console.log(receipt));

// 3. Display customer summaries

console.log('\n' + '-'.repeat(50));
console.log('👤 CUSTOMER SUMMARY');
console.log('-'.repeat(50));

const summaries = getCustomerSummary(transactions);
summaries.forEach(summary => console.log(summary));

// 4. Filter and display credits only

console.log('\n' + '-'.repeat(50));
console.log(' CREDIT TRANSACTIONS ONLY');
console.log('-'.repeat(50));

const credits = filterByType(transactions, "credit");
credits.forEach(({ customer, amount }) => 
    console.log(`${customer}: +${amount} ETB`)
);

// 5. Filter and display debits only

console.log('\n' + '-'.repeat(50));
console.log('💸 DEBIT TRANSACTIONS ONLY');
console.log('-'.repeat(50));

const debits = filterByType(transactions, "debit");
debits.forEach(({ customer, amount }) => 
    console.log(`${customer}: -${amount} ETB`)
);

// 6. Demonstrate spread (updating without mutation)

console.log('\n' + '-'.repeat(50));
console.log(' TRANSACTION UPDATE (Spread Demo)');
console.log('-'.repeat(50));

// Original transaction
const originalTxn = transactions[0];
console.log('Original:', originalTxn);

// Updated copy (fix amount from 250 to 300)
const updatedTxn = updateTransaction(originalTxn, { amount: 300 });
console.log('Updated:  ', updatedTxn);

// Verify original is unchanged
console.log('Original still unchanged:', originalTxn);

// 7. Demonstrate destructuring in callback


console.log('\n' + '-'.repeat(50));
console.log('FORMATTED TRANSACTION LIST');
console.log('-'.repeat(50));

// Using destructuring in map callback
const formattedList = transactions.map(({ id, customer, amount, type }) => 
    `#${id} | ${customer.padEnd(10)} | ${type.padEnd(6)} | ${amount} ETB`
);

formattedList.forEach(item => console.log(item));

// ============================================
// 8. Summary statistics
// ============================================

console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY STATISTICS');
console.log('='.repeat(50));

console.log(`Total Transactions: ${transactions.length}`);
console.log(`Credit Transactions: ${credits.length}`);
console.log(`Debit Transactions: ${debits.length}`);
console.log(`Average Transaction: ${(totals.totalCredit + totals.totalDebit) / transactions.length} ETB`);

console.log('\n✅ Report Generated Successfully!');