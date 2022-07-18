<template>
  <div class="flex justify-center">
    <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
      <label
        class="
          block
          uppercase
          tracking-wide
          text-gray-700 text-xs
          font-bold
          mb-2
        "
        for="grid-first-name"
      >
        Your Auction ID
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
          mb-3
          leading-tight
          focus:outline-none focus:bg-white focus:border-blue-700
        "
        id="grid-first-name"
        type="text"
        placeholder="Your Auction ID EX: 76 "
        v-model="auctionID"
      />
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
        @click="getStats"
      >
        Get info
      </button>
      <div class="w-full px-3 mb-6 md:mb-0" v-if="displayStats">
        <p>Spent: {{ spent }}</p>
        <p>Made: {{ made }}</p>
        <div v-if="itemsBought.length > 0">
          <p>you have bought the following items</p>
          <AuctAuction-Card
            v-for="(item, index) in itemsBought"
            :key="item.itemName + item.itemName + index"
            :itemName="item.itemName"
            :fish="item.fish"
            :seller="item.seller"
            :buyer="item.buyer"
            :soldFor="item.soldFor"
            :sold="true"
            :admin="false"
            :startNum="index"
            :imageLink="item.imageLink"
            :show="true"
            :description="item.description"
          />
        </div>
        <div v-if="itemsSold.length > 0">
          <p v-if="itemsSold.length > 0">you have sold the following items</p>
          <AuctAuction-Card
            v-for="(item, index) in itemsSold"
            :key="item.itemName + item.itemName + index"
            :itemName="item.itemName"
            :fish="item.fish"
            :seller="item.seller"
            :buyer="item.buyer"
            :soldFor="item.soldFor"
            :sold="true"
            :admin="false"
            :startNum="index"
            :imageLink="item.imageLink"
            :show="true"
            :description="item.description"
          />
        </div>
        <div v-if="itemsYetToSell.length > 0">
          <p v-if="itemsYetToSell.length > 0">
            you have sold the following items
          </p>
          <AuctAuction-Card
            v-for="(item, index) in userUnsoldItems"
            :key="item.itemName + item.itemName + index"
            :itemName="item.itemName"
            :fish="item.fish"
            :seller="item.seller"
            :buyer="item.buyer"
            :soldFor="item.soldFor"
            :sold="false"
            :admin="false"
            :startNum="index"
            :imageLink="item.imageLink"
            :show="true"
            :description="item.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
  props: ["soldItems", "itemsYetToSell"],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      auctionID: "",
      displayStats: false,
      spent: 0,
      made: 0,
      itemsBought: [],
      itemsSold: [],
      userUnsoldItems: [],
    };
  },
  created() {},
  mounted() {},
  computed() {},
  methods: {
    getStats() {
      this.displayStats = true;
      if (this.auctionID == "") {
        this.auctionID = " ";
      }
      for (let i = 0; i < this.soldItems.length; i++) {
        console.log("printing out the sold");
        console.log(this.soldItems[i].seller == "");
        if (this.soldItems[i].seller == "") {
          this.soldItems[i].seller == "A";
        }
         console.log(this.soldItems[i].seller == "");
        if (this.soldItems[i].seller == this.auctionID) {
          console.log("printing out the sold wekjwk");
          this.itemsSold.push(this.soldItems[i]);
          // Also add it to the spent amount
          this.made = this.made + this.soldItems[i].soldFor;
        }
        if (this.itemsBought[i].seller == this.auctionID) {
          this.itemsBought.push(this.soldItems[i]);
          // Also add it to the sold amount
          this.spent = this.spent + this.soldItems[i].soldFor;
        }
      }
      // Now get users unsold items
      for (let i = 0; i < this.itemsYetToSell.length; i++) {
        if (this.itemsYetToSell[i].seller == "") {
          this.itemsYetToSell[i].seller == "A";
        }
        if (this.itemsYetToSell[i].seller == this.auctionID) {
          this.userUnsoldItems.push(this.soldItems[i]);
        }
      }
    },
  },
};
</script>

<style>
</style>