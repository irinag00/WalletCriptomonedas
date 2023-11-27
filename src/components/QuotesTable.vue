<script setup>
import { ref, onMounted } from "vue";
import { getBTC, getDAI, getETH, getUSDC } from "../services/apiCrytoYa";

const coinData = ref([]);

onMounted(async () => {
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
      coinData.value.push({
        name: coinName,
        coin: coin.toUpperCase(),
        img: `src/assets/img-coin/${coin}.png`,
        priceBuy: response.data.ask,
        priceSale: response.data.bid,
      });
    });
  } catch (error) {
    console.error("Error al obtener los datos de la api: ", error);
  }
});
</script>
<template>
  <h2 class="font-normal text-2xl mb-3">Cotizaciones</h2>
  <div
    class="grid min-[1800px]:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full mb-3"
  >
    <div v-for="(crypto, index) in coinData" :key="index">
      <div>
        <div class="bg-white rounded-3xl border shadow-xl p-8 overflow-hidden">
          <div class="flex flex-col items-center justify-center text-center">
            <div class="mb-2">
              <img :src="crypto.img" alt="" style="width: 120px" />
              <h1 class="my-2 font-semibold text-xl text-gray-800">
                {{ crypto.name }}
              </h1>
            </div>
            <div class="flex flex-row items-center justify-between gap-6">
              <div>
                <span class="text-green-600 font-semibold">COMPRA</span>
                <h3 class="font-semibold text-sm text-gray-400">
                  1 {{ crypto.coin }}
                </h3>
                <h1 class="font-semibold text-lg text-gray-700">
                  $ {{ crypto.priceBuy }}
                </h1>
              </div>
              <div>
                <span class="text-red-600 font-semibold">VENTA</span>
                <h3 class="font-semibold text-sm text-gray-400">
                  1 {{ crypto.coin }}
                </h3>
                <h1 class="font-semibold text-lg text-gray-700">
                  $ {{ crypto.priceSale }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
