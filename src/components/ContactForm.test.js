import React from 'react';
import {render, screen, waitFor, rtl, queryByTestId, getByTestId, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {

    render(<ContactForm/>);
    const hasHeaderELement = screen.getByText(/Contact Form/i);
    expect(hasHeaderELement).toBeInTheDocument();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

    render(<ContactForm/>);

    userEvent.type(screen.getByLabelText(/First Name*/), 'tybo');
    screen.getByTestId(/error/);

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm/>);

    userEvent.type(screen.getByLabelText(/First Name*/), '');
    userEvent.type(screen.getByLabelText(/Last Name*/), '');
    userEvent.type(screen.getByLabelText(/Email*/), '');
    userEvent.click(screen.getByRole('button', {name: /submit/i,}));

    screen.getByText(/Error: firstName must have at least 5 characters./i);
    screen.getByText(/Error: lastName is a required field./i);
    screen.getByText(/Error: email must be a valid email address./i);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm/>);

    userEvent.type(screen.getByLabelText(/First Name*/), 'Steven');
    userEvent.type(screen.getByLabelText(/Last Name*/), 'Homem');
    userEvent.type(screen.getByLabelText(/Email*/), '');
    userEvent.click(screen.getByRole('button', {name: /submit/i,}));

    screen.getByText(/Error: email must be a valid email address./i);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm/>);

    userEvent.type(screen.getByLabelText(/Email*/), 'sjhomemoutlook.com');

    screen.getByText(/Error: email must be a valid email address./i)
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm/>);
    
    userEvent.type(screen.getByLabelText(/First Name*/), 'Steven');
    userEvent.type(screen.getByLabelText(/Last Name*/), '');
    userEvent.type(screen.getByLabelText(/Email*/), 'sjhomem@outlook.com');
    userEvent.click(screen.getByRole('button', {name: /submit/i,}));

    screen.getByText(/lastName is a required field./i);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

    render(<ContactForm/>);
    
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Steven');

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Homem');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'sjhomem@outlook.com');

    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(messageInput, '');
    
    const button = screen.getByRole('button', {name: /submit/i,});
    userEvent.click(button);

    const resultFirstName = screen.queryByText('Steven');
    expect(resultFirstName).toBeInTheDocument();

    const resultLastName = screen.queryByText('Homem');
    expect(resultLastName).toBeInTheDocument();

    const resultEmail = screen.queryByText('sjhomem@outlook.com');
    expect(resultEmail).toBeInTheDocument();
    
    
    const resultMessage = screen.queryByTestId("messageDisplay");
    expect(resultMessage).not.toBeInTheDocument;

    
    
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm/>);
    
    userEvent.type(screen.getByLabelText(/First Name*/), 'Steven');
    userEvent.type(screen.getByLabelText(/Last Name*/), 'Homem');
    userEvent.type(screen.getByLabelText(/Email*/), 'sjhomem@outlook.com');
    userEvent.type(screen.getByLabelText(/Message/), 'sjhomem@outlook.com');
    userEvent.click(screen.getByRole('button', {name: /submit/i,}));

    screen.getByTestId("firstnameDisplay");
    screen.getByTestId("lastnameDisplay");
    screen.getByTestId("emailDisplay");
    screen.getByTestId("messageDisplay");
   
    
});