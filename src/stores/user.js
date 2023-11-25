import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    userId: null,
  }),
  actions: {
    setUserData(userId) {
      this.userId = userId;
    },
  },
});
