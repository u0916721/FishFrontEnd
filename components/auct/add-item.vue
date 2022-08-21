<template>
<div>
<div v-if="loading" class="py-24
      bg-auto bg-no-repeat bg-center bg-[url('~/assets/loading.gif')]"></div>
  <div class="flex justify-center grid grid-cols-1">
    <form class="px-4 w-full">
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
            Item Name
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
            v-model="itemName"
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
            Seller
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
            v-model="seller"
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
            <p v-if="imageUpload">Upload image</p>
            <p v-else>Image link</p>
          </label>
          <input
            v-if="!imageUpload"
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
            placeholder="Image Link"
            v-model="imageLink"
            @change="refreshDisplayedImage"
          />
          <input
            v-else
            type="file"
            id="input"
            class="px-4 text-black py-4 border-2 border border-blue-500 rounded"
            multiple
            @change="imageUploaded"
          />
        </div>
        <div class="px-2"></div>
        <div class="py-1">
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
            @click="imageUpload = !imageUpload"
          >
            <p v-if="imageUpload">Use link from internet</p>
            <p v-else>Upload your own image</p>
          </button>
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
            Fish
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
            placeholder="Fish Name"
            v-model="fish"
          />
        </div>
        <div class="w-full px-3">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Item Description</label
          >
          <textarea
            id="message"
            rows="4"
            class="
              block
              p-2.5
              w-full
              text-sm text-black
              bg-white
              rounded-lg
              border border-black
              focus:outline-none focus:bg-white focus:border-blue-700
            "
            placeholder="Item description"
            v-model="description"
          ></textarea>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-state"
          >
            Auto Fill Fish Info
          </label>
          <div class="relative">
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
              @click="getFishInfo"
              v-model="selected"
            >
              <option>Select One</option>
              <option
                v-for="(name, index) in fishNames"
                :value="name"
                :key="name + index"
              >
                {{ name }}
              </option>
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
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
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
          @click="submitItem"
        >
          Submit
        </button>
      </div>
    </form>
    <div>
      <label
        class="
          flex
          justify-center
          block
          uppercase
          tracking-wide
          text-black text-xs
          font-bold
          mb-2
        "
        for="grid-state"
      >
        Preview
      </label>
      <AuctAuction-Card
        :key="refreshKeyPreview"
        :itemName="itemName + '%'"
        :fish="fish"
        :seller="seller"
        :buyer="buyer"
        :soldfor="null"
        :sold="false"
        :admin="false"
        :startNum="totalItems.length"
        :imageLink="imageLink"
        :show="true"
        :description="description"
      />
    </div>
  </div>
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
      itemName: "",
      fish: "",
      soldFor: null,
      buyer: null,
      seller: "",
      imageLink:
        "https://aquariumadviser.com/wp-content/uploads/2019/05/Exotic-and-Cool-Freshwater-Aquarium-Fish.jpg",
      description: "",
      selected: "",
      refreshKeyPreview: 100,
      imageUpload: false,
      imageSubmitted: false,
      loading: false,
    };
  },
  created() {},
  mounted() {
    this.theUser.setValueFromStorage();
    console.log("loading comp");
  },
  computed() {},
  methods: {
    refreshDisplayedImage() {
      this.refreshKeyPreview = this.refreshKeyPreview + 1;
    },
    inputToURL(inputElement) {
      var file = inputElement.files[0];
      return window.URL.createObjectURL(file);
    },

    imageUploaded() {
      console.log("calling image uplodaed");
      const selectedFile = document.getElementById("input").files[0];
      this.imageLink = this.inputToURL(document.getElementById("input"));
      this.refreshKeyPreview = this.refreshKeyPreview + 1;
      this.imageSubmitted = true;
    },

    s3ImageUpload(s3Link) {
      console.log(s3Link);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "image/jpeg");

      var file = document.getElementById("input").files[0];

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: file,
        redirect: "follow",
      };

      fetch(
        s3Link,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    async submitItem() {
      this.loading = true;
      console.log("calling submit item");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.theUser.userToken);
      var responseOk;
      if (this.imageUpload) {
        var raw = JSON.stringify({
          itemName: this.itemName,
          Fish: this.fish,
          Description: this.description,
          Seller: this.seller,
          ImageLink: "userUpload",
        });
      } else {
        var raw = JSON.stringify({
          itemName: this.itemName,
          Fish: this.fish,
          Description: this.description,
          Seller: this.seller,
          ImageLink: this.imageLink,
        });
      }

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://plaxbackendapi.azurewebsites.net/Cliques/Auction/GSLAS/AddItem",
        requestOptions
      )
        .then((response) => {
          responseOk = response.ok;
          return response.text();
        })
        .then((result) => {
          if (responseOk) {
            if(this.imageUpload)
            {
              console.log("uploading to s3");
              console.log(result);
              this.s3ImageUpload(result); 
            }
            // We can emit and clear the fields!.
            this.itemName = "";
            this.fish = "";
            this.description = "";
            // this.seller = ""; lets not clear the seller so that we can add one after another
            this.imageLink =
              "https://aquariumadviser.com/wp-content/uploads/2019/05/Exotic-and-Cool-Freshwater-Aquarium-Fish.jpg";
            this.refreshKeyPreview = this.refreshKeyPreview + 1;
            console.log(raw);
            this.$emit("addNewItem", raw);
          } else {
            alert("unable to add item try logging in again");
          }
          return result;
        })
        .catch((error) => alert(error));
          this.loading = false;
    },

    getFishInfo() {
      if (this.selected == "Select One" || this.selected == "") {
        return;
      }
      console.log(this.selected);
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/Fish/Go/" + this.selected,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let tempInfo = JSON.parse(result);
          if(!this.imageUpload)
          {
            // We dont want to over the image upload
          this.imageLink = tempInfo.pictures[0];
          }
          this.fish = tempInfo.name;
          this.itemName = tempInfo.name;
          this.description = tempInfo.size + " " + tempInfo.waterConditions;
          this.refreshKeyPreview = this.refreshKeyPreview + 1;
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>