<template>
  <div> view text posts</div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
     props:['name','bio','profilePic'],
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