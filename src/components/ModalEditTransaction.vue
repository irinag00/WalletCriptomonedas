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
    money: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactionDetails: {},
      arsValue: 0,
    };
  },
  mounted() {
    initFlowbite();
  },
  watch: {
    index() {
      console.log(this.index);
      console.log(this.money);
    },
  },
  methods: {
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

          const response = await updateTransaction(this.index, updateMoney);
          this.transactionDetails = response.data;
          this.$emit("transaction-edit");

          Toast.fire({
            icon: "success",
            title: "¡Transacción editada con éxito!",
          });
        }
        this.arsValue = 0;
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
        <div class="p-4 md:p-5 space-y-4 text-xl text-center text-black">
          <form @submit.prevent="editTransaction">
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
          </form>
        </div>
        <!-- Modal footer -->
        <div
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
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
