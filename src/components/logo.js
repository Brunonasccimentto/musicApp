import nuzzer from "../images/nuzzer.png"
import style from "../styles/header.module.css"
import style2 from "../styles/login.module.css"

export default function Logo(){
    return(
        <img src={nuzzer} alt="Nuzzer logo" className={style2.logo}></img>
    )
}