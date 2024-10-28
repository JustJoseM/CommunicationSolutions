const chartData = {
    lastMonth: {
        labels:['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        consultations: [2, 1, 3, 5], 
        revenue: [400, 200, 600, 1000], 
    },
    lastQuarter: {
        labels:['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7 ', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13'],
        consultations: [3, 2, 5, 4, 8, 3, 4, 3, 2, 2, 1, 3, 5], 
        revenue: [600, 400, 800, 1200, 600, 800, 900, 400, 500, 400, 200, 600, 1000], 
    },
    lastYear: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        consultations: [30, 20, 35, 50, 32, 40, 15, 5, 12, 10, 9, 8],
        revenue: [2100, 2000, 3000, 8000, 4000, 6000, 1900, 900, 2200, 2000, 1600, 1200],
    },
};

export default chartData;