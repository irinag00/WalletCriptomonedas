<script>
import Navbar from "../components/layout/Navbar.vue";
import Hero from "../components/layout/Hero.vue";
import ModalTransaction from "../components/ModalTransaction.vue";
import ModalEditTransaction from "../components/ModalEditTransaction.vue";
import { initFlowbite } from "flowbite";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { getAllTransactions } from "../services/apiClient";
import ModalDelete from "../components/ModalDelete.vue";
import Loader from "../components/Loader.vue";
export default {
  components: {
    Navbar,
    Hero,
    ModalTransaction,
    ModalEditTransaction,
    ModalDelete,
    Loader,
  },
  data() {
    return {
      allTransactions: {},
      nameSection: "Transacciones",
      loading: false,
    };
  },
  mounted() {
    initFlowbite();
    this.loadTransaction();
  },
  setup() {
    const selectedTransactionId = ref(null);
    function handleSelection(id) {
      selectedTransactionId.value = id;
    }
    return {
      selectedTransactionId,
      handleSelection,
    };
  },

  methods: {
    async loadTransaction() {
      const userStore = useUserStore();
      const user = userStore.getUserId();
      try {
        const response = await getAllTransactions(user);
        this.allTransactions = response.data;
        console.log(this.allTransactions);
        this.loading = true;
      } catch (error) {
        console.error("Error al obtener las transacciones.");
      }
    },
    formatDate(date) {
      // const dateTime = new Date(date);
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
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Hero :sectionName="nameSection"></Hero>
    <div v-if="!loading" class="flex justify-center mt-40">
      <Loader></Loader>
    </div>
    <div v-if="loading">
      <div
        class="relative overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5"
      >
        <table
          class="w-full border-collapse bg-white text-left text-base text-gray-500"
        >
          <thead class="bg-gray-50 text-center">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Tipo de Transacción
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Cantidad
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Moneda
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Total
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-gray-100 border-t border-gray-100 text-center"
          >
            <tr
              v-for="(crypto, index) in allTransactions"
              :key="crypto._id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4">
                <span>{{ formatDate(crypto.datetime) }}</span>
              </td>
              <td class="px-6 py-4">
                <span
                  v-if="crypto.action === 'purchase'"
                  class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-normal font-semibold text-green-600"
                >
                  <span class="">Compra</span>
                </span>
                <span
                  v-else-if="crypto.action === 'sale'"
                  class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-normal font-semibold text-red-600"
                >
                  <span class="">Venta</span></span
                >
              </td>
              <td class="px-6 py-4">
                <h3>{{ crypto.crypto_amount }}</h3>
              </td>
              <td class="px-6 py-4">
                <h3>{{ crypto.crypto_code.toUpperCase() }}</h3>
              </td>
              <td class="px-6 py-4">
                <h3>{{ crypto.money }} ARS</h3>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end gap-6">
                  <button
                    @click="handleSelection(crypto._id)"
                    data-modal-target="static-modal"
                    data-modal-toggle="static-modal"
                    type="button"
                  >
                    <i class="bi bi-search" style="font-size: large"></i>
                    <span class="sr-only">Abrir Modal</span>
                  </button>
                  <button
                    @click="handleSelection(crypto._id)"
                    data-modal-target="modal-edit"
                    data-modal-toggle="modal-edit"
                    type="button"
                  >
                    <i class="bi bi-pencil-square" style="font-size: large"></i>
                  </button>
                  <button
                    @click="handleSelection(crypto._id)"
                    data-modal-target="popup-modal"
                    data-modal-toggle="popup-modal"
                    type="button"
                  >
                    <i class="bi bi-trash3" style="font-size: large"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ModalTransaction
          v-if="selectedTransactionId !== null"
          :index="selectedTransactionId"
        ></ModalTransaction>
        <ModalEditTransaction
          @transaction-edit="loadTransaction"
          v-if="selectedTransactionId !== null"
          :index="selectedTransactionId"
        ></ModalEditTransaction>
        <ModalDelete
          @transaction-delete="loadTransaction"
          v-if="selectedTransactionId !== null"
          :index="selectedTransactionId"
        ></ModalDelete>
      </div>
    </div>
  </div>
</template>
