<script setup>
import { onMounted } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useUserStore } from "../../stores/user";
import { initFlowbite } from "flowbite";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const userStore = useUserStore();
const user = userStore.getUserId();
function signOut() {
  Swal.fire({
    title: "Desea cerrar sesión?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#04354c",
    cancelButtonColor: "#04b3c3",
    confirmButtonText: "Cerrar Sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push("/");
    }
  });
}
onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Abrir sidebar</span>
            <i class="bi bi-justify" style="font-size: large"></i>
          </button>
          <RouterLink to="/home">
            <a href="#" class="flex ms-2 md:me-24">
              <img
                src="../../assets/logo.png"
                class="h-8 me-3"
                alt="Cripto Logo"
              />
              <span
                class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
                >CRIPTO</span
              >
            </a>
          </RouterLink>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div>
              <button
                type="button"
                class="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Abrir menú</span>
                <img
                  class="w-8 h-8 me-2 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
                <i class="bi bi-chevron-down ms-2.5"></i>
              </button>
            </div>
            <!-- Dropdown menu -->
            <div
              id="dropdown-user"
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div class="px-4 py-3">
                <div class="truncate flex items-center px-2 py-1">
                  <img
                    class="w-8 h-8 me-2 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                  <h3 class="font-semibold text-gray-700">{{ user }}</h3>
                </div>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    @click="signOut"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    role="menuitem"
                    >Cerrar Sesión</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <RouterLink to="/home">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i
                class="bi bi-pie-chart"
                style="font-size: 23px; color: #04b3c3"
              ></i>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
        </RouterLink>
        <!-- <RouterLink to="/transacciones"> -->
        <li class="">
          <button
            id="dropdownRightButton"
            data-dropdown-toggle="dropdownRight"
            data-dropdown-placement="right"
            class="flex items-center text-left justify-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
            type="button"
          >
            <i
              class="bi bi-cash-coin"
              style="font-size: 23px; color: #04b3c3"
            ></i>
            <span class="flex-1 ms-3 whitespace-nowrap">Transacciones</span>
            <i class="bi bi-chevron-right ms-3"></i>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownRight"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRightButton"
            >
              <RouterLink to="/transactionBuy">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Comprar</a
                  >
                </li>
              </RouterLink>
              <RouterLink to="/transactionSell">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Vender</a
                  >
                </li>
              </RouterLink>
            </ul>
          </div>
        </li>
        <!-- </RouterLink> -->
        <RouterLink to="/history">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i
                class="bi bi-clock-history"
                style="font-size: 23px; color: #04b3c3"
              ></i>
              <span class="flex-1 ms-3 whitespace-nowrap">Historial</span>
            </a>
          </li>
        </RouterLink>
        <RouterLink to="/investments">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i
                class="bi bi-graph-up-arrow"
                style="font-size: 23px; color: #04b3c3"
              ></i>
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Análisis de Inversiones</span
              >
            </a>
          </li>
        </RouterLink>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64"></div>
</template>
