<script setup>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const userData = reactive({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Ingrese un email válido", required),
      email: helpers.withMessage("Ingrese un email válido", email),
    },
    password: {
      required: helpers.withMessage("Ingrese una contraseña válida", required),
    },
  };
});
const v$ = useVuelidate(rules, userData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    userStore.setUserId(userData.email);
    router.push({ path: "/home" });
  }
};
</script>
<template>
  <div
    class="min-h-screen grid w-full gap-4 md:grid-cols-2 justify-stretch justify-items-center"
  >
    <div
      class="w-full bg-contain bg-cyan-500 bg-blend-multiply flex justify-center items-center"
      style="
        background-image: url('https://www.business2community.com/mx/wp-content/uploads/sites/18/2022/08/bitcoin-11.jpg');
        background-size: cover;
      "
    >
      <div class="flex justify-center text-center">
        <div class="max-w-md relative text-white">
          <h1 class="mb-5 text-5xl font-bold">
            Descubrí el futuro de la economía digital
          </h1>
          <p class="mb-5 font-bold">
            Compra y vende criptomonedas de la manera más simple y con las
            mejores cotizaciones.
          </p>
        </div>
      </div>
    </div>
    <div class="relative p-4 w-full max-w-md max-h-full self-center">
      <div class="bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- header -->
        <div
          class="flex flex-col items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <div class="mb-2">
            <img
              src="../assets/logo.png"
              alt="Logo de la billetera de criptomonedas"
              class="w-[80px]"
            />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Inicia Sesión
          </h3>
        </div>
        <!-- body -->
        <div class="p-4 md:p-5">
          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                v-model="userData.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
              />
              <span
                v-for="error in v$.email.$errors"
                :key="error.$uid"
                class="font-medium text-red-600"
                >{{ error.$message }}</span
              >
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Contraseña</label
              >
              <input
                v-model="userData.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              <span
                v-for="error in v$.password.$errors"
                :key="error.$uid"
                class="font-medium text-red-600"
                >{{ error.$message }}</span
              >
            </div>
            <div class="flex justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  for="remember"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Recordarme</label
                >
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
