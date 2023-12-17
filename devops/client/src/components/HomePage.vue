<template>
  <div class="home-page">
    <h1>Rihal Devops Challenge</h1>
    <p>Ahmed Al Raisi's solution to Rihals Devops Challenge.</p>

    <div class="statistics-section">
      <div class="graph-placeholder" id="graph1">
        <p>Graph 1 Placeholder</p>
      </div>
      <div class="graph-placeholder" id="graph2">
        <p>Graph 2 Placeholder</p>
      </div>
      <div class="graph-placeholder" id="graph3">
        <p>Graph 3 Placeholder</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color); /* Ensure background color changes */
}

.statistics-section {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}

.graph-placeholder {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  width: 30%;
  text-align: center;
  background-color: var(--graph-background);
}

/* Adjust styles for smaller screens */
@media (max-width: 768px) {
  .statistics-section {
    flex-direction: column;
    align-items: center;
  }

  .graph-placeholder {
    width: 80%;
    margin-bottom: 20px;
  }
}
</style>
