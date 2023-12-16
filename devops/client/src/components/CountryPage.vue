<template>
    <div>
      <h1>Country Page</h1>
      <add-button buttonText="Add Country"></add-button>
      <table>
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries" :key="country.id">
            <td>{{ country.name }}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import AddButton from './AddButton.vue';
  
  export default {
    name: 'CountryPage',
    components: {
      AddButton
    },
    data() {
      return {
        // Sample data, replace with real data
        countries: [
          { id: 1, name: 'USA' },
          // ... more countries
        ]
      };
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
  