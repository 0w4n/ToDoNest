const dailyProgress = {};

function logDailyProgress() {
  const today = new Date().toLocaleDateString();
  dailyProgress[today] = (dailyProgress[today] || 0) + totalStudyTime;
  updateDailyChart();
}

function updateDailyChart() {
  const labels = Object.keys(dailyProgress);
  const data = Object.values(dailyProgress);
  dailyChart.data.labels = labels;
  dailyChart.data.datasets[0].data = data;
  dailyChart.update();
}

const dailyChartCanvas = document.createElement('canvas');
document.getElementById('chart-container').appendChild(dailyChartCanvas);

const dailyChart = new Chart(dailyChartCanvas, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Rendimiento Diario (minutos)',
      data: [],
      borderColor: '#007BFF',
      tension: 0.1,
    }],
  },
});