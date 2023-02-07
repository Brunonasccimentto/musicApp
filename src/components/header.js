import style from "../styles/header.module.css"
import Menu from "./menuItens"

function Header({logo, itens, user}){
    return(
        <header className={style.header}>
            <h1> {logo} </h1>
            <Menu itens={itens} user={user}></Menu>
            
        </header>
    )
}

export default Header