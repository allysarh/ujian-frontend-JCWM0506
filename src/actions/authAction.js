import { LOGIN_SUCCESS, LOGOUT } from "./type"

export const authLogin = (data) =>{
    console.log("auth login", data)
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const authLogout = () => {
    localStorage.removeItem("tkn_id")
    return {
        type: LOGOUT,
    }
}


// menyimpoan data untuk keep login
export const keepLogin = (data) => {
    return {
        // ngambil data dari tipe data yang authLogin
        type: LOGIN_SUCCESS,
        payload: data
    }
}