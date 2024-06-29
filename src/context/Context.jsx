import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()


const ContextProvider = props => {
    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState('')

    const onSent = async (prompt)=>{
        setResultData("")
        setLoading(true) 
        setShowResult(true)
        let res;
        if(prompt !== undefined){
            res = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            res = await run(input)
        }
     
        const resArray = res.split("**")
        let newArray = ""
        for(let i=0; i<resArray.length; i++){
            if(i==0 || i%2 !== 1){
                newArray += resArray[i];
            }
            else{
                newArray +='<b class="boldd">'+resArray[i]+"</b>"
            }
        }
        let newArray2 = newArray.split("*").join("</br>")
        let newResponse = newArray2.split(" ")
        for(let i=0; i<newResponse.length; i++){
            let word = newResponse[i]
            delayPara(i, word+" ")
        }
        setLoading(false)
        setInput("")
    }

    const delayPara = (index, nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+=nextWord)
        }, 75 * index)
    }

    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    } 

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider