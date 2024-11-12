// ProtectedRoute.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../MainPortal/Pages/ProtectedRoute';
import { useAuth } from '../MainPortal/Pages/AuthProvider';

// Mock useAuth from AuthProvider
jest.mock('../MainPortal/Pages/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('ProtectedRoute', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  test('redirects to sign-in page if user is not authenticated', () => {
    // Simulate unauthenticated user
    useAuth.mockReturnValue({ currentUser: null });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Sign-In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check that it redirected to the sign-in page
    expect(queryByText(/Sign-In Page/i)).toBeInTheDocument();
  });

  test('renders protected content if user is authenticated', () => {
    // Simulate authenticated user
    useAuth.mockReturnValue({ currentUser: { uid: '123' } });

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Sign-In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the protected content is displayed
    expect(getByText(/Protected Content/i)).toBeInTheDocument();
  });
});
