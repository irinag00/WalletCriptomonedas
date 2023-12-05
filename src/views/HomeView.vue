<script setup>
import Greeting from "../components/layout/Greeting.vue";
import Navbar from "../components/layout/Navbar.vue";
import QuotesTable from "../components/QuotesTable.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Greeting></Greeting>
    <div class="p-4">
      <QuotesTable></QuotesTable>
    </div>
    <div className="flex flex-col items-center justify-center m-3 p-3">
      <i
        class="bi bi-currency-exchange mb-1 text-gray-600"
        style="font-size: 100px"
      ></i>
      <h2 class="text-2xl font-bold text-cyan-600 my-2">
        ¡Estas a punto de ingresar al mundo de las criptomonedas!
      </h2>
      <h3 class="text-base font-semibold text-gray-600 my-2">
        Para empezar a comprar y vender criptos solo tenes que hacer click aquí.
      </h3>
      <RouterLink to="/transactionBuy">
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
        >
          Comprar criptos
        </button>
      </RouterLink>
    </div>
  </div>
</template>
