<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ isEditMode ? `Edit ${itemType}` : `Add ${itemType}` }}</h2>
      <input v-model="itemName" :placeholder="`Enter ${itemType.toLowerCase()} name`">
      <button @click="saveItem">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddEditModal',
  props: {
    showModal: Boolean,
    isEditMode: Boolean,
    existingItem: Object,
    itemType: {
      type: String,
      default: 'Item'
    }
  },
  data() {
    return {
      itemName: ''
    };
  },
  watch: {
    existingItem: {
      immediate: true,
      handler(newVal) {
        this.itemName = newVal ? newVal.name : '';
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveItem() {
      this.$emit('save', { name: this.itemName, id: this.isEditMode ? this.existingItem._id : null });
      this.closeModal();
    }
  }
};
</script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  