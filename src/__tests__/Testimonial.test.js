import React from "react";
import { render, fireEvent} from '@testing-library/react';
import Testimonial from '../MainPortal/Pages/Testimonial';
import Slider from 'react-slick';

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
  

// Mock the Slider component
jest.mock('react-slick', () => {
    return jest.fn(({ children, ...props }) => (
        <div>
            <button onClick={props.prev} className="slick-next">Next</button>
            <button onClick={props.next} className="slick-prev">Prev</button>
            {props.children}
        </div>
    ));
});

describe('Testimonial Carousel', () => {
    it('advances the carousel when the forward button is clicked', () => {
       const mockNext = jest.fn();
       const mockPrev = jest.fn();

       // Mock Slider to include next and prev mock functions
       Slider.mockImplementation((props) => (
        <div>
            <button onClick={mockNext} className="slick-next">Next</button>
            <button onClick={mockPrev} className="slick-prev">Prev</button>
            {props.children}
        </div>
       ));

       const { container } = render(
        <Testimonial />
       );

       // Find the forward button
       const forwardButton = container.querySelector('.slick-next');
       
       // Click the forward button
       fireEvent.click(forwardButton);

       expect(mockNext).toHaveBeenCalled();
    });

    it('goes back on the carousel when the back button is clicked', () => {
        const mockNext = jest.fn();
       const mockPrev = jest.fn();

       // Mock Slider to include next and prev mock functions
       Slider.mockImplementation((props) => (
        <div>
            <button onClick={mockNext} className="slick-next">Next</button>
            <button onClick={mockPrev} className="slick-prev">Prev</button>
            {props.children}
        </div>
       ));

       const { container } = render(
        <Testimonial />
       );

       // Find the back button
       const backButton = container.querySelector('.slick-prev');

       // Click the back button
       fireEvent.click(backButton);

       expect(mockPrev).toHaveBeenCalled();
    });
});