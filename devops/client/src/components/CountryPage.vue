<template>
  <div>
    <h1>Country Page</h1>
    <add-button buttonText="Add Country" @click="openModalForAdd"></add-button>
    <add-edit-modal
      v-if="showModal"
      :showModal="showModal"
      :isEditMode="isEditMode"
      :existingItem="selectedCountry"
      :itemType="'Country'"
      @close="showModal = false"
      @save="handleSave"
    ></add-edit-modal>
    <table>
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country._id">
          <td>{{ country.name }}</td>
          <td>
            <button @click="openModalForEdit(country)">Edit</button>
            <button @click="deleteCountry(country._id)">Delete</button>
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
  name: 'CountryPage',
  components: {
    AddButton,
    AddEditModal
  },
  data() {
    return {
      countries: [],
      showModal: false,
      isEditMode: false,
      selectedCountry: null
    };
  },
  created() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      axios.get('http://localhost:5000/countries')
        .then(response => {
          this.countries = response.data;
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        });
    },
    openModalForAdd() {
      this.isEditMode = false;
      this.selectedCountry = null;
      this.showModal = true;
    },
    openModalForEdit(country) {
      this.isEditMode = true;
      this.selectedCountry = country;
      this.showModal = true;
    },
    handleSave(countryData) {
      if (this.isEditMode) {
        // Updating an existing country
        axios.put(`http://localhost:5000/countries/${countryData.id}`, { name: countryData.name })
          .then(() => {
            this.fetchCountries();
            this.showModal = false;
          })
          .catch(error => {
            console.error('Error updating country:', error);
          });
      } else {
        // Adding a new country
        axios.post('http://localhost:5000/countries', { name: countryData.name })
          .then(() => {
            this.fetchCountries();
            this.showModal = false;
          })
          .catch(error => {
            console.error('Error adding country:', error);
          });
      }
    },
    deleteCountry(countryId) {
      axios.delete(`http://localhost:5000/countries/${countryId}`)
        .then(() => this.fetchCountries())
        .catch(error => console.error('Error deleting country:', error));
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
  