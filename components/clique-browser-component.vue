<template>
  <div></div>
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
      cliques: null,
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
    registered() {
      this.register = false;
    },
    setSavedValue() {
      this.test.setValueFromStorage();
      console.log("New Count:", this.theUser.setValueFromStorage());
    },
    getAllCliques() {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJiYXNlVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJKZW5zIiwiZXhwIjoxNjU2MTk5NzA4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.yU6Cz9bxEKCROTNJLwCAZJOB2jM2AVEewBEqtxam8U4"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net//User/Cliques/GetAllCliquesName",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => this.cliques = result)
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

</style>