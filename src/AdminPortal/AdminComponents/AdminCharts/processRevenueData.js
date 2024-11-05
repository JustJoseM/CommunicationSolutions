const processRevenueData = (revenue, timePeriod) => {
    const revenueData = [];
    let labels = [];

    if(timePeriod == 'lastQuarter') {
        labels = ['Month 1', 'Month 2', 'Month 3'];
        const monthlyRevenue = Array(3).fill(0);

        revenue.forEach(record => {
            const date = record.date.toDate();
            const monthIndex = date.getMonth() % 3; 
            monthlyRevenue[monthIndex] +=  record.revenueGenerated;
        });

        revenueData.push(...monthlyRevenue);
    }
    else if(timePeriod === 'lastYear') {
        labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const monthlyRevenue = Array(12).fill(0);

        revenue.forEach(record => {
            const date = record.date.toDate();
            const monthIndex = date.getMonth(); 
            monthlyRevenue[monthIndex] += record.revenueGenerated;
        });

        revenueData.push(...monthlyRevenue);
    }
    else { // lastMonth
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            const weeklyRevenue = Array(4).fill(0);

            revenue.forEach(record => {
                const date = record.date.toDate();
                const weekIndex = Math.floor(date.getDate() / 7);
                if(weekIndex < 4) {
                    weeklyRevenue[weekIndex] += record.revenueGenerated;
                }
            });

            revenueData.push(...weeklyRevenue);
    }

    return {
        labels: labels,
        revenue: revenueData,
    };
};

export default processRevenueData;