import React, { useState } from 'react'
import { ApplicantButton, listAction } from './ApplicationState'
import './AdminManagement.scss'
import { LoadingPage } from '../General/fetchLoadingPage'
import { getFetch } from '../General/apiFetch'

export function AdminManagement(){
    const [applicantList, setApplicantList] = useState([])
    const [updateList, setUpdateList] = useState(listAction.NO_UPDATE)
    console.log(applicantList)
    return(
        <LoadingPage setResponse = {setApplicantList} subscribesTo={[updateList]} url = "/application/get_all">
            <AdminManagementTable applicantList = {applicantList} setUpdateList = {setUpdateList}/>      
        </LoadingPage>
    )
}

export function AdminManagementTable(props){
    return (
    <table data-testid ="Applications Table" className = "adminPage">
        <ol>
            <li className="applicantHeaders">
                <h3 className="id">ID</h3>
                <h3 className="name">Name</h3>
                <h3 className="email">Email</h3>
                <h3 className="contactInfo">Contact Info</h3>
                <h3 className="experience">Experience</h3>
                <h3 className="cv">CV</h3>
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
                <CvLink applicant = {props.applicant}/>
                {/* <p className="cv">{props.applicant.cv.toString()}</p> */}
            </div>
            <ApplicantButton applicant = {props.applicant} setUpdateList = {props.setUpdateList}/>
        </li>
    )
}

export function CvLink(props){
    console.log(`${props.applicant.name} ${props.applicant.cv}`)

    async function handleClick(){
        let keyName = `${props.applicant.id}_${props.applicant.name.replace(" ","_")}`
        console.log(keyName)
        let response = await getFetch(`/application/get_url/${keyName}`)
        let json = await response.json()
        let cvUrl = await json.url
        window.open(await cvUrl);
    }


    switch (props.applicant.cv){
        
        case true :
            return <button onClick ={handleClick}>CV</button>
        case false : 
            return <p className="cv">N/A</p>
    }
}