const processConsultationsData = (consultations) => {
    const weeklyConsultations = Array(4).fill(0);
    const weeklyRevenue = Array(4).fill(0);

    consultations.forEach(consultation => {
        const date = consultation.date.toDate();
        const weekIndex = Math.floor(date.getDate() / 7);
        if(weekIndex < 4) {
            weeklyConsultations[weekIndex] += 1;
            weeklyRevenue[weekIndex] += consultation.revenueGenerated;
        }
    });

    return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        consultations: weeklyConsultations,
        revenue: weeklyRevenue,
    };
};

export default processConsultationsData;