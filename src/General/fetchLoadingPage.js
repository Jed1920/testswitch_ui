import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'
import { AdminManagementTable } from'../AdminManagementPage/AdminManagement'
import { ApplicantButton, listAction } from '../AdminManagementPage/ApplicationState'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function LoadingPage(props){
    const [pageState,setPageState]= useState(fetchState.FETCHING)

    useEffect(() =>{
        setPageState(fetchState.FETCHING)
        getFetch(props.url)
        .then(json => props.setResponse(json))
        .then(() => setPageState(fetchState.COMPLETE))
        .catch(() => setPageState(fetchState.ERROR))
    },props.subscribesTo || [])
          
        switch(pageState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Fetching data from database</p>
            case fetchState.COMPLETE:
                return props.children}
}