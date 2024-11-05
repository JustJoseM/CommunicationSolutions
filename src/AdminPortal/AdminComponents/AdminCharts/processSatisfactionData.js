const processSatisfactionData = (satisfaction, timePeriod) => {
    const satisfactionData = [];
    let labels = [];

    if(timePeriod === 'lastQuarter') {
        labels = ['Month 1', 'Month 2', 'Month 3'];
        const monthlySatisfaction = Array(3).fill(0);

        satisfaction.forEach(satisfaction => {
            const date = satisfaction.date.toDate();
            const monthIndex = date.getMonth() % 3; 
            monthlySatisfaction[monthIndex] += 1;
        });

        satisfactionData.push(...monthlySatisfaction);
    }
    else if(timePeriod === 'lastYear') {
        labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const monthlySatisfaction = Array(12).fill(0);
        // const monthlyRevenue = Array(12).fill(0);

        satisfaction.forEach(satisfaction => {
            const date = satisfaction.date.toDate();
            const monthIndex = date.getMonth(); 
            monthlySatisfaction[monthIndex] += 1;
        });
        satisfactionData.push(...monthlySatisfaction);
    }
        else { // lastMonth
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            const weeklySatisfaction = Array(4).fill(0);

            satisfaction.forEach(satisfaction => {
                const date = satisfaction.date.toDate();
                const weekIndex = Math.floor(date.getDate() / 7);
                if(weekIndex < 4) {
                    weeklySatisfaction[weekIndex] += 1;
                }
            });

            satisfactionData.push(...weeklySatisfaction);
        }

        return {
            labels: labels,
            satisfaction: satisfactionData,
        };
};

export default processSatisfactionData;