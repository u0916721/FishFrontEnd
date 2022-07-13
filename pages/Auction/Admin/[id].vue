<template>
  <div class="grid grid-cols-1">
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
      @click="toggleSold = toggleSold * -1"
    >
      <div v-if="toggleSold > 0">switch to sold items</div>
      <div v-else>switch to items being auctioned</div>
    </button>
    <div v-if="toggleSold > 0" :key="refreshKey">
      <AuctAuction-Card @swap ="pushOnSwap"
        v-for="(item, index) in items"
        :key="item.itemName + item.itemName"
        :itemName="item.itemName"
        :fish="item.fish"
        :seller="item.seller"
        :buyer="item.buyer"
        :soldfor="null"
        :sold="false"
        :admin="true"
        :startNum="index"
      />
    </div>
    <div v-else>
      <AuctAuction-Card
        v-for="(item, index) in soldItems"
        :key="item.itemName + item.itemName"
        :itemName="item.itemName"
        :fish="item.fish"
        :seller="item.seller"
        :buyer="item.buyer"
        :soldFor="item.soldFor"
        :sold="true"
        :admin="true"
        :startNum="index"
      />
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
      items: [],
      soldItems: [],
      startNum: 1000,
      toggleSold: 1,
      swapArray: [],
      refreshKey: 1,
    };
  },
  created() {},
  async mounted() {
    this.theUser.setValueFromStorage(); // Get the jwt token
    await this.getItems();
    await this.getSoldItems();
    // setInterval(this.getItems, 10000);
  },
  computed() {},
  methods: {
    async getItems() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        localTime: " ",
      };

      await fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/GetItems",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("calling");
          this.items = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    async getSoldItems() {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/GetSoldItems",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.soldItems = JSON.parse(result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    async swap() {
      console.log("calling swap");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var raw = JSON.stringify({
        From: this.swapArray[0],
        To: this.swapArray[1],
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/SwapItem",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          this.getSoldItems(); // Here we referesh
                  window.location.reload();
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    async pushOnSwap(number) {
      console.log("Calling push on swap");
      console.log(number);
      this.swapArray.push(number);
      if (this.swapArray.length === 2) {
        // Here we check if the length is two
        await this.swap();

        this.swapArray = []; //Clear the array.
      }

    },
  },
};
</script>

<style>
</style>