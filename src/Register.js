import React, { useState } from 'react'
import { addApplicantFetch } from './apiFetch'

export function Register(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [contactInfo,setContactInfo]=useState("")
    const [experience,setExperience]=useState("")

    function handleSubmit(event){
        event.preventDefault()
        var formData = new FormData
        formData.append("name",name)
        formData.append("email",email)
        formData.append("contactInfo",contactInfo)
        formData.append("experience",experience)
        var jsonResponse = addApplicantFetch(formData)
        console.log(jsonResponse)
    }

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="Name" onChange={event => setName(event.target.value)}/>
        <input type="text" name="Email" onChange={event => setEmail(event.target.value)}/>
        <input type="text" name="Contact Info" onChange={event => setContactInfo(event.target.value)}/>
        <input type="text" name="Experience" onChange={event => setExperience(event.target.value)}/>
        <input type="submit" name="Submit Button"/>
    </form>)
}