import React, { createContext, useReducer } from 'react'
import users from '../data/Users'

const InitialState = { users }
const UsersContext = createContext({})

const actions = {
    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    createUser(state, action){
        const user = action.payload;
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user]
        }
    },
    deleteUser(state, action) {
        const user = action.payload
        return {
            ...state,
            users: state.users.filter(u => u.id !== user.id)
        }
    }
}

export const UserProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, InitialState)

    return (
        <UsersContext.Provider value={{
            state, dispatch
        }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext