import style from "../styles/home.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { addMusic, deleteMusic } from "../services/api"

export default function BestResult(props){

    const navigate = useNavigate()

    async function likeMusic(e){

        let email = localStorage.getItem("user")
        let music = e.target.parentElement.offsetParent.innerText

        try {
        const response = await addMusic(email, music)

        } catch(err){
            alert(err.response.data)
        }

        let heart = e.target.parentElement.offsetParent.children[1].children[2].children[0]
        let heartFill = e.target.parentElement.offsetParent.children[1].children[2].children[1]

        if(heart.style.display == "inline-block"){
            heart.style.display = "none"
            heartFill.style.display = "inline-block"
        }
    }

    async function unLikeMusic(e){

        let email = localStorage.getItem("user")
        let music = e.target.parentElement.parentElement.offsetParent.innerText

        try{
            const response = await deleteMusic(email, music)

        } catch(err){
            alert(err)
        }

        let heart = e.target.parentElement.parentElement.offsetParent.children[1].children[2].children[0]
        let heartFill = e.target.parentElement.parentElement.offsetParent.children[1].children[2].children[1]

        if(heart.style.display == "none"){
            heart.style.display = "inline-block"
            heartFill.style.display = "none"
        }
    }

    function artistPage(e){
        localStorage.setItem("artist", e.target.innerText)
        navigate("/artist")
    }

    //Não sei pq mas o props não estava funcionando com essa função

    return(
    <div className={style.bestResult}>
        <h2> Melhor resultado </h2>

        <li onClick={props.playAudio} className={`${props.Active ? style.active : ""}, ${style.bestResultContainer}`}>
            
                <img className={style.img} src={props.img} alt="foto do artista"></img>

            <div className={style.flow}>
       
                <div className={style.musicSpan}>
                   <span> {props.title} </span> 

                    <div className={style.spanNames}>
                        <span className={style.artistName} onClick={artistPage}>{props.artist}</span>
                        <span className={style.album} onClick={props.albumPage}>  {props.album} </span>
                    </div>
                   
                </div>

                    <audio controls src={props.preview}></audio>
                    <div className={style.likeBtns}>
                        <span onClick={likeMusic} style={{ display: "inline-block" }}> <BsHeart className={style.like} /> </span>
                        <span onClick={unLikeMusic} style={{ display: "none" }}> <BsHeartFill className={style.like}/> </span>
                    </div>
                    <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                    <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
               
            </div>
        </li>

    </div>
    )
}