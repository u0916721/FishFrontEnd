<template>
  <div>
    {{ $route.params.id }}
    <div class="grid grid-cols-4 gap-4">
      <div
        v-if="screenToDisplay === 0"
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          border-solid border-2 border-indigo-600
        "
        @click="screenToDisplay = 0"
      >
        Listings
      </div>
      <div
        v-else
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          hover:border-solid
          hover:border-2
          hover:border-indigo-600
        "
        @click="screenToDisplay = 0"
      >
        Listings
      </div>

      <div
        v-if="screenToDisplay === 1"
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          border-solid border-2 border-indigo-600
        "
        @click="screenToDisplay = 1"
      >
        Create Listing
      </div>
      <div
        v-else
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          hover:border-solid
          hover:border-2
          hover:border-indigo-600
        "
        @click="screenToDisplay = 1"
      >
        Create Listing
      </div>

      <div
        v-if="screenToDisplay === 2"
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          border-solid border-2 border-indigo-600
        "
        @click="screenToDisplay = 2"
      >
        Text Posts
      </div>
      <div
        v-else
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          hover:border-solid
          hover:border-2
          hover:border-indigo-600
        "
        @click="screenToDisplay = 2"
      >
        Text Posts
      </div>

      <div
        v-if="screenToDisplay === 3"
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          border-solid border-2 border-indigo-600
        "
        @click="screenToDisplay = 3"
      >
        Create Text Posts
      </div>
      <div
        v-else
        class="
          text-2xl
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-teal-400
          rounded
          text-center
          hover:underline
          cursor-pointer
          transition
          delay-150
          duration-300
          hover:scale-110
          hover:border-solid
          hover:border-2
          hover:border-indigo-600
        "
        @click="screenToDisplay = 3"
      >
        Create Text Posts
      </div>
    </div>
    <div v-if="loaded">
    <div v-if="screenToDisplay === 0">
      <ListingsOverview :key="'listingDisplay'" :listing="listing"/>
    </div>
    <div v-else-if="screenToDisplay === 1">
      <ListingsCreate />
    </div>
    <div v-else-if="screenToDisplay === 2">
      <Text-PostsView-Posts />
    </div>
    <div v-else-if="screenToDisplay === 3">
      <Text-PostsCreate />
    </div>
    </div>
  </div>
</template>

<script>
// Add a link to admin tools as well.
import { userProfile } from "~/store/user";
import overview from "../../components/listings/overview.vue";
export default {
  components: { overview },
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
       
    return {
      screenToDisplay: 0, // 0 is listings, 1 is create listings, 2 is text post, and 3 is creating text posts
       listing: {
       listings: ["mon"],
       catagories:[]
      },
      loaded: false,
    };
  },
  async created() {
    // Create a listings object
         this.listing ={
      listings: [],
      catagories:[]
     };
    await this.getListings();
    await this.getCatagories();
    this.loaded = true; //Here we load the components since we have gotten all our data.
  },

  methods: {
    // Gets the listings for a club adds it to the listing object
    async getListings() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

     await fetch(
        "https://plaxbackendapi.azurewebsites.net//User/Cliques/" +
          this.$route.params.id +
          "/GetListings", // Might break it be careful
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.listing.listings = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    // Gets the catagories for a club add it to the listing object.
   async getCatagories() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
      "https://plaxbackendapi.azurewebsites.net//Mod/Cliques/"+ this.$route.params.id +"/GetCatagoires", // Might break it be careful
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.listing.catagories = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>