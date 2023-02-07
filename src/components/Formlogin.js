import { Link, useNavigate } from "react-router-dom"
import style from "../styles/login.module.css"
import { login, setAuthToken } from "../services/api"
import { useState } from "react"
import Logo from "./logo"

export default function Formlogin(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [invalid, setInvalid] = useState()
    const Navigate = useNavigate()

    async function submit(e) {
        e.preventDefault()

        try{
        const response = await login(email, password)

        if (response.status === 200) {
            localStorage.setItem("user", JSON.parse(response.config.data).email)
            let token = localStorage.setItem("token", response.data)
            
            setAuthToken(token)
            Navigate("/musicApp")
            window.location.reload(true)
        }} catch(err){
            setInvalid("server fora do ar")
        }
    }

    return(
        <div className={style.container}>
            <Logo/>
            <h1> Login </h1>
            <form method="POST">
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                        <label className={style.invalid}>{invalid}</label>
                    <div>
                        <button type="submit" onClick={submit}>Entrar</button>
                    </div>
                                 
            </form>

            <Link to={"/register"} className={style.sign}><span>inscreva-se ⇨ </span></Link>
            </div>
    )
}