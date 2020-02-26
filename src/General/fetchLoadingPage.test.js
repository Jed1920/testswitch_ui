import React from 'react';
import { mockFailedFetch, mockSuccessfulFetch } from "./mockApiFetch";
import { render,wait } from '@testing-library/react';
import { LoadingPage } from "./fetchLoadingPage";


describe('loading page component', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
        })
    
    const setApplicantList = function () {}

    test('renders error response', async () => {
        mockFailedFetch()
        const loadingPage = render(<LoadingPage setResponse = {setApplicantList} url = ""/>)
        
        await wait(() => expect(loadingPage.queryByText("Something went wrong")).toBeInTheDocument());
      });

    test('renders waiting response', () => {
        const loadingPage = render(<LoadingPage setResponse = {setApplicantList} url = ""/>)
  
        expect(loadingPage.queryByText("Fetching data from database")).toBeInTheDocument();
      });

    test('renders child components on successful fetch', async () => {
        mockSuccessfulFetch("success")
        const loadingPage = render(   <LoadingPage setResponse = {setApplicantList} url = "">
                                        Child Components
                                    </LoadingPage>)
  
        await wait(() => expect(loadingPage.getByText("Child Components")).toBeInTheDocument());
      });
    
    }
)