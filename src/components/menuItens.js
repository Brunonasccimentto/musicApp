import { Link } from "react-router-dom"
import style from "../styles/header.module.css"
import { FiLogIn, FiHome, FiList} from "react-icons/fi"
import React, { useState } from "react"
import Logo from "./logo"

function Menu({itens}){

    const [switchToggle, setswitchToggle] = useState(false)

    const toggleSwitch = function (){
        switchToggle ? setswitchToggle(false) : setswitchToggle(true)
    }

    const [Active, setActive] = useState(false)

    const toggleActive = function(e){
    
    let list = document.querySelectorAll("li")

    list.forEach(item => {
        item.classList.remove(`${style.active}`)
        
    });

    let current = e.currentTarget.classList.toggle(`${style.active}`)
    
    }

    return(
        <div className={`${style.navigation} ${switchToggle ? style.open : ""}`}>
            <div className={style.menuToggle} onClick={toggleSwitch}> 
                <span className={style.logo}> <Logo/> </span>
             </div>

                <ul>
                    
                    <li className={`${Active ? style.active : ""}, ${style.active}`} onClick={toggleActive}>
                        <Link to={"/"} className={style.links} >  
                            <span> <FiHome className={style.icons} /> </span>
                            <span className={style.item}> {itens[0]}  </span>
                        </Link>
                    </li>

                    <li className={Active ? style.active : ""} onClick={toggleActive}> 
                        <Link to={"biblioteca"} className={style.links}>  
                            <span><FiList className={style.icons} /> </span>
                            <span className={style.item}> {itens[1]}</span> 
                        </Link>
                    </li>

                    <li className={Active ? style.active : ""} onClick={toggleActive}>
                        <Link to={"login"} className={style.links}> 
                            <span><FiLogIn className={style.icons} /> </span>
                            <span className={style.item}> {itens[2]} </span> 
                        </Link>
                    </li>

                </ul>

            
           

           
                
        </div>

        
        
    )
    
}

export default Menu