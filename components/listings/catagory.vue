<template>
  <div class="pl-1">
    <div v-if="color % 2 === 0" class="rounded bg-slate-300 hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" :id="catagories.name">
      
      {{catagories.name}} </div>
       <div v-else class="rounded bg-stone-300 hover:border-solid hover:border-2 hover:border-indigo-600">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" :id="catagories.name">
      
      {{catagories.name}} </div>
    <div v-if="catagories.subCatagories !== null">
      <div v-for="cat in catagories.subCatagories" :key="cat.name">
        <div class="pb-2"></div>
        <ListingsCatagory :key="cat.name + '1'" :catagories="cat" :color="color+1"/> 
        </div>
    </div>
  </div>
</template>

<script>
import { userProfile } from "~/store/user";
export default {
     props:['catagories','color'],
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
    console.log("printing cats recursion");
    console.log(this.catagories.name);

  },
}
</script>

<style>

</style>