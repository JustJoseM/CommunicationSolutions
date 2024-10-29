import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const db = getFirestore();
const auth = getAuth();

export const rescheduleAppointment = async (appointmentID, userID, newDateTime) => {
  const appointmentRef = doc(db, 'appointments', appointmentID);
  const appointmentSnap = await getDoc(appointmentRef);

  if (!appointmentSnap.exists()) {
    throw new Error('Appointment not found.');
  }

  const appointmentData = appointmentSnap.data();
  
  
  if (appointmentData.userID !== userID) {
    throw new Error('You do not have permission to reschedule this appointment.');
  }

  
  await updateDoc(appointmentRef, { dateTime: newDateTime });
  return 'Appointment rescheduled successfully!';
};

export const cancelAppointment = async (appointmentID, userID, cancelReason) => {
  const appointmentRef = doc(db, 'appointments', appointmentID);
  const appointmentSnap = await getDoc(appointmentRef);

  if (!appointmentSnap.exists()) {
    throw new Error('Appointment not found.');
  }

  const appointmentData = appointmentSnap.data();

  
  if (appointmentData.userID !== userID) {
    throw new Error('You do not have permission to cancel this appointment.');
  }

  // Remove the appointment from Firestore
  await deleteDoc(appointmentRef);
  return 'Appointment cancelled successfully!';
};
