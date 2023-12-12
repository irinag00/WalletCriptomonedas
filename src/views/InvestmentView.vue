<script>
import Navbar from "../components/layout/Navbar.vue";
import Hero from "../components/layout/Hero.vue";
import { useUserStore } from "../stores/user";
import { useTransactionStore } from "../stores/transaction";
import InvestmentAnalysis from "../components/InvestmentAnalysis.vue";
export default {
  components: {
    Navbar,
    Hero,
    InvestmentAnalysis,
  },
  data() {
    return {
      nameSection: "Análisis de Inversiones",
      user: "",
      balances: {},
      totalMoney: 0,
    };
  },
  async created() {
    const userStore = useUserStore();
    this.user = userStore.getUserId();

    const balanceStore = useTransactionStore();
    this.balances = await balanceStore.calculateCryptoBalances(this.user);
    this.balanceTotalMoney();
  },
  methods: {
    balanceTotalMoney() {
      if (this.balances) {
        Object.values(this.balances).forEach((balance) => {
          this.totalMoney += balance.totalMoney || 0;
        });
      }
    },
  },
};
</script>

<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Hero :sectionName="nameSection"></Hero>
    <h2 class="text-2xl font-bold mt-5 ml-6">Estado Actual</h2>
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
              Cantidad
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Monto en ARS
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            class="hover:bg-gray-50"
            div
            v-for="(valor, clave) in balances"
            :key="clave"
            v-show="valor.totalCryptoAmount > 0"
          >
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <h3>{{ clave.toUpperCase() }}</h3>
            </td>
            <td class="px-6 py-4">
              <h3>{{ valor.totalCryptoAmount }}</h3>
            </td>
            <td class="px-6 py-4">
              <h3>{{ valor.totalMoney.toFixed(2) }} ARS</h3>
            </td>
          </tr>
        </tbody>
        <tfoot class="divide-y divide-gray-100 border-t border-gray-100">
          <tr class="font-semibold text-gray-900 dark:text-white bg-cyan-500">
            <th scope="row" class="px-6 py-3 text-base">Total</th>
            <td class="px-6 py-3"></td>
            <td class="px-6 py-3">{{ totalMoney.toFixed(2) }} ARS</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <InvestmentAnalysis></InvestmentAnalysis>
  </div>
</template>
