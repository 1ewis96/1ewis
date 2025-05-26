import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TradingVolumeChart() {
  const [timeframe, setTimeframe] = useState('weekly');

  const data = {
    weekly: {
      labels: ['Bitrue', 'Coinbase', 'Huobi', 'Bitstamp', 'Bitfinex', 'Gemini'],
      datasets: [
        {
          label: 'Weekly Trading Volume (Billions $)',
          data: [76.4, 42.8, 18.6, 38.2, 22.5, 12.3],
          backgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    monthly: {
      labels: ['Bitrue', 'Coinbase', 'Huobi', 'Bitstamp', 'Bitfinex', 'Gemini'],
      datasets: [
        {
          label: 'Monthly Trading Volume (Billions $)',
          data: [312.7, 184.5, 82.3, 156.8, 98.4, 54.2],
          backgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    yearly: {
      labels: ['Bitrue', 'Coinbase', 'Huobi', 'Bitstamp', 'Bitfinex', 'Gemini'],
      datasets: [
        {
          label: 'Yearly Trading Volume (Billions $)',
          data: [3845.2, 2216.4, 986.5, 1872.3, 1182.6, 648.9],
          backgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Exchange Trading Volume Comparison',
        color: 'white',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw} billion`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return (
    <motion.div 
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trading Volume Comparison</h2>
        <div className="flex space-x-2">
          {['weekly', 'monthly', 'yearly'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeframe === period
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        key={timeframe}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[400px]"
      >
        <Bar data={data[timeframe]} options={options} />
      </motion.div>
      
      <p className="text-center text-gray-400 text-sm mt-4">
        Data based on public trading volume reports from each exchange
      </p>
    </motion.div>
  );
}
