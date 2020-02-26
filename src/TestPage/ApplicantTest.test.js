import React from 'react'
import { render,wait } from '@testing-library/react';
import { ApplicantTest } from './ApplicantTest';
import { applicationList } from '../General/mockedFetchData'
import { mockSuccessfulFetch } from '../General/mockApiFetch';
import { MemoryRouter } from 'react-router-dom';

describe('test page component', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
        })

    test('test whole page component', async () => {
        mockSuccessfulFetch(applicationList[1])
        const testPage = render(
        <MemoryRouter initialEntries={["/test/random_test_string"]}>
            <ApplicantTest/>
        </MemoryRouter>)

        await wait(() => expect(testPage.queryByText("Welcome to your test")).toBeInTheDocument())
        await wait(() => expect(testPage.queryByText(applicationList[1].name)).toBeInTheDocument())
        }
    )

    test('no longer valid correct url string', async () => {
        mockSuccessfulFetch(applicationList[2])
        const testPage = render(
        <MemoryRouter initialEntries={["/test/random_test_string"]}>
            <ApplicantTest/>
        </MemoryRouter>)

        await wait(() => expect(testPage.getByText(`Welcome back ${applicationList[2].name}`)).toBeInTheDocument())
        await wait(() => expect(testPage.queryByText(applicationList[2].applicationState)).toBeInTheDocument())
        }
    )    
})