'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip)

export default function Linechart({ title, labels, datasets }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'value',
        data: datasets,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
        y: {
          min: 0,
          max: 110,
        },
      },
    },
  }
  return (
    <div>
      <h2>{title}</h2>
      <Line data={data} width={400} height={200} />
    </div>
  )
}
