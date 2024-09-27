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
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
            },
        },
    };

    return (
        <div>
            <h3>Revenue over the Last Month</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default RevenueChart;