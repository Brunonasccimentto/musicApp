import { useState, useEffect } from "react"
import { getMusic } from "../services/api"
import style from "../styles/biblioteca.module.css"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { deleteMusic, addMusic } from "../services/api"

export default function Biblioteca(){

    const [Active, setActive] = useState(false)
    const [userList, setUserList] = useState()
    const [userMusic, setuserMusic] = useState()

    const [preview, setPreview] = useState()
    

    useEffect(()=>{

        music()
    }, [music])


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fd69c01475mshd7e920f5811189cp1cca0cjsn2932aed4c658',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    let toggleIcon = document.getElementsByTagName("span")
    let toggleAudios = document.querySelectorAll("audio")
    
    const playAudio = function (e) {

        let thisMusic = e.target.parentElement.parentElement.innerText 

        
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${thisMusic}`, options)
        .then(res => res.json())
        .then(res => {

            try{
                setPreview(res.data[0].preview)
                setuserMusic(thisMusic)
            } catch(err){

            }
            
               
        })
        .catch(err => console.error(err));

        try {

            let audioSelector = toggleIcon
            audioSelector = e.target.parentElement.parentElement.children[1]

            let playSelector = toggleIcon
            playSelector = e.target.parentElement.parentElement.children[3]

            let pauseSelector = toggleIcon
            pauseSelector = e.target.parentElement.parentElement.children[4]


            if (playSelector.style.display == "inline-block") {
                playSelector.style.display = "none"
                pauseSelector.style.display = "inline-block"

                toggleAudios.forEach(item => {
                    item.pause()
                    audioSelector.play()
                    
                })

            } else {
                audioSelector.pause()
                playSelector.style.display = "inline-block"
                pauseSelector.style.display = "none"
            }
          
        
        } catch(error){
            console.log()
        }

        let list = document.querySelectorAll("li")

        list.forEach(item => {
            item.classList.remove(`${style.active}`)
            e.currentTarget.classList.add(`${style.active}`)
        })
    }

    async function likeMusic(e){

        let email = localStorage.getItem("user")
        let music = e.target.parentElement.offsetParent.innerText

        try {
            const response = await addMusic(email, music)
            let heart = e.target.parentElement.offsetParent.children[2].children[0]
            let heartFill = e.target.parentElement.offsetParent.children[2].children[1]

            if(heart.style.display == "inline-block"){
            heart.style.display = "none"
            heartFill.style.display = "inline-block"
        }

        } catch(err){
            alert(err.response.data)
        }
    }

    async function unLikeMusic(e){

        let email = localStorage.getItem("user")
        let music = e.target.parentElement.parentElement.offsetParent.innerText

        try{
            const response = await deleteMusic(email, music)
            let heart = e.target.parentElement.parentElement.offsetParent.children[2].children[0]
            let heartFill = e.target.parentElement.parentElement.offsetParent.children[2].children[1]
    
            if(heart.style.display == "none"){
                heart.style.display = "inline-block"
                heartFill.style.display = "none"
            }

        } catch(err){
            
        }
    } 

    async function music(){

        const email = localStorage.getItem("user")
        const response = await getMusic(email)
        const array = response.data
        
        const newData = array.map((d, index)=>
       
        <li key={index} onClick={playAudio} className={`${Active ? style.active : ""}`}>
        <div className={style.musicsListContent}>
          
            <div className={style.musicSpan}>
               
                <span> {d} </span>
                <div className={style.spanNames}>
                       
                </div>
            </div>
           
        </div>
       
        <audio controls src={preview}></audio>
        <div>
           <span onClick={likeMusic}  style={{ display: "none" }}> <BsHeart className={style.like} /> </span>
           <span onClick={unLikeMusic} style={{ display: "inline-block" }}> <BsHeartFill className={style.like}/> </span>
        </div>
        <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
        <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
    </li>
        )

        setUserList(newData)
    }


    return(
        <div className="biblioteca">

            <h2 className={style.h2}> Sua biblioteca </h2>
            <div className={style.musics}>
                
                <div className={style.musicsList}>
                    {userList}
                </div>
            </div>
        </div>
    )
}