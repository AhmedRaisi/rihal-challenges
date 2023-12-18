<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/student" class="nav-link">Student</router-link>
      <router-link to="/country" class="nav-link">Country</router-link>
      <router-link to="/class" class="nav-link">Class</router-link>
      <button @click="toggleTheme">Toggle Theme</button>  
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    toggleTheme() {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color); /* Ensure background color changes */
}

nav {
  background-color: var(--button-background);
  padding: 20px 0;
  text-align: center;
}

.nav-link {
  margin: 0 15px;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

button {
  margin-right: 10px;
  background-color: var(--button-background); /* Use CSS variable */
  color: var(--button-text-color); /* Use CSS variable */
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #42b983;
}
</style>
