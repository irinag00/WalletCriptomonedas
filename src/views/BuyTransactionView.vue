<script>
import Navbar from "../components/layout/Navbar.vue";
import Balance from "../components/layout/Balance.vue";
import Hero from "../components/layout/Hero.vue";
import { useApiDataStore } from "../stores/apiCryptoData";
import { useUserStore } from "../stores/user";
import { useTransactionStore } from "../stores/transaction";
import { newTransaction } from "../services/apiClient";
import { initFlowbite } from "flowbite";
import Swal from "sweetalert2";

export default {
  components: {
    Navbar,
    Balance,
    Hero,
  },
  data() {
    return {
      coinData: [],
      selectedCoin: null,
      arsValue: null,
      cryptoValue: null,
      validationMoney: false,
      nameSection: "Compra",
    };
  },
  mounted() {
    initFlowbite();
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
          this.arsValue = cryptoToArs.toFixed(2);
        }
      } else {
        this.arsValue = null;
      }
    },
    resetInput() {
      this.cryptoValue = "";
      this.arsValue = "";
    },
    validation() {
      if (
        (this.arsValue <= 0 && this.cryptoValue <= 0) ||
        this.selectedCoin === null
      ) {
        this.validationMoney = true;
      } else {
        this.validationMoney = false;
      }
      console.log(this.validationMoney);
    },
    async purchase() {
      try {
        this.validation();
        const userStore = useUserStore();
        const user = userStore.getUserId();
        const transactionStore = useTransactionStore();

        if (this.validationMoney === false) {
          const result = await Swal.fire({
            title: "Desea finalizar la transacción?",
            html: `Valor a comprar: <b>${this.cryptoValue}${this.selectedCoin.coin}</b>. <br/> Valor a pagar: <b>${this.arsValue}ars</b>`,
            icon: "warning",
            iconColor: "#04b3c3",
            showCancelButton: true,
            confirmButtonColor: "#04354c",
            cancelButtonColor: "#04b3c3",
            confirmButtonText: "Finalizar compra",
            cancelButtonText: "Cancelar",
          });

          if (result.isConfirmed) {
            Swal.fire({
              title: "Compra realizada con éxito!",
              text: "Muchas gracias por confiar en nosotros.",
              icon: "success",
            });
            let transaction = {
              user_id: user,
              action: "purchase",
              crypto_code: this.selectedCoin.coin,
              crypto_amount: String(this.cryptoValue),
              money: String(this.arsValue),
              datetime: this.formatDate,
            };
            console.log(transaction);
            //Envio los datos a la API
            const response = await newTransaction(transaction);
            if (response) {
              console.log("Información enviada correctamente.");
            } else {
              console.error("Hubo un error al enviar la información.");
            }
            // await transactionStore.fetchTransactions(user);
          }
          this.resetInput();
        }
      } catch (error) {
        console.error("No se pudieron enviar los datos.");
      }
    },
  },
  computed: {
    formatDate() {
      const dateTime = new Date();
      const dd = String(dateTime.getDate()).padStart(2, "0");
      const mm = String(dateTime.getMonth() + 1).padStart(2, "0");
      const yyyy = dateTime.getFullYear();
      const hh = String(dateTime.getHours()).padStart(2, "0");
      const ss = String(dateTime.getMinutes()).padStart(2, "0");

      // today = dd + "-" + mm + "-" + yyyy + " " + hh + ":" + ss;
      const formattedDateTime = `${dd}-${mm}-${yyyy} ${hh}:${ss}`;

      return formattedDateTime;
    },
  },
};
</script>
<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Balance></Balance>
    <Hero :sectionName="nameSection"></Hero>
    <div class="w-full">
      <div class="shadow-xl rounded-lg py-14 overflow-hidden m-0">
        <div class="max-w-xl mx-auto">
          <div
            class="flex gap-4 space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 flex items-center flex-col lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center mb-4"
          >
            <div class="flex mr-10 justify-center">
              <div class="relative">
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
            <div class="flex ml-10 justify-center">
              <div class="relative">
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
                <i class="bi bi-chevron-down ms-2.5"></i>
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
              @click="resetInput"
            >
              Refrescar
              <i class="bi bi-repeat ms-1.5"></i>
            </button>
          </div>
          <div
            class="flex justify-center items-center flex-col sm:flex-row space-y-2 sm:space-y-0"
          >
            <button
              type="button"
              @click.prevent="purchase()"
              class="text-white text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-5"
            >
              Realizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
