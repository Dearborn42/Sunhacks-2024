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
                    <div>{userName} {averageRating} </div>
                    <div>{credits} <FaCoins/></div>
                </div>
                <div className="accountTop">
                    <div>{email} - {name}</div>
                </div>
                <hr />                
                <div style={{textAlign:"left"}}>Skills:</div>
                <div className="skillContainer">
                    {userSkills.map((x)=>{
                        return(
                            <div>{x}</div>
                        );
                    })}
                </div>
                <div style={{textAlign:"left"}}>
                    Past Work:
                </div>
                <div className="worksContainer">
                    {pastWorks.map((x)=>{
                        return(
                            <div>
                                <div>{x[0]}{x[2]}</div>
                                <div>{x[1]}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Account