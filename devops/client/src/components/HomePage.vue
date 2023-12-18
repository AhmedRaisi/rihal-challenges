<template>
  <div class="home-page">
    <h1>Rihal Devops Challenge</h1>
    <p>Ahmed Al Raisi's solution to Rihals Devops Challenge.</p>

    <div class="statistics-section">
      <div class="graph-container">
        <canvas id="chart1"></canvas>
      </div>
      <div class="graph-container">
        <canvas id="chart2"></canvas>
      </div>
      <div class="graph-container">
        <canvas id="chart3"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'HomePage',
  mounted() {
    this.loadChartData();
  },
  methods: {
    async loadChartData() {
      await this.fetchAndDisplayChart('http://localhost:5000/classes/student-class-count', 'chart1', 'bar', 'Students per Class');
      await this.fetchAndDisplayChart('http://localhost:5000/countries/student-country-count', 'chart2', 'bar', 'Students per Country');
      await this.fetchAndDisplayChart('http://localhost:5000/students/average-age', 'chart3', 'bar', 'Average Age of Students');
    },
    async fetchAndDisplayChart(apiEndpoint, chartId, chartType, chartLabel) {
      try {
        const response = await axios.get(apiEndpoint);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        this.createChart(chartId, this.formatChartData(response.data), chartType, chartLabel);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    formatChartData(data, chartLabel) {
      // Check if the data is an array (for student counts)
      if (Array.isArray(data)) {
        return {
          labels: data.map(item => item.class || item.country),
          datasets: [{
            label: chartLabel,
            data: data.map(item => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        };
      }

      // If the data is an object (for average age)
      if (typeof data === 'object' && data !== null) {
        return {
          labels: ['Average Age'],
          datasets: [{
            label: chartLabel,
            data: [data.averageAge],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        };
      }

      // Fallback for unexpected data types
      console.error('Unexpected data format:', data);
      return { labels: [], datasets: [] };
    },
    createChart(chartId, chartData, chartType, chartLabel) {
      const ctx = document.getElementById(chartId).getContext('2d');
      new Chart(ctx, {
        type: chartType,
        data: {
          labels: chartData.labels,
          datasets: [{
            label: chartLabel,
            data: chartData.datasets[0].data,
            backgroundColor: chartData.datasets[0].backgroundColor,
            borderColor: chartData.datasets[0].borderColor,
            borderWidth: chartData.datasets[0].borderWidth
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.home-page {
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color);
}

.statistics-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
}

.graph-container {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  min-width: 250px;
  margin: 10px;
  text-align: center;
  background-color: var(--graph-background);
}

canvas {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .statistics-section {
    flex-direction: column;
    align-items: center;
  }

  .graph-container {
    width: 80%;
    margin-bottom: 20px;
  }
}

</style>



