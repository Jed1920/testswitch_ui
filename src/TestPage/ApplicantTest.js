import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../General/fetchLoadingPage';


export function ApplicantTest(){
    const[applicant,setApplicant] = useState()
    let { idString } = useParams();

    return(
        <LoadingPage setResponse = {setApplicant} url = {`/application/test/${idString}`}>
            <ApplicantTestPage applicant = {applicant}/>      
        </LoadingPage>
    )
}

function ApplicantTestPage(props){
    return(
        <div>
            <p>Welcome to your test</p>
            {props.applicant.name}
        </div>)
}