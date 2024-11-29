import React from "react";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import App from '../App';
import SignIn from "../MainPortal/Pages/SignIn";

jest.mock("../MainPortal/Pages/AuthProvider", () => ({
    AuthProvider: ({ children }) => <div>{children}</div>, 
    useAuth: jest.fn(() => ({ currentUser: { id: "testUser" } })),
}));

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
jest.mock('../MainPortal/Components/SidebarData', () => () => <div>Sidebar</div>);
jest.mock('../MainPortal/Components/Footer', () => () => <div>Footer</div>);
jest.mock('../MainPortal/Pages/Home', () => () => <div>Home Page</div>);
jest.mock('../MainPortal/Pages/ScheduleAppt', () => () => <div>Schedule Appointment Page</div>);
jest.mock('../AdminPortal/AdminHome/AdminHome', () => () => <div>Admin Home</div>);
jest.mock('../AdminPortal/AdminPages/AdminClients/Clients', () => () => <div>Clients Page</div>);
jest.mock('../AdminPortal/AdminComponents/AdminNavbar/AdminNavbar', () => () => <div>Admin Navbar</div>);
jest.mock('../AdminPortal/AdminComponents/AdminFooter/AdminFooter', () => () => <div>Admin Footer</div>);

// Mock with useNavigate and useLocation to simulate route changes
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({
    pathname: "/"
  }))
}));

describe('App Routing and Layouts', () => {
  test('renders the main layout components', () => {
    render(
      <App />
    );

    // Expect Navbar, footer, and sidebar to be in the Main Layout
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('renders the home page', () => {
    useLocation.mockReturnValue({ pathname: "/" });
    render(
      <App />
    );

    // Expect home page component
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  describe("SignIn Component", () => {
    it("renders the login form with 'Sign in' text", () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );
        screen.debug();

        // Check if "Sign in" text is present
        expect(screen.getByText("Sign in")).toBeInTheDocument();
    });
});

});