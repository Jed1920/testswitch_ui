import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'
import { ApplicantButton, listAction } from './ApplicationState'
import './AdminManagement.scss'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function AdminManagement(props){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const [applicantList, setApplicantList] = useState([])
    const [updateList, setUpdateList] = useState(listAction.NO_UPDATE)

    useEffect(() =>{
        console.log(updateList)
        setPageState(fetchState.FETCHING)
        getFetch("/application/get_all")
        .then(json => setApplicantList(json))
        .then(() => setPageState(fetchState.COMPLETE))
        .catch(() => setPageState(fetchState.ERROR))
    },[updateList])
          
        switch(pageState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Fetching data from database</p>
            case fetchState.COMPLETE:
                return <AdminManagementTable applicantList = {applicantList} setUpdateList = {setUpdateList}/>}
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
            {props.applicantList.map(indivApplicant => <ApplicantRow key={indivApplicant.id} applicant={indivApplicant} setUpdateList = {props.setUpdateList}/> )}
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
            <ApplicantButton applicant = {props.applicant} setUpdateList = {props.setUpdateList}/>
        </li>
    )
}