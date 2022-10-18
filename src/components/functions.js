
import {addMusic, deleteMusic} from "../services/api"


 export async function likeMusic(e){

    let email = localStorage.getItem("user")
    let music = e.target.parentElement.offsetParent.children[0].children[1].children[0].innerText

    try {
    const response = await addMusic(email, music)
        alert("musica adicionado a sua biblioteca")
    } catch(err){
        alert(err.response.data)
    }

    let heart = e.target.parentElement.offsetParent.children[2].children[0]
    let heartFill = e.target.parentElement.offsetParent.children[2].children[1]

    if(heart.style.display == "inline-block"){
        heart.style.display = "none"
        heartFill.style.display = "inline-block"
    }
}

export async function unLikeMusic(e){

    let email = localStorage.getItem("user")
    let music = e.target.parentElement.parentElement.offsetParent.children[0].children[1].children[0].innerText

    try{
        const response = await deleteMusic(email, music)

    } catch(err){
        alert("musica deletada")
    }

    let heart = e.target.parentElement.parentElement.offsetParent.children[2].children[0]
    let heartFill = e.target.parentElement.parentElement.offsetParent.children[2].children[1]

    if(heart.style.display == "none"){
        heart.style.display = "inline-block"
        heartFill.style.display = "none"
    }
}

