import React, { useState, useContext } from 'react'
import './Login.scss';
import { loginFetch } from '../General/apiFetch';
import { AuthContext } from '../General/AuthContext';

export function Login(){
    const context = useContext(AuthContext);
    const [username,setUsername] = useState("SJfUza6zgTsMyZfY3yMh")
    const [password,setPassword] = useState("TCbQ4CFULqjXwX2lWCg6ASDea0UGBUj2Gbx2cZ1TcFJxPZXkOFqLkQzmnE2q7L2M")

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
            <form className="loginForm">
                <section className="formInput">
                        <label>Username</label>
                        <input type="text" data-testid="Username" onChange={event => setUsername(event.target.value)} className="field" value = {username}/>
                    </section>

                    <section className="formInput">
                        <label>Password</label>
                        <input type="text" data-testid="Password" onChange={event => setPassword(event.target.value)} className="field" value = {password}/>
                    </section>

                    <section className="submitButton">
                        <input type="submit"/>
                    </section>
            </form>
        </div>
    )

}