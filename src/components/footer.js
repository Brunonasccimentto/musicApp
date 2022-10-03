import React ,{ useContext, useEffect, useState } from "react"
import style from "../styles/footer.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import {BsHeart, BsHeartFill} from "react-icons/bs"
import { addMusic, deleteMusic } from "../services/api"

function Footer({music, player}){

    const [current, setCurrent] = useState()
    const [newFooter, setNewFooter] = useState()

    useEffect(()=>{
        setCurrent(music)
        
    }, [music])

   async function likeMusic(){

        let email = localStorage.getItem("user")

        try {

        const response = await addMusic(email, music)
        console.log(response)

        } catch(err){
            alert(err.response.data)
        }

        let heart = document.getElementsByTagName("span")[40]
        let heartFill = document.getElementsByTagName("span")[41]

        if(heart.style.display == "inline-block"){
            heart.style.display = "none"
            heartFill.style.display = "inline-block"
        } else {
            heart.style.display = "inline-block"
            heartFill.style.display = "none"
        }
    }

    async function unLikeMusic(){

        let email = localStorage.getItem("user")

        try{
            const response = await deleteMusic(email, music)
            console.log(response)
        } catch(err){
            alert(err)
        }

        let heart = document.getElementsByTagName("span")[40]
        let heartFill = document.getElementsByTagName("span")[41]

        if(heart.style.display == "inline-block"){
            heart.style.display = "none"
            heartFill.style.display = "inline-block"
        } else {
            heart.style.display = "inline-block"
            heartFill.style.display = "none"
        }
    }

    return(

        <div className={style.footer}>

            {current ?

    <div className={style.content}>

    <span onClick={likeMusic} style={{ display: "inline-block" }}> <BsHeart className={style.like} /> </span>
    <span onClick={unLikeMusic} style={{ display: "none" }}> <BsHeartFill className={style.like}/> </span>
    
    <span className={style.name}> {music} </span>
    
</div>: ""}

        </div>
    )

}

export default Footer