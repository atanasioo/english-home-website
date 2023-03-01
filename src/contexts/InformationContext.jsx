import React from 'react'
import { createContext, useEffect, useState } from "react"
import _axios from "../axios";
import buildLink from "../urls";

export const InformationContext = createContext()

export const InformationProvider = ({ children }) => {
    const [data, setData]= useState([]);


    async function getInfo(){
         await _axios
        .get(buildLink("information", undefined, window.innerWidth))
        .then((response)=>{
            const data = response.data;
            if(data.success === true){
               setData(data.data);
            } 
        })
    }


    useEffect(()=> {
        getInfo()
    },[])

    return (
        <InformationContext.Provider value={data}>
            {children}
        </InformationContext.Provider>
    )
}