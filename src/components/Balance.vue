<script>
import { ref, watchEffect } from "vue";
export default {
  props: {
    balance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showBalance: null,
    };
  },
  methods: {
    getCoinImage(clave) {
      // return `src/assets/img-coin/${clave}.png`;
      return `https://res.cloudinary.com/dsdmjhkms/image/upload/v1706624495/img-coin/${clave}.png`;
    },
  },
};
</script>
<template>
  <div v-if="Object.keys(balance).length === 0">
    <div className="flex flex-col items-center justify-center m-3 p-3">
      <i
        class="bi bi-cash-coin mb-1 text-gray-600"
        style="font-size: 100px"
      ></i>
      <h2 class="text-2xl font-bold text-cyan-600 my-2">
        ¡Aún no has realizado transacciones!
      </h2>
      <h3 class="text-base font-semibold text-gray-600 my-2">
        Empieza a comprar y vender criptos para cambiar tu vida...
      </h3>
    </div>
  </div>
  <div v-else>
    <div class="border-t border-gray-200 mt-10">
      <h2 class="text-2xl font-bold mt-5">Mis saldos</h2>
      <div
        class="grid min-[1800px]:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-4 mt-5"
      >
        <div
          v-for="(valor, clave) in balance"
          :key="clave"
          v-show="valor.totalCryptoAmount > 0"
        >
          <div
            class="relative flex flex-col mb-6 break-words shadow-md rounded-2xl bg-clip-border overflow-hidden bg-gray-100 hover:bg-gray-200"
          >
            <div class="flex-auto p-4">
              <div class="flex flex-wrap -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p
                      class="mb-0 font-sans font-semibold leading-normal text-cyan-600 text-xl"
                    >
                      {{ clave.toUpperCase() }}
                    </p>
                    <h5 class="mb-0 font-semibold text-lg">
                      <span>Total en {{ clave.toUpperCase() }} </span> =
                      {{ valor.totalCryptoAmount }}
                    </h5>
                    <h5 class="mb-0 font-semibold text-lg">
                      <span>ARS</span> = ${{ valor.totalMoney.toFixed(2) }}
                    </h5>
                  </div>
                </div>
                <div class="w-4/12 max-w-full px-3 text-right flex-0">
                  <div
                    class="inline-block w-12 h-12 text-center rounded-lg shadow-soft-2xl"
                  >
                    <img :src="getCoinImage(clave)" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
