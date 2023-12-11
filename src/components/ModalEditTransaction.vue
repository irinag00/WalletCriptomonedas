<script>
import { initFlowbite } from "flowbite";
import { updateTransaction } from "../services/apiClient";
import Swal from "sweetalert2";
export default {
  props: {
    index: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactionDetails: {},
      arsValue: null,
      cryptoValue: null,
      dateValue: null,
    };
  },
  mounted() {
    initFlowbite();
    this.getTransactionDetails();
  },
  watch: {
    index() {
      this.getTransactionDetails();
    },
  },
  methods: {
    async getTransactionDetails() {
      try {
        const response = await getTransactionId(this.index);
        this.transactionDetails = response.data;
        // this.loading = true;
      } catch (error) {
        console.error("No se pude obtener la transacción", error);
      }
    },
    async editTransaction() {
      try {
        if (this.arsValue > 0) {
          const updateMoney = {
            money: String(this.arsValue),
          };
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

          // const response = await updateTransaction(this.index, updateMoney);
          this.transactionDetails = response.data;

          this.$emit("transaction-edit");

          Toast.fire({
            icon: "success",
            title: "¡Transacción editada con éxito!",
          });
        }
        this.arsValue = null;
      } catch (error) {
        console.error("No se pude obtener la transacción", error);
      }
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>btc</option>
                <option>dai</option>
                <option>eth</option>
                <option>usdc</option>
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
                placeholder="2999"
                required=""
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
                placeholder="$2999"
                required=""
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
                placeholder="22/11/2023 12:34"
                required=""
                v-model="dateValue"
              />
            </div>
          </div>
          <button
            type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Editar
          </button>
        </form>

        <!-- <div class="p-4 md:p-5 space-y-4 text-xl text-center text-black">
          <h3>
            <span class="font-bold mr-3">Monto actual en ARS:</span>
            $ {{ money }}
          </h3>
          <label
            class="flex flex-row items-center gap-6 text-center justify-center"
          >
            <span class="font-bold">Monto a editar en ARS:</span>
            <input
              type="number"
              step="any"
              min="1"
              class="block p-2.5 w-500 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-50 border-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="10000"
              required
              v-model="arsValue"
            />
          </label>
        </div> -->
        <!-- Modal footer -->
        <!-- <div
          class="flex gap-6 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center"
        >
          <button
            data-modal-hide="modal-edit"
            type="button"
            class="text-white text-normal bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-50"
            @click="editTransaction"
          >
            Editar
          </button>
          <button
            data-modal-hide="modal-edit"
            type="button"
            class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cerrar
          </button> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
