import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import TransactionsView from "../views/TransactionsView.vue";
import HistoryView from "../views/HistoryView.vue";
import InvestmentView from "../views/InvestmentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/transacciones",
      name: "transacciones",
      component: TransactionsView,
    },
    {
      path: "/historial",
      name: "historial",
      component: HistoryView,
    },
    {
      path: "/inversiones",
      name: "analisisInversiones",
      component: InvestmentView,
    },
  ],
});

export default router;
