import React from 'react';
import { render,wait, fireEvent } from '@testing-library/react';
import { Register } from './Register';

test('renders initial form', () => {
    const registerPage = render(<Register/>)

    expect(registerPage.queryByText("Name")).toBeInTheDocument();
    expect(registerPage.queryByText("Email")).toBeInTheDocument();
    expect(registerPage.queryByText("Contact Info")).toBeInTheDocument();
    expect(registerPage.queryByText("Experience")).toBeInTheDocument();
  });

test('renders error response', async () => {
    const registerPage = render(<Register/>)
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.reject()
    );
    fireEvent.click(registerPage.getByText("Register"))
    await wait(()=> expect(registerPage.queryByText("Something went wrong, please try again")).toBeInTheDocument());
  });

test('renders waiting response', () => {
    const registerPage = render(<Register/>)

    fireEvent.click(registerPage.queryByText("Register"))
    expect(registerPage.queryByText("Sending Application Form")).toBeInTheDocument();
  });


test('renders successful response', async () => {
    const registerPage = render(<Register/>)
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
        })
    );
    fireEvent.click(registerPage.getByText("Register"))
    await wait(()=> expect(registerPage.queryByText("Thank you for submitting an applicaition")).toBeInTheDocument());
    await wait(()=> expect(registerPage.queryByText("We will be in touch shortly about the next steps")).toBeInTheDocument());
  });

const fakeResponse ={
    "id":1,
    "name":"James Cameron",
    "email":"jamesCam@pand.ora",
    "contactInfo":"043548238123",
    "experience":"No Experience"}