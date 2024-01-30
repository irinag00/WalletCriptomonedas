<script>
export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
};
</script>
<template>
  <div
    class="w-full gap-4 justify-stretch justify-items-center rounded-lg mt-5"
  >
    <div
      class="w-full bg-contain bg-cyan-600 bg-blend-multiply flex justify-center items-center rounded-lg"
      style="
        background-image: url('https://res.cloudinary.com/dsdmjhkms/image/upload/v1706625216/mano-cripto_pq1bxv.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 15vw;
      "
    >
      <div
        class="w-11/12 sm:w-2/3 mb-5 mt-5 sm:mb-10 flex justify-center text-center overflow-hidden"
      >
        <h1
          class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-white font-bold leading-tight [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]"
        >
          {{ sectionName }}
        </h1>
      </div>
    </div>
  </div>
</template>
