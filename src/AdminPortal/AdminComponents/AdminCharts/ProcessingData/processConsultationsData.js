const processConsultationsData = (consultations, timePeriod) => {
    const consultationsData = [];
    let labels = [];

    if(timePeriod === 'lastQuarter') {
        labels = ['Month 1', 'Month 2', 'Month 3'];
        const monthlyConsultations = Array(3).fill(0);

        consultations.forEach(consultation => {
            const date = consultation.date.toDate();
            const monthIndex = date.getMonth() % 3; 
            monthlyConsultations[monthIndex] += 1;
        });

        consultationsData.push(...monthlyConsultations);
    }
    else if(timePeriod === 'lastYear') {
        labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const monthlyConsultations = Array(12).fill(0);

        consultations.forEach(consultation => {
            const date = consultation.date.toDate();
            const monthIndex = date.getMonth(); 
            monthlyConsultations[monthIndex] += 1;
        });
        consultationsData.push(...monthlyConsultations);
    }
        else { // lastMonth
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            const weeklyConsultations = Array(4).fill(0);

            consultations.forEach(consultation => {
                const date = consultation.date.toDate();
                const weekIndex = Math.floor(date.getDate() / 7);
                if(weekIndex < 4) {
                    weeklyConsultations[weekIndex] += 1;
                }
            });

            consultationsData.push(...weeklyConsultations);
        }

        return {
            labels: labels,
            consultations: consultationsData,
        };
};

export default processConsultationsData;