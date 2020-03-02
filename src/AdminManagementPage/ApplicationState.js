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
                    <button className = "sendButton" onClick={()=>{handleClick("SENT")}}>Send Test</button>
                    <button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button>
                </div>)
        case "SENT":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Sent</p>
                    <button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button>
                </div>)
        case "EXPIRED":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Expired</p>
                    <button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button>
                </div>)
        case "COMPLETED":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Completed</p>
                    <button className = "rejectButton" onClick={()=>{handleClick("REJECTED")}}>Reject</button>
                    <button className = "acceptButton" onClick={()=>{handleClick("ACCEPTED")}}>Accept</button>
                </div>)
        case "REJECTED":
            return <p className ="testText">Rejected</p>
        case "ACCEPTED":
            return <p className ="testText">Accepted</p>

    }
}

