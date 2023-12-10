<script>
import Navbar from "../components/layout/Navbar.vue";
import Hero from "../components/layout/Hero.vue";
export default {
  components: {
    Navbar,
    Hero,
  },
  data() {
    return {
      nameSection: "Análisis de Inversiones",
    };
  },
};
</script>

<template>
  <Navbar></Navbar>
  <div class="p-4 sm:ml-64">
    <Hero :sectionName="nameSection"></Hero>
  </div>
</template>
