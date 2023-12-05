import { defineStore } from "pinia";
import { getAllTransactions } from "../services/apiClient";
export const useTransactionStore = defineStore("transactionsStore", {
  state: () => ({
    balances: {},
    error: null,
  }),
  persist: true,
  actions: {
    async calculateCryptoBalances(userId) {
      try {
        const userCryptoAssets = await getAllTransactions(userId);
        const transactionsData = userCryptoAssets.data;

        const balances = transactionsData.reduce((balance, transaction) => {
          if (!balance[transaction.crypto_code]) {
            balance[transaction.crypto_code] = 0;
          }

          if (transaction.action === "purchase") {
            balance[transaction.crypto_code] += parseFloat(
              transaction.crypto_amount
            );
          } else if (transaction.action === "sale") {
            balance[transaction.crypto_code] -= parseFloat(
              transaction.crypto_amount
            );
          }
          return balance;
        }, {});
        console.log("balances", balances);
        return balances;
      } catch (error) {
        console.error("Error al obtener las transacciones.");
        return {}; //por si ocurre un error, me devulve un arreglo vacío
      }
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
