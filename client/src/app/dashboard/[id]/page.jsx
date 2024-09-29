"use client";

import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';

export default function page({params}){
    const [ post, setPost ] = useState({});
    const router = useRouter();
    
    useEffect(function(){
        getFetch("posts", "", params.id).then((result) => {
            if(result.success){
                setPost(JSON.parse(result.post));
            }else{
                alert("Server error: reload page and log back in");
            }
        });
    }, []);
    return (
        <div>
            <h1 onClick={() => router.push(`/account/${post.userName}`)}>{post.userName}</h1>
            <br />
            <h1>{post.date}</h1>
            <br />
            <h1>{post.title}</h1>
            <br />
            <h1>{post.text}</h1>
            <br />
            <h1>{post.creditWorth}</h1>
            <br />
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