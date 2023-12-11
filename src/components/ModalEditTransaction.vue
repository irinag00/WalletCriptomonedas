<script>
import { initFlowbite } from "flowbite";
import Loader from "./Loader.vue";
import { updateTransaction } from "../services/apiClient";
import { getTransactionId } from "../services/apiClient";
import Swal from "sweetalert2";
export default {
  props: {
    index: {
      type: String,
      required: true,
    },
  },
  components: {
    Loader,
  },
  data() {
    return {
      transactionDetails: {},
      loading: false,
      arsValue: null,
      cryptoValue: null,
      dateValue: null,
      selectActionValue: null,
      selectCryptoValue: null,
    };
  },
  mounted() {
    initFlowbite();
    this.getTransactionDetails();
  },
  watch: {
    index() {
      this.loading = false;
      this.getTransactionDetails();
    },
  },
  methods: {
    async getTransactionDetails() {
      try {
        const response = await getTransactionId(this.index);
        this.transactionDetails = response.data;
        this.loading = true;
        console.log(this.transactionDetails);
      } catch (error) {
        console.error("No se pude obtener la transacción", error);
      }
    },
    async editTransaction() {
      try {
        const update = {
          user_id: this.transactionDetails.user_id,
          action: this.selectActionValue || this.transactionDetails.action,
          crypto_code:
            this.selectCryptoValue || this.transactionDetails.crypto_code,
          crypto_amount:
            this.cryptoValue !== null
              ? String(this.cryptoValue)
              : this.transactionDetails.crypto_amount,
          money:
            this.arsValue !== null
              ? String(this.arsValue)
              : this.transactionDetails.money,
          datetime: this.dateValue || this.transactionDetails.datetime,
        };
        console.log(update);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        const response = await updateTransaction(this.index, update);
        this.transactionDetails = response.data;

        this.$emit("transaction-edit");

        Toast.fire({
          icon: "success",
          title: "¡Transacción editada con éxito!",
        });
      } catch (error) {
        console.error("No se pude obtener la transacción", error);
      }
    },
    formatDate(date) {
      const fechaHora = new Date(date);
      const dia = String(fechaHora.getUTCDate()).padStart(2, "0");
      const mes = String(fechaHora.getUTCMonth() + 1).padStart(2, "0");
      const año = fechaHora.getUTCFullYear();
      const horas = String(fechaHora.getUTCHours()).padStart(2, "0");
      const minutos = String(fechaHora.getUTCMinutes()).padStart(2, "0");

      return `${mes}/${dia}/${año}, ${horas}:${minutos}`;
    },
  },
};
</script>
<template>
  <!-- Main modal -->
  <div
    id="modal-edit"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div
      class="relative p-4 w-full max-w-2xl max-h-full bg-gradient-to-br from-green-400 to-blue-600 rounded-t"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Detalle de la transacción
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="modal-edit"
          >
            <i class="bi bi-x-lg" style="font-size: large"></i>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="m-10 md:p-5 space-y-4 flex justify-center" v-if="!loading">
          <Loader></Loader>
        </div>
        <div
          class="p-4 md:p-5 space-y-4 text-xl text-center text-black"
          v-if="loading"
        >
          <form
            class="p-4 md:p-5"
            @submit.prevent="editTransaction"
            v-if="transactionDetails"
          >
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2 sm:col-span-1">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tipo de Transacción</label
                >
                <select
                  v-model="selectActionValue"
                  :placeholder="transactionDetails.action"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option disabled selected="">
                    Selecciona un tipo de transacción
                  </option>
                  <option value="purchase">Compra</option>
                  <option value="sale">Venta</option>
                </select>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Criptomoneda</label
                >
                <select
                  v-model="selectCryptoValue"
                  :placeholder="transactionDetails.crypto_code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option disabled selected="">
                    Selecciona una criptomoneda
                  </option>
                  <option value="btc">Bitcoin</option>
                  <option value="dai">Dai</option>
                  <option value="eth">Ethereum</option>
                  <option value="usdc">USC Coin</option>
                </select>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Monto en CRIPTO</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  :placeholder="transactionDetails.crypto_amount"
                  v-model="cryptoValue"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Monto en ARS</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  :placeholder="transactionDetails.money"
                  v-model="arsValue"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Fecha</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  :placeholder="formatDate(transactionDetails.datetime)"
                  v-model="dateValue"
                />
              </div>
            </div>
            <button
              type="submit"
              data-modal-hide="modal-edit"
              class="text-white text-normal bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-50"
            >
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
