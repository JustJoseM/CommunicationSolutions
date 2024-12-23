import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../MainPortal/Pages/Home';
import { getFirestore } from 'firebase/firestore';

// Mock Firebase imports to prevent initialization during tests
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

/*
jest.mock("../firebaseConfig", () => ({
  auth: {
      onAuthStateChanged: jest.fn((callback) => {
          callback(null);
          return jest.fn();
      }),
  },
}));
*/

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

describe('Home Component', () => {
    test('renders home page header correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        expect(screen.getByText(/Create the Dream Business You Want Here/)).toBeInTheDocument();
    });
    test('renders the images on home correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const imageOne = screen.getByAltText('one-alt');
        const imageTwo = screen.getByAltText('two-alt');

        expect(imageOne).toBeInTheDocument();
        expect(imageTwo).toBeInTheDocument();
    });
    test('renders and handles "Testimonials" button properly', () => {
    const mockClick = jest.fn();

    render(
      <Router>
        <Home />
      </Router>
    );

    const testimonialsLink = screen.getByText(/Testimonials/);
    expect(testimonialsLink).toBeInTheDocument();

    fireEvent.click(testimonialsLink);

    // Expect to be redirected to /testimonial
    expect(window.location.pathname).toBe('/testimonial');
  });
  test('renders and handles "Our Services" button properly', () => {
    const mockClick = jest.fn();

    render(
      <Router>
        <Home />
      </Router>
    );

    const aboutLink = screen.getByText(/Our Services/);
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(aboutLink);

    // Expect to be redirected to /about
    expect(window.location.pathname).toBe('/about');
  });
});

/*
describe('Navbar Component', () => {
  test('navigates to home page when the title link is clicked from another page', () => {
      render(
          <MemoryRouter initialEntries={['/signin']}>
              <Routes>
                  <Route path="/signin" element={<Navbar />} />
                  <Route path="/" element={<Home />} />
              </Routes>
          </MemoryRouter>
      );

      const titleLink = screen.getByText(/Communication Solutions/i);
      expect(titleLink).toBeInTheDocument();
      fireEvent.click(titleLink);

      // Verify navigation to the home page
      expect(screen.getByText(/Create the Dream Business You Want Here/i)).toBeInTheDocument();
  });
});*/