// store/test.ts
import { watch } from "vue";
import { defineStore } from 'pinia';

export const userProfile = defineStore('user', {


  state: () => ({
    userToken: null,
    userName: null, // The users provided username on login
    password: null, // The users password we are given on login. 
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
      localStorage.setItem("userToken", JSON.stringify(theUserToken));
      localStorage.setItem("theDate", JSON.stringify(new Date())); // Store the date to check for login
    },
    // This method sets the users username and password
    saveUserNameAndPassword(username, password) {
      console.log("calling saveUserNameAndPassword");
      this.username = username;
      this.password = password;
      // Save the username and password in local storage.
      localStorage.setItem("username", JSON.stringify(username));
      localStorage.setItem("password", JSON.stringify(password)); // Store the date to check for login
    },
    // This method checks to see if the user is logged in retruns true, if the user is logged in, false otherwise 
    isLoggedIn() {
      var responseOk = false;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.userToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://plaxbackendapi.azurewebsites.net/user/isLoggedIn", requestOptions)
        .then(response => {
          responseOk = response.ok;
          return response.text();
        })
        .then(result => { return result; })
        .catch(error => console.log('error', error));
      return responseOk;
    },
    relogin() 
    {

    },
    // Wipes everything from local storage)
    logout() {
      this.userToken = "";
      this.username = "";
      this.password = "";
      // Clear everything
      localStorage.setItem("username", JSON.stringify(""));
      localStorage.setItem("password", JSON.stringify("")); // Store the date to check for login
      localStorage.setItem("userToken", JSON.stringify(""));
    },
    // This method act as a refresh for us as well as a way to notify of expering tokens.
    setValueFromStorage() {
      try {
        this.userToken = JSON.parse(localStorage.getItem("userToken"));
        this.username = JSON.parse(localStorage.getItem("username"));
        this.password = JSON.parse(localStorage.getItem("password"));
        if(this.userToken === null || this.userToken === "")
        {
          alert("you have been logged out please try logging in again");
        }
        if(!this.isLoggedIn)
        {
            this.relogin();
        }
        else
        {
         // console.log("you are logged in!");
        }
      }
      catch (error) {
        this.loggedIn = false;
        alert("unable to login");
      }
    },
    setSwagValue(newValue) {
      this.value = newValue;
    }
  }
})