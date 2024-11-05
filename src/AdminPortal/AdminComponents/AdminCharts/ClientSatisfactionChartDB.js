import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { fetchSatisfactionData } from './fetchSatisfactionData';
import processSatisfactionData from './processSatisfactionData';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClientSatisfactionChartDB = ({ timePeriod = 'lastMonth'}) => {
    const [chartData, setChartData] = useState({ labels: [], ratings: [] });

    useEffect(() => {
        const fetchData = async () => {
            const consultations = await fetchConsultationsData(timePeriod);
            const processedData = processConsultationsData(consultations, timePeriod);
            
            // Prepare data for chart
            setChartData(processedData);
        };

        fetchData();
    }, [timePeriod]);

    if(!chartData) {
        return <div>Loading ...</div>
    }

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Number of Clients',
                data: chartData.consultations,
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
            <h3>Client Satisfaction</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ClientSatisfactionChartDB;