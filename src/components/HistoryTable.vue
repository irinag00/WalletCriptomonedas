<script>
export default {
  props: {
    allTransactions: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  <!-- component -->
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table
      class="w-full border-collapse bg-white text-left text-sm text-gray-500"
    >
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Fecha</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Transacción
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Cantidad
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Moneda
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Total</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          v-for="(crypto, index) in allTransactions"
          :key="index"
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
              <button>
                <i class="bi bi-trash3" style="font-size: large"></i>
              </button>
              <button>
                <i class="bi bi-pencil-square" style="font-size: large"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
