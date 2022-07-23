<template>
  <div class="flex justify-center bg-blue-500 ">
    <form class="pl-2 w-full max-w-lg  p-6">
      <div class="flex flex-wrap -mx-3 mb-6 ">
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
            Fish Name
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
            placeholder="Name of the Item"
            v-model="name"
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
            Picture
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
            v-model="pictures"
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
            Care Link
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
            placeholder="care link"
            v-model="carelink"
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
            Size
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
            placeholder="Size of fish"
            v-model="size"
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
            Maintenance
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
            placeholder="maintenance description"
            v-model="maintenance"
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
            WaterConditions
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
            placeholder="Water Conditions"
            v-model="waterConditions"
          />
        </div>
        <div class="pb-4 py-4">
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
            @click="submitFish"
          >
            Submit
          </button>
        </div>
        <div>
          <img
            class="flex justify-center object-cover cursor-zoom-out"
            :src="pictures"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
  props: ["totalItems", "fishNames", "items"],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      name: "",
      pictures:
        "https://aquariumadviser.com/wp-content/uploads/2019/05/Exotic-and-Cool-Freshwater-Aquarium-Fish.jpg",
      carelink: "",
      size: "",
      maintenance: "",
      waterConditions: "",
    };
  },
  created() {},
  mounted() {
    this.theUser.setValueFromStorage();
  },
  computed() {},
  methods: {
    submitFish() {
      var responseOk;
      var statusText;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);

      var raw = JSON.stringify({
        Name: this.name,
        Pictures: [this.pictures],
        CareLink: this.carelink,
        Size: this.size,
        Maintenance: this.maintenance,
        WaterConditions: this.waterConditions,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Fish/Post",
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          statusText = response.statusText;
          console.log(response);
          return response.text();
        })
        .then((result) => {
            if(statusText == "Forbidden" )
            {
                window.alert("You do not have accsess to do this, must be an admin");
                return result;
            }
            else if(statusText == "Bad Request")
            {
                     window.alert("Fish is already present in Databse");
            }
            else if(responseOk)
            {
                this.name = "";
                this.carelink = "";
                this.maintenance = "";
                this.waterConditions = "";
                this.size = "";
                return result;
            }
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
.loadingSwag {
  background: linear-gradient(-47deg, #0098f7, #ff0000, #1eff00, #c300ff);
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