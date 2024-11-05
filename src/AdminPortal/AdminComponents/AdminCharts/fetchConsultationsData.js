import {collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

export const fetchConsultationsData = async (timePeriod) => {
    const consultationsRef = collection(db, 'Consultations');
    const now = Timestamp.now();
    let startDate;

    switch(timePeriod) {
        case 'lastQuarter':
            startDate = new Date();
            startDate.setMonth(now.toDate().getMonth() - 3); // 3 months back
            break;
        case 'lastYear':
            startDate = new Date();
            startDate.setFullYear(now.toDate().getFullYear() - 1); // 1 Year back
            break;
        case 'lastMonth':
            startDate = new Date();
            startDate.setMonth(now.toDate().getMonth() - 1) // 1 month back
            break;
    }

    const consultationsQuery = query(
        consultationsRef,
        where('date', '>=', Timestamp.fromDate(startDate))
    );

    const querySnapshot = await getDocs(consultationsQuery);
    const consultations = querySnapshot.docs.map(doc => doc.data());

    return consultations;
};