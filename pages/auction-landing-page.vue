
<template >
  <div class="h-max grid grid-cols-1 place-items-center bg-gradient-to-r from-green-400 to-blue-500">
    <div class="py-2"></div>
    <div class="bg-white rounded-full px-4 font-bold colorSwagAuctionFinding"> Clubs</div>
    <div class="py-2"></div>
      <Finding-PageClique-Thumbnail 
        v-for="club in cliquesToBrowse"
        :key="club.name + club.name"
        :name="club.name"
        :bio="club.bio"
        :profilePic="club.profilePic"
      />
      <div class="py-80"></div>
      </div>
</template>

<script>
// this is the landing page for a user. 
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
   // await this.getAllUserCliquesNames();
    // Next we itterate through all the names adding it to an array, with each api call.
    this.cliquesToBrowse = [];
    for (const cliqueName of this.cliquesNames) {
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
          return error;
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
.colorSwagAuctionFinding {
  background: linear-gradient(-47deg, #c9cc28, #d15171, #3eb4b8, #3b779c);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>