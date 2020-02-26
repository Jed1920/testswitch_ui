import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingPage } from '../General/fetchLoadingPage';
import './ApplicantTest.scss'
import { getFetch } from '../General/apiFetch';


export function ApplicantTest(){
    const[applicant,setApplicant] = useState()
    const[refresh,setRefresh] = useState(false)
    let { idString } = useParams();

    return(
        <LoadingPage setResponse = {setApplicant} subscribesTo ={[refresh]} url = {`/application/test/${idString}`}>
            <ApplicantTestPage applicant = {applicant} setRefresh ={setRefresh}/>      
        </LoadingPage>
    )
}

export function ApplicantTestPage(props){

    async function handleSubmit(event){
        event.preventDefault()
        getFetch(`/application/change_state/${props.applicant.id}/COMPLETED`)
        .then(() => props.setRefresh(true))
    }

    switch(props.applicant.applicationState){
        case "SENT":
            return(
                <div className="applicantTest">
                    <p>Welcome to your test</p>
                    <p>{props.applicant.name}</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="inputText"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>)
        default :
        return (
            <div className="applicantTest">
                <p>Welcome back {props.applicant.name}</p>
                <p>You cannot make anymore changes to your submition</p>
                <p>Application Status</p>  
                <p>{props.applicant.applicationState}</p>
            </div>) 
    }  
}