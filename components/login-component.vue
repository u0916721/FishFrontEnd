<template>
  <form>
    {{ test.value }}
  <!-- Email input -->
  <div class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Username</label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
    </div>

    <div class="col">
      <!-- Simple link -->
    </div>
  </div>

  <!-- Submit button -->
  <button type="button" class="btn btn-primary btn-block mb-4" @click="setValue">Sign in</button>
<button type="button" class="btn btn-primary btn-block mb-4" @click="setSavedValue">Set to saved value</button>
  <!-- Register buttons -->
  <div class="text-center">
    <p>Not a member? <a href="#!">Register</a></p>

  </div>
</form>
</template>


<script>
import { useTest } from "~/store/test";
// setup()
// {
// const test = useTest()
// return {test}
// }
export default {
  setup() {
    const test = useTest()
return {test}
  },
  methods: {
    setValue() {
      this.test.setNewValue(69);
      console.log('New Count:',  this.test.valueWithName);
    },
       setSavedValue() {
      this.test.setValueFromStorage();
      console.log('New Count:',  this.test.setValueFromStorage());
    },
  },
}
</script>

<style>

</style>