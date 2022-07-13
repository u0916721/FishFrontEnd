<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
        <ListingsSidebar-Menu :id="'SidebarMenu'" :catagories="listing.catagories"/>
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