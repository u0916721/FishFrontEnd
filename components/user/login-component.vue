<template>

    <div class="hover:bg-gradient-to-r from-gray-100 to-green-100 flex-auto w-96 rounded hover:shadow-md hover:shadow-green-500/50">
    <div class="py-2"></div>
          <div v-if="register"> 
    <UserRegister-Component @registered ="registered"/>
    </div>
      <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6 px-2">
    <div class="md:w-1/3">
      <label class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Username
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 hover:border-green-300" id="inline-full-name" type="text"  v-model="username"
        @keyup.enter="logIn">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6 px-2">
    <div class="md:w-1/3">
      <label class="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 hover:border-green-300" id="inline-password" type="password"     v-model="password"
        @keyup.enter="logIn">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>
    <label class="md:w-2/3 block text-gray-500 font-bold">
         <div class="text-center">
      <p>Not a member? <a class="underline text-blue-500 hover:text-blue-700" href="#!" @click="register = true;">Register</a></p>
    </div>
    </label>
  </div>
  <div class="flex items-center">
    <div class="w-1/3 md:w-1/2 lg:w-1/2 xl:-1/2 2xl:-1/2"></div>
    <div>
      <button class="shadow bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded " type="button" @click="logIn">
        Log in
      </button>
      <div class = "py-2"></div>
    </div>
  </div>
</form>
    </div>


  
</template>


<script>
import { userProfile } from "~/store/user";
export default {
  setup() {
    const theUser = userProfile();
    return {
      theUser,
    };
  },
  data() {
    return {
      username: " ",
      password: "",
      incorrect: false,
      register: false,
    };
  },
  methods: {
    // This method logs in the user and makes a request to the backend to do so., also need to be tied to enter as well.
    async logIn() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        UserName: this.username,
        Password: this.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      try {
        var data = await fetch(
          "https://plaxbackendapi.azurewebsites.net//user/login",
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              this.incorrect = false;
                this.$router.push('/landing-page');
              return response.text();
            }
            this.incorrect = true;
            return response.text();
          })
          .then((result) => {
            console.log("token parsed");
            return this.theUser.setNewTokenValue(JSON.parse(result).token); // Here we set the token value to the pinia store, We will also NEED to set the username and role here as well.
          }) 
          .catch((error) => {
            console.log("error", error);
             this.$router.push('/');
             return "";
          });
      } catch (exception_var) {}
    },
    registered()
    {
      this.register = false;
    },
    setSavedValue() {
      this.test.setValueFromStorage();
      console.log("New Count:", this.theUser.setValueFromStorage());
    },
  },
};
</script>

<style>
</style>