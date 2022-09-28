import style from "../styles/home.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { createContext, useEffect, useState} from "react"
import {BsHeart, BsHeartFill} from "react-icons/bs"
import Find from "./search"
import BestResult from "./bestResult"
import { Link, useNavigate } from "react-router-dom"
import logoNuzzer from "../images/logo.png"

    
function Container({ActiveMusic, player, hash}){

    const [img, setImg] = useState()
    const [name, setName] = useState()
    const [preview, setPreview] = useState()
    const [artist, setArtist] = useState()
    const [album, setAlbum] = useState()

    const [musicAlbum, setmusicAlbum] = useState()
    const [albumName, setAlbumName] = useState()
    const [list, setList] = useState()
    const [like, setLike] = useState([])

    const navigate = useNavigate()

    let toggleIcon = document.getElementsByTagName("span")
    let toggleAudios = document.querySelectorAll("audio")

    const [Active, setActive] = useState(false)
    const [audioActive, setaudioActive] = useState(false)

    
    const playAudio = function (e) {
      
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

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fd69c01475mshd7e920f5811189cp1cca0cjsn2932aed4c658',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    const Search = function (e) {


        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${e.target.value}`, options)
            .then(res => res.json())
            .then(res => {

                setImg(res.data[0].album.cover)
                setName(res.data[0].title)
                setArtist(res.data[0].artist.name)
                setAlbum(res.data[0].album.title)
                setPreview(res.data[0].preview)

                const data = res.data.slice(1, 5)
        
                         const list = data.map(((d, index) => 

                         <li key={index} onClick={playAudio} className={`${Active ? style.active : ""}`}>
                         <div className={style.musicsListContent}>
                           
                             <img src={d.album.cover_small} ></img>
                             <div className={style.musicSpan}>
                                
                                 <span> {d.title} </span>
                                 <div className={style.spanNames}>
                                     
                                    <span className={style.artistName} onClick={artistPage}>{d.artist.name}</span>
                                    <span className={style.album} onClick={albumPage}> {d.album.title} </span>
                                 </div>
                             </div>
                            
                         </div>
                        
                         <audio controls src={d.preview}></audio>
                         <span onClick={ActiveMusic}> <BsHeart className={style.like}/> </span>
                         <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                         <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                     </li>
                                
                        ))
                        setList(list)
              
            })
            .catch(err => console.error(err));

        let container = document.getElementById("container")
        if (e.target.value != "") {
            container.style.display = "block"
        } else {
            container.style.display = "none"
        }

    }

     function albumPage(e){
      
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${e.target.innerText}`, options)
        .then(res => res.json())
        .then(res => {

                console.log(e.target.innerText)

                let id = res.data[0].album.id

                fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, options)
                    .then(res => res.json())
                    .then(res => {

                        const data = res.tracks.data

                        const listItems = data.map((d, index) => 

                        <li key={index} onClick={playAudio} className={`${Active ? style.active : ""}`}>
                        <div className={style.albumList}>
                          
                            <img src={d.album.cover_small} ></img>
                           
                            <div className={style.musicSpan}>
                               
                                <span> {d.title} </span>
                                <div className={style.spanNames}>
                                    
                                    <span className={style.artistName}>{d.artist.name}</span>
                                    <span className={style.album}> {d.album.title} </span>
                                </div>
                            </div>
                            </div> 
                        

                        <audio controls src={d.preview}></audio>
                        <span onClick={ActiveMusic}> <BsHeart className={style.like}/> </span>
                        <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                        <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                        
                    </li>
                        
                    );
                    setmusicAlbum(listItems)

                    } 
                    )
                    .catch(err => console.error(err));
               
                setAlbumName(e.target.innerText)
            })
            .catch(err => console.error(err));
    }

    function artistPage(e){
        localStorage.setItem("artist", e.target.innerText)
        console.log(e)
        navigate("/artist")
    }

    return (

        
        <div className="home">

            {hash ?
                <div>
                    <Find Search={Search} />

                    <div id="container" className={style.container} style={{ display: "none" }}>
                        <div className={style.result}>

                            <BestResult playAudio={playAudio} Active={Active} img={img} name={name} artist={artist} albumPage={albumPage} album={album} preview={preview} audioActive={audioActive} />

                            <div className={style.musics}>
                                <h2> Músicas </h2>
                                <div className={style.musicsList}>
                                    {list}
                                </div>
                            </div>
                        </div>

                        <div className={style.albuns}>
                            <h2> {albumName} </h2>
                            <ul className={style.listAlbum}>
                                {musicAlbum}
                            </ul>
                        </div>
                    </div>
                </div> : 

                <div className={style.denied}>
                    <img src={logoNuzzer} alt="nuzzer logo"></img>
                <h1>
                    Faça o login ter acesso ao Nuzzer
                </h1>
                <span> Cadastre-se e tenha vários benefícios </span>
            </div>}

        </div>
    )
}

export default Container

