<template>
  <div class="grid grid-cols-1 colorSwag">
    <button v-if="isAdmin"
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
      @click="goToTools"
    >
    Auction Tools
    
    </button>
        <div class="pb-2"></div>
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
      @click="
        viewingAuctionedItems = !viewingAuctionedItems;
        addItem = false;
        displayAuctionStats = false;
      "
    >   
      <div v-if="viewingAuctionedItems > 0">switch to sold items</div>
      <div v-else>switch to items being auctioned</div>
    </button>
    <div class="pb-2"></div>
    <button
      v-if="canAdd && viewingAuctionedItems"
      class="
        transition
        delay-150
        duration-300
        ease-in-out
        hover:-translate-y-1 hover:scale-110
        shadow
        bg-blue-600
        hover:bg-blue-700
        focus:shadow-outline focus:outline-none
        text-white
        font-bold
        py-2
        px-2
        rounded
      "
      type="button"
      @click="addItem = !addItem"
    >
      Add Item
    </button>
    <button
      v-if="!viewingAuctionedItems"
      class="
        transition
        delay-150
        duration-300
        ease-in-out
        hover:-translate-y-1 hover:scale-110
        shadow
        bg-blue-600
        hover:bg-blue-700
        focus:shadow-outline focus:outline-none
        text-white
        font-bold
        py-2
        px-2
        rounded
      "
      type="button"
      @click="displayAuctionStats = !displayAuctionStats"
    >
      Auction Stats
    </button>
    <div v-if="displayAuctionStats">
      <AuctStats :soldItems="soldItems" :itemsYetToSell="items" />
    </div>
    <div v-if="addItem">
      <AuctAdd-Item
        @addNewItem="addNewItem"
        :totalItems="items"
        :inSoldItems="!viewingAuctionedItems"
        :fishNames="fishNames"
      />
    </div>
    <div class="pb-2"></div>
    <button
      class="
        transition
        delay-150
        duration-300
        ease-in-out
        hover:-translate-y-1 hover:scale-110
        shadow
        bg-blue-600
        hover:bg-blue-700
        focus:shadow-outline focus:outline-none
        text-white
        font-bold
        py-2
        px-2
        rounded
      "
      type="button"
      @click="filter = !filter"
    >
      Filter
    </button>
    <div class="pb-2"></div>
    <div v-if="filter">
      <AuctFilter
        @filterItems="filterItems"
        :inSoldItems="!viewingAuctionedItems"
      />
    </div>

    <div v-if="isAdmin">
      <div v-if="viewingAuctionedItems" :key="refreshKey">
        <AuctAuction-Card
          @swap="pushOnSwap"
          @popFirst="popFirstItem"
          @deleteSelling="deleteSellingItem"
          @pushItemFront="pushItemFront"
          @updateItem="updateItem"
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
          :imageLink="item.imageLink"
          :show="item.show"
          :description="item.description"
        />
      </div>
      <div v-else>
        <AuctAuction-Card
          @deleteSold="deleteSoldItem"
          @updateItem="updateItem"
          v-for="(item, index) in soldItems"
          :key="
            item.itemName + item.itemName + item.soldFor + item.fish + index
          "
          :itemName="item.itemName"
          :fish="item.fish"
          :seller="item.seller"
          :buyer="item.buyer"
          :soldFor="item.soldFor"
          :sold="true"
          :admin="true"
          :startNum="index"
          :imageLink="item.imageLink"
          :show="item.show"
          :description="item.description"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="viewingAuctionedItems">
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
          :description="item.description"
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
          :description="item.description"
        />
      </div>
    </div>
  </div>
</template>

<script >
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
      viewingAuctionedItems: true,
      swapArray: [],
      refreshKey: 1,
      isAdmin: false,
      filter: false,
      addItem: false,
      fishNames: [],
      displayAuctionStats: false,
      canAdd: false,
    };
  },
  created() {},
  async mounted() {
    this.theUser.setValueFromStorage();
    this.canAdd = this.theUser.userToken != null; // User can also add items as well
    this.isAdmin = await this.checkIfAdmin(); // Only admins can see things for swap and editing.
    //This is a bug need to fix later on.
    // if (!(await this.theUser.isLoggedIn) && this.canAdd) {
     //  window.alert("You are logged out and need to log in again");
    // }
    console.log("is admin?");
    console.log(await this.isAdmin);
    await this.getItems();
    await this.getSoldItems();
    await this.getFishNames();

     setInterval(this.refresh, 30000);
  },
  computed() {},
  methods: {
    goToTools()
    {
      //this.$router.push("/Auction/Tools/" + this.$route.params.id + "");
     // raw js solution since the above code does not work for some reason
     window.location.href = "Tools/" + this.$route.params.id;
    },
    async checkIfAdmin() {
      var admin = false;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);
      console.log("printing usertoken");
      console.log(this.theUser);
      console.log("printing usertoken");
      console.log(this.theUser.userToken);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "https://plaxbackendapi.azurewebsites.net/user/fishy/GetMyRole",
        requestOptions
      )
        .then((response) => {
          console.log(response);
          return response.text();
        })
        .then((result) => {
          console.log("printing result");
          console.log(result);
          console.log("printing result == club");
          console.log(result === "Club");
          console.log("printing result == baseUser");
          console.log(result === "baseUser");
          if (result === "Club") {
            admin = true;
          } else {
            admin = false;
          }
          return result;
        })
        .catch((error) => console.log("error", error));
      return admin;
    },
    addNewItem(itemToAdd) {
      itemToAdd = JSON.parse(itemToAdd);
      itemToAdd.show = true;
      itemToAdd.imageLink = itemToAdd.ImageLink;
      itemToAdd.seller = itemToAdd.Seller;
      itemToAdd.fish = itemToAdd.Fish;
      itemToAdd.description = itemToAdd.Description;
      this.items.push(itemToAdd);
    },
    async getFishNames() {
      var myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "ARRAffinity=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70; ARRAffinitySameSite=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Fish/GetAllFishByName",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.fishNames = JSON.parse(result);

          return result;
        })
        .catch((error) => console.log("error", error));
    },
    setItemsToShow(itemList) {
      for (let i = 0; i < itemList.length; i++) {
        itemList[i].show = true;
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
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/GetItems",
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
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/GetSoldItems",
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

    async swap() {
      var responseOk;
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
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/SwapItem",
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            this.getSoldItems(); // Here we referesh
            // window.location.reload();
            return result;
          } else {
            window.alert("Unable to preform task, try logging in again");
            return result;
          }
        })
        .catch((error) => console.log("error", error));
    },

    async pushOnSwap(number) {
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
      var responseOk;
      console.log(amount);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/PopItem?amount=" +
          amount +
          "&buyer=" +
          buyer,
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            // Shallow change the array for the front end
            this.items[0].buyer = buyer;
            this.items[0].soldFor = amount;
            this.soldItems.splice(0, 0, this.items[0]);
            this.items = this.items.slice(1); // Poping the first item from the array
            return result;
          } else {
            window.alert("Unable to preform task, try logging in again");
            return result;
          }
        })
        .catch((error) => console.log("error", error));
    },
    async deleteSellingItem(index) {
      var responseOk;
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
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            this.items.splice(index, 1); // Poping the first item from the array
            return result;
          } else {
            window.alert("Unable to complete task, try logging in again");
            return result;
          }
        })
        .catch((error) => console.log("error", error));
    },
    async deleteSoldItem(index) {
      var responseOk;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/DeleteItemFromSold?itemIndex=" +
          index,
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            this.soldItems.splice(index, 1); // Poping the first item from the array
            return result;
          } else {
            window.alert("Unable to complete task, try logging in again");
            return result;
          }
        })
        .catch((error) => console.log("error", error));
    },
    async getIndexOfItemsName(itemName) {
      // Get the valid index of said item
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].itemName == itemName) {
          return i;
        }
      }
    },
    async pushItemFront(itemName, index) {
      var responseOk;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);
      // Add helper method that gets valid index of array
      let i = await this.getIndexOfItemsName(itemName);
      var raw = JSON.stringify(index);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/PutItemFront",
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            let temp = this.items[index];
            var removed = this.items.splice(index, 1);
            this.items.unshift(temp);
          } else {
            window.alert("Unable to complete task, try logging in again");
            return result;
          }
        })
        .catch((error) => console.log("error", error));
    },

    filterItems(selection, searchString) {
      // lets not deal with varience in case
      searchString = searchString.toLowerCase();
      let selectedItemArray = this.items;
      if (this.viewingAuctionedItems) {
        selectedItemArray = this.items;
      } else {
        console.log("printing soldItems");
        console.log(this.soldItems);
        selectedItemArray = this.soldItems;
      }
      if (selection == "Item Name") {
        this.filterByName(selectedItemArray, searchString);
      } else if (selection == "Seller Name/ID") {
        this.filterBySeller(selectedItemArray, searchString);
      } else if (selection == "Fish") {
        this.filterByFish(selectedItemArray, searchString);
      } else if (selection == "Buyer") {
        this.filterByBuyer(selectedItemArray, searchString);
      }
    },
    filterByName(itemList, searchString) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].itemName.toLowerCase().includes(searchString)) {
          itemList[i].show = true;
        } else {
          itemList[i].show = false;
        }
      }
    },
    filterBySeller(itemList, searchString) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].seller.toLowerCase().includes(searchString)) {
          itemList[i].show = true;
        } else {
          itemList[i].show = false;
        }
      }
    },
    filterByFish(itemList, searchString) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].fish.toLowerCase().includes(searchString)) {
          itemList[i].show = true;
        } else {
          itemList[i].show = false;
        }
      }
    },
    filterByBuyer(itemList, searchString) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].buyer.toLowerCase().includes(searchString)) {
          itemList[i].show = true;
        } else {
          itemList[i].show = false;
        }
      }
    },
    updateItem(
      startNum,
      sold,
      fish,
      itemName,
      seller,
      buyer,
      soldFor,
      imageLink,
      description
    ) {
      console.log(this.soldItems);
      let selectedItemArray = this.items;
      let endString = "UpdateItemSelling";
      if (this.viewingAuctionedItems) {
        selectedItemArray = this.items;
        endString = "UpdateItemSelling";
      } else {
        console.log("went");
        selectedItemArray = this.soldItems;
        endString = "UpdateItemSold";
      }
      console.log(soldFor);
      console.log(selectedItemArray);
      let tempName = selectedItemArray[startNum].itemName;
      // This for a shallow front end copy
      selectedItemArray[startNum].sold = sold;
      selectedItemArray[startNum].fish = fish;
      selectedItemArray[startNum].seller = seller;
      selectedItemArray[startNum].imageLink = imageLink;
      selectedItemArray[startNum].itemName = itemName; // Might need to check on this, but doesnt matter after a reload
      selectedItemArray[startNum].buyer = buyer;
      selectedItemArray[startNum].soldFor = soldFor;
      selectedItemArray[startNum].description = description;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);
      var responseOk;
      var raw = JSON.stringify({
        id: null,
        ItemName: itemName,
        Fish: fish,
        SoldFor: soldFor,
        Seller: seller,
        Buyer: buyer,
        ImageLink: imageLink,
        Description: description,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/" +
          this.$route.params.id +
          "/" +
          tempName +
          "/" +
          endString,
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            console.log("Printing the result");
            console.log(result);
            selectedItemArray[startNum].itemName = result;
            return result;
          } else {
            window.alert("Unable to edit on server, login in again");
          }
        })
        .catch((error) => console.log("error", error));
    },
    refresh() {
      this.getItems();
      this.getSoldItems();
      console.log("finished refreshing");
    },
  },
};
</script>

<style>
.colorSwag {
  background: linear-gradient(-47deg, #91b2c7, #ffffff, #ffffff, #91b2c7);
  background-size: 400% 400%;
  animation: gradient 45s ease infinite;
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