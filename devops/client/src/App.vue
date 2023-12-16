<template>
  <nav>
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/student" class="nav-link">Student</router-link>
    <router-link to="/country" class="nav-link">Country</router-link>
    <router-link to="/class" class="nav-link">Class</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #f5f5f5;
  padding: 20px 0;
  text-align: center;
}

.nav-link {
  margin: 0 15px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #42b983;
}
</style>
