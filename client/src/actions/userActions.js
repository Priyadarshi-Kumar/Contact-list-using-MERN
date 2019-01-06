import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from './types'
import axios from 'axios';
export const getUsers = () => dispatch => {
    dispatch(setUsersLoading())
    axios
        .get('/api/users')
        .then(res => 
            dispatch({
                type: GET_USERS,
                payload: res.data
            }))
}

export const deleteUser = (id) => dispatch => {
    axios.delete(`api/users/${id}`)
        .then(res => dispatch(
            {
                type: DELETE_USER,
                payload: id
            }
        ))
}

export const addUser = (newUser) => dispatch => {
    axios
        .post('/api/users', newUser)
        .then( res => 
            dispatch({
                type: ADD_USER,
                payload: res.data
            }))
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    }
}