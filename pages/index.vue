<template>
  <div
    class="
      bg-cover bg-[url('~/assets/bettahuy-phan.jpg')]
      sm:bg-contain
      sm:h-screen
      sm:bg-left
      sm:bg-cover
      sm:bg-repeat
      sm:bg-slate-600
    "
  >
    <!-- <p class="content-center text-center pt-32 font-serif text-3xl font-semibold tracking-wide text-blue-600">connect with your hobby</p>-->
    <div class="grid h-screen place-items-center">
      <button
        class="
          transition
          delay-150
          duration-300
          rounded
          w-96
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          ease-in-out
          hover:-translate-y-1 hover:scale-110
          shadow
        "
        @click="this.$router.push('/auction-landing-page')"
      >
        Auction Participant
      </button>
      <UserLogin-component />
    </div>
  </div>
</template>
<script>
import loginComponent from "../components/user/login-component.vue";
export default {
  components: { loginComponent },

  mounted() {},
};
</script>

<style scoped>
</style>