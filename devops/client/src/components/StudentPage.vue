<template>
  <div>
    <h1>Student Page</h1>
    <add-button buttonText="Add Student" @click="openModalForAdd"></add-button>
    <student-add-edit-modal
      v-if="showModal"
      :showModal="showModal"
      :isEditMode="isEditMode"
      :existingStudent="selectedStudent"
      :classes="classes"
      :countries="countries"
      @close="showModal = false"
      @save="handleSave"
    ></student-add-edit-modal>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Class</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student._id">
          <td>{{ student.name }}</td>
          <td>{{ formatDate(student.date_of_birth) }}</td>
          <td>{{ student.class_id.class_name }}</td>
          <td>{{ student.country_id.name }}</td>
          <td>
            <button @click="openModalForEdit(student)">Edit</button>
            <button @click="deleteStudent(student._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import AddButton from './AddButton.vue';
import StudentAddEditModal from './StudentAddEditModal.vue';

export default {
  name: 'StudentPage',
  components: {
    AddButton,
    StudentAddEditModal
  },
  data() {
    return {
      students: [],
      classes: [],
      countries: [],
      showModal: false,
      isEditMode: false,
      selectedStudent: null
    };
  },
  created() {
    this.fetchStudents();
    this.fetchClassesAndCountries();
  },
  methods: {
    fetchStudents() {
      axios.get('http://localhost:5000/students')
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
    openModalForAdd() {
      this.isEditMode = false;
      this.selectedStudent = null;
      this.showModal = true;
    },
    openModalForEdit(student) {
      this.isEditMode = true;
      this.selectedStudent = student;
      this.showModal = true;
    },
    fetchClassesAndCountries() {
  axios.get('http://localhost:5000/classes')
    .then(response => {
      this.classes = response.data;
    })
    .catch(error => console.error('Error fetching classes:', error));
  axios.get('http://localhost:5000/countries')
    .then(response => {
      this.countries = response.data;
    })   
    .catch(error => console.error('Error fetching countries:', error));
  },
  handleSave(studentData) {
    console.log('Saving student data:', studentData); // Add this for debugging
    if (this.isEditMode) {
      axios.put(`http://localhost:5000/students/${studentData._id}`, studentData)
        .then(() => {
          this.fetchStudents();
          this.showModal = false;
        })
        .catch(error => {
          console.error('Error updating student:', error);
        });
    } else {
      axios.post('http://localhost:5000/students', studentData)
        .then(() => {
          this.fetchStudents();
          this.showModal = false;
        })
        .catch(error => {
          console.error('Error adding student:', error);
        });
    }
  },
    deleteStudent(studentId) {
      axios.delete(`http://localhost:5000/students/${studentId}`)
        .then(() => this.fetchStudents())
        .catch(error => console.error('Error deleting student:', error));
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--background-color); /* Use CSS variable */
  color: var(--text-color); /* Use CSS variable */
}

table, th, td {
  border: 1px solid var(--border-color); /* Use CSS variable */
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: var(--table-header-background); /* Use CSS variable */
}

button {
  margin-right: 10px;
  background-color: var(--button-background); /* Use CSS variable */
  color: var(--button-text-color); /* Use CSS variable */
}
</style>
