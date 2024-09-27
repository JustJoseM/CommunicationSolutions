import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import chartData from './chartData';

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const RevenueChart = () => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: chartData.revenue,
                fill: false,
                backgroundColor: 'rgba(9, 58, 62, 0.2)',
                borderColor: 'rgba(9, 58, 62, 0.5)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Weeks',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Revenue ($)',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw; // Get the raw value
                        return `$${value}`; // Return the value formatted with $ before it
                    }
                }
            }
        }
    };

    return (
        <div>
            <h3>Revenue over the Last Month</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default RevenueChart;