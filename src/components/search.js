import { FiSearch } from "react-icons/fi"
import style from "../styles/home.module.css"
import { useState } from "react"


export default function Find({Search}){

    return(
        <div className={style.content}>
                <input type="search" placeholder="O que você quer ouvir?" className={style.search} onChange={Search}></input>
                <FiSearch className={style.iconSearch} />
        </div>
    )
}