<script>
import { initFlowbite } from "flowbite";
import { deleteTransaction } from "../services/apiClient";
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
      transaction: null,
    };
  },
  mounted() {
    initFlowbite();
  },
  methods: {
    async deleteTransaction() {
      try {
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
        const response = await deleteTransaction(this.index);
        console.log(response);

        this.$emit("transaction-delete");

        Toast.fire({
          icon: "success",
          title: "¡Transacción eliminada con éxito!",
        });
        console.log(this.index);
      } catch (error) {
        console.error("No se puedo eliminar la transacción", error);
      }
    },
  },
};
</script>
<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div
      class="relative p-4 w-full max-w-2xl max-h-full bg-gradient-to-br from-green-400 to-blue-600 rounded-t"
    >
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <i class="bi bi-x-lg" style="font-size: large"></i>
          <span class="sr-only">Cerrar modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-20 h-20 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3
            class="mt-10 mb-4 text-xl font-semibold text-gray-900 dark:text-gray-400"
          >
            ¿Desea eliminar esta transacción?
          </h3>
          <div
            class="flex gap-6 p-4 md:p-5 rounded-b dark:border-gray-600 justify-center"
          >
            <button
              @click="deleteTransaction"
              data-modal-hide="popup-modal"
              type="button"
              class="text-white text-normal bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Si, eliminar
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
