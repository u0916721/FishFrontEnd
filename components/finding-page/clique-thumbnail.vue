<template>
<div class="content-left max-w-sm rounded overflow-hidden shadow-lg transition delay-150 duration-300 md:ease-in-out  lg:ease-in-out  xl:ease-in-out  md:hover:scale-110 lg:hover:scale-110 xl:hover:scale-110 ">
  <img class="w-full" :src="profilePic">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2b">{{name}}</div>
    <p class="text-gray-700 text-base">
      {{bio}}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
           <button class="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  shadow bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded " type="button" @click="goToClub">
      Enter
      </button>
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
            goToClub()
            {
                console.log("going to club");
                console.log(this.name);
                 this.$router.push('/Auction/' + this.name + '');
                return " ";
            }
            },
};
</script>

<style>

</style>