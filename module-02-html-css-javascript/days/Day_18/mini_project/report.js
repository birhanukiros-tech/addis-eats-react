// This module exports functions that process transactions

import { transactions } from `./transaction.js`;
// 1. Total by type (credit or debit)


export const totalByType = (txns, type) =>
    txns
        .filter(t => t.type === type)           // Keep only credit or debit
        .reduce((sum, { amount }) => sum + amount, 0); // Sum the amounts

// 2. Generate formatted receipt strings


export const generateReceipts = (txns) =>
    txns.map(({ customer, amount }) => 
        `🧾 Receipt for ${customer}: ${amount} ETB`
    );

// 3. Get totals by type (returns an object)


export const getTotals = (txns) => ({
    totalCredit: totalByType(txns, "credit"),
    totalDebit: totalByType(txns, "debit"),
    netBalance: totalByType(txns, "credit") - totalByType(txns, "debit")
});

// 4. Update a transaction using spread (immutability)


export const updateTransaction = (txn, updates) => ({
    ...txn,      
    ...updates})  
// 5. Filter transactions by type

export const filterByType = (txns, type) =>
    txns.filter(t => t.type === type);


// 6. Get customer summary (using destructuring)

export const getCustomerSummary = (txns) =>
    txns.map(({ customer, amount, type }) => 
        `${customer}: ${type === 'credit' ? '💰 +' : '💸 -'}${amount} ETB`
    );