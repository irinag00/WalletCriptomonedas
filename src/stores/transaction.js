import { defineStore } from "pinia";
export const useTransactionStore = defineStore("transactionsStore", {
  state: () => ({
    transactions: [],
    balances: {},
    error: null,
  }),
  actions: {
    setTransactionUpdateBalance(transaction) {
      this.transactions.push(transaction); //agrega una nueva transaccion

      if (transaction.action === "purchase") {
        if (!this.balances[transaction.crypto_code]) {
          this.balances[transaction.crypto_code] = parseFloat(
            transaction.crypto_amount
          );
        } else {
          this.balances[transaction.crypto_code] += parseFloat(
            transaction.crypto_amount
          );
        }
      } else if (transaction.action === "sale") {
        if (
          this.balances[transaction.crypto_code] &&
          this.balances[transaction.crypto_code] >=
            parseFloat(transaction.crypto_amount)
        ) {
          this.balances[transaction.crypto_code] -= parseFloat(
            transaction.crypto_amount
          );
        } else {
          this.error = "No puedes realizar esta venta.";
        }
      }
    },
  },
  getters: {
    getTransactions() {
      return this.transactions;
    },
    getBalances() {
      return this.balances;
    },
  },
});
