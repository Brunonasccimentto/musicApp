import axios from "axios"

export const api = axios.create({
    baseURL: "https://localhost:3001",
})

export const createUser = async (name, email, password)=>{
    return api.post("/user/register", {name, email, password})
}

export const login = async (email, password)=>{
    return api.post("/user/login", {email, password})
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }
