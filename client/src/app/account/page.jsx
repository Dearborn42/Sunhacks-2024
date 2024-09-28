"use client";
import "../style/partials/_account.css"
import React from 'react';
import { useContext } from 'react';
import {UserContext} from '../layout';

const Account = () => {
    const {name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating, update} = useContext(UserContext);
    console.log({name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating})
    return (
        <>
            <div className="accountContainer">
                <div>{userName}</div>
                <div>Rating: {averageRating}</div>
                <div>{name}</div>
                <div>{email}</div>
                <div>Skills:</div>
                <div>
                    {userSkills.map((x)=>{
                        return(
                            <div>{x}</div>
                        );
                    })}
                </div>
                <div>Credits:</div>
                
            </div>
        </>
    )
}

export default Account