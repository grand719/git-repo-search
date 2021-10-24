import React, {useState, useRef, useEffect} from "react";

import {FaSearch} from 'react-icons/fa'
import {TiDelete} from 'react-icons/ti'

import "./RepositoryFrom.css"

export const RepositoryForm = (props:any) => {
  const [repoName, setRepoName] = useState('')

    useEffect(() => {
        if(repoName.length === 0) {
            props.onSearchChange(repoName)
        }
        if(repoName.length >= 3) {
            
            props.onSearchChange(repoName)
        }
    }, [repoName])

    return (
        <div id="repository-form">
            <form>
                <div>
                    <input type="text" placeholder="Repository name" value={repoName} onChange={(e) => setRepoName(e.target.value)}/>
                    {repoName.length > 0 ? <TiDelete id="search" onClick={()=> setRepoName('')}/> : <FaSearch id="search"/>}
                    
                </div>
            </form>
        </div>
    )
}