import React from 'react';
import { render,wait } from '@testing-library/react';
import { AdminManagement } from "./AdminManagement";
import { ApplicantButton } from './ApplicationState';
import { applicationList } from './fakeApplicationList';
import { mockSuccessfulFetch, mockFailedFetch } from "../General/mockApiFetch";

describe('admin page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
        })   
      
    test('renders mock response data', async () => {

        mockSuccessfulFetch(applicationList)
        const adminPage = render(<AdminManagement/>)

        await wait(()=> expect(adminPage.queryByTestId("Applications Table")).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[0].name)).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[1].name)).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[2].name)).toBeInTheDocument());
      });


    describe('application test buttons', () => {

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
    })
})