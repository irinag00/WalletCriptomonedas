<script setup>
import { useTransactionStore } from "../../stores/transaction";
import { useUserStore } from "../../stores/user";
const store = useUserStore();
const user = store.getUserId();
</script>
<template>
  <div class="p-4 mt-5 border-b">
    <div class="flex items-start justify-start mb-4 rounded">
      <!-- <ul class="flex flex-row gap-4">
        <li
          v-for="(balance, index) in store.getBalances"
          :key="index"
          class="ml-5"
        >
          <h2 class="font-normal text-2xl">
            Saldo en
            <span class="font-semibold text-cyan-600">{{
              balance.cryptoCode.toUpperCase()
            }}</span>
          </h2>
          <h3 class="font-bold text-xl text-center">
            {{ balance.balance }}
            <span class="font-normal text-sm">{{ balance.cryptoCode }}</span>
          </h3>
        </li>
      </ul> -->
      <div>
        <h2 class="font-semibold text-2xl">
          ¡Bienvenido
          <span class="font-semibold text-cyan-600">{{ user }}</span
          >!
        </h2>
      </div>
    </div>
  </div>
</template>
