import { useState, useEffect } from "react"
import { getMusic } from "../services/api"
import style from "../styles/home.module.css"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { deleteMusic, addMusic } from "../services/api"
import { useNavigate } from "react-router-dom"



export default function Biblioteca(){

    const [userList, setUserList] = useState()

    const navigate = useNavigate()

    useEffect(()=>{

        music()
    }, [])


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fd69c01475mshd7e920f5811189cp1cca0cjsn2932aed4c658',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    

    async function music(){

        const email = localStorage.getItem("user")

        const response = await getMusic(email)
        const array = response.data

        console.log(array)

        array.map((d)=>{

            fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${d}`, options)
            .then(response => response.json())
            .then(response => {

               
            })
            .catch(err => console.error(err));


        })
        

        const newData = array.map((d, index)=>
       
            <li key={index}>
                {d}
            </li>
        
        )

        setUserList(newData)
    }


    return(
        <div className="biblioteca">
            <h1> biblioteca </h1>
            <ul>
                {userList}
            </ul>
        </div>
    )
}