
<template>
  <div>
    <div
      class="
        grid grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-4
        2xl:grid-cols-4
        gap-3
        h-full
        sm:
      "
    >
      <div
        class="
          row-span-6
          p-4
          bg-gradient-to-r
          from-teal-500
          to-emerald-500
          h-full
          rounded
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
      <Finding-PageFilter-Sidebar @setCliquesToBrowseTrue ="setCliquesToBrowseTrue" @setCliquesToBrowseFalse ="setCliquesToBrowseFalse"/>
      </div>
      <Finding-PageClique-Thumbnail v-if="displayCliquesToBrowse"
        v-for="club in cliquesToBrowse"
        :key="club.name + club.name"
        :name="club.name"
        :bio="club.bio"
        :profilePic="club.profilePic"
      />
         <Finding-PageClique-Thumbnail v-if="displayCliquesToBrowse === false"
        v-for="club in userCliquesToBrowse"
        :key="club.name + club.name"
        :name="club.name"
        :bio="club.bio"
        :profilePic="club.profilePic"
      />

    </div>
  </div>
</template>

<script>
// this is the landing page for a user. If not logged in the user will be prompted to do so.
// We have go to your cliques and browse cliques.
// The browsing part will be, go to clique browsing.
// We are pushed here after logging in or clicking the just browse button.
import { userProfile } from "~/store/user";
export default {
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      cliquesNames: [],
      cliquesToBrowse: [],
      userCliquesNames: [],
      userCliquesToBrowse: [],
      displayCliquesToBrowse: true,
      displayedCliques: [],
    };
  },
  async mounted() {
    this.theUser.setValueFromStorage();
    await this.getAllCliquesName(); // We get all the clique names. That the user has or doesnt have.
    await this.getAllUserCliquesNames();
    // Next we itterate through all the names adding it to an array, with each api call.
    this.cliquesToBrowse = [];
    for (const cliqueName of this.cliquesNames) {
      console.log(cliqueName);
      await this.getCliqueByName(true, cliqueName); // Add it to the cliques to browse.
    }

    // Next we itterate through all the names adding it to an array, with each api call. same things as above but for this time with the user cliques.
    this.userCliquesToBrowse = [];
    for (const cliqueName of this.userCliquesNames) {
      console.log(cliqueName);
      await this.getCliqueByName(false, cliqueName); //Passing in false here because we want to add it to the correct array.
    }
    this.displayedCliques = this.cliquesToBrowse;
  },
  methods: {

    setCliquesToBrowseTrue()
    {
          
             this.displayedCliques = this.cliquesToBrowse;
      this.displayCliquesToBrowse = true;
    },

    
    setCliquesToBrowseFalse()
    {
    
       this.displayedCliques = this.userCliquesToBrowse;
      this.displayCliquesToBrowse = false;
    },
    // This method gets all the cliques name in the app, this is for browsing purposes.
    async getAllCliquesName() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      var result = await fetch(
        "https://plaxbackendapi.azurewebsites.net//User/Cliques/GetAllCliquesName",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.cliquesNames = JSON.parse(result);
          // this.setAllCliqueNameValue(JSON.parse(result));
          return JSON.parse(result);
        })
        .catch((error) => {
          console.log("error", error);
          return null;
        });
      return result.PromiseResult;
    },

    async getAllUserCliquesNames() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      console.log("printing user token");
  console.log(this.theUser.userToken);
      var result = await fetch(
        "https://plaxbackendapi.azurewebsites.net//user/fishy/GetMyInfo",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.userCliquesNames = JSON.parse(result).userCliques;
          // this.setAllCliqueNameValue(JSON.parse(result));
          return JSON.parse(result);
        })
        .catch((error) => {
          console.log("error", error);
          return null;
        });
      return result.PromiseResult;
    },
    // Gets a clique by name
    getCliqueByName(browsing, cliqueName) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net//User/Cliques/" +
          cliqueName +
          "/GetCliqueByName", // Insert the cliqueName into the api request.
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (browsing) {
            this.cliquesToBrowse.push(JSON.parse(result));
          } else {
            this.userCliquesToBrowse.push(JSON.parse(result)); // add to the cliques to browse instead.
          }
          return result;
        })
        .catch((error) => {
          console.log("error", error);
          return null;
        });
    },
  },
};
</script>
<style>
</style>