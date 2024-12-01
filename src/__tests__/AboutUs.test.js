import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../MainPortal/Pages/AboutUs';

describe('AboutUs Component', () => {
  test('renders company logo', () => {
    render(<AboutUs />);
    const logoImage = screen.getByAltText('main_buisness_logo');
    expect(logoImage).toBeInTheDocument();
  });

  test('does not render the incorrect logo', () => {
    render(<AboutUs />);
    expect(screen.queryByAltText('alt_business_logo')).not.toBeInTheDocument();
  });

  test('renders the "Who are we?" section', () => {
    render(<AboutUs />);
    expect(screen.getByText(/Who are we\?/i)).toBeInTheDocument();
  });

  test('does not render the nonexistent section', () => {
    render(<AboutUs />);
    expect(screen.queryByText(/Nonexistent Section/i)).not.toBeInTheDocument();
  });

  test('renders service titles', () => {
    render(<AboutUs />);
    expect(screen.getByText(/Yelp Campaign/i)).toBeInTheDocument();
    expect(screen.getByText(/Business Coaching/i)).toBeInTheDocument();
    expect(screen.getByText(/Communication Optimization/i)).toBeInTheDocument();
  });
});
