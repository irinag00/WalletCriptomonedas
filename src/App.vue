<script setup>
// import HomeView from "./views/HomeView.vue";
// import LoginView from "./views/LoginView.vue";

import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <!-- <LoginView></LoginView> -->
    <!-- <HomeView></HomeView> -->
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>

  <RouterView />
</template>

<style scoped></style>
