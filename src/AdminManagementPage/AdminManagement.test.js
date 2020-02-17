import React from 'react';
import { render,wait } from '@testing-library/react';
import { AdminManagement } from "./AdminManagement";
import { mockSuccessfulFetch, mockFailedFetch } from "../General/mockApiFetch";

describe('register page', () => {

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
            "experience": "fdagdsaf"
        },
        {
            "id": 2,
            "name": "cvbxcb",
            "email": "nbcvbm",
            "contactInfo": "htreahg",
            "experience": "ncbvnghn"
        },
        {
            "id": 3,
            "name": "bvnbxg",
            "email": "sadgfg",
            "contactInfo": "fasfgdb",
            "experience": "bvxbsdf"
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