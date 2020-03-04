import React, { useState }from 'react'
import './ApplicationState.scss'
import { getFetch } from '../General/apiFetch'

export const listAction = {
    UPDATE:"update",
    NO_UPDATE:"no update"
}


export function ApplicantButton(props){
    props.setUpdateList(listAction.NO_UPDATE)

    async function handleClick(state){
        await getFetch(`/application/change_state/${props.applicant.id}/${state}`)
        props.setUpdateList(listAction.UPDATE)
    }

    switch(props.applicant.applicationState){
        case "NEW":
            return( 
                <div className = "buttons">
                    <td><button className = "sendButton" onClick={()=>{handleClick("SENT")}}>Send Test</button></td>
                    <td><button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button></td>
                </div>)
        case "SENT":
            return ( 
                <div className = "buttons">
                    <td>Test Sent</td>
                    <td><button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button></td>
                </div>)
        case "EXPIRED":
            return ( 
                <div className = "buttons">
                    <td>Test Expired</td>
                    <td><button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button></td>
                </div>)
        case "COMPLETED":
            return ( 
                <div className = "buttons complete">
                    <td>Test Complete</td>
                    <td><button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button></td>
                    <td><button className = "acceptButton" onClick={()=>{handleClick("ACCEPTED")}}>Accept</button></td>
                </div>)
        case "REJECTED":
            return <div className = "buttons text"><td>Application Rejected</td></div>
        case "ACCEPTED":
            return <div className = "buttons text"><td>Application Accepted</td></div>

    }
}

