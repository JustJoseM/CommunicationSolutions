const processSatisfactionData = (satisfaction, timePeriod) => {
    const satisfactionCount = Array(6).fill(0); // Index 0 = no rating
    const labels = ['No Rating', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

    satisfaction.forEach(record => {
        const rating = record.satisfactionRating;
        if(rating >= 0 && rating <= 5) {
            satisfactionCount[rating] += 1;
        }
    });

    return {
        labels: labels,
        satisfaction: satisfactionCount,
    };
};

export default processSatisfactionData;