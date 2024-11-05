import React, { useState } from 'react';
import ConsultationChart from '../../AdminComponents/AdminCharts/ConsultationChart';
import RevenueChart from '../../AdminComponents/AdminCharts/RevenueChart';
import ClientSatisfactionChartDB from '../../AdminComponents/AdminCharts/ClientSatisfactionChartDB';
import './ChartsPage.css';

const ChartsPage = () => {
    const [selectedChart, setSelectedChart] = useState('consultations');
    const [timePeriod, setTimePeriod] = useState('lastMonth');

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    const renderChart = () => {
        switch(selectedChart) {
            case 'consultations':
                return <ConsultationChart timePeriod={timePeriod} />
            case 'revenue':
                return <RevenueChart timePeriod={timePeriod} />
            case 'clientSatisfaction':
                return <ClientSatisfactionChartDB timePeriod={timePeriod} />
            default:
                return <ConsultationChart timePeriod={timePeriod} />
        }
    };

    return (
        <div className="chartsPage">
            <h2>Charts Page</h2>
            <div className="tabs">
                <select onChange={handleChartChange} value={selectedChart}>
                    <option value="consultations">Consultations</option>
                    <option value="revenue">Revenue</option>
                    <option value="clientSatisfaction">Client Satisfaction</option>
                </select>
                <select onChange={handleTimePeriodChange} value={timePeriod}>
                    <option value="lastMonth">Last Month</option>
                    <option value="lastQuarter">Last Quarter</option>
                    <option value="lastYear">Last Year</option>
                </select>
            </div>
            <div className="chartContainer">
                {renderChart()}
            </div>
        </div>
    );
};

export default ChartsPage;