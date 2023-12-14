import { defineStore } from "pinia";
import { getAllTransactions } from "../services/apiClient";
import { useApiDataStore } from "./apiCryptoData";
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

        const coinCodes = new Set(
          transactionsData.map((transaction) => transaction.crypto_code)
        );
        const coinPrices = await Promise.all(
          Array.from(coinCodes).map(async (cryptoCode) => {
            return {
              cryptoCode,
              price: await this.getCurrentPrice(cryptoCode),
            };
          })
        );

        const balances = transactionsData.reduce((balance, transaction) => {
          if (!balance[transaction.crypto_code]) {
            balance[transaction.crypto_code] = {
              totalCryptoAmount: 0,
              totalMoney: 0,
              profitLoss: 0,
            };
          }

          if (transaction.action === "purchase") {
            balance[transaction.crypto_code].totalCryptoAmount += parseFloat(
              transaction.crypto_amount
            );
            balance[transaction.crypto_code].totalMoney += parseFloat(
              transaction.money
            );
          } else if (transaction.action === "sale") {
            balance[transaction.crypto_code].totalCryptoAmount -= parseFloat(
              transaction.crypto_amount
            );
            balance[transaction.crypto_code].totalMoney -= parseFloat(
              transaction.money
            );
          }

          // Calculamos la ganancia o pérdida
          const currentPrice = coinPrices.find(
            (coin) => coin.cryptoCode === transaction.crypto_code
          )?.price;
          if (currentPrice) {
            const currentValue =
              balance[transaction.crypto_code].totalCryptoAmount * currentPrice;
            const profitLoss =
              currentValue - balance[transaction.crypto_code].totalMoney;
            balance[transaction.crypto_code].profitLoss = parseFloat(
              profitLoss.toFixed(2)
            );
          }
          const totalMoneyDifference =
            balance[transaction.crypto_code].totalMoney.toFixed(2) * -1;
          if (
            balance[transaction.crypto_code].profitLoss === totalMoneyDifference
          ) {
            balance[transaction.crypto_code].totalMoney = 0;
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

    async getCurrentPrice(cryptoCode) {
      try {
        const apiDataStore = useApiDataStore();
        await apiDataStore.fetchCryptoData();
        const coinData = apiDataStore.coinData;

        const currentCrypto = coinData.find(
          (crypto) => crypto.coin === cryptoCode
        );
        if (currentCrypto) {
          return currentCrypto.priceSale;
        } else {
          throw new Error("No se encontró la criptomoneda");
        }
      } catch (error) {
        console.error(
          "Error al obtener el precio actual de la criptomoneda.",
          error
        );
        return 0; // O un valor predeterminado si la búsqueda falla
      }
    },
  },
  getters: {},
});
