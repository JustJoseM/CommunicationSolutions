import React from 'react';
import './StatisticsWidget.css';

const statisticsData = {
    totalUsers: 15,
    activeUsers: 10,
    newSignups: 2,
};

const StatisticsWidget = ({ title, value}) => {
    return (
        <div className="statistics=widget">
            <h3 className="statistics-title">{title}</h3>
            <p className="statistics-value">{value}</p>
        </div>
    );
};

export default StatisticsWidget;