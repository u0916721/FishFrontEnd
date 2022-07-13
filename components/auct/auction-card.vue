<template>
  <div class="pb-1 pt-1 pl-2 pr-2 flex justify-center">
    <div v-if="loaded">
      <div class="max-w-xl rounded overflow-hidden shadow-lg hover:border-solid hover:border-2 hover:border-indigo-600" :class="{ 'border-solid border-2 border-indigo-600 colorSwag' : startNum == 0 }">
        <img class="w-full" :src="imageLink" :alt="itemName" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-1 text-center">{{ itemName }}</div>
          <div class="font-medium text-xl mb-1">Seller - {{ seller }}</div>
          <div class="font-medium text-xl mb-1">Fish - {{fish}}</div>
          <p class="text-gray-700 text-base">{{fishInfo}}</p>
        </div>
        <div v-if="admin" class="px-6 pt-4 pb-2">{{startNum}}Buttons here for admin
          <button class="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded " :class="{ 'bg-indigo-900' : swapClicked == 1 }" type="button" @click="this.$emit('swap',startNum); swapClicked = swapClicked * - 1">
        swap
      </button>
        </div>
        <div v-if="sold" class="px-6 pt-4 pb-2">
          <div class="font-medium text-xl mb-1">buyer - {{buyer}}</div>
          <div class="font-medium text-xl mb-1">Item sold for ${{soldFor}}</div>
        </div>
      </div>
    </div>
    <div v-else class="max-w-xl rounded overflow-hidden shadow-lg">
      loading...
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
  ],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      imageLink: "",
      fishInfo: "",
      loaded: false,
      swapClicked: 1,
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
          this.imageLink = theFish.pictures[0];
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
	background: linear-gradient(-45deg, #60fcd5, #51f590, #4dffb5, #2eeb93);
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