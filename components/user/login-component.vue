<template>
  <div
    class="
      backdrop-blur
      hover:bg-white/10
      transition
      delay-150
      duration-300
      md:ease-in-out
      lg:ease-in-out
      xl:ease-in-out
      md:hover:scale-150
      lg:hover:scale-150
      xl:hover:scale-150
      flex-auto
      w-96
      rounded
      hover:shadow-md hover:shadow-green-500/50
    "
  >
    <div class="py-2"></div>
    <p class="font-mono text-center text-white text-4xl pb-4">
      Auction Host Login
    </p>
    <div v-if="loading">
      <button type="button" class="bg-indigo-500 animate-bounce" disabled>
        Logging in...
      </button>
    </div>
    <div v-else-if="register">
      <UserRegister-Component @registered="registered" />
    </div>
    <div v-else>
      <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6 px-2">
          <div class="md:w-1/3">
            <label
              class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Username
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-white
                appearance-none
                border-2 border-gray-200
                rounded-lg
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-green-500
                hover:border-green-300
              "
              id="inline-full-name"
              type="text"
              v-model="username"
              @keyup.enter="logIn"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6 px-2">
          <div class="md:w-1/3">
            <label
              class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-white
                appearance-none
                border-2 border-gray-200
                rounded-lg
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-green-500
                hover:border-green-300
              "
              id="inline-password"
              type="password"
              v-model="password"
              @keyup.enter="logIn"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3"></div>
          <label class="md:w-2/3 block text-black font-bold">
            <div class="text-center">
              <!-- <p class="text-black">
                Not a member?
                <a
                  class="underline text-blue-600 hover:text-blue-700"
                  href="#!"
                  @click="register = true"
                  >Register</a
                >
              </p> -->
            </div>
          </label>
        </div>
        <div class="flex items-center">
          <div class="w-1/3 md:w-1/2 lg:w-1/2 xl:-1/2 2xl:-1/2"></div>
          <div>
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
                py-2
                px-2
                rounded
              "
              type="button"
              @click="logIn"
            >
              Log in
            </button>
            <div class="px-2 py-2"></div>
            <!-- <button
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
                py-2
                px-2
                rounded
              "
              type="button"
              @click="logIn"
            >
              Just Browse
            </button> -->
            <div class="py-2"></div>
          </div>
        </div>
      </form>
    </div>
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
      username: "",
      password: "",
      incorrect: false,
      register: false,
      loading: false,
    };
  },
  methods: {
    // This method logs in the user and makes a request to the backend to do so., also need to be tied to enter as well.
    async logIn() {
      this.loading = true;
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
              this.loading = false;
              this.$router.push("/auction-landing-page");
              return response.text();
            }
            this.incorrect = true;
            return response.text();
          })
          .then((result) => {
            this.loading = false;
            this.theUser.setNewTokenValue(JSON.parse(result).token);
            this.theUser.saveUserNameAndPassword(this.username, this.password);
            return result;
          })
          .catch((error) => {
            console.log("error", error);
            this.loading = false;
            this.$router.push("/");
            return "";
          });
      } catch (exception_var) {}
    },
    registered() {
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