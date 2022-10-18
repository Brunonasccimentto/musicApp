import style from "../styles/home.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { useState } from "react"
import {BsHeart, BsHeartFill} from "react-icons/bs"
import Find from "./search"
import BestResult from "./bestResult"
import { useNavigate } from "react-router-dom"
import logoNuzzer from "../images/logo.png"
import {likeMusic, unLikeMusic, artistPage} from "./functions"
 
function Container({hash}){

    const [img, setImg] = useState()
    const [title, setTitle] = useState()
    const [preview, setPreview] = useState()
    const [artist, setArtist] = useState()
    const [album, setAlbum] = useState()
    const [list, setList] = useState()

    const [musicAlbum, setmusicAlbum] = useState()
    const [albumName, setAlbumName] = useState()
    const [AlbumImg, setAlbumImg] = useState()
    const [release, setRelease] = useState()
    const [type, setType] = useState()

    const [Active, setActive] = useState(false)

    const navigate = useNavigate()

    let toggleIcon = document.getElementsByTagName("span")
    let toggleAudios = document.querySelectorAll("audio")

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
                setTitle(res.data[0].title)
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
                         <div>
                            <span onClick={likeMusic} style={{ display: "inline-block" }}> <BsHeart className={style.like} /> </span>
                            <span onClick={unLikeMusic} style={{ display: "none" }}> <BsHeartFill className={style.like}/> </span>
                         </div>
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

                let id = res.data[0].album.id

                fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, options)
                    .then(res => res.json())
                    .then(res => {

                        const data = res.tracks.data

                        const listItems = data.map((d, index) => 

                        <li key={index} onClick={playAudio} className={`${Active ? style.active : ""}`}>
                        <div className={style.albumList}>
                          
                            <span></span>
                            <div className={style.musicSpan}>
                               
                                <span> {d.title} </span>
                                <div className={style.spanNames}>
                                    
                                    <span className={style.artistName}>{d.artist.name}</span>
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
                        
                    );
                    setmusicAlbum(listItems)
                    setAlbumImg(res.cover)
                    setRelease(res.release_date)
                    setType(res.record_type)

                    } 
                    )
                    .catch(err => console.error(err));
               
                setAlbumName(e.target.innerText)
            })
            .catch(err => console.error(err));
    }

    function artistPage(e){
        localStorage.setItem("artist", e.target.innerText)
        navigate("/artist")
        
    }

    return (

        <div className="home">

            {hash ?
                <div>
                    <Find Search={Search} />

                    <div id="container" className={style.container} style={{ display: "none" }}>
                        <div className={style.result}>

                            <BestResult playAudio={playAudio} Active={Active} img={img} title={title} artist={artist} albumPage={albumPage} album={album} preview={preview}/>

                            <div className={style.musics}>
                                <h2> Músicas </h2>
                                <div className={style.musicsList}>
                                    {list}
                                </div>
                            </div>
                        </div>

                        {musicAlbum ?
                        <div className={style.albuns}>
                            <div className={style.albumHeader}>
                                <img src={AlbumImg}></img>
                                <div> 
                                    <h2> {albumName} </h2>
                                    <span className={style.info}> {type} lançado em: {release} </span>
                                </div>
                            </div>
                            <ul className={style.listAlbum}>
                                {musicAlbum}
                            </ul>
                        </div> : "" }
                    </div>
                </div> : 

                <div className={style.denied}>
                    <img src={logoNuzzer} alt="nuzzer logo"></img>
                <h1>
                    Faça o login ter acesso ao Nuzzer
                </h1>
                <span> Cadastre-se e tenha vários benefícios </span>
                <h6> criado pro Bruno Rodrigues</h6> 
            </div>
                   
                    }

        </div>
    )
}

export default Container

