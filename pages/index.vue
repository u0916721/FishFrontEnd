<template>
        <div class="bg-cover bg-[url('~/assets/bettahuy-phan.jpg')]  sm:bg-contain sm:h-screen sm:bg-left sm:bg-cover sm:bg-repeat sm:bg-slate-600">
        <!-- <p class="content-center text-center pt-32 font-serif text-3xl font-semibold tracking-wide text-blue-600">connect with your hobby</p>-->
        <div class="grid h-screen place-items-center">
          
  <UserLogin-component/>
  </div>
</div>
</template>
<script>
import loginComponent from '../components/user/login-component.vue'
export default {
  components: { loginComponent },
  
mounted() { console.log('Test called')  }
}



</script>

<style scoped>

</style>