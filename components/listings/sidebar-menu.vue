<template>
  <div class="pl-3 ...">
    <div>
      search
      <form>
        <label
          for="default-search"
          class="
            mb-2
            text-sm
            font-medium
            text-gray-900
            sr-only
            dark:text-gray-300
            hover:border-solid hover:border-2 hover:border-indigo-600
          "
          >Search</label
        >
        <div class="relative rounded hover:border-solid hover:border-2 hover:border-indigo-600">
          <div
            class="
              flex
              absolute
              inset-y-0
              left-0
              items-center
              pl-3
              pointer-events-none
              hover:border-solid hover:border-2 hover:border-indigo-600
            "
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400 hover:border-solid hover:border-2 hover:border-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="
              block
              p-4
              pl-10
              w-full
              text-sm text-gray-900
              bg-gray-50
              rounded-lg
              border border-gray-300
              focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="
              text-white
              absolute
              right-2.5
              bottom-2.5
              bg-blue-700
              hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300
              font-medium
              rounded-lg
              text-sm
              px-4
              py-2
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            "
          >
            Search
          </button>
        </div>
      </form>
    </div>
<div class="pb-1"></div>
   <div class="form-check rounded bg-stone-300  hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="pickup">
      <label class="form-check-label inline-block text-gray-800" for="pickup">
        Seller Allows Pickup
      </label>
    </div>
<div class="pb-2"></div>
           <div class="form-check rounded bg-slate-300  hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="ships">
      <label class="form-check-label inline-block text-gray-800" for="ships">
        Seller Ships
      </label>
    </div>
<div class="pb-2"></div>
            <div class="form-check rounded bg-stone-300 hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="cost" for="cost">
      <label class="form-check-label inline-block text-gray-800" for="cost">
       Sort By Cost
      </label>
    </div>
<div class="pb-2"></div>
        <div class="form-check rounded bg-slate-300  hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="distance">
      <label class="form-check-label inline-block text-gray-800" for="distance">
       Sort By Distance
      </label>
    </div>

    <div>
      Catagories
    <ListingsCatagory :key="catagories.name" :catagories="catagories" :color="1"/>
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
     props:['catagories'],
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
    };
  },
    created()
  { 
  },
  mounted()
  { 

  },
    computed()
  { 

  },
}
</script>

<style>
</style>
