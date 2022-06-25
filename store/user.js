// store/test.ts
import {ref, computed, watch} from "vue";
import { defineStore } from 'pinia';

export const useUserStore = defineStore("user",() => {
  const user = ref
  ({
    name: "nullToken",
    email: "someEmail",
  });
  const website = computed(() => user.value.email.toLowerCase())
  const changeName = (newName) => 
  {
    user.value.name = newName;
  };
return
{
  user,
  website,
  changeName
}

});