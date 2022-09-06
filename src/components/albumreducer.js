import Login from "../pages/login"
import MusicList from "./musicList"


export default function albumReducer(state = "", action){

    switch (action.type) {
        case "SETALBUNS":
            return <MusicList/>
                       
        default:
            return state
}
}