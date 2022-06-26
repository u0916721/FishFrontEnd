<template>
  <form>
    <div v-if="register"> 
    <UserRegister-Component @registered ="registered"/>
    </div>
    <div v-else>
    <div v-if="incorrect">Wrong login try again.</div>
    {{ theUser.userToken }}
    <!-- Username input -->
    <div class="form-outline mb-4">
      <input
        type="email"
        id="form2Example1"
        class="form-control"
        v-model="username"
      />
      <label class="form-label" for="form2Example1">Username</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input
        type="password"
        id="form2Example2"
        class="form-control"
        v-model="password"
      />
      <label class="form-label" for="form2Example2">Password</label>
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
      <div class="col d-flex justify-content-center"></div>

      <div class="col">
        <!-- Simple link -->
      </div>
    </div>

    <!-- Submit button -->
    <button type="button" class="btn btn-primary btn-block mb-4" @click="logIn">
      Sign in
    </button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Not a member? <a href="#!" @click="register = true;">Register</a></p>
    </div>
    </div>
  </form>
</template>


<script>
import { useTest } from "~/store/user";
export default {
  setup() {
    const theUser = useTest();
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
              return response.text();
            }
            this.incorrect = true;
            return response.text();
          })
          .then((result) => {
            return this.theUser.setNewTokenValue(JSON.parse(result).token); // Here we set the token value to the pinia store, We will also NEED to set the username and role here as well.
          }) 
          .catch((error) => console.log("error", error));
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