import React, {useState, useRef, useEffect} from "react";

import {FaSearch} from 'react-icons/fa'
import {TiDelete} from 'react-icons/ti'

import "./RepositoryFrom.css"

export const RepositoryForm = (props:any) => {
    let typingTimer: any;
    const [repoName, setRepoName] = useState('')

    const onRepoNameChange = (repoNameValue: string) => {
        setRepoName(repoNameValue)   
    }

    
    const finishTyping = () => {
        props.onSearchChange(repoName)
    }
    
    const deleteClickHandeler = () => {
        setRepoName('')
        props.onSearchChange('')
    }

    const onKeyUpHandler = () => {
        clearTimeout(typingTimer)
        typingTimer = setTimeout(finishTyping, 200)
    }

    const onKeyDownHandler = () => {
        clearTimeout(typingTimer)
    }



    return (
        <div id="repository-form">
            <form>
                <div>
                    <input type="text" placeholder="Repository name" value={repoName} onKeyUp={onKeyUpHandler} onKeyDown={onKeyDownHandler} onChange={(e) => onRepoNameChange(e.target.value)}/>
                    {repoName.length > 0 ? <TiDelete id="search" onClick={deleteClickHandeler}/> : <FaSearch id="search"/>}
                    
                </div>
            </form>
        </div>
    )
}