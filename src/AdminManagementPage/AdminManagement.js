import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'
import './AdminManagement.scss'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}
const headers ={"id":"ID","name":"Name","email":"Email","contactInfo":"Contact Info","experience":"Experience"}

export function AdminManagement(){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const [applicantList, setApplicantList] = useState([])

    useEffect(() =>{
        setPageState(fetchState.FETCHING)
        getFetch()
        .then(json => setApplicantList(json))
        .then(() => setPageState(fetchState.COMPLETE))
        .catch(() => setPageState(fetchState.ERROR))
    },[])
          
        switch(pageState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Fetching data from database</p>
            case fetchState.COMPLETE:
                return <AdminManagementTable applicantList = {applicantList}/>}
}

function AdminManagementTable(props){
    return (
    <table data-testid ="Applications Table" className = "adminPage">
        <ol>
            <li className="applicantHeaders">
                <h3 className="id">ID</h3>
                <h3 className="name">Name</h3>
                <h3 className="email">Email</h3>
                <h3 className="contactInfo">Contact Info</h3>
                <h3 className="experience">Experience</h3>
            </li>
            {props.applicantList.map(indivApplicant => <ApplicantRow key={indivApplicant.id} applicant={indivApplicant}/> )}
        </ol>
    </table>
    )
}

function ApplicantRow(props){
    return (
        <li className="applicantListItem">
            <div className="applicantListInfo">
                <p className="id">{props.applicant.id}</p>
                <p className="name">{props.applicant.name}</p>
                <p className="email">{props.applicant.email}</p>
                <p className="contactInfo">{props.applicant.contactInfo}</p>
                <p className="experience">{props.applicant.experience}</p>
            </div>
            <ApplicantButton state = {props.applicant.applicationState}/>
        </li>
    )
}

export function ApplicantButton(props){
    switch(props.state){
        case "NEW":
            return( 
                <div className = "buttons">
                    <button className = "sendButton">Send Test</button>
                    <button className = "rejectButton">Reject</button>
                </div>)
        case "SENT":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Sent</p>
                    <button className = "rejectButton">Reject</button>
                </div>)
        case "EXPIRED":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Expired</p>
                    <button className = "rejectButton">Reject</button>
                </div>)
        case "COMPLETED":
            return ( 
                <div className = "buttons">
                    <p className ="testText">Completed</p>
                    <button className = "rejectButton">Reject</button>
                    <button className = "acceptButton">Accept</button>
                </div>)
        case "REJECTED":
            return <p className ="testText">Rejected</p>
        case "ACCEPTED":
            return <p className ="testText">Accepted</p>

    }
    return <div></div>
}