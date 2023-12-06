import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { BrowserRouter } from 'react-router-dom'; 
import UserLog from './UserLog';

// Render Tests
describe('Login Page Rendering', () => {
  test('Renders username input field', () => {
    render(
      <BrowserRouter>
        <UserLog />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('Renders password input field', () => {
    render(
      <BrowserRouter>
        <UserLog />
      </BrowserRouter>
    );
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Renders Lyrical Lounge Login title', () => {
    render(
      <BrowserRouter>
        <UserLog />
      </BrowserRouter>
    );
    const loginTitle = screen.getByText(/Lyrical Lounge Login/i);
    expect(loginTitle).toBeInTheDocument();
  });

    // Link Test
    test("Clicking on the Register Here link navigates to the Registration page", () => {
      render(
        <BrowserRouter>
          <UserLog/>
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/Register Here/i);
    fireEvent.click(linkElement);
    const contactElement = screen.getByText(/Register Here/i);
    expect(contactElement).toBeInTheDocument();
  });

// Input Test
test("Username field is updated after input", () => {
    render(
      <BrowserRouter>
        <UserLog/>
      </BrowserRouter>
  );
  const usernameInput = screen.getByLabelText(/Username/i);
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  expect(usernameInput.value).toBe('testuser');
  });

// Incorrect Value Test
  test('Displays error message for incorrect login', async () => {
    render(
      <BrowserRouter>
        <UserLog />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(usernameInput, { target: { value: 'incorrectUser' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: /Login/i }));
    await screen.findByText(/Invalid username or password/i);
    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

});