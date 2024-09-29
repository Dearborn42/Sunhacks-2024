"use client";
import "../style/partials/_account.css"
import React from 'react';
import { useContext } from 'react';
import {UserContext} from '../layout';
import { FaCoins } from "react-icons/fa6";

const Account = () => {
    const {name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating, update} = useContext(UserContext);
    return (
        <>
            <div className="accountContainer">
                <div className="accountTop">
                <div>{userName} {averageRating}</div>
                <div>{credits} <FaCoins/></div>
                <div>{email}</div>
                </div>
                
                <div></div>
                
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