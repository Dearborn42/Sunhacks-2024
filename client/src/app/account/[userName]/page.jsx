"use client";

import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';

export default function page({params}){
    const [ account, setAccount ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getFetch("accounts", "", params.userName).then((result) => {
            if(result.success){
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
            <h1>{account.userName}</h1>
            <br />
            <h1>{account.skills}</h1>
            <br />
            {/* <h1>{account.pastWorks}</h1> */}
            <br />
            <h1>{account.credits}</h1>
            <br />
            <h1>{account.averageRating}</h1>
            <br />
            {posts.length == 0 ? 
                (<div> You have no posts </div>) 
            :
                (
                    posts.map((post, index) => (
                        <div key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.text}</p>
                            <p>Skills needed: {post.desiredSkills.join(", ")}</p>
                            <p>Date: {post.date}</p>
                        </div>
                    ))
                )    
            }
            <button onClick={() => router.push(`/messaging/${params.userName}`)}>Message {params.userName}</button>
            <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 
                rounded focus:outline-none focus:shadow-outline mr-2"
                type="button"
                onClick={() => window.history.back()} // Adjust this for custom navigation logic
            >
                Back
            </button>
        </div>
    )
}