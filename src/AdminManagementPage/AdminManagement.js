import React, { useState } from 'react'
import { ApplicantButton, listAction } from './ApplicationState'
import './AdminManagement.scss'
import { LoadingPage } from '../General/fetchLoadingPage'
import { getFetch } from '../General/apiFetch'

export function AdminManagement(){
    const [applicantList, setApplicantList] = useState([])
    const [updateList, setUpdateList] = useState(listAction.NO_UPDATE)
    return(
        <LoadingPage setResponse = {setApplicantList} subscribesTo={[updateList]} url = "/application/get_all">
            <AdminManagementTable applicantList = {applicantList} setUpdateList = {setUpdateList}/>      
        </LoadingPage>
    )
}

export function AdminManagementTable(props){
    return (
    <table data-testid ="Applications Table" className = "adminPage">
            <tr className="applicantHeaders">
                <th className="id">ID</th>
                <th className="name">Name</th>
                <th className="email">Email</th>
                <th className="contactInfo">Contact Info</th>
                <th className="experience">Experience</th>
                <th className="cv">CV</th>
            </tr>
            {props.applicantList.map(indivApplicant => <ApplicantRow key={indivApplicant.id} applicant={indivApplicant} setUpdateList = {props.setUpdateList}/>)}
    </table>
    )
}

function ApplicantRow(props){
    const [cvButton,setCvButton] = useState(false)
    const [buttons,setButtons] = useState(false)

    function handleClick(){
        if(cvButton == false){
            setButtons(buttons == false)
        }
    }

    switch(buttons){

        case true :
            return (
                <tbody>
                    <tr className="applicationRow" onClick={handleClick}>
                        <td className="id idRow">{props.applicant.id}</td>
                        <td className="name">{props.applicant.name}</td>
                        <td className="email">{props.applicant.email}</td>
                        <td className="contactInfo">{props.applicant.contactInfo}</td>
                        <td className="experience">{props.applicant.experience}</td>
                        <CvLink applicant = {props.applicant}/>
                    </tr>    
                    <tr  className="applicationRow">
                        <td colspan="6"className="applicantButton"><ApplicantButton applicant = {props.applicant} setUpdateList = {props.setUpdateList}/></td>
                    </tr>
                </tbody>
                    )

        case false :
            return (
                <tbody>
                    <tr className="applicationRow" onClick={handleClick}>
                        <td className="id idRow">{props.applicant.id}</td>
                        <td className="name">{props.applicant.name}</td>
                        <td className="email">{props.applicant.email}</td>
                        <td className="contactInfo">{props.applicant.contactInfo}</td>
                        <td className="experience">{props.applicant.experience}</td>
                        <CvLink applicant = {props.applicant}/>
                    </tr>
                </tbody>
                )
    }
}

export function CvLink(props){

    async function handleClick(){
        let keyName = `${props.applicant.id}_${props.applicant.name.replace(" ","_")}`
        let response = await getFetch(`/application/get_url/${keyName}`)
        let json = await response.json()
        let cvUrl = await json.url
        window.open(await cvUrl);
    }


    switch (props.applicant.cv){
        
        case true :
            return <td className="cvButton" onClick = {handleClick}>View</td>
        case false : 
            return <td className="cv">N/A</td>
    }
}