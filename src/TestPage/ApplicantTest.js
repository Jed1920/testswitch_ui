import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { getFetch } from '../General/apiFetch';

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function ApplicantTest(){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const[applicant,setApplicant] = useState()
    let { idString } = useParams();

    useEffect(() =>{
        setPageState(fetchState.FETCHING)
        getFetch(`/application/test/${idString}`)
        .then(json => setApplicant(json))
        .then(() => setPageState(fetchState.COMPLETE))
        .catch(() => setPageState(fetchState.ERROR))
    },[])
          
        switch(pageState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Fetching data from database</p>
            case fetchState.COMPLETE:
                return <ApplicantTestPage applicant = {applicant}/>}
}

export function ApplicantTestPage(props){
    return(
        <div>
            <p>Welcome to your test</p>
            {props.applicant.name}
        </div>)
}