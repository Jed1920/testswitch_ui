import React, { useState, useContext } from 'react'
import './Login.scss';
import { loginFetch } from '../General/apiFetch';
import { AuthContext } from '../General/AuthContext';

export function Login(){
    const context = useContext(AuthContext);
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()

    async function handleSubmit(event){
        event.preventDefault()

        var body = {"username" : username , "password" : password}
        var response = await loginFetch(body)
        var json = await response.json()
        if(await json.loggedIn){
            context.setToken(await json.token)
            document.cookie = json.token
        }
    }

    return (
        <div className="loginPage" onSubmit={handleSubmit}>
            <img src="/images/login_image_01.jpg" alt="background image"/>
            <form className="loginForm">
            <h1>Login</h1>
                <section className="formInput">
                        <label>Username</label>
                        <input type="text" data-testid="Username" onChange={event => setUsername(event.target.value)} className="field" value = {username}/>
                    </section>

                    <section className="formInput">
                        <label>Password</label>
                        <input type="password" data-testid="Password" onChange={event => setPassword(event.target.value)} className="field" value = {password}/>
                    </section>

                    <section className="formInput">
                        <input type="submit" className="submitButton"/>
                    </section>
            </form>
        </div>
    )

}