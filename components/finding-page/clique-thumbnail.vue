<template>
  <div>
    <div class="card"     tag="article"
    style="max-width: 20rem; max-height: 20rem;  overflow-y: auto;">
  <img  :src="profilePic" class="card-img-top" alt="the clubs profile picture">
  <div class="card-body">
    <h5 class="card-title">{{name}}</h5>
    <p class="card-text">{{bio}}</p>
    <a href="#" class="btn btn-primary" @click="goToClub">Go to club</a>
  </div>
</div>
  </div>
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
  methods: {
    // This method logs in the user and makes a request to the backend to do so., also need to be tied to enter as well.
            goTOClub()
            {
                console.log("going to club");
                return " ";
            }
            },
};
</script>

<style>

</style>