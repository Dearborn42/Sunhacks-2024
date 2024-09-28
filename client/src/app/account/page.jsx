"use client";
import "../style/partials/_account.css"
import React from 'react';
import { useContext } from 'react';
const Account = () => {
    const account = [2,2,2,2,2];
    return (
        <>
            <div className="accountContainer">
                <div>Geeble</div>
                <div>Rating</div>
                <div>Jonathan Lam</div>
                <div>jlam@gmail.com</div>
                <div>Skills:</div>
                <div>
                    {account.map((x)=>{
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