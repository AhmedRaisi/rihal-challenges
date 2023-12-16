<template>
    <div>
      <h1>Student Page</h1>
      <add-button buttonText="Add Student"></add-button>
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
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.dateOfBirth }}</td>
            <td>{{ student.class }}</td>
            <td>{{ student.country }}</td>
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
    name: 'StudentPage',
    components: {
      AddButton
    },
    data() {
      return {
        // Sample data, replace with real data
        students: [
          { id: 1, name: 'John Doe', dateOfBirth: '2000-01-01', class: '10A', country: 'USA' },
          // ... more students
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
  