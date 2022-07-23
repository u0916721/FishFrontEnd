// store/test.ts
import {watch} from "vue";
import { defineStore } from 'pinia';

export const userProfile = defineStore('user',{


  state: () => ({
    userToken: null,
    userRole: undefined,
    loggedIn: true, // True for now but can be changed
  }),

  getters: {
    getUserToken: state => `Value is ${state.userToken}`
  },

  actions: {
    // This method sets the jwt token and stores it in storage
    setNewTokenValue(theUserToken) {
      this.userToken = theUserToken;
      localStorage.setItem("userToken",JSON.stringify(theUserToken));
      localStorage.setItem("theDate", JSON.stringify(new Date())); // Store the date to check for login
    },
    setValueFromStorage()
    {
      try{
      this.userToken = JSON.parse(localStorage.getItem("userToken"));
      let loginDate = new Date(JSON.parse(localStorage.getItem("theDate")));
      let currentDate = new Date(JSON.parse(JSON.stringify(new Date())));
      var diff = Math.abs(currentDate - loginDate);
      var minutes = Math.floor((diff/1000)/60);
      console.log(currentDate);
      console.log(loginDate);
      console.log(diff);
      if(minutes > 300)
      {
        this.loggedIn = false;
      }}
      catch(error)
      {
        this.loggedIn = false;
      }
    },
    setSwagValue(newValue) {
      this.value = newValue;
    }
  }
})