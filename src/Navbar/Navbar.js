import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.scss'

export function Navbar(){
    return (
            <div className="navbar">
                <Link to='/' className="link home">TestSwitch</Link>
                <Link to='/register' className="link register">Apply</Link>
                <Link to='/admin' className="link admin">Admin</Link>
            </div>
    )
}