import axios from "axios"

export const api = axios.create({
    baseURL: "https://nodejs-login-production.up.railway.app/",
})

export const createUser = async (name, email, password)=>{
    return api.post("/user/register", {name, email, password})
}

export const login = async (email, password)=>{
    return api.post("/user/login", {email, password})
}

export const addMusic = async(email, music)=>{
    return api.post("user/update", {email, music})
}

export const deleteMusic = async(email, music)=>{
    return api.post("user/delete", {email, music})
}

export const getMusic = async(email)=>{
    return api.post("user/musics", {email})
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }
