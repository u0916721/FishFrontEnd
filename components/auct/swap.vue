<template>
  
</template>

<script>
import { userProfile } from "~/store/user";
export default {
     props:['listing'],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {

    };
  },
    created()
  { 


  },
  mounted()
  { 

  },
    computed()
  { 

  },
}
</script>
<style>

</style>