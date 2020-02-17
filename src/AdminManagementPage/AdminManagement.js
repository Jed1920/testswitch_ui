import React, { useState, useEffect } from 'react'
import { getFetch } from '../General/apiFetch'

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function AdminManagement(){
    const [pageState,setPageState]= useState(fetchState.FETCHING)
    const [applicantList, setApplicantList] = useState([])

    useEffect(() =>{
        
        setPageState(fetchState.FETCHING)
        getFetch()
        .then(resp => resp.json())
        .then(json => setApplicantList(json))
        .then(() => setPageState(fetchState.COMPLETE))
        .catch(() => setPageState(fetchState.ERROR))
    },[])
          
        switch(pageState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Fetching Data</p>
            case fetchState.COMPLETE:
                return <AdminManagementTable applicantList = {applicantList}/>}
}


export function AdminManagementTable(props){
    return (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Info</th>
                <th>Experience</th>
            </tr>   
        </thead>
        <tbody>
            {props.applicantList.map(indivApplicant => <ApplicantRow key = {indivApplicant.id} applicant = {indivApplicant}/> )}
        </tbody>
    </table>
    )
}

function ApplicantRow(props){
    return (
    <tr>
        <td>{props.applicant.id}</td>
        <td>{props.applicant.name}</td>
        <td>{props.applicant.email}</td>
        <td>{props.applicant.contactInfo}</td>
        <td>{props.applicant.experience}</td>
    </tr>
    )
}