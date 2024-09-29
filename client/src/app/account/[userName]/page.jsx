"use client";

import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { getFetch } from '@/Components/ServerFunctions';

export default function page({params}){
    const [ account, setAccount ] = useState({});

    useEffect(() => {
        getFetch("accounts", "", params.userName).then((result) => {
            if(result.success){
                setAccount(JSON.parse(result.user));
            }else{
                alert("Server error: reload page and log back in");
            }
        });
    }, []);

    return (
        <div>
            <h1>{account.userName}</h1>
            <br />
            <h1>{account.skills}</h1>
            <br />
            <h1>{account.pastWorks}</h1>
            <br />
            <h1>{account.credits}</h1>
            <br />
            <h1>{account.averageRating}</h1>
            <br />
        </div>
    )
}