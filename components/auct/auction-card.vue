<template>
  <div v-if="this.show" class="pb-1 pt-1 pl-2 pr-2 flex justify-center">
    <div v-if="loaded">
      <div
        class="
          max-w-xl
          rounded
          overflow-hidden
          shadow-lg
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
        :class="{
          'border-solid border-2 border-indigo-600 colorSwag': startNum == 0,
        }"
      >
        <img class="w-full" :src="imageLinkItem" :alt="itemName" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-1 text-center">{{ itemName }}</div>
          <div class="font-medium text-xl mb-1">Seller - {{ seller }}</div>
          <div class="font-medium text-xl mb-1">Fish - {{ fish }}</div>
          <p class="text-gray-700 text-base">{{ fishInfo }}</p>
           <p class="text-gray-700 text-base">place in line - {{startNum + 1}}</p>
        </div>
        <div v-if="admin" class="px-6 pt-4 pb-2">
          <button
            class="
              transition
              delay-150
              duration-300
              ease-in-out
              hover:-translate-y-1 hover:scale-110
              shadow
              bg-indigo-600
              hover:bg-indigo-700
              focus:shadow-outline focus:outline-none
              text-white
              font-bold
              py-2
              px-2
              rounded
            "
            :class="{ 'bg-indigo-900': swapClicked == 1 }"
            type="button"
            @click="
              this.$emit('swap', startNum);
              swapClicked = swapClicked * -1;
            "
          >
            swap
          </button>
          <div class="pl-4 pb-2"></div>
                     <button v-if="startNum !=0"
              class="
                transition
                delay-150
                duration-300
                ease-in-out
                hover:-translate-y-1 hover:scale-110
                shadow
                bg-blue-500
                hover:bg-blue-600
                focus:shadow-outline focus:outline-none
                text-white
                font-bold
                py-2
                px-2
                rounded
              "
              type="button"
              @click="this.$emit('pushItemFront', itemName, startNum)"
            >
              push item to front
            </button>
          <div v-if="startNum == 0 && sold == false">
            <button
              class="
                transition
                delay-150
                duration-300
                ease-in-out
                hover:-translate-y-1 hover:scale-110
                shadow
                bg-red-500
                hover:bg-red-600
                focus:shadow-outline focus:outline-none
                text-white
                font-bold
                py-2
                px-2
                rounded
              "
              type="button"
              @click="selling = !selling;"
            >
              sell
            </button>
            <div class="pl-2 pb-2"></div>
          </div>
        </div>
        <div v-if="sold" class="px-6 pt-4 pb-2">
          <div class="font-medium text-xl mb-1">buyer - {{ buyer }}</div>
          <div class="font-medium text-xl mb-1">
            Item sold for ${{ soldFor }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="max-w-xl rounded overflow-hidden shadow-lg">
      loading...
    </div>
    <div class="pl-2">
      <button
        v-if="admin && sold"
        class="
          transition
          delay-150
          duration-300
          ease-in-out
          hover:-translate-y-1 hover:scale-110
          shadow
          bg-red-500
          hover:bg-red-600
          focus:shadow-outline focus:outline-none
          text-white
          font-bold
          py-2
          px-2
          rounded
        "
        type="button"
        @click="this.$emit('deleteSold', startNum)"
      >
        delete sold item
      </button>
      <button
        v-else-if="admin"
        class="
          transition
          delay-150
          duration-300
          ease-in-out
          hover:-translate-y-1 hover:scale-110
          shadow
          bg-red-500
          hover:bg-red-600
          focus:shadow-outline focus:outline-none
          text-white
          font-bold
          py-2
          px-2
          rounded
        "
        type="button"
        @click="this.$emit('deleteSelling', startNum)"
      >
        delete item
      </button>
    </div>
    <div v-if="selling">
      <form class="pl-4 w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
              Buyer
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-red-500
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white
              "
              id="grid-buyer"
              type="text"
              placeholder="Buyer"
              v-model="buyer"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
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
              Amount
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-last-name"
              type="number"
              placeholder="1"
              v-model="amount"
            />
          </div>
        </div>
        <div class="flex justify-center -mx-3 mb-6">
          <button
            class="
              transition
              delay-150
              duration-300
              ease-in-out
              hover:-translate-y-1 hover:scale-110
              shadow
              bg-red-500
              hover:bg-red-600
              focus:shadow-outline focus:outline-none
              text-white
              font-bold
              py-2
              px-2
              rounded
            "
            type="button"
            @click="
              selling = false;
              if (buyer !== null && amount !== null)
                this.$emit('popFirst', buyer, amount);
            "
          >
            sell this item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
  props: [
    "fish",
    "itemName",
    "seller",
    "buyer",
    "soldFor",
    "admin",
    "sold",
    "startNum",
    "imageLink",
    "show"
  ],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      imageLinkItem: "",
      fishInfo: "",
      loaded: false,
      swapClicked: 1,
      amount: "",
      selling: false,
    };
  },
  created() {},
  async mounted() {
    await this.getFish();
    this.loaded = true;
  },
  computed() {},
  methods: {
    async getFish() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        "https://plaxbackendapi.azurewebsites.net/Fish/Go/" + this.fish + "",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var theFish = JSON.parse(result);
          this.imageLinkItem = this.imageLink;
          this.fishInfo = "Size " + theFish.size + theFish.waterConditions;
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
.colorSwag {
  background: linear-gradient(-45deg, #60fcd5, #51f590, #8da7d8, #2eeb93);
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