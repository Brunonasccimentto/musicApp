import style from "../styles/home.module.css"
import { FiSearch, FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { useEffect, useState } from "react"
import { Link, Routes, Route } from "react-router-dom"
import Album from "../pages/album"
import Biblioteca from "../pages/biblioteca"
import { Dispatch, useDispatch } from "react-redux"
import Find from "./search"
import BestResult from "./bestResult"

function Container(){

    const dispatch = useDispatch()

    const [img, setImg] = useState()
    const [name, setName] = useState()
    const [preview, setPreview] = useState()
    const [artist, setArtist] = useState()
    const [album, setAlbum] = useState()

    const [nameMusic1, setnameMusic1] = useState()
    const [nameMusic2, setnameMusic2] = useState()
    const [nameMusic3, setnameMusic3] = useState()
    const [nameMusic4, setnameMusic4] = useState()

    const [musicImg1, setMusicImg1] = useState()
    const [musicImg2, setMusicImg2] = useState()
    const [musicImg3, setMusicImg3] = useState()
    const [musicImg4, setMusicImg4] = useState()

    const [artistName1, setArtistName1] = useState()
    const [artistName2, setArtistName2] = useState()
    const [artistName3, setArtistName3] = useState()
    const [artistName4, setArtistName4] = useState()

    const [musicPreview1, setMusicPreview1] = useState()
    const [musicPreview2, setMusicPreview2] = useState()
    const [musicPreview3, setMusicPreview3] = useState()
    const [musicPreview4, setMusicPreview4] = useState()

    const [album1, setAlbum1] = useState()
    const [album2, setAlbum2] = useState()
    const [album3, setAlbum3] = useState()
    const [album4, setAlbum4] = useState()

    const [musicAlbum, setmusicAlbum] = useState()
    const [albumName, setAlbumName] = useState()

    let toggleIcon = document.getElementsByTagName("span")
    let toggleAudios = document.querySelectorAll("audio")

    const [Active, setActive] = useState(false)
    const [audioActive, setaudioActive] = useState(false)

    const playAudio = function (e) {

        
        try {

            let audioSelector = toggleIcon
            audioSelector = e.target.parentElement.parentElement.children[1]

            let playSelector = toggleIcon
            playSelector = e.target.parentElement.parentElement.children[2]

            let pauseSelector = toggleIcon
            pauseSelector = e.target.parentElement.parentElement.children[3]


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

           
            
        } catch (err) {

            let audioSelector = toggleIcon
            audioSelector = e.target.parentElement.parentElement.offsetParent.children[1]

            let playSelector = toggleIcon
            playSelector = e.target.parentElement.parentElement.offsetParent.children[2]

            let pauseSelector = toggleIcon
            pauseSelector = e.target.parentElement.parentElement.offsetParent.children[3]

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

                setnameMusic1(res.data[1].title)
                setnameMusic2(res.data[2].title)
                setnameMusic3(res.data[3].title)
                setnameMusic4(res.data[4].title)

                setMusicImg1(res.data[1].album.cover_small)
                setMusicImg2(res.data[2].album.cover_small)
                setMusicImg3(res.data[3].album.cover_small)
                setMusicImg4(res.data[4].album.cover_small)

                setArtistName1(res.data[1].artist.name)
                setArtistName2(res.data[2].artist.name)
                setArtistName3(res.data[3].artist.name)
                setArtistName4(res.data[4].artist.name)

                setMusicPreview1(res.data[1].preview)
                setMusicPreview2(res.data[2].preview)
                setMusicPreview3(res.data[3].preview)
                setMusicPreview4(res.data[4].preview)

                setAlbum1(res.data[1].album.title)
                setAlbum2(res.data[2].album.title)
                setAlbum3(res.data[3].album.title)
                setAlbum4(res.data[4].album.title)


            })
            .catch(err => console.error(err));

        let container = document.getElementById("container")
        if (e.target.value != "") {
            container.style.display = "block"
        } else {
            container.style.display = "none"
        }

    }

    // const SAVED_ITENS = "savedItens"

    // useEffect(()=>{
    //     let savedItens = JSON.stringify(localStorage.getItem(SAVED_ITENS))
    //     if(savedItens) {
    //         setItens(savedItens)
    //     }
    //    }, [])

    //    useEffect(()=>{
    //     localStorage.setItem(SAVED_ITENS, JSON.stringify(itens))
    //    }, [itens])

    const albumPage = function (e){
      
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${e.target.innerText}`, options)
        .then(res => res.json())
        .then(res => {


                console.log(res.data[0].album.id)

                let id = res.data[0].album.id

                fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, options)
                    .then(res => res.json())
                    .then(res => {

                        const data = res.tracks.data
                        console.log(data)

                        const listItems = data.map((d, index) => 

                        <li key={index} onClick={playAudio} className={`${Active ? style.active : ""} , ${style.liAlbum}`}>
                            <div className={style.musicsListContent}>
                                <div className={style.musicSpan}>
                                    
                                    <span>  {d.title}  </span>
                                    <audio src={d.preview}></audio>
    
                                    
                                         <FiPlayCircle className={style.btnToggle} /> 
                                         <FiPauseCircle className={style.btnToggle} /> 

        
                                    
                                </div>
                            </div>
                        </li>
                        
                        
                    );

                    console.log(listItems)
                    setmusicAlbum(listItems)

                    } 
                    )
                    .catch(err => console.error(err));
               
                setAlbumName(e.target.innerText)
                
                
               
            
                
                // console.log(data)
            })
            .catch(err => console.error(err));
        
    }
    
    return (

        <div className="home">

            <Find Search={Search}/>

            <div id="container" className={style.container} style={{ display: "none" }}>
                <div className={style.result}>
                    
                    <BestResult playAudio={playAudio} Active={Active} img={img} name={name} artist={artist} albumPage={albumPage} album={album} preview={preview} audioActive={audioActive}/>

                    <div className={style.musics}>
                        <h2> Músicas </h2>
                        <div className={style.musicsList}>

                            <li onClick={playAudio} className={`${Active ? style.active : ""}`}>
                                <div className={style.musicsListContent}>
                                    <img src={musicImg1} ></img>
                                    <div className={style.musicSpan}>
                                       
                                        <span>{nameMusic1}</span>
                                        <div className={style.spanNames}>
                                            
                                            <span className={style.artistName}>{artistName1}</span>
                                            <span className={style.album} onClick={albumPage}> {album1} </span>
                                        </div>
                                    </div>
                                   
                                </div>

                                <audio controls src={musicPreview1}></audio>
                                <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                                <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                            </li>

                            <li onClick={playAudio} className={`${Active ? style.active : ""}`}>
                                <div className={style.musicsListContent}>
                                <img src={musicImg2} ></img>
                                    <div className={style.musicSpan}>
                                        
                                        <span>{nameMusic2}</span>
                                        <div className={style.spanNames}>
                                            
                                            <span className={style.artistName}>{artistName2}</span>
                                            <span className={style.album} onClick={albumPage}>{album2} </span>
                                        </div>
                                    </div>
                                    
                                </div>

                                <audio controls src={musicPreview2}> </audio>
                                <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                                <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                            </li>

                            <li onClick={playAudio} className={`${Active ? style.active : ""}`}>
                                <div className={style.musicsListContent}>
                                    <img src={musicImg3} ></img>
                                    <div className={style.musicSpan}>
                                    <span>{nameMusic3}</span>
                                        <div className={style.spanNames}>
                                            
                                            <span className={style.artistName}>{artistName3}</span>
                                            <span className={style.album} onClick={albumPage}>{album3} </span>
                                        </div>
                                    </div>
                                    
                                </div>

                                <audio controls src={musicPreview3}></audio>
                                <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                                <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                            </li>

                            <li onClick={playAudio} className={`${Active ? style.active : ""}`}>
                                <div className={style.musicsListContent}>

                                    <img src={musicImg4} ></img>
                                    <div className={style.musicSpan}>
                                        
                                        <span>{nameMusic4}</span>
                                        <div className={style.spanNames}>
                                            
                                            <span className={style.artistName}>{artistName4}</span>
                                            <span className={style.album} onClick={albumPage}>{album4} </span>
                                        </div>
                                    </div>
                                    
                                </div>

                                <audio controls src={musicPreview4}></audio>
                                <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                                <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
                            </li>

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

            

        </div>

        


    )

}

export default Container

