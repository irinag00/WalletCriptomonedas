<script>
import Navbar from "../components/layout/Navbar.vue";
import Balance from "../components/layout/Balance.vue";
import { useApiDataStore } from "../stores/apiCryptoData";
import { useUserStore } from "../stores/user";
import { ref, onMounted, onUnmounted } from "vue";
import { initFlowbite } from "flowbite";

// const store = useApiDataStore();

// const coinData = ref([]); // Usando ref para almacenar datos reactivos

// onMounted(async () => {
//   await store.fetchCryptoData();
//   // Actualizando el valor del ref con los datos del store
//   coinData.value = store.coinData;
// });
export default {
  components: {
    Navbar,
    Balance,
  },
  data() {
    return {
      coinData: [],
      selectedCoin: null,
      arsValue: null,
      cryptoValue: null,
      validationMoney: false,
    };
  },
  mounted() {
    // initFlowbite();
  },
  async created() {
    const store = useApiDataStore();
    await store.fetchCryptoData();
    this.coinData = store.coinData;
  },
  methods: {
    handleSelection(coin, img, priceBuy) {
      this.selectedCoin = { coin: coin, img: img, priceBuy: priceBuy };
      console.log("valor seleccionado: ", this.selectedCoin.coin);
    },
    async convertToCrypto() {
      if (this.selectedCoin && this.arsValue !== null && this.arsValue !== "") {
        const selectedCrypto = this.coinData.find(
          (crypto) => crypto.coin === this.selectedCoin.coin
        );
        if (selectedCrypto) {
          const arsToCrypto = this.arsValue / selectedCrypto.priceBuy;
          this.cryptoValue = arsToCrypto.toFixed(6);
        }
      } else {
        this.cryptoValue = null; // lo borro porque si no hat datos del otro lado, me sigue apareciendo el último numero calculado.
      }
    },
    async convertToArs() {
      if (
        this.selectedCoin &&
        this.cryptoValue !== null &&
        this.cryptoValue !== ""
      ) {
        const selectedCrypto = this.coinData.find(
          (crypto) => crypto.coin === this.selectedCoin.coin
        );
        if (selectedCrypto) {
          const cryptoToArs = this.cryptoValue * selectedCrypto.priceBuy;
          this.arsValue = cryptoToArs.toFixed(3);
        }
      } else {
        this.arsValue = null;
      }
    },
    validation() {
      if (this.arsValue <= 0 && this.cryptoValue <= 0) {
        this.validationMoney = true;
        if (this.selectedCoin === null) {
          this.validationMoney = true;
        }
      } else {
        this.validationMoney = false;
      }
    },
    purchase() {
      this.validation();
      const userStore = useUserStore();
      const user = userStore.getUserId();
      if (this.validationMoney === false) {
        let transaction = {
          user_id: user,
          action: "purchase",
          crypto_code: this.selectedCoin.coin,
          crypto_amount: String(this.cryptoValue),
          money: String(this.arsValue),
          datetime: this.formatDate,
        };
        console.log(transaction);
      }
    },
  },
  computed: {
    formatDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      let hh = today.getHours();
      let ss = today.getMinutes();

      today = dd + "-" + mm + "-" + yyyy + " " + hh + ":" + ss;

      return today;
    },
  },
};
</script>
<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Balance></Balance>
    <h1 class="font-semibold text-2xl text-center mt-3">Comprar</h1>
    <div class="w-full my-6">
      <div class="bg-white rounded-lg border shadow-xl p-8 overflow-hidden">
        <div class="max-w-xl mx-auto">
          <div
            class="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse flex items-center flex-col sm:flex-row mb-4"
          >
            <div class="flex mr-10">
              <div class="relative w-full">
                <input
                  type="number"
                  step="any"
                  min="1"
                  class="block p-2.5 w-500 z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="10000"
                  required
                  v-model="arsValue"
                  @input="convertToCrypto"
                />
              </div>
              <button
                disabled
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                <img
                  src="../assets/img-coin/arg.png"
                  style="width: 20px"
                  alt=""
                  class="mr-2"
                />
                ARS
              </button>
            </div>
            <div class="flex ml-10 mt-4">
              <div class="relative w-full">
                <input
                  type="number"
                  step="any"
                  min="1"
                  class="block p-2.5 w-500 z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="0.323"
                  required
                  v-model="cryptoValue"
                  @input="convertToArs"
                />
              </div>
              <button
                id="dropdown-crypto-button"
                data-dropdown-toggle="dropdown-crypto"
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                <div v-if="selectedCoin" class="inline-flex">
                  <img
                    :src="selectedCoin.img"
                    alt=""
                    style="width: 20px"
                    class="mr-3"
                  />
                  {{ selectedCoin.coin.toUpperCase() }}
                </div>
                <div v-else>Elija una moneda</div>
                <svg
                  class="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown-crypto"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-crypto-button"
                >
                  <li v-for="(crypto, index) in coinData" :key="index">
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      @click.prevent="
                        handleSelection(
                          crypto.coin,
                          crypto.img,
                          crypto.priceBuy
                        )
                      "
                    >
                      <div class="inline-flex items-center">
                        <img
                          :src="crypto.img"
                          alt=""
                          style="width: 20px"
                          class="mr-4"
                        />
                        {{ crypto.coin.toUpperCase() }}
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            v-show="validationMoney"
            class="text-red-500 font-semibold flex justify-center items-center flex-col sm:flex-row space-y-2 sm:space-y-0 mb-3"
            >Ingrese un valor válido para poder realizar la compra.</span
          >
          <div
            v-if="selectedCoin"
            class="flex justify-center items-center flex-col sm:flex-row space-y-2 sm:space-y-0 mb-3"
          >
            <h2 class="font-semibold">
              Cotización actual: ${{ selectedCoin.priceBuy }}
            </h2>
          </div>
          <div
            class="flex justify-center items-center flex-col sm:flex-row space-y-2 sm:space-y-0"
          >
            <button
              type="reset"
              class="text-sm text-blue-700 dark:text-blue-500 inline-flex items-center font-medium hover:underline"
            >
              Refrescar
              <svg
                class="w-3 h-3 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex justify-center items-center flex-col sm:flex-row space-y-2 sm:space-y-0"
          >
            <button
              type="button"
              class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-5"
              @click.prevent="purchase"
            >
              Realizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
