<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
        <ListingsSidebar-Menu/>
        <ListingsSee-Listings class="col-span-3"/>
    </div>

  </div>
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
    console.log("printing out the listings created");
    console.log(this.listing);
  },
  mounted()
  { 
    console.log("printing out the listings");
    console.log(this.listing);
  },
    computed()
  { 
    console.log("printing out the listings computed");
    console.log(this.listing);
  },
}
</script>

<style>

</style>