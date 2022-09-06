import style from "../styles/home.module.css"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import {Link} from "react-router-dom"


export default function BestResult(props){
    return(
    <div className={style.bestResult}>
        <h2> Melhor resultado </h2>

        <li onClick={props.playAudio} className={`${props.Active ? style.active : ""}, ${style.bestResultContainer}`}>
            <figure>
                <img className={style.img} src={props.img} alt="foto do artista"></img>
                <figcaption>{props.name}</figcaption>
                <span className={style.artistName}>{props.artist}</span>
                <span className={style.album} onClick={props.albumPage}> <Link to={"album"}> {props.album} </Link> </span>
            </figure>

            <audio controls src={props.preview} className={`${props.audioActive ? style.audioActive : ""}`}></audio>
            <span style={{ display: "inline-block" }}>  <FiPlayCircle className={style.btnToggle} /> </span>
            <span style={{ display: "none" }}> <FiPauseCircle className={style.btnToggle} /> </span>
        </li>

    </div>
    )
}