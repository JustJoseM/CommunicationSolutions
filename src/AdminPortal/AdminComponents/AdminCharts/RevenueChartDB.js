import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { fetchRevenueData } from './fetchRevenueData';
import processRevenueData from './processRevenueData';

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const RevenueChartDB = ({ timePeriod = 'lastMonth' }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const revenueData = await fetchRevenueData(timePeriod);
            const processedData = processRevenueData(revenueData, timePeriod);

            // Prepare data for chart
            setChartData(processedData);
        };

        fetchData();
    }, [timePeriod]);

    if(!chartData.labels) {
        return <div>Loading ...</div>
    }

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: chartData.revenue,
                fill: false,
                backgroundColor: 'rgba(9, 58, 62, 0.2)',
                borderColor: 'rgba(9, 58, 62, 0.5)',
                borderWidth: 4,
            },
        ],
    };

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
                    text: 'Revenue ($)',
                },
                beginAtZero: true,
            },
        },
        plugin: {
            tooltip: {
                callback: {
                    label: (context) => {
                        const value = context.raw;
                        return `$${value.toFixed(2)}`;
                    },
                },
            },
        },
    };
    
    return (
        <div>
            <h3>Revenue over Selected Time Period</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default RevenueChartDB;