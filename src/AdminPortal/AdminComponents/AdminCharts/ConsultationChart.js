import React from 'react'; // React import
import { Line } from 'react-chartjs-2'; // Chart.js import
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'; // Additional Chart.js imports
import chartData from './chartData'; // Local data import

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ConsultationChart = ( { timePeriod = 'lastMonth' }) => {    
    // Load the data into the chart
    const data = {
        labels: chartData[timePeriod].labels,
        datasets: [
            {
                label: 'Consultations',
                data: chartData[timePeriod].consultations,
                fill: false,
                backgroundColor: 'rgba(157, 190, 187, 0.2)',
                borderColor: 'rgba(157, 190, 187, 1)',
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
                    text: 'Time Period',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Consultations',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h3>Consultations Over the Selected Time Period</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default ConsultationChart;