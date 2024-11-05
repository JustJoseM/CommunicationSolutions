import React, { useEffect, useState } from 'react'; // React import
import { Line } from 'react-chartjs-2'; // Chart.js import
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'; // Additional Chart.js imports
import { fetchConsultationsData } from './fetchConsultationsData';
import processConsultationsData from './processConsultationsData';

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ConsultationChartDB = ({ timePeriod }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const consultations = await fetchConsultationsData(timePeriod);
            const processedData = processConsultationsData(consultations, timePeriod);
            setChartData(processedData);
        };

        getData();
    }, [timePeriod]);

    // Chart options:
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
            <h3>Consultations Over the Last Month</h3>
            <Line data={{ labels: chartData.labels, datasets: [{ label: 'Consultations', data: chartData.consultations }] }} options={options} />
        </div>
    );
};

export default ConsultationChartDB;