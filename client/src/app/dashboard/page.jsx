"use client";

import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {UserContext} from '../layout';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';
import Navbar from '@/Components/Navbar';
const Dashboard = () => {
    const router = useRouter();
    const {skills} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const { userName } = useContext(UserContext);

    useEffect(() => {
        if(!skills){
            router.push("/login");
        }else{
            const param = skills.join(",");
            getFetch("posts", "-multi", param).then((result) => {
                if(result.success){
                    setPosts(JSON.parse(result.posts));
                }else{
                    alert("Server error: reload page and log back in");
                }
            });
            return;
        }
    }, [])

    function shift(link){
        router.push(link);
    }
    
    return (
        <>
            <Navbar move={shift}></Navbar>
            <div className='dashWel'>Welcome to the Dashboard</div>
            <div className='dashPostBig'>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div className='dashPostCon' key={index} >
                            <h3><div>{post.title}</div> <div>Credits: {post.creditWorth}</div></h3>
                            <p>{post.text}</p>
                            <p>Skills needed: {post.desiredSkills.join(", ")}</p>
                            <div>
                            <p>Due Date: {post.date} </p>
                            <button onClick={() => {router.push(`/dashboard/${post._id}`)}}>Accept</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No posts matching your skills found</div>
                )}
            </div>
        </>
    )
}

export default Dashboard