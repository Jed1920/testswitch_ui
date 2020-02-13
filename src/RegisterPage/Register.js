import React, { useState, useEffect } from 'react'
import { addApplicantFetch } from '../General/apiFetch'
import './Register.scss';

const fetchState = {
    ERROR: "error",
    FETCHING: "fetching",
    COMPLETE: "complete"
}

export function Register(){
    const [registerState,setRegisterState]=useState()

        switch(registerState){
            case fetchState.ERROR:
                return <p>Something went wrong, please try again</p>
            case fetchState.FETCHING:
                return <p>Sending Application Form</p>
            case fetchState.COMPLETE:
                return (<section>
                            <p>Thank you for submitting an applicaition</p>
                            <p>We will be in touch shortly about the next steps</p>
                        </section>)}

    return <RegistrationForm setPageState ={setRegisterState}/>
}

export function RegistrationForm(props){

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [contactInfo,setContactInfo]=useState("")
    const [experience,setExperience]=useState("")
    
    async function handleSubmit(event){
        event.preventDefault()

        var formData = new FormData()
        formData.append("name",name)
        formData.append("email",email)
        formData.append("contactInfo",contactInfo)
        formData.append("experience",experience)
        try {
            props.setPageState(fetchState.FETCHING)
            await addApplicantFetch(formData)
            props.setPageState(fetchState.COMPLETE)
        } catch {
            props.setPageState(fetchState.ERROR)
        }
    }
    return (
        <div className = "registerPage">
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit} className = "registerForm">
                <label>Name</label>
                <input type="text" name="Name" onChange={event => setName(event.target.value)}/>

                <label>Email</label>
                <input type="text" name="Email" onChange={event => setEmail(event.target.value)}/>

                <label>Contact Info</label>
                <input type="text" name="Contact Info" onChange={event => setContactInfo(event.target.value)}/>

                <label>Experience</label>
                <select name="Experience" onChange={event => setExperience(event.target.value)}>
                    <option value="No Experience">No Experience</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select>

                <input type="submit" name="Submit Button" value="Register" className="registerButton"/>
            </form>
        </div>)
}