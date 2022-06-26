<template>
  <div>
    <div v-if="passwordNotMatch">passwords do not match</div>
      <div v-if="usernameTaken">username if taken</div>
    <div class="form-outline mb-4">
      <input
        type="email"
        id="form2Example1"
        class="form-control"
        v-model="username"
        @keyup.enter="signup"
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
        @keyup.enter="signup"
      />
      <label class="form-label" for="form2Example2">Password</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input
        type="password"
        id="form2Example2"
        class="form-control"
        v-model="confirmPassword"
        @keyup.enter="signup"
      />
      <label class="form-label" for="form2Example2">Confirm Password</label>
    </div>
    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
      <div class="col d-flex justify-content-center"></div>

      <div class="col">
        <!-- Simple link -->
      </div>
    </div>

    <!-- Submit button -->
    <button
      type="button"
      class="btn btn-primary btn-block mb-4"
      @click="signup"
    >
      Sign Up
    </button>

        <div class="text-center">
      <p> <a href="#!" @click="this.$emit('registered');">Go Back To Login</a></p>
    </div>
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