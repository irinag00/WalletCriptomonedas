<script setup>
import { useUserStore } from "../../stores/user";
const store = useUserStore();
const user = store.getUserId();
</script>
<template>
  <div class="p-4 mt-5 border-b">
    <div class="flex items-start justify-start mb-4 rounded">
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
