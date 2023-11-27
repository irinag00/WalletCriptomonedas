import { defineStore } from "pinia";
import { getBTC, getDAI, getETH, getUSDC } from "../services/apiCrytoYa";

export const useApiDataStore = defineStore("apiData", {
  state: () => ({
    coinData: [],
  }),
  actions: {
    async fetchCryptoData() {
      try {
        const [btcResponse, daiResponse, ethResponse, usdcResponse] =
          await Promise.all([
            getBTC("btc"),
            getDAI("dai"),
            getETH("eth"),
            getUSDC("usdc"),
          ]);
        const responses = [btcResponse, daiResponse, ethResponse, usdcResponse];
        responses.forEach((response, index) => {
          const coinName = ["Bitcoin", "Dai", "Ethereum", "Usd Coin"][index];
          const coin = ["btc", "dai", "eth", "usdc"][index];
          this.coinData.push({
            name: coinName,
            coin: coin.toUpperCase(),
            img: `src/assets/img-coin/${coin}.png`,
            priceBuy: response.data.ask,
            priceSale: response.data.bid,
          });
        });
      } catch (error) {
        console.error("Error al obtener los datos de la API: ", error);
      }
    },
  },
});
