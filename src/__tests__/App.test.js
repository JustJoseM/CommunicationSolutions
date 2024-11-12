import React from "react";
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock Firebase imports to prevent initialization during tests
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

// Mock components
jest.mock('../MainPortal/Components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../MainPortal/Components/Sidebar', () => () => <div>Sidebar</div>);
jest.mock('../MainPortal/Components/Footer', () => () => <div>Footer</div>);
jest.mock('../MainPortal/Pages/Home', () => () => <div>Home Page</div>);
jest.mock('../MainPortal/Pages/SignIn', () => () => <div>Sign In Page</div>);
jest.mock('../MainPortal/Pages/ScheduleAppt', () => () => <div>Schedule Appointment Page</div>);
jest.mock('../AdminPortal/AdminHome/AdminHome', () => () => <div>Admin Home</div>);
jest.mock('../AdminPortal/AdminPages/AdminClients/Clients', () => () => <div>Clients Page</div>);
jest.mock('../AdminPortal/AdminComponents/AdminNavbar/AdminNavbar', () => () => <div>Admin Navbar</div>);
jest.mock('../AdminPortal/AdminComponents/AdminFooter/AdminFooter', () => () => <div>Admin Footer</div>);

describe('App Routing and Layouts', () => {
  test('renders the main layout components', () => {
    render(
      <App />
    );

    // Expect Navbar, footer, and sidebar to be in the Main Layout
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
})