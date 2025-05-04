const ctx = document.getElementById('weightChart').getContext('2d');
const weightChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['April 1', 'April 5', 'April 10', 'April 15', 'April 20', 'April 25', 'May 1'],
    datasets: [{
      label: 'Weight (kg)',
      data: [72, 71.5, 71.2, 70.8, 70.5, 70.2, 69.9],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

const calorieCtx = document.getElementById('calorieChart').getContext('2d');

const calorieGoal = 1800;
const consumed = 970;
const remaining = calorieGoal - consumed;

new Chart(calorieCtx, {
  type: 'doughnut',
  data: {
    labels: ['Consumed', 'Remaining'],
    datasets: [{
      data: [consumed, remaining],
      backgroundColor: ['#f87171', '#34d399'],
      borderWidth: 1
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

