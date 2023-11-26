import { defineStore } from "pinia";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userId: null,
  }),
  persist: true,
  getters: {},
  actions: {
    setUserId(userId) {
      this.userId = userId;
    },
    getUserId() {
      return this.userId;
    },
  },
});
