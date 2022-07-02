<template>
  <div>
    <form>  
      <div v-if="usernameTaken" class="text-center text-red-500 hover:text-red-700">username if taken</div>
  <div class="md:flex md:items-center mb-6 px-2">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Username
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 hover:border-green-300" id="inline-full-name" type="text"  v-model="username"
  @keyup.enter="signup">
    </div>
  </div>
<div v-if="passwordNotMatch" class="text-right md:w-2/3 text-red-500 hover:text-red-700 animate-bounce">passwords do not match</div>
    <!-- Password input -->
    <div class="md:flex md:items-center mb-6 px-2">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 hover:border-green-300" id="inline-password" type="password"     v-model="password"
        @keyup.enter="signup">
    </div>
  </div>
    <div class="md:flex md:items-center mb-6 px-2">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Confirm Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 hover:border-green-300 " id="inline-password" type="password"     v-model="confirmPassword"
        @keyup.enter="signup">
    </div>
  </div>
    <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>
    <label class="md:w-2/3 block text-black font-bold">
         <div class="text-center">
      <p class="text-black">Go back to <a class="underline text-blue-800 hover:text-blue-700" href="#!" 
@click="this.$emit('registered');">login</a></p>
    </div>
    </label>
  </div>
  <div class="flex items-center">
    <div class="w-1/3 md:w-1/2 lg:w-1/2 xl:-1/2 2xl:-1/2"></div>
    <div>
      <button class="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 shadow bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded" type="button" @click="signup">
        Sign Up
      </button>
      <div class="px-2 py-2"></div>
      <div class = "py-2"></div>
    </div>
  </div>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "", // password and confirmpassword must match
      passwordNotMatch: false, // this if for showing the user if the passwords do not match.
      usernameTaken: false, // This is for showing the user that their username is taken.
    };
  },
  methods: {
    // This method signs the user up.
    async signup() {
      // First we check is the password match
      if (this.password !== this.confirmPassword) {
        this.passwordNotMatch = true; // Show the error div to the user.
        return;
      }
      this.passwordNotMatch = false; // The password now match
      // Below we make our request to sign the user up.
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        UserName: this.username,
        Password: this.password,
        Role: " ",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

     await fetch("https://plaxbackendapi.azurewebsites.net//user/signup", requestOptions)
        .then((response) => {
          if (response.ok) {
            this.usernameTaken = false; // Tell user the name has been taken
            this.$emit('registered'); // Go back to the login in component.s
            return response.text();
            
          }
          this.usernameTaken = true;
          return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>