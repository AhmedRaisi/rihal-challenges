<template>
    <button @click="onClick" class="add-button">{{ buttonText }}</button>
  </template>
  
  <script>
  export default {
    name: 'AddButton',
    props: {
      buttonText: {
        type: String,
        default: 'Add'
      }
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
  </script>
  
  <style scoped>
  .add-button {
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .add-button:hover {
    background-color: #369b7a;
  }
  </style>
  