<script>
import { useUserStore } from "../stores/user";
import { useTransactionStore } from "../stores/transaction";
import Loader from "../components/Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      balances: {},
      loading: false,
    };
  },
  mounted() {
    this.calcularGananciasPerdidas();
  },
  methods: {
    async calcularGananciasPerdidas() {
      const userStore = useUserStore();
      const user = userStore.getUserId();

      const balanceStore = useTransactionStore();
      this.balances = await balanceStore.calculateCryptoBalances(user);
      this.loading = true;
    },
  },
};
</script>
<template>
  <!-- <div v-if="Object.keys(balances).length === 0">
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
  </div> -->
  <div v-if="!loading" class="flex justify-center mt-40">
    <Loader></Loader>
  </div>
  <div v-if="loading">
    <div class="border-t border-gray-200 mt-10">
      <h2 class="text-2xl font-bold mt-5 ml-6">Inversiones</h2>
      <div
        class="relative overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5"
      >
        <table
          class="w-full border-collapse bg-white text-left text-base text-gray-500 text-center"
        >
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Criptomoneda
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Resultado
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr
              class="hover:bg-gray-50"
              div
              v-for="(valor, clave) in balances"
              :key="clave"
            >
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <h3>{{ clave.toUpperCase() }}</h3>
              </td>
              <td class="px-6 py-4" v-if="valor.profitLoss < 0">
                <h3 class="font-semibold text-red-600">
                  {{ valor.profitLoss }}
                </h3>
              </td>
              <td class="px-6 py-4" v-else-if="valor.profitLoss > 0">
                <h3 class="font-semibold text-green-600">
                  {{ valor.profitLoss }}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
