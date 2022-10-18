import { useState } from "react"
import style from "../styles/login.module.css"
import {createUser} from "../services/api"
import { useNavigate } from "react-router-dom"
import Logo from "./logo"

export default function Formregister(){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [invalid, setInvalid] = useState()
    const Navigate = useNavigate()

  async function submit(e){
        e.preventDefault()

        try{
            const response = await createUser(name, email, password)
            if(response.status === 200){
                Navigate("/login")
            } 
        } catch(err) {
            setInvalid(err.response.data)
        }
    }

    return(
        <div className={style.container}>
            <Logo/>
            <h1> Cadastro </h1>
        <form action="/user/register" method="POST">
                <label>
                    <span>Nome:</span>
                    <input type="name" placeholder="name" onChange={(e)=>{setName(e.target.value)}} required/>
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" placeholder="email"  onChange={(e)=>{setEmail(e.target.value)}} required/>
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password" placeholder="password"  onChange={(e)=>{setPassword(e.target.value)}} required/>
                </label>
                    <span className={style.invalid}>{invalid}</span>
                <label>
                    <button className={style.btnSign} onClick={submit} >Inscreva-se</button>
                </label>
        </form>
        </div>
    )
}