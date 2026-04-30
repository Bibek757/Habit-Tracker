import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { family: "'Inter', sans-serif", size: 12 },
        color: '#6C757D',
      },
    },
  },
  scales: {
    x: {
      ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#ADB5BD' },
      grid: { display: false },
    },
    y: {
      ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#ADB5BD' },
      grid: { color: '#F0F2F5' },
    },
  },
};

export function WeeklyBarChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Habits Completed',
        data: [5, 7, 4, 8, 6, 3, 7],
        backgroundColor: 'rgba(74, 144, 217, 0.7)',
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
    </div>
  );
}

export function MonthlyLineChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [65, 72, 80, 85],
        borderColor: '#4A90D9',
        backgroundColor: 'rgba(74, 144, 217, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4A90D9',
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} options={chartOptions} />
    </div>
  );
}

export function CompletionPieChart() {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [18, 7],
        backgroundColor: ['#28A745', '#FFC107'],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          color: '#6C757D',
          padding: 16,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
}

export function StreakBarChart() {
  const data = {
    labels: Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Streak',
        data: [3, 5, 4, 6, 7, 5, 8, 7, 6, 8, 7, 5, 6, 8],
        backgroundColor: Array.from({ length: 14 }, (_, i) => {
          const val = [3, 5, 4, 6, 7, 5, 8, 7, 6, 8, 7, 5, 6, 8][i];
          return val >= 6 ? '#28A745' : val >= 4 ? '#FFC107' : '#E0E4E8';
        }),
        borderRadius: 3,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    ...chartOptions,
    plugins: { ...chartOptions.plugins, legend: { display: false } },
    scales: {
      ...chartOptions.scales,
      x: { ...chartOptions.scales.x, ticks: { display: false }, grid: { display: false } },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}
