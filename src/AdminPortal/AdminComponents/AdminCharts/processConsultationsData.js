const processConsultationsData = (consultations, timePeriod) => {
    const consultationsData = [];
    // for future const revenueData = [];
    let labels = [];

    if(timePeriod === 'lastQuarter') {
        labels = ['Month 1', 'Month 2', 'Month 3'];
        const monthlyConsultations = Array(3).fill(0);
        // for future const monthlyRevenue = Array(3).fill(0);

        consultations.forEach(consultation => {
            const date = consultation.date.toDate();
            const monthIndex = date.getMonth() % 3; 
            monthlyConsultations[monthIndex] += 1;
            // for future monthlyRevenue[monthIndex] += consultation.revenueGenerated;
        });

        consultationsData.push(...monthlyConsultations);
        // for future revenueData.push(...monthlyRevenue);
    }
    else if(timePeriod === 'lastYear') {
        labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const monthlyConsultations = Array(12).fill(0);
        // const monthlyRevenue = Array(12).fill(0);

        consultations.forEach(consultation => {
            const date = consultation.date.toDate();
            const monthIndex = date.getMonth(); 
            monthlyConsultations[monthIndex] += 1;
            // monthlyRevenue[monthIndex] += consultation.revenueGenerated
        });
        consultationsData.push(...monthlyConsultations);
        // revenueData.push(...monthlyRevenue);
    }
        else { // lastMonth
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            const weeklyConsultations = Array(4).fill(0);
            //const weeklyRevenue = Array(4).fill(0);

            consultations.forEach(consultation => {
                const date = consultation.date.toDate();
                const weekIndex = Math.floor(date.getDate() / 7);
                if(weekIndex < 4) {
                    weeklyConsultations[weekIndex] += 1;
                    // weeklyRevenue[weekIndex] += consultation.revenueGenerated;
                }
            });

            consultationsData.push(...weeklyConsultations);
            // revenueData.push(...weeklyRevenue);
        }

        return {
            labels: labels,
            consultations: consultationsData,
            // revenue: revenueData,
        };


    // const weeklyConsultations = Array(4).fill(0);
    // const weeklyRevenue = Array(4).fill(0);

    // consultations.forEach(consultation => {
    //     const date = consultation.date.toDate();
    //     const weekIndex = Math.floor(date.getDate() / 7);
    //     if(weekIndex < 4) {
    //         weeklyConsultations[weekIndex] += 1;
    //         weeklyRevenue[weekIndex] += consultation.revenueGenerated;
    //     }
    // });

    // return {
    //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    //     consultations: weeklyConsultations,
    //     revenue: weeklyRevenue,
    // };
};

export default processConsultationsData;