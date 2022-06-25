// store/test.ts
import {watch} from "vue";
import { defineStore } from 'pinia';

export const useTest = defineStore('test',{


  state: () => ({
    value: 3
  }),

  getters: {
    valueWithName: state => `Value is ${state.value}`
  },

  actions: {
    setNewValue(newValue) {
      this.value = newValue;
      localStorage.setItem("newValue",JSON.stringify(newValue));
    },
    setValueFromStorage()
    {
      this.value = JSON.parse(localStorage.getItem("newValue"));
    },
    setSwagValue(newValue) {
      this.value = newValue
    }
  }
})