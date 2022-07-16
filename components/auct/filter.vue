<template>
  <div class="flex justify-center">
    <div class="w-auto md:w-1/3 px-3 mb-6 md:mb-0">
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
        Catagory
      </label>
      <div class="relative pb-2">
        <select
          v-model="selected"
          class="
            block
            appearance-none
            w-full
            bg-white
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
        >
          <option disabled value="">Please select one</option>
          <option>Item Name</option>
          <option>Seller Name/ID</option>
          <option>Fish</option>
          <option v-if="inSoldItems">Buyer</option>
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
      <input
        class="
          appearance-none
          block
          w-full
          bg-white
          text-black
          border
          hover:border-blue-500
          rounded
          py-3
          px-4
          mb-3
          leading-tight
          focus:outline-none focus:bg-white
        "
        id="grid-first-name"
        type="text"
        placeholder="search term"
        @keyup="this.$emit('filterItems', selected, searchString)"
        v-model="searchString"
      />
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
  props: ["inSoldItems"],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      selected: "",
      searchString: "",
    };
  },
  created() {},
  mounted() {
    console.log(this.inSoldItems);
  },
  computed() {},
};
</script>

<style>
</style>