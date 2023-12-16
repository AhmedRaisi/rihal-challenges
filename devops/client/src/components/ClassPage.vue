<template>
  <div>
    <h1>Class Page</h1>
    <add-button buttonText="Add Class" @click="openModalForAdd"></add-button>
    <add-edit-modal
      v-if="showModal"
      :showModal="showModal"
      :isEditMode="isEditMode"
      :existingItem="selectedClass"
      :itemType="'Class'"
      @close="showModal = false"
      @save="handleSave"
    ></add-edit-modal>
    <table>
      <thead>
        <tr>
          <th>Class Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="classItem in classes" :key="classItem._id">
          <td>{{ classItem.class_name }}</td>
          <td>
            <button @click="openModalForEdit(classItem)">Edit</button>
            <button @click="deleteClass(classItem._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import AddButton from './AddButton.vue';
import AddEditModal from './AddEditModal.vue';

export default {
  name: 'ClassPage',
  components: {
    AddButton,
    AddEditModal
  },
  data() {
    return {
      classes: [],
      showModal: false,
      isEditMode: false,
      selectedClass: null
    };
  },
  created() {
    this.fetchClasses();
  },
  methods: {
    fetchClasses() {
      axios.get('http://localhost:5000/classes')
        .then(response => {
          this.classes = response.data;
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    },
    openModalForAdd() {
      this.isEditMode = false;
      this.selectedClass = { class_name: '' };
      this.showModal = true;
    },
    openModalForEdit(classItem) {
      this.isEditMode = true;
      this.selectedClass = classItem;
      this.showModal = true;
    },
    handleSave(classData) {
      const url = this.isEditMode ? `http://localhost:5000/classes/${classData.id}` : 'http://localhost:5000/classes';
      const method = this.isEditMode ? 'put' : 'post';
      axios[method](url, { class_name: classData.name })
        .then(() => {
          this.fetchClasses();
          this.showModal = false;
        })
        .catch(error => {
          console.error('Error saving class:', error);
        });
    },
    deleteClass(classId) {
      axios.delete(`http://localhost:5000/classes/${classId}`)
        .then(() => this.fetchClasses())
        .catch(error => console.error('Error deleting class:', error));
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

button {
  margin-right: 10px;
}
</style>
