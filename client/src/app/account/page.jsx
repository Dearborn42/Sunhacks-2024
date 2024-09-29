"use client";
import "../style/partials/_account.css"
import React from 'react';
import { useContext } from 'react';
import {UserContext} from '../layout';
import { FaCoins } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Navbar from "@/Components/Navbar";
const Account = () => {
    const {name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating, update} = useContext(UserContext);
    return (
        <>
            <Navbar></Navbar>

            <div className="accountContainer">
                <div className="accountTop">
                    <div>Username: {userName} {averageRating} <FaStar/></div>
                    <div>Credits: {credits} <FaCoins/></div>
                </div>
                <div className="accountTop">
                    <div>Personal Info: {email} - {name}</div>
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
                    {pastWorks.length>0?(
                        pastWorks.map((x)=>{
                            return(
                                <div>
                                    <div className="help">
                                    <div>{x[0]}</div>
                                    <div>{x[2]}<FaStar/></div>
                                    </div>
                             
                                    <div>{x[1]}</div>
                                </div>
                            );
                        })
                    ):(
                        <div>No past works.</div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default Account