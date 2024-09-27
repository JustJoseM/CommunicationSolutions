import React from 'react'; // React import
import { Line } from 'react-chartjs-2'; // Chart.js import
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'; // Additional Chart.js imports
import chartData from './chartData'; // Local data import

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ConsultationChart = () => {
    // Load the data into the chart
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Consultations',
                data: chartData.consultations,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
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
                    text: 'Weeks',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Consultations',
                },
            },
        },
    };

    return (
        <div>
            <h3>Consultations Over the Last Month</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default ConsultationChart;