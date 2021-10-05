import React, { createContext, useReducer } from 'react'
// import { cookie } from '../Components/Common/Utils'

const cookie = key=>((new RegExp((key || '=')+'=(.*?); ','gm')).exec(document.cookie+'; ') ||['',null])[1]

const initialState = {
    auth: {
        loggedIn: cookie('userId') && cookie('emailId') && cookie('auth_token') ? true : false,
        user: {
            username: '',
            emailId: cookie('emailId') ? cookie('emailId') : '',
            contactNo: '',
            userId: cookie('userId') ? cookie('userId') : ''
        },
        apiKey: process.env.REACT_APP_API_KEY,
        token: ''
    },
    filesLists: []
}


const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGGED_IN':{
            let auth = {
                ...state.auth,
                ...action.payload
            }
            return {
                ...state,
                auth
            }
        }
        case 'LOGGED_OUT':{
            let auth = {
                ...state.auth,
                ...action.payload
            }
            return {
                ...state,
                auth
            }
        }
        default:
            return state
    }
}

export const AuthContext = createContext(initialState)

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function loggedIn(auth) {
        // console.log("Dispatching auth ", auth)
        dispatch({
            type: 'LOGGED_IN',
            payload: auth
        })
    }

    function loggedOut(auth) {
        dispatch({
            type: 'LOGGED_OUT',
            payload: auth
        })
    }

    return (
        <AuthContext.Provider value={{
            auth: state.auth,
            filesList: state.filesList,
            loggedIn,
            loggedOut,
            dispatch
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const ContextConsumer = AuthContext.Consumer