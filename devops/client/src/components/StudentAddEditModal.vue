<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ isEditMode ? `Edit Student` : `Add Student` }}</h2>
      <input v-model="studentName" placeholder="Enter student name" />
      <input type="date" v-model="studentDOB" placeholder="Enter date of birth" />
      <select v-model="selectedClass">
        <option disabled value="">Select a class</option>
        <option v-for="classItem in classes" :key="classItem._id" :value="classItem._id">
          {{ classItem.class_name }}
        </option>
      </select>
      <select v-model="selectedCountry">
        <option disabled value="">Select a country</option>
        <option v-for="country in countries" :key="country._id" :value="country._id">
          {{ country.name }}
        </option>
      </select>
      <button @click="saveStudent">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentAddEditModal',
  props: {
    showModal: Boolean,
    isEditMode: Boolean,
    existingStudent: Object,
    classes: Array,
    countries: Array
  },
  data() {
    return {
      studentName: '',
      studentDOB: '',
      selectedClass: '',
      selectedCountry: ''
    };
  },
  watch: {
    existingStudent: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.studentName = newVal.name;
          this.studentDOB = newVal.dateOfBirth;
          this.selectedClass = newVal.class_id;
          this.selectedCountry = newVal.country_id;
        } else {
          this.resetForm();
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    saveStudent() {
    const studentData = {
      name: this.studentName,
      date_of_birth: new Date(this.studentDOB).toISOString(), // Ensure correct date format
      class_id: this.selectedClass,
      country_id: this.selectedCountry
    };
    console.log('Student data to save:', studentData); // Add this for debugging
    this.$emit('save', studentData);
    this.closeModal();
  },
    resetForm() {
      this.studentName = '';
      this.studentDOB = '';
      this.selectedClass = '';
      this.selectedCountry = '';
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