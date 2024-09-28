"use client";

import React from 'react'
import {useEffect, useContext} from 'react'
import {UserContext} from '../layout';
import Link from "next/link";

const Dashboard = () => {
    const {name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating, update} = useContext(UserContext);

    useEffect(() => {
        console.log({name, userName, password, email, userSkills, pastWorks, credits, averageRating});
    },)
    
    return (
        <>
            <div>Welcome to the Dashboard</div>
            <Link href="../account">Account</Link>
        </>
    )
}

export default Dashboard