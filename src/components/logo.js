import nuzzer from "../images/nuzzer.png"
import style from "../styles/header.module.css"

export default function Logo(){
    return(
        <img src={nuzzer} alt="Nuzzer logo" className={style.logo}></img>
    )
}