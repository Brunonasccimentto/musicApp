import { FiSearch } from "react-icons/fi"
import style from "../styles/home.module.css"


export default function Find({Search}){

    return(
        <div className={style.content}>
                <FiSearch className={style.iconSearch} />
                <input type="search" placeholder=" O que você quer ouvir?" className={style.search} onChange={Search}></input>                               
        </div>
    )
}