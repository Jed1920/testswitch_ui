import React from 'react';
import { render,wait,fireEvent } from '@testing-library/react';
import { Register } from './Register';
import { mockSuccessfulFetch, mockFailedFetch } from '../General/mockApiFetch';
import { applicationList } from '../General/mockedFetchData';
import * as apiFetch from '../General/apiFetch'

describe('register page', () => {

  afterEach(() => {
    // @ts-ignore
    global.fetch.resetMocks()
    })

  test('renders initial form', () => {
      const registerPage = render(<Register/>)

      expect(registerPage.queryByText("Name")).toBeInTheDocument();
      expect(registerPage.queryByText("Email")).toBeInTheDocument();
      expect(registerPage.queryByText("Contact Info")).toBeInTheDocument();
      expect(registerPage.queryByText("Experience")).toBeInTheDocument();
    });

  test('renders error response', async () => {
      const registerPage = render(<Register/>)
      mockFailedFetch()
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
      mockSuccessfulFetch(applicationList[0])
      fireEvent.click(registerPage.getByText("Register"))

      await wait(()=> expect(registerPage.queryByText("Thank you for submitting an applicaition")).toBeInTheDocument());
      await wait(()=> expect(registerPage.queryByText("We will be in touch shortly about the next steps")).toBeInTheDocument());
    });

  test('check form inputs sent in formData', () => {
      const registerPage = render(<Register/>)
      jest.spyOn(apiFetch,'addApplicantFetch')
    
      const args = apiFetch.addApplicantFetch.mock.calls
      fireEvent.change(registerPage.getByTestId("Name"),{target: { value: applicationList[0].name}})
      fireEvent.change(registerPage.getByTestId("Email"),{target: { value: applicationList[0].email}})
      fireEvent.change(registerPage.getByTestId("Contact Info"),{target: { value: applicationList[0].contactInfo}})
      fireEvent.change(registerPage.getByTestId("Experience"),{target: { value: applicationList[0].experience}})

      fireEvent.click(registerPage.getByText("Register"))
      let formData = (args[0])[0]

      expect(formData.getAll("name")[0]).toBe(applicationList[0].name)
      expect(formData.getAll("email")[0]).toBe(applicationList[0].email)
      expect(formData.getAll("contactInfo")[0]).toBe(applicationList[0].contactInfo)
      expect(formData.getAll("experience")[0]).toBe(applicationList[0].experience)
    });
});