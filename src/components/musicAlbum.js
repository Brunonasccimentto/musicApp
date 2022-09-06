import { useSelector } from "react-redux";


function MusicAlbum(){

    const musics = useSelector((state) => {return state})

    return(
        <div>
            <p> {musics} </p>
        </div>
    )
}

export default MusicAlbum