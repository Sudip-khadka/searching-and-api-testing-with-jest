import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correct import for additional matchers
import Search from './Search'; // Ensure this path is correct

afterEach(() => {
  jest.restoreAllMocks(); // Ensure mocks are reset after each test
});

// Mock the global fetch API
global.fetch = jest.fn();

test('render data correctly when fetched successfully', async () => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve([
      {
        id: 1,
        logo: 'https://example.com/logo1.png',
        address: 'Folsom, California, United States',
        company: 'Target',
        jobTitle: 'Content Moderator',
        expiresIn: 17,
        isExpired: false,
        maxSalary: '80000',
        minSalary: '25000',
        salaryType: 'Hourly'
      },
    ]),
  });

  render(<Search />);

  // Ensure all elements are rendered correctly
  await waitFor(() => {
    expect(screen.getByText('Content Moderator')).toBeInTheDocument();
    expect(screen.getByText('Target')).toBeInTheDocument();
    expect(screen.getByText('Folsom, California, United States')).toBeInTheDocument();
    expect(screen.getByText('Rs.25000 - Rs.80000 (Hourly)')).toBeInTheDocument();
  });
});

test('display loading state while data is being fetched', async () => {
  global.fetch.mockImplementation(() => new Promise(() => {})); // Returns a pending promise

  render(<Search />);

  // Ensure that the loading state is displayed
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('display error message when API call fails', async () => {
  global.fetch.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

  render(<Search />);

  // Ensure that the error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });
});
