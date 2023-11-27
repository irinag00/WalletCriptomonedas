<script setup>
import Navbar from "../components/Navbar.vue";
import QuotesTable from "../components/QuotesTable.vue";
</script>
<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-5 border-b">
      <div class="flex items-start justify-start mb-4 rounded">
        <div>
          <h2 class="font-normal text-2xl">
            Saldo en <span class="font-semibold text-cyan-600">ARS</span>
          </h2>
          <h3 class="font-bold text-3xl">$ 0,00</h3>
        </div>
      </div>
    </div>
    <div class="p-4">
      <QuotesTable></QuotesTable>
    </div>
  </div>
</template>
