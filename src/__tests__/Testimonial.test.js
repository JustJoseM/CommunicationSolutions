import React from "react";
import { render, fireEvent, waitFor, queryByText} from '@testing-library/react';
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
    collection: jest.fn(),
    getDocs: jest.fn(),
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

beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
});

describe('Testimonial Page', () => {
    it('renders the root div elements', () => {
        const { container } = render(<Testimonial />);
        // Expect the root element by checking its tag
        expect(container.querySelector('div')).toBeInTheDocument();
    });
    it('renders mocked testimonial content', async () => {
        // Mock Firebase Firestore info to return mock data
        const mockTestimonials = [
            { id: '1', Review: 'This is a Review', CompanyName: 'Apex', Photo: "https://example.com/photo1.jpg" },
            { id: '2', Review: 'This is a Review', CompanyName: 'Clear', Photo: "https://example.com/photo2.jpg" },
            { id: '3', Review: 'This is a Review', CompanyName: 'USA', Photo: "https://example.com/photo3.jpg" },
            { id: '4', Review: 'This is a Review', CompanyName: 'Placeholder',Photo: "https://example.com/photo4.jpg" },
        ];
        // Mock the getDocs method to return mock data
        require('firebase/firestore').getDocs.mockResolvedValue({
            docs: mockTestimonials.map(testimonial => ({
                id: testimonial.id,
                data: () => testimonial,
            })),
        });
        const { findByText, container } = render(<Testimonial />);
        // Wait for testimonials to be rendered
        await waitFor(() => {
            // Check if the testimonial content is displayed
            mockTestimonials.forEach(async (testimonial) => {
                const reviewText = await findByText(testimonial.Review);
                expect(reviewText).toBeInTheDocument();
                expect(await findByText(testimonial.CompanyName)).toBeInTheDocument();

                // Check that the src attribute matches the mock photo URL
                const image = container.querySelector(`img[alt="${testimonial.CompanyName}"]`);
                expect(image).toHaveAttribute('src', testimonial.Photo);
            });
        });
    });
    it('does not render incorrectly mocked testimonial content', async () => {
        const invalidTestimonials = [
             { id: '1', Review: 'This is a Review' }, // Missing Review and Photo
             { id: '2', CompanyName: 'RandomName', Review: 1234}, // Review isn't a string and missing photo
             { id: '3'}, // Missing everything except id
             { id: '4', Review: 'this is a review', CompanyName: 'Placeholder', Photo: 'url'} // Invalid URL

        ];
        require('firebase/firestore').getDocs.mockResolvedValue({
            docs: invalidTestimonials.map(testimonial => ({
                id: testimonial.id,
                data: () => testimonial,
            })),
        });
        const { queryByText } = render(<Testimonial />);
        
        await waitFor(() => {
            invalidTestimonials.forEach((testimonial) => {
                if(!testimonial?.Review || typeof testimonial.Review !== 'string') {
                    expect(queryByText(testimonial.Review)).not.toBeInTheDocument();
                }
                if(!testimonial?.CompanyName || typeof testimonial.Review !== 'string') {
                    expect(queryByText(testimonial.CompanyName)).not.toBeInTheDocument();
                }
                if(!testimonial?.Photo) {
                    expect(queryByText(testimonial.Photo)).not.toBeInTheDocument();
                }
            });
        });
    });
});

describe('Testimonial Carousel - Mouse Controls', () => {
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
       const { container } = render(<Testimonial />);

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
       const { container } = render(<Testimonial />);

       // Find the back button
       const backButton = container.querySelector('.slick-prev');

       // Click the back button
       fireEvent.click(backButton);
       expect(mockPrev).toHaveBeenCalled();
    });
    it('test that the forward button is missing from the document', () => {
        const { container } = render(<Testimonial />);
        // Try to find the forward button
        const forwardButton = container.querySelector('slick-next');
        // As it is missing, it should not be in the document, and should pass
        expect(forwardButton).not.toBeInTheDocument();
    });
    it('test that the back button is missing from the document', () => {
        const { container } = render(<Testimonial />);
        // Try to find the forward button
        const backButton = container.querySelector('slick-prev');
        // As it is missing, it should not be in the document, and should pass
        expect(backButton).not.toBeInTheDocument();
    });
});

describe('Testimonial Carousel - Keyboard Controls', () => {
    it('advances the carousel when the right arrow key is pressed', () => {
        const mockNext = jest.fn();
        const mockPrev = jest.fn();

       // Mock Slider to include next and prev mock functions
        Slider.mockImplementation((props) => (
        <div>
            <button onClick={mockNext} className="slick-next">Next</button>
            <button onClick={mockPrev} className="slick-prev">Prev</button>
            <div tabIndex="0" className="slick-slider">
                {props.children}
            </div>
        </div>
       ));

       const { container } = render(<Testimonial />);

       // Simulate clicking the Slider to ensure it has focus
       const slider = container.querySelector('.slick-slider');
       fireEvent.focus(slider);

       // Simulate pressing the right arrow key (ArrowRight)
       fireEvent.keyDown(slider, {
        key: 'ArrowRight',
        code: 'ArrowRight',
       });

       // As it is handled internally by Slick Carousel, it should not be called
       expect(mockNext).not.toHaveBeenCalled();
    });
    it('goes back on the carousel when the left arrow key is pressed', () => {
        const mockNext = jest.fn();
        const mockPrev = jest.fn();

       // Mock Slider to include next and prev mock functions
        Slider.mockImplementation((props) => (
            <div>
                <button onClick={mockNext} className="slick-next">Next</button>
                <button onClick={mockPrev} className="slick-prev">Prev</button>
                <div tabIndex="0" className="slick-slider">
                    {props.children}
                </div>
            </div>
        ));

       const { container } = render(<Testimonial />);

       // Simulate clicking the Slider to ensure it has focus
       const slider = container.querySelector('.slick-slider');
       fireEvent.focus(slider);

       // Simulate pressing the right arrow key (ArrowRight)
       fireEvent.keyDown(slider, { key: 'ArrowLeft', code: 'ArrowLeft', });

       // As it is handled internally by Slick Carousel, it should not be called
       expect(mockPrev).not.toHaveBeenCalled();
    });
    it('does not trigger carousel when the Enter key is pressed', () => {
        const mockNext = jest.fn();
        const mockPrev = jest.fn();

        // Mock Slider to include next and prev mock functions
        Slider.mockImplementation((props) => (
            <div>
                <button onClick={mockNext} className="slick-next">Next</button>
                <button onClick={mockPrev} className="slick-prev">Prev</button>
                <div tabIndex="0" className="slick-slider">
                    {props.children}
                </div>
            </div>
           ));

           const { container } = render(<Testimonial />);

           // Simulate clicking the Slider to ensure it has focus
           const slider = container.querySelector('.slick-slider');
           fireEvent.focus(slider);

           // Simulate pressing the right arrow key (ArrowRight)
           fireEvent.keyDown(slider, { key: 'Enter', code: 'Enter', });

           expect(mockNext).not.toHaveBeenCalled();
    });
    it('does not advance the carousel when triggered on a non-focusable element', () => {
        const mockNext = jest.fn();
        const mockPrev = jest.fn();

       // Mock Slider to include next and prev mock functions
        Slider.mockImplementation((props) => (
        <div>
            <button onClick={mockNext} className="slick-next">Next</button>
            <button onClick={mockPrev} className="slick-prev">Prev</button>
            <div className="slick-slider">
                {props.children}
            </div>
        </div>
       ));

       const { container } = render(<Testimonial />);

       // Simulate clicking the Slider to ensure it has focus
       const slider = container.querySelector('.slick-slider');
       fireEvent.focus(slider);

       // Simulate pressing the right arrow key (ArrowRight)
       fireEvent.keyDown(slider, {
        key: 'ArrowRight',
        code: 'ArrowRight',
       });

       // As it is handled internally by Slick Carousel, it should not be called
       expect(mockNext).not.toHaveBeenCalled();
    });
});