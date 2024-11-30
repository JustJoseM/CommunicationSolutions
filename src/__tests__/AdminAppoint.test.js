import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointmentsHome from '../AdminPortal/AdminPages/AdminAppointments/AppointmentsHome'; // Update the path if necessary
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Mock Firestore methods
jest.mock('../firebaseConfig', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('AppointmentsHome Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', async () => {
    // Mock Firestore getDocs to return mock data
    const mockAppointments = [
      { id: '1', username: 'John Doe', contact: '1234567890', date: '2024-12-01', time: '10:00', note: 'First appointment' },
      { id: '2', username: 'Jane Doe', contact: '0987654321', date: '2024-12-02', time: '11:00', note: 'Second appointment' },
    ];

    getDocs.mockResolvedValue({
      forEach: (callback) => {
        mockAppointments.forEach((appointment) => callback({ id: appointment.id, data: () => appointment }));
      },
    });

    render(<AppointmentsHome />);

    // Wait for appointments to be rendered
    await waitFor(() => {
      mockAppointments.forEach((appointment) => {
        expect(screen.getByText(`Name: ${appointment.username}`)).toBeInTheDocument();
        expect(screen.getByText(`Contact: ${appointment.contact}`)).toBeInTheDocument();
        expect(screen.getByText(`Date: ${appointment.date}`)).toBeInTheDocument();
        expect(screen.getByText(`Time: ${appointment.time}`)).toBeInTheDocument();
        expect(screen.getByText(`Note: ${appointment.note}`)).toBeInTheDocument();
      });
    });
  });

  test('reschedules an appointment and updates Firestore', async () => {
    const mockAppointment = { id: '1', username: 'John Doe', contact: '1234567890', date: '2024-12-01', time: '10:00', note: 'First appointment' };

    getDocs.mockResolvedValue({
      forEach: (callback) => callback({ id: mockAppointment.id, data: () => mockAppointment }),
    });

    render(<AppointmentsHome />);

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockAppointment.username}`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reschedule'));

    const newDate = '2024-12-10';
    const newTime = '14:00';

    fireEvent.change(screen.getByLabelText(/New Date:/i), { target: { value: newDate } });
    fireEvent.change(screen.getByLabelText(/New Time:/i), { target: { value: newTime } });
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(doc(db, 'Appointments', mockAppointment.id), {
        date: newDate,
        time: newTime,
      });
    });
  });

  test('cancels an appointment and removes it from Firestore', async () => {
    const mockAppointment = { id: '1', username: 'John Doe', contact: '1234567890', date: '2024-12-01', time: '10:00', note: 'First appointment' };

    getDocs.mockResolvedValue({
      forEach: (callback) => callback({ id: mockAppointment.id, data: () => mockAppointment }),
    });

    render(<AppointmentsHome />);

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockAppointment.username}`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'Appointments', mockAppointment.id));
    });
  });
});

test('displays "No appointments found" when there are no appointments', async () => {
    // Mock Firestore getDocs to return an empty list
    getDocs.mockResolvedValue({
      forEach: () => {},
    });
  
    render(<AppointmentsHome />);
  
    await waitFor(() => {
      expect(screen.getByText(/No appointments found/i)).toBeInTheDocument();
    });
  });
  
