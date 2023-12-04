import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import HistoryView from "../views/HistoryView.vue";
import InvestmentView from "../views/InvestmentView.vue";
import BuyTransactionView from "../views/BuyTransactionView.vue";
import SellTransactionView from "../views/SellTransactionView.vue";

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
      path: "/transactionBuy",
      name: "comprar",
      component: BuyTransactionView,
    },
    {
      path: "/transactionSell",
      name: "vender",
      component: SellTransactionView,
    },
    {
      path: "/history",
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
