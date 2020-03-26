import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'
import './fetchLoadingPage.scss'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function LoadingPage(props){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const [status,setStatus]=useState()

    useEffect(() =>  {
        async function fetchData() {
            setPageState(fetchState.FETCHING)
            try{
                let response = await getFetch(props.url)
                setStatus(await response.status)
                let json = await response.json()
                props.setResponse(json)
                setPageState(fetchState.COMPLETE)
            } catch {
                setPageState(fetchState.ERROR)
            }
        }
        fetchData()
    },props.subscribesTo || [])
          
        switch(pageState){

            case fetchState.ERROR:
                return (
                    <div className="loadingPage">
                        <p>Status {status}</p>
                        <p>Something went wrong</p>
                    </div>)

            case fetchState.FETCHING:
                return <p className="loadingPage">Fetching data from database</p>

            case fetchState.COMPLETE:
                return props.children}
}