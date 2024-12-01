import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHome from '../AdminPortal/AdminHome/AdminHome';
import ClientBox from '../AdminPortal/AdminComponents/ClientBox/ClientBox';
import ConsultationChart from '../AdminPortal/AdminComponents/AdminCharts/ConsultationChart';
import RevenueChart from '../AdminPortal/AdminComponents/AdminCharts/RevenueChart';
import ClientSatisfactionChart from '../AdminPortal/AdminComponents/AdminCharts/ClientSatisfactionChart';

// Mock child components
jest.mock('../AdminPortal/AdminComponents/ClientBox/ClientBox', () => jest.fn(() => <div data-testid="mock-client-box">Mock ClientBox</div>));
jest.mock('../AdminPortal/AdminComponents/AdminCharts/ConsultationChart', () =>
  jest.fn(() => <div data-testid="mock-consultation-chart">Mock ConsultationChart</div>)
);
jest.mock('../AdminPortal/AdminComponents/AdminCharts/RevenueChart', () =>
  jest.fn(() => <div data-testid="mock-revenue-chart">Mock RevenueChart</div>)
);
jest.mock('../AdminPortal/AdminComponents/AdminCharts/ClientSatisfactionChart', () =>
  jest.fn(() => <div data-testid="mock-client-satisfaction-chart">Mock ClientSatisfactionChart</div>)
);

describe('AdminHome Component', () => {
  beforeEach(() => {
    render(<AdminHome />);
  });

  it('renders the AdminHome container', () => {
    const adminHome = screen.getAllByTitle('AdminHome');
    expect(adminHome).toBeInTheDocument();
  });

  it('renders the ClientBox component', () => {
    expect(screen.getByTestId('mock-client-box')).toBeInTheDocument();
  });

  it('renders the ConsultationChart component with the correct props', () => {
    expect(screen.getByTestId('mock-consultation-chart')).toBeInTheDocument();
  });

  it('renders the RevenueChart component with the correct props', () => {
    expect(screen.getByTestId('mock-revenue-chart')).toBeInTheDocument();
  });

  it('renders the ClientSatisfactionChart component with the correct props', () => {
    expect(screen.getByTestId('mock-client-satisfaction-chart')).toBeInTheDocument();
  });

  it('renders the static content correctly', () => {
    expect(screen.getByText('Upcoming Appointments')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Tasks')).toBeInTheDocument();
    expect(screen.getByText('Task List/Notes')).toBeInTheDocument();
  });
});
