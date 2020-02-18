import React from 'react';
import { render,wait } from '@testing-library/react';
import { AdminManagement, ApplicantButton } from "./AdminManagement";
import { mockSuccessfulFetch, mockFailedFetch } from "../General/mockApiFetch";

describe('admin page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
        })

    const applicationList =(
         
    [
        {
            "id": 1,
            "name": "qwewedf",
            "email": "adfdhgffe",
            "contactInfo": "adsfdgbda",
            "experience": "BEGINNER"
        },
        {
            "id": 2,
            "name": "cvbxcb",
            "email": "nbcvbm",
            "contactInfo": "htreahg",
            "experience": "INTERMEDIATE"
        },
        {
            "id": 3,
            "name": "bvnbxg",
            "email": "sadgfg",
            "contactInfo": "fasfgdb",
            "experience": "NONE"
        }
    ])

    test('renders error response', async () => {
        mockFailedFetch()
        const adminPage = render(<AdminManagement/>)
        
        await wait(()=> expect(adminPage.queryByText("Something went wrong, please try again")).toBeInTheDocument());
      });


    test('renders waiting response', () => {
        const adminPage = render(<AdminManagement/>)
  
        expect(adminPage.queryByText("Fetching data from database")).toBeInTheDocument();
      });
   
      
    test('renders mock response data', async () => {

        mockSuccessfulFetch(applicationList)
        const adminPage = render(<AdminManagement/>)

        await wait(()=> expect(adminPage.queryByTestId("Applications Table")).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[0].name)).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[1].name)).toBeInTheDocument());
        await wait(()=> expect(adminPage.queryByText(applicationList[2].name)).toBeInTheDocument());
      });
})

describe('application test buttons', () => {

    test('NEW application', () => {
        const adminPage = render(<ApplicantButton state="NEW"/>)
  
        expect(adminPage.getByText("Send Test")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('SENT application', () => {
        const adminPage = render(<ApplicantButton state="SENT"/>)
  
        expect(adminPage.queryByText("Sent")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('EXPIRED application', () => {
        const adminPage = render(<ApplicantButton state="EXPIRED"/>)
  
        expect(adminPage.queryByText("Expired")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('COMPLETED application', () => {
        const adminPage = render(<ApplicantButton state="COMPLETED"/>)
  
        expect(adminPage.queryByText("Completed")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Accept")).toBeInTheDocument(); 
        expect(adminPage.queryByText("Reject")).toBeInTheDocument(); 
      });

    test('REJECTED application', () => {
        const adminPage = render(<ApplicantButton state="REJECTED"/>)
  
        expect(adminPage.queryByText("Rejected")).toBeInTheDocument(); 
      });

    test('ACCEPTED application', () => {
        const adminPage = render(<ApplicantButton state="ACCEPTED"/>)
  
        expect(adminPage.queryByText("Accepted")).toBeInTheDocument(); 
      });

})