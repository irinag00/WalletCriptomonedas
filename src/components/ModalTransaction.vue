<script>
import { initFlowbite } from "flowbite";
import { getTransactionId } from "../services/apiClient";
export default {
  props: {
    allTransactions: {
      type: Object,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactionDetails: {},
      showModal: false,
    };
  },
  watch: {
    index() {
      // Llamar a getTransactionDetails cada vez que el index cambia
      this.getTransactionDetails();
    },
  },
  created() {
    this.getTransactionDetails();
  },
  mounted() {
    initFlowbite();
    // this.getTransactionDetails();
  },
  methods: {
    async getTransactionDetails() {
      try {
        const response = await getTransactionId(this.index);
        this.transactionDetails = response.data;
        this.showModal = true;
      } catch (error) {
        console.error("No se pude obtener la transacción", error);
      }
      console.log(this.transactionDetails);
      console.log(this.showModal);
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleDateString("es-ES", options);
    },
  },
};
</script>
<template>
  <!-- Main modal -->
  <div
    id="static-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    v-show="showModal"
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
            data-modal-hide="static-modal"
          >
            <i class="bi bi-x-lg" style="font-size: large"></i>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4 text-xl text-center text-black">
          <h3>
            <span class="font-bold">Fecha: </span>
            {{ formatDate(transactionDetails.datetime) }}
          </h3>
          <h3>
            <span class="font-bold">Tipo de transacción: </span>
            <span
              v-if="transactionDetails.action === 'purchase'"
              class="font-semibold text-green-600"
              >Compra</span
            >
            <span
              v-if="transactionDetails.action === 'sale'"
              class="font-semibold text-red-600"
              >Venta</span
            >
          </h3>
          <h3>
            <span class="font-bold">Moneda:</span>

            {{ transactionDetails.crypto_code }}
          </h3>
          <h3>
            <span class="font-bold">Cantidad:</span>
            {{ transactionDetails.crypto_amount
            }}{{ transactionDetails.crypto_code }}
          </h3>
          <h3>
            <span class="font-bold">Monto total en ARS:</span>
            ${{ transactionDetails.money }}
          </h3>
        </div>
        <!-- Modal footer -->
        <div
          class="flex p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center"
        >
          <button
            data-modal-hide="static-modal"
            type="button"
            class="text-white text-normal bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
