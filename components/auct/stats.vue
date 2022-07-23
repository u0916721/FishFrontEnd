<template>
  <div class="xl:flex xl:justify-center lg:flex lg:justify-center">
    <div class="w-full md:w-1/4 px-3  place-content-center">
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
      <div class="w-full px-3 mb-6 md:mb-0 py-2" v-if="displayStats">
        <p class="text-center font-bold bg-green-800 text-white rounded-full">
          Spent: ${{ spent }}
        </p>
        <div class="pb-2"></div>
        <p class="text-center font-bold bg-green-800 text-white rounded-full">
          Made: ${{ made }}
        </p>
        <div class="pb-2"></div>
        <div v-if="itemsBought.length > 0" class="pb-2">
          <p
            class="text-center font-bold funBackGround text-white rounded-full"
          >
            you have bought the following items
          </p>
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
            :startNum="item.startNum - 1"
            :imageLink="item.imageLink"
            :show="true"
            :description="item.description"
          />
        </div>
        <div v-else class="pb-2">
          <p
            class="text-center font-bold funBackGround text-white rounded-full"
          >
            you have yet to buy anything
          </p>
        </div>
        <div v-if="itemsSold.length > 0">
          <p
            class="text-center font-bold funBackGround text-white rounded-full"
            v-if="itemsSold.length > 0"
          >
            you have sold the following items
          </p>
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
        <div v-if="userUnsoldItems.length > 0" class="pb-2">
          <p
            class="
              text-center text-center
              font-bold
              funBackGround
              text-white
              rounded-full
            "
            v-if="userUnsoldItems.length > 0"
          >
            you have yet to sell the following items
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
            :startNum="item.startNum - 1"
            :imageLink="item.imageLink"
            :show="true"
            :description="item.description"
          />
        </div>
      </div>
    </div>
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
        Select Type of Stat
      </label>
      <div class="w-full px-3 mb-6 md:mb-0 py-2">
        <div class="relative" @click="getAdvancedStats">
          <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Most popular items</option>
            <option>Items that have made the most money</option>
          </select>
          <div
            class="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              text-gray-700
            "
          ></div>
        </div>
        <div v-if="showAdvancedStats">
          <AuctTest :yAxis="yAxis" :xAxis="xAxis" :label="chartLabel" />
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
      chartLabel: "Chart label",
      selected: "",
      showAdvancedStats: false,
      xAxis: [],
      yAxis: [],
    };
  },
  created() {},
  mounted() {},
  computed() {},
  methods: {
    containsItemName(name, objectArray) {
      for (let i = 0; i < objectArray.length; i++) {
        if (objectArray[i].itemName === name) {
          return true;
        }
      }
      return false;
    },
    getAdvancedStats() {
      this.showAdvancedStats = false;
      // Will probably want to use a delegate funtion or lambda to make code more readble and less DRY.
      let amountItem = { itemName: "someName", itemAmount: 0 };
      let objectArray = [];
      // First loop gets all the items in the array.
      //O(i*n) optimize later if needs be.
      console.log(this.selected);
      if (this.selected === "Items that have made the most money") {
        for (let i = 0; i < this.soldItems.length; i++) {
          if (this.containsItemName(this.soldItems[i].fish, objectArray)) {
            // We need to increment the object array.
            // First we find what index this object lives
            for (let n = 0; n < objectArray.length; n++) {
              // We have found where the object lives
              if (objectArray[n].itemName === this.soldItems[i].fish) {
                objectArray[n].itemAmount = objectArray[n].itemAmount + this.soldItems[i].soldFor;
              }
            }
          } else {
            objectArray.push({
              itemName: this.soldItems[i].fish,
              itemAmount: this.soldItems[i].soldFor,
            }); // Add it into the array
          }
        }
      } else if (this.selected === "Most popular items") {
        for (let i = 0; i < this.soldItems.length; i++) {
          if (this.containsItemName(this.soldItems[i].fish, objectArray)) {
            // We need to increment the object array.
            // First we find what index this object lives
            for (let n = 0; n < objectArray.length; n++) {
              // We have found where the object lives
              if (objectArray[n].itemName === this.soldItems[i].fish) {
                objectArray[n].itemAmount = objectArray[n].itemAmount + 1;
              }
            }
          } else {
            objectArray.push({
              itemName: this.soldItems[i].fish,
              itemAmount: 1,
            }); // Add it into the array
          }
        }
      }
      objectArray.sort((a, b) => (a.itemAmount > b.itemAmount ? -1 : 1)); // Sort the array for organization

      // Now we get the numbers out of the array.
      for (let i = 0; i < objectArray.length; i++) {
        this.xAxis[i] = objectArray[i].itemName;
        this.yAxis[i] = objectArray[i].itemAmount;
      }
      console.log(this.xAxis);
      console.log(this.yAxis);
      this.showAdvancedStats = true;
    },
    getStats() {
      this.displayStats = true;
      this.made = 0;
      this.spent = 0;
      this.itemsSold = [];
      this.itemsBought = [];
      this.userUnsoldItems = [];
      for (let i = 0; i < this.soldItems.length; i++) {
        if (this.soldItems[i].seller == this.auctionID) {
          console.log("printing out the sold wekjwk");
          this.soldItems[i].startNum = i + 1;
          this.itemsSold.push(this.soldItems[i]);
          // Also add it to the spent amount
          this.made = this.made + this.soldItems[i].soldFor;
        }
        if (this.soldItems[i].buyer == this.auctionID) {
          this.soldItems[i].startNum = i + 1;
          this.itemsBought.push(this.soldItems[i]);
          // Also add it to the sold amount
          this.spent = this.spent + this.soldItems[i].soldFor;
        }
      }
      // Now get users unsold items
      for (let i = 0; i < this.itemsYetToSell.length; i++) {
        if (this.itemsYetToSell[i].seller == this.auctionID) {
          this.itemsYetToSell[i].startNum = i + 1;
          this.userUnsoldItems.push(this.itemsYetToSell[i]);
        }
      }
    },
  },
};
</script>

<style>
.funBackGround {
  background: linear-gradient(-47deg, #000000, #4c00ff, #8400ff, #00ff55);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
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