<template>
  <div>
    <div class="py-2"></div>
    <div
      class="
        content-left
        max-w-sm
        rounded
        overflow-hidden
        shadow-lg
        transition
        delay-150
        duration-300
        md:ease-in-out
        lg:ease-in-out
        xl:ease-in-out
        md:hover:scale-110
        lg:hover:scale-110
        xl:hover:scale-110
        py-2
        colorSwagAuctionFinding
      "
    >
      <img class="w-full" :src="profilePic" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2b">{{ name }}</div>
        <p class="text-gray-700 text-base">
          {{ bio }}
        </p>
      </div>
      <div v-if="approvedUser" class="px-6 pt-4 pb-2">
        <div
          class="
            font-bold
            text-xl
            mb-1
            text-center
            px-2
            rounded-lg
            headerColorSwag
          "
        >
          you have joined this club
        </div>
      </div>
      <div v-else-if="requestedUser" class="px-6 pt-4 pb-2">
        <div
          class="
            font-bold
            text-xl
            mb-1
            text-center
            px-2
            rounded-lg
            headerColorSwag
          "
        >
          You have requested item adding privileges
        </div>
      </div>
      <div v-else class="px-6 pt-4 pb-2">
        <button
          class="
            transition
            delay-150
            duration-300
            ease-in-out
            hover:-translate-y-1 hover:scale-110
            shadow
            bg-slate-800
            hover:bg-slate-900
            focus:shadow-outline focus:outline-none
            text-white
            font-bold
            py-2
            px-2
            rounded
          "
          type="button"
          @click="requestApproval"
        >
          Request item adding privilege
        </button>
      </div>
      <div class="px-6 pt-4 pb-2">
        <button
          class="
            transition
            delay-150
            duration-300
            ease-in-out
            hover:-translate-y-1 hover:scale-110
            shadow
            bg-green-600
            hover:bg-green-700
            focus:shadow-outline focus:outline-none
            text-white
            font-bold
            py-2
            px-2
            rounded
          "
          type="button"
          @click="goToClub"
        >
          Enter
        </button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { userProfile } from "~/store/user";
export default {
  props: ["name", "bio", "profilePic"],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      approvedUser: false, // 0 is not reqeusted, 1 is awaiting approval and 2 is approved.
      requestedUser: false,
    };
  },
  async mounted() {
    this.theUser.setValueFromStorage();
    // Now we need to get the approved and requested users.
    this.isRequestedUser();
    this.isApprovedUser();
  },
  methods: {
    isRequestedUser() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/GSLAS/GetRequestedUsers",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.requestedUser = JSON.parse(result).includes(this.theUser.username);
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    isApprovedUser() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/GSLAS/GetApprovedUsers",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.approvedUser =  JSON.parse(result).includes(this.theUser.username);
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    requestApproval() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);
      var responseOk;
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/User/Cliques/GSLAS/RequestApproval",
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            alert("request sent to club admin");
          } else {
            alert("unable to send request");
          }
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    // This method logs in the user and makes a request to the backend to do so., also need to be tied to enter as well.
    goToClub() {
      console.log("going to club");
      console.log(this.name);
      this.$router.push("/Auction/" + this.name + "");
      return " ";
    },
  },
};
</script>

<style>
</style>