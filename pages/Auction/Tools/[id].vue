<template>
  <div class="px-10">
    Auction Tools
    <div>{{ display }}</div>
    <div class="px-10 bg-slate-100 rounded-lg">
      <div>Replace seller name with auction id</div>
      <div class="">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          Seller Name
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            text-black
            border border-black
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-blue-700
          "
          id="grid-last-name"
          type="text"
          placeholder="Seller name"
          v-model="sellerName"
        />
      </div>
      <div class="py-2"></div>
      <div class="">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          Auction ID
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            text-black
            border border-black
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-blue-700
          "
          id="grid-last-name"
          type="text"
          placeholder="Auction Id"
          v-model="auctionID"
        />
      </div>
      <div class="py-2"></div>
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
          py-1
          px-4
          rounded
        "
        type="button"
        @click="replace"
      >
        Replace
      </button>
      <div class="py-3"></div>
    </div>
    <div class="py-2"></div>
    <div class="px-10 bg-slate-100 rounded-lg">
      <div>Approve user</div>
      <div>Selected: {{ selectedUserApproval }}</div>
      <select
        class="
          block
          appearance-none
          w-full
          bg-gray-200
          border border-gray-200
          text-gray-700
          py-3
          px-4
          pr-8
          rounded
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        id="grid-state"
        v-model="selectedUserApproval"
      >
        <option>Select One</option>
        <option
          v-for="(name, index) in requestedUsers"
          :value="name"
          :key="name + index"
        >
          {{ name }}
        </option>
      </select>
      <div class="py-2"></div>
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
          py-1
          px-4
          rounded
        "
        type="button"
        @click="approveUser"
      >
        Approve
      </button>
      <div class="py-3"></div>
    </div>
    <div class="py-3"></div>
    <div class="px-10 bg-slate-100 rounded-lg">
      <div>Disapprove user</div>
      <div>Selected: {{ selectedUserDisapproval }}</div>
      <select
        class="
          block
          appearance-none
          w-full
          bg-gray-200
          border border-gray-200
          text-gray-700
          py-3
          px-4
          pr-8
          rounded
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        id="grid-state"
        v-model="selectedUserDisapproval"
      >
        <option>Select One</option>
        <option
          v-for="(name, index) in approvedUsers"
          :value="name"
          :key="name + index"
        >
          {{ name }}
        </option>
      </select>
      <div class="py-2"></div>
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
          py-1
          px-4
          rounded
        "
        type="button"
        @click="disapproveUser"
      >
        Disapprove
      </button>
      <div class="py-3"></div>
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
  props: ["listing"],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      display: "sdfs",
      requestedUsers: [],
      approvedUsers: [],
      selectedUserApproval: "",
      selectedUserDisapproval: "",
      auctionID: "",
      sellerName: "",
    };
  },
  created() {},
  async mounted() {
    this.display = this.$route.params.id;
    this.theUser.setValueFromStorage();
    if (!(await this.theUser.isLoggedIn())) {
     window.alert(
       "You are logged out and need to log in again in as a mod for this page to work"
     );
    }
    this.getRequestedUsers();
    this.getApprovedUsers();
  },
  computed() {},
  methods: {
    getRequestedUsers() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/" +
          this.$route.params.id +
          "/GetRequestedUsers",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.requestedUsers = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    getApprovedUsers() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/" +
          this.$route.params.id +
          "/GetApprovedUsers",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.approvedUsers = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    approveUser() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var raw = JSON.stringify(this.selectedUserApproval);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/" +
          this.$route.params.id +
          "/ApproveUser",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //Refresh the users
      this.getRequestedUsers();
      this.getApprovedUsers();
    },
    disapproveUser() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var raw = JSON.stringify(this.selectedUserDisapproval);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Mod/Cliques/" +
          this.$route.params.id +
          "/DisapproveUser",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //Refresh the users
      this.getRequestedUsers();
      this.getApprovedUsers();
    },
    replace() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
    console.log(this.sellerName);
    console.log(this.auctionID);
      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/" + this.sellerName + "/" + this.auctionID  + "/replaceSellerNameForAuctionName",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>