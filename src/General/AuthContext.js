import React, { useState } from 'react'

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) =>{

    const setToken = (newToken) => {
        setState({...state, token : newToken, loggedIn : newToken === "" ? false : true});
      }
    
      const initState = {
        token: document.cookie,
        setToken: setToken,
        loggedIn: document.cookie === "" ? false : true
      } 
    
      const [state, setState] = useState(initState)
    
      return (
        <AuthContext.Provider value={state}>
          {props.children}
        </AuthContext.Provider>
      )
}