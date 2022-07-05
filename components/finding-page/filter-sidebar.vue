<template>
<div>
  <div v-if="displayBrowsing">
  <div class="grid grid-cols-1">
    <div class="p-6 shadow-lg rounded-lg border-solid border-2 border-green-400 bg-white cursor-pointer focus:bg-cyan-100 hover:bg-cyan-100 bg-cyan-200" @click="displayBrowsing = true; this.$emit('setCliquesToBrowseTrue');"> <p class="font-sans text-center font-medium tracking-tight">Clubs To Browse</p> </div>
    <div class="pt-6"></div>
    <div class="p-6 shadow-lg rounded-lg border-solid border-2 border-green-400 bg-white cursor-pointer focus:bg-cyan-100 hover:bg-cyan-100" @click="displayBrowsing = false; this.$emit('setCliquesToBrowseFalse');"> <p class="font-sans text-center font-medium tracking-tight">Your Clubs</p></div>
  </div>
  </div>
   <div v-else>
  <div class="grid grid-cols-1">
    <div class="p-6 shadow-lg rounded-lg border-solid border-2 border-green-400 bg-white cursor-pointer focus:bg-cyan-100 hover:bg-cyan-100" @click="displayBrowsing = true; this.$emit('setCliquesToBrowseTrue');"> <p class="font-sans text-center font-medium tracking-tight">Clubs To Browse</p> </div>
    <div class="pt-6"></div>
    <div class="p-6 shadow-lg rounded-lg border-solid border-2 border-green-400 bg-white cursor-pointer bg-cyan-200 focus:bg-cyan-100" @click="displayBrowsing = false; this.$emit('setCliquesToBrowseFalse');"> <p class="font-sans text-center font-medium tracking-tight">Your Clubs</p></div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayBrowsing: true,
    };
  },

}
</script>

<style>

</style>