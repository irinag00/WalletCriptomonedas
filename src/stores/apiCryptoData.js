import { defineStore } from "pinia";
import { getBTC, getDAI, getETH, getUSDC } from "../services/apiCrytoYa";

export const useApiDataStore = defineStore("apiData", {
  state: () => ({
    coinData: [],
    dataLoaded: false,
  }),
  actions: {
    async fetchCryptoData() {
      try {
        if (this.dataLoaded) {
          return; // No vuelvas a cargar los datos si ya están presentes
        }

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
            coin: coin,
            img: `src/assets/img-coin/${coin}.png`,
            priceBuy: response.data.totalAsk,
            priceSale: response.data.totalBid,
          });
        });
        this.dataLoaded = true; // Marca que los datos se han cargado
      } catch (error) {
        console.error("Error al obtener los datos de la API: ", error);
      }
    },
    clearCoinData() {
      this.coinData = []; // Método para limpiar coinData
    },
  },
});
