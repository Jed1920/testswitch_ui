import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import { ApplicantButton } from './ApplicationState';
import { applicationList } from '../General/mockedFetchData';
import * as apiFetch from '../General/apiFetch'
import { mockSuccessfulFetch } from "../General/mockApiFetch";

describe('application test buttons', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
        })

    const setUpdateList = () => {}

    test('NEW application', () => {
      const adminPage = render(<ApplicantButton applicant={applicationList[0]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.getByText("Send Test")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('SENT application', () => {
      const adminPage = render(<ApplicantButton applicant={applicationList[1]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.queryByText("Sent")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('EXPIRED application', () => {
      const adminPage = render(<ApplicantButton applicant={applicationList[3]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.queryByText("Expired")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('COMPLETED application', () => {
      const adminPage = render(<ApplicantButton applicant={applicationList[2]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.queryByText("Completed")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Accept")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('REJECTED application', () => {
      const adminPage = render(<ApplicantButton applicant={applicationList[5]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.queryByText("Rejected")).toBeInTheDocument(); 
      });

    test('ACCEPTED application', () => {
        const adminPage = render(<ApplicantButton applicant={applicationList[4]} setUpdateList = {setUpdateList}/>)
  
        expect(adminPage.queryByText("Accepted")).toBeInTheDocument(); 
      });

    test('check button adds SENT to url', () => {
      mockSuccessfulFetch("success")
      const adminPage = render(<ApplicantButton applicant={applicationList[0]} setUpdateList = {setUpdateList}/>)
      jest.spyOn(apiFetch,'getFetch')
    
      const args = apiFetch.getFetch.mock.calls
      fireEvent.click(adminPage.getByText("Send Test"))

      let url = (args[0])[0]

      expect(url).toContain("SENT")
    });
})