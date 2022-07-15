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
      <AuctAuction-Card
        @swap="pushOnSwap"
        @popFirst="popFirstItem"
        @deleteSelling="deleteSellingItem"
        @pushItemFront="pushItemFront"
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
        @deleteSold="deleteSoldItem"
        v-for="(item, index) in soldItems"
        :key="item.itemName + item.itemName + item.soldFor + item.fish + index"
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
          console.log("getting item");
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
          // window.location.reload();
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
        // Swap on the front end as well
        var tempItem = this.items[this.swapArray[0]];
        var tempItem2 = this.items[this.swapArray[1]];
        this.items[this.swapArray[0]] = tempItem2;
        this.items[this.swapArray[1]] = tempItem;

        await this.swap();

        this.swapArray = []; //Clear the array.
      }
    },
    async popFirstItem(buyer, amount) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/PopItem?amount=" +
          amount +
          "&buyer=" +
          buyer,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("slicing");
          // Shallow change the array for the front end
          this.items[0].buyer = buyer;
          this.items[0].amount = amount;
          this.soldItems.push(this.items[0]);
          this.items = this.items.slice(1); // Poping the first item from the array
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    async deleteSoldItem(index) {
      console.log("calling delete sold");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/DeleteItemFromSold?itemIndex=" +
          index,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("splicing the array");
          console.log(this.items);
          this.soldItems.splice(index, 1); // Poping the first item from the array
          console.log("After splice");
          console.log(this.items);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    async deleteSellingItem(index) {
      console.log("calling 2");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/DeleteItem?itemIndex=" +
          index,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("splicing the array");
          console.log(this.items);
          this.items.splice(index, 1); // Poping the first item from the array
          console.log("After splice");
          console.log(this.items);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    async deleteSoldItem(index) {
      console.log("calling delete sold");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/DeleteItemFromSold?itemIndex=" +
          index,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("splicing the array");
          console.log(this.items);
          this.soldItems.splice(index, 1); // Poping the first item from the array
          console.log("After splice");
          console.log(this.items);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
    async pushItemFront(index) {
      console.log("calling push item front");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var raw = JSON.stringify(index);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/PutItemFront",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let temp = this.items[index];
           var removed = this.items.splice(index, 1);
           this.items.unshift(temp);
          console.log(result)
          })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>