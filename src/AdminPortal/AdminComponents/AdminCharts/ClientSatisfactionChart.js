import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import satisfactionData from './satisfactionData';

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClientSatisfactionChart = () => {
    const data = {
        labels: satisfactionData.labels,
        datasets: [
            {
                label: 'Client Satisfaction',
                data: satisfactionData.ratings,
                backgroundColor: 'rgba(106, 91, 110, 0.6)',
                borderColor: 'rgba(106, 91, 110, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ratings',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Ratings',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h3>Client Satisfacation</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ClientSatisfactionChart;