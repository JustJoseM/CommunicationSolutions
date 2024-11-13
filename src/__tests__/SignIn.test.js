import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../MainPortal/Pages/SignIn';

// Mock necessary Firebase functions
jest.mock('../firebaseConfig', () => ({
    auth: { currentUser: null },
    db: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn(() => ({ exists: () => true, data: () => ({ Role: 'user' }) })),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

// Mock navigate function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('SignIn Component', () => {
    beforeEach(() => {
        render(<SignIn />);
    });

    test('renders login form initially', () => {
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });

    test('toggles to sign-up form when "Create account" button is clicked', () => {
        fireEvent.click(screen.getByText(/Create account/i));
        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    });

    test('toggles to forgot password form when "Forgot password?" button is clicked', () => {
        fireEvent.click(screen.getByText(/Forgot password\?/i));
        expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
    });

    test('shows success message on sign-up', async () => {
        const mockCreateUser = require('firebase/auth').createUserWithEmailAndPassword;
        mockCreateUser.mockResolvedValue({ user: { uid: '12345' } });
        fireEvent.click(screen.getByText(/Create account/i));
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'Test@1234' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Test@1234' } });
        fireEvent.click(screen.getByText(/Continue/i));
        await waitFor(() => expect(screen.getByText(/Sign-up successful!/i)).toBeInTheDocument());
    });

    test('shows error message if passwords do not match on sign-up', async () => {
        fireEvent.click(screen.getByText(/Create account/i));
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'Test@1234' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Test@5678' } });
        fireEvent.click(screen.getByText(/Continue/i));
        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    test('shows success message when password reset email is sent', async () => {
        const mockSendPasswordReset = require('firebase/auth').sendPasswordResetEmail;
        mockSendPasswordReset.mockResolvedValue();
        fireEvent.click(screen.getByText(/Forgot password\?/i));
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText(/Send Request Email/i));
        await waitFor(() => expect(screen.getByText(/password reset email will be sent soon/i)).toBeInTheDocument());
    });
});
