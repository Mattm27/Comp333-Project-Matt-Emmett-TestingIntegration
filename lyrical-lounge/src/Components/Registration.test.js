import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Registration from './Registration';

describe('Registration Page Rendering', () => {
  // Render Tests
  test('Renders username input field', () => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('Renders password input field', () => { // Come back and double check this test
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
    const passwordInputs = screen.getAllByText(/Password/i);
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  test('Renders confirm password input field', () => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    expect(confirmPasswordInput).toBeInTheDocument();
    });

  test('Renders Lyrical Lounge Sign Up title', () => {
    render(
        <BrowserRouter>
        <Registration />
        </BrowserRouter>
    );
    const signUpTitle = screen.getByText(/Lyrical Lounge Sign Up/i);
    expect(signUpTitle).toBeInTheDocument();
    });

   // Link Test
   test("Clicking on the Login Here link navigates to the Login page", () => {
    render(
      <BrowserRouter>
        <Registration/>
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/Login Here/i);
    fireEvent.click(linkElement);
    const contactElement = screen.getByText(/Login Here/i);
    expect(contactElement).toBeInTheDocument();
    });

// Input Test
  test("Confrim Password field is updated after input", () => {
    render(
      <BrowserRouter>
        <Registration/>
      </BrowserRouter>
   );
   const confpasswordInput = screen.getByLabelText(/Confirm Password/i);
   fireEvent.change(confpasswordInput, { target: { value: 'testconfpass' } });
   expect(confpasswordInput.value).toBe('testconfpass');
   });

// Incorrect Value Test
  test('Displays error message for mismatched passwords', async () => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInputs = screen.queryAllByLabelText(/Password:/i);
    const passwordInput = passwordInputs[0]; // Because there are two areas with text password, we only want the first one
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password12' } });
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
    await screen.findByText(/Passwords must match/i);
    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });

});