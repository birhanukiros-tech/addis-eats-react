export const totalByType = (txns, type) =>
    txns
        .filter(t => t.type === type)
        .reduce((sum, { amount }) => sum + amount, 0);


export const formatReceipts = txns =>
    txns.map(({ customer, amount }) =>
        `${customer}: ${amount} ETB`
    );


export const correctTransaction = (transaction, correctedAmount) => ({
    ...transaction,
    amount: correctedAmount
});