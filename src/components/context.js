import { useState, createContext } from "react";
import Artist from "../pages/artist";
import Container from "./container";

export const AudioContext = createContext()
export function AudioProvider(props){

   

   

    return(
        
        <AudioContext.Provider>
            {props.children}
        </AudioContext.Provider>
        
    )
}