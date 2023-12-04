import { defineStore } from "pinia";
import { getAllTransactions } from "../services/apiClient";
export const useTransactionStore = defineStore("transactionsStore", {
  state: () => ({
    transactions: [],
    balances: {},
    error: null,
  }),
  persist: true,
  actions: {
    async fetchTransactions(userId) {
      try {
        const response = await getAllTransactions(userId);
        this.transactions = response.data;
        console.log(response.data);
        console.log(this.transactions);
      } catch (error) {
        console.error("Error al obtener las transacciones.");
        throw error;
      }

      // if (transaction.action === "purchase") {
      //   if (!this.balances[transaction.crypto_code]) {
      //     this.balances[transaction.crypto_code] = parseFloat(
      //       transaction.crypto_amount
      //     );
      //   } else {
      //     this.balances[transaction.crypto_code] += parseFloat(
      //       transaction.crypto_amount
      //     );
      //   }
      // } else if (transaction.action === "sale") {
      //   if (
      //     this.balances[transaction.crypto_code] &&
      //     this.balances[transaction.crypto_code] >=
      //       parseFloat(transaction.crypto_amount)
      //   ) {
      //     this.balances[transaction.crypto_code] -= parseFloat(
      //       transaction.crypto_amount
      //     );
      //   } else {
      //     this.error = "No puedes realizar esta venta.";
      //   }
      // }
    },
  },
  getters: {
    getTransactions(state) {
      console.log(state.transactions);
      return state.transactions;
    },
    getBalances() {
      return this.balances;
    },
  },
});
