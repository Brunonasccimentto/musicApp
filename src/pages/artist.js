import { useEffect, useState } from "react"
import style from "../styles/artist.module.css"
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {likeMusic, unLikeMusic} from "../components/functions"

function Artist(){

    const [list, setList] = useState()
    const [nextLink, setNextLink] = useState()
    const navigate = useNavigate()
    const [photo, setPhoto] = useState()
    const [artistName, setArtistName] = useState()

    let toggleIcon = document.getElementsByTagName("span")
    let toggleAudios = document.querySelectorAll("audio")

    const [Active, setActive] = useState(false)

    const playAudio = function (e) {
      
        try {

            let audioSelector = toggleIcon
            audioSelector = e.target.parentElement.parentElement.children[1]

            let playSelector = toggleIcon
            playSelector = e.target.parentElement.parentElement.children[3]

            let pauseSelector = toggleIcon
            pauseSelector = e.target.parentElement.parentElement.children[4]


            if (playSelector.style.display === "inline-block") {
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


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fd69c01475mshd7e920f5811189cp1cca0cjsn2932aed4c658',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    useEffect(()=>{

        let artist = localStorage.getItem("artist")

        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, options)
        .then(res => res.json())
        .then(res => { 

            const data = res.data
    
                     const list = data.map(((d, index) => 

                     <li key={index} onClick={playAudio} className={`${Active ? style.active : ""}`}>
                     <div className={style.musicsListContent}>
                       
                         <img src={d.album.cover_small} ></img>
                         <div className={style.musicSpan}>
                            
                             <span> {d.title} </span>
                             <div className={style.spanNames}>
                                 
                                <span className={style.artistName} onClick={artistPage}>{d.artist.name}</span>
                                <span className={style.album}> {d.album.title} </span>
                             </div>
                         </div>
                        
                     </div>
                    
                     <audio controls src={d.preview}></audio>
                     <div>
                        <span onClick={likeMusic} style={{ display: "inline-block" }}> <BsHeart className={style.like} /> </span>
                        <span onClick={unLikeMusic} style={{ display: "none" }}> <BsHeartFill className={style.like}/> </span>
                     </div>
                     <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                     <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                 </li>
                       
                    ))
                    setList(list)
                    setNextLink(res.next)
                    setArtistName(localStorage.getItem("artist"))
                    setPhoto(res.data[0].artist.picture)
        })
        .catch(err => console.error(err));

    }, [])

    function next(){
        // fetch(`${nextLink}`, options)
        // .then(res => res.json())
        // .then(res => { 

        //     console.log(res.data)

        // })
        alert("cors")
    }

    function artistPage(e){
        localStorage.setItem("artist", e.target.innerText)
        navigate("/artist")
        window.location.reload(true)
    }
    
    return (

        <div className={`artist , ${style.content}`}>

            <div className={style.container}>

                <div className={style.artist}>
                    <img src={`${photo}`}></img>
                    <h1> {artistName} </h1>
                </div>

                <div className={style.result}>
                    <div className={style.musics}>
                        <h2> Músicas </h2>
                        <div className={style.musicsList}>
                            {list}
                            <div className={style.next}>
                                <span onClick={next}> Next » </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )

}

export default Artist