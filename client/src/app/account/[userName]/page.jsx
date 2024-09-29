"use client";

import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';
import Navbar from "@/Components/Navbar";
import { FaCoins } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import "../../style/partials/_account.css";

export default function page({params}){
    const [ account, setAccount ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getFetch("accounts", "", params.userName).then((result) => {
            if(result.success){
                console.log(JSON.parse(result.user))
                setAccount(JSON.parse(result.user));
            }else{
                alert("Server error: reload page and log back in");
            }
        });
        getFetch("posts", "-personal", params.userName).then((result) => {
            if(result.success){
                setPosts(JSON.parse(result.posts));
            }else{
                alert("Server Error: reload page and log back in");
            }
        })
    }, []);
    
    return (
        <div>
            <Navbar></Navbar>

            <div className="accountContainer">
                <div className="accountTop">
                    <div>Username: {account.userName} {account.averageRating} <FaStar /></div>
                    <div>Credits: {account.credits} <FaCoins /></div>
                </div>
                
                <div className="accountTop">
                    <div>Personal Info: {account.email} - {account.name}</div>
                    <button onClick={() => router.push(`/messaging/${params.userName}`)} className='message'>Message</button>
                </div>

                <hr />

                <div className="postTitle">Posts:</div>
                <div className="postCont">
                    {posts.length == 0 ? 
                        (<div> You have no posts </div>) 
                    :
                        (
                            posts.map((post, index) => (
                                <div className="postContCont">
                                    <div className="firstRow">
                                        <p className='accountTitle'>{post.title}</p>
                                        <p className="accountDate">{post.date}</p>
                                    </div>
                                    <div className="info2">
                                        <p className="description"><span className="details">Details: </span>{post.text}</p>
                                        <p><span className="details">Skills needed: </span>{post.desiredSkills.join(", ")}</p>
                                    </div>
                                </div>
                            ))
                        )    
                    }
                </div>
            </div>
            {/* <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 
                rounded focus:outline-none focus:shadow-outline mr-2"
                type="button"
                onClick={() => window.history.back()} // Adjust this for custom navigation logic
            >
                Back
            </button> */}
        </div>
    )
}