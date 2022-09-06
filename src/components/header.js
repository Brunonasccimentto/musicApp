import style from "../styles/header.module.css"
import Menu from "./menuItens"

function Header({logo, itens}){
    return(
        <header className={style.header}>
            <h1> {logo} </h1>
            <Menu itens={itens}></Menu>
            
        </header>
    )
}

export default Header