import React ,{ useContext } from "react"
import style from "../styles/footer.module.css"

function Footer({music, player}){
    return(
        <div className={style.footer}>
            {music}
        </div>
    )

}

export default Footer