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
      <div v-if="toggleSold > 0"> switch to sold items</div>
      <div v-else> switch to items being auctioned</div>
    </button>
    <div v-if="toggleSold > 0">
      <AuctAuction-Card
        v-for="(item, index) in items"
        :key="item.itemName + item.itemName"
        :itemName="item.itemName"
        :fish="item.fish"
        :seller="item.seller"
        :buyer="item.buyer"
        :soldfor="null"
        :sold="false"
        :admin="false"
        :startNum="index"
        :imageLink="item.imageLink"
        :show="item.show"
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
        :admin="false"
        :startNum="index"
        :imageLink="item.imageLink"
        :show="item.show"
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
    };
  },
  created() {},
  async mounted() {
    this.theUser.setValueFromStorage();
    console.log(this.theUser.userToken == null); 
    await this.getItems();
    await this.getSoldItems();
    // setInterval(this.getItems, 10000);
  },
  computed() {},
  methods: {
        setItemsToShow(itemList)
    {
      for(let i = 0; i < itemList.length; i++)
      {console.log(itemList[i]);
        itemList[i].show = true;
        console.log(itemList[i]);
      }
    },
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
          this.items = JSON.parse(result);
          this.setItemsToShow(this.items);
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
          this.setItemsToShow(this.soldItems);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>