import React, { useEffect, useState } from 'react'; // React import
import { Line } from 'react-chartjs-2'; // Chart.js import
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'; // Additional Chart.js imports
import { fetchConsultationsData } from '././FetchingData/fetchConsultationsData';
import processConsultationsData from '././ProcessingData/processConsultationsData';

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ConsultationChart = ({ timePeriod }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const consultations = await fetchConsultationsData(timePeriod);
            const processedData = processConsultationsData(consultations, timePeriod);
            setChartData(processedData);
        };

        getData();
    }, [timePeriod]);

    if(!chartData) {
        return<div>Loading ...</div>
    }

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
                ticks : {
                    stepSize: 1,
                    callback: (value) => Number.isInteger(value) ? value : '',
                }
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

export default ConsultationChart;