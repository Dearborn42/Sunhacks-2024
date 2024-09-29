"use client";

import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {UserContext} from '../layout';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';

const Dashboard = () => {
    const router = useRouter();
    const {skills, update} = useContext(UserContext);
    const [posts, setPosts] = useState([]);

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
    
    return (
        <>
            <div>Welcome to the Dashboard</div>
            <Link href="../account">Account</Link>
            <div>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} onClick={() => {router.push(`/dashboard/${post._id}`)}}>
                            <h3>{post.title}</h3>
                            <p>{post.text}</p>
                            <p>Skills needed: {post.desiredSkills.join(", ")}</p>
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