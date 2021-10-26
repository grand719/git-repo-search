import React from 'react';
import {DiMitlicence} from 'react-icons/di'
import {CgSmileNone} from 'react-icons/cg'

import './Repository.css'

export const Repository = (props: any) => {
    return (
        <div className="repository" ref={props.innerRef}>
            <div className="repository-props">
            <h2 className="repository-title">{props.name.toUpperCase()}</h2>
            <h4><a href={props.url} target="_blank">{props.url}</a></h4>
            <p className="description"><strong>Description: </strong>  {props.description}</p>
            <div className="repository-license--wrapper"> <h3>License: </h3>{props.licenseInfo != null ? <DiMitlicence className="repository-license" /> : <CgSmileNone className="repository-license" />}</div>
            </div>
            <div className="repository-owner">
                <h2><img src={props.owner.avatarUrl}  alt="owner-avatar" /><a href={props.owner.url} target="_blank">{props.owner.login}</a></h2>
                
            </div>
            
            
        </div>
    )
}