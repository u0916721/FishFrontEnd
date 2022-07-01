<template>
        <div>
  <UserLogin-component/>
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