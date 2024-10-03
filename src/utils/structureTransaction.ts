import { Transaction } from "@/declarations/backend/backend.did";  

export const structureTransaction = (transactions: [string, Transaction][]) => {
    let structuredTransactions: Transaction[] = [];
    transactions.map((transaction) => {
        structuredTransactions.push(transaction[1]);
    });
    return structuredTransactions;
};