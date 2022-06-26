// store/test.ts
import {watch} from "vue";
import { defineStore } from 'pinia';

export const useTest = defineStore('user',{


  state: () => ({
    userToken: null,
    userRole: undefined,
  }),

  getters: {
    getUserToken: state => `Value is ${state.userToken}`
  },

  actions: {
    // This method sets the jwt token and stores it in storage
    setNewTokenValue(theUserToken) {
      this.userToken = theUserToken;
      localStorage.setItem("userToken",JSON.stringify(theUserToken));
    },
    setValueFromStorage()
    {
      this.userToken = JSON.parse(localStorage.getItem("userToken"));
    },
    setSwagValue(newValue) {
      this.value = newValue;
    }
  }
})