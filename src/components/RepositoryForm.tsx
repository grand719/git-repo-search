import React, {useState, useEffect} from "react";

import {FaSearch} from 'react-icons/fa'
import {TiDelete} from 'react-icons/ti'

import "./RepositoryFrom.css"

export const RepositoryForm = (props:any) => {
    let typingTimer: any;
    const [repoName, setRepoName] = useState('')


    useEffect(()=>{
        const search = window.location.search
        const searchValue = new URLSearchParams(search).get('repository')
        if(searchValue) {
            setRepoName(searchValue)
        }else {
            setRepoName('')
        }

    }, [])

    const onRepoNameChange = (repoNameValue: string) => {
        setRepoName(repoNameValue)   
    }

    const addRepoNameToUrl = (repo: string) => {
        const url = new URL(window.location.toString())
        url.searchParams.set("repository", repo)
        window.history.pushState({},'', url)
    }

    const removeRepoNameFromUrl = () => {
        const url = new URL(window.location.toString())
        url.searchParams.delete("repository")
        window.history.pushState({},'', url)
    }

    const finishTyping = () => {
        if(repoName.length >= 3 || repoName.length === 0) {
            props.onSearchChange(repoName)
            addRepoNameToUrl(repoName)
        }

    }
    
    const deleteClickHandler = () => {
        setRepoName('')
        props.onSearchChange('')
        removeRepoNameFromUrl()
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
                    {repoName.length > 0 ? <TiDelete id="search" onClick={deleteClickHandler}/> : <FaSearch id="search"/>}
                    
                </div>
            </form>
        </div>
    )
}