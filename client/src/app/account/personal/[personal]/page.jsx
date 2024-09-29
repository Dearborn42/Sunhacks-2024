"use client";
import "../../../style/partials/_account.css"
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import {UserContext} from '../../../layout';
import { FaCoins } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { getFetch } from "@/Components/ServerFunctions";
const Account = ({params}) => {
    const {name, update} = useContext(UserContext);
    const [ userChanges, setChanges ] = useState({});
    const [ edit, setEdit ] = useState(false);

    useEffect(function(){
        if(name === ""){
            getFetch("accounts", "-personal", params.personal).then((result) => {
                if(result.success){
                    update(JSON.parse(result.user));
                    setChanges(JSON.parse(result.user));
                }else{
                    alert("Server error: reload page and log back in");
                }
            });
        }
    }, [userChanges])

    return (
        <>
        {name === "" ? 
            (<div>No account</div>) 
            : 
            (
                <div className="accountContainer">
                <div className="accountTop">
                    <div>Username: {params.personal} {userChanges.averageRating} <FaStar/></div>
                    <div>Credits: {userChanges.credits} <FaCoins/></div>
                    <button onClick={() => setEdit((prev) => !prev)}>Edit</button>
                </div>
                <div className="accountTop">
                    <div>Personal Info: {userChanges.email} - {userChanges.name}</div>
                </div>
                <hr />                
                <div style={{textAlign:"left"}}>Skills:</div>
                <div className="skillContainer">
                    {userChanges.skills.map((x)=>{
                        return(
                            <div>{x}</div>
                        );
                    })}
                </div>
                <div style={{textAlign:"left"}}>
                    Past Work:
                </div>
                <div className="worksContainer">
                    {userChanges.pastWorks.map((x)=>{
                        return(
                            <div>
                                <div className="help">
                                <div>{x[0]}</div>
                                <div>{x[2]}<FaStar/></div>
                                </div>
                         
                                <div>{x[1]}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            ) 
        }
            
        </>
    )
}

export default Account