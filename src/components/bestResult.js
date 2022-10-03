import style from "../styles/home.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { BsHeart } from "react-icons/bs"


export default function BestResult(props){

    const navigate = useNavigate()

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
            

                    <audio controls src={props.preview} className={`${props.audioActive ? style.audioActive : ""}`}></audio>
                    <span onClick={props.ActiveMusic}> <BsHeart className={style.like}/> </span>
                    <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
                    <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
               
            </div>
        </li>

    </div>
    )
}