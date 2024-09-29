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
        </div>
    )
}