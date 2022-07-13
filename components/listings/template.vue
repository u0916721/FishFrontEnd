<template>
  <div> View listings</div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
     props:['catagories'],
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
}
</script>

<style>

</style>