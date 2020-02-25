import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../General/fetchLoadingPage';


export function ApplicantTest(){
    const[applicant,setApplicant] = useState()
    let { idString } = useParams();
    console.log(applicant)

    return(
        <LoadingPage setResponse = {setApplicant} url = {`/application/test/${idString}`}>
            <ApplicantTestPage applicant = {applicant}/>      
        </LoadingPage>
    )
}

function ApplicantTestPage(props){

    switch(props.applicant.applicationState){
        case "SENT":
            return(
                <div>
                    <p>Welcome to your test</p>
                    {props.applicant.name}
                </div>)
        default :
        return (
            <div>
                <p>Welcome back {props.applicant.name}</p>
                <p>You cannot make anymore changes to your submition</p>
                <p>Applications Status</p>  
                <p>{props.applicant.applicationState}</p>
            </div>) 
    }  
}