<template>
    <div>
      <h1>Class Page</h1>
      <add-button buttonText="Add Class"></add-button>
      <table>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classItem in classes" :key="classItem.id">
            <td>{{ classItem.name }}</td>
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
    name: 'ClassPage',
    components: {
      AddButton
    },
    data() {
      return {
        // Sample data, replace with real data
        classes: [
          { id: 1, name: '10A' },
          // ... more class items
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
  