import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function LoadingPage(props){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const [status,setStatus]=useState()
    console.log(props.subscribesTo[0])

    useEffect(() =>  {
        async function fetchData() {
            setPageState(fetchState.FETCHING)
            console.log(props.subscribesTo[0])

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
                    <div>
                        <p>Status {status}</p>
                        <p>Something went wrong</p>
                    </div>)

            case fetchState.FETCHING:
                return <p>Fetching data from database</p>

            case fetchState.COMPLETE:
                return props.children}
}