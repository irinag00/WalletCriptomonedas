<script>
import Navbar from "../components/layout/Navbar.vue";
import Balance from "../components/layout/Balance.vue";
import { useTransactionStore } from "../stores/transaction";
import { useUserStore } from "../stores/user";
import { getAllTransactions } from "../services/apiClient";
import Hero from "../components/layout/Hero.vue";
export default {
  components: {
    Navbar,
    Balance,
    Hero,
  },
  data() {
    return {
      transactions: {},
      nameSection: "Transacciones",
    };
  },
  async created() {
    const userStore = useUserStore();
    const user = userStore.getUserId();
    try {
      const response = await getAllTransactions(user);
      this.transactions = response.data;
      console.log(this.transactions);
    } catch (error) {
      console.error("Error al obtener las transacciones.");
    }
  },
};
</script>
<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Balance></Balance>
    <Hero :sectionName="nameSection"></Hero>
    <!-- <div v-if="transactionStore.getTransactions.lenght === 0">
      Aun no has comprado nada
    </div> -->
    <!-- <div>{{ transactionStore.getTransactions }}</div> -->
  </div>
</template>
