import {collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

export const fetchSatisfactionData = async (timePeriod) => {
    const satisfactionRef = collection(db, 'Consultations');
    const now = Timestamp.now();
    let startDate;
}