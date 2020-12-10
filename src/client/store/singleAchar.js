import axios from 'axios'
import { bindActionCreators } from 'redux'

const GET_ACHAR = "GET_ACHAR"

const gotAchar = (singleAchar) => ({
    type: GET_ACHAR,
    singleAchar
})

export const fetchAchar = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`/api/achars/${id}`)
        dispatch(gotAchar(data))
    } catch (error) {
        console.error(error)
    }
}

export default function(state = {}, action){
    switch(action.type){
        case GET_ACHAR:
            return action.singleAchar
        default:
            return state
    }
}