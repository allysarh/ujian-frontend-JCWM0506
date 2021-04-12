import { LOGIN_SUCCESS } from "../actions/type"


const INITIAL_STATE = {
    id: null,
    email: "",
    cart:[]
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("auth reducer", action.payload)
            delete action.payload.password
            console.log("auth reducer", action.payload)
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}