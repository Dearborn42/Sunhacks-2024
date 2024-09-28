"use client";

import React from 'react'
import {useEffect, useContext} from 'react'
import {UserContext} from '../layout';

const Dashboard = () => {
    const {name, userName, password, email, skills:userSkills, pastWorks, credits, averageRating, update} = useContext(UserContext);

    useEffect(() => {
        console.log({name, userName, password, email, userSkills, pastWorks, credits, averageRating});
    },)
    
    return (
        <div>Welcome to the Dashboard</div>
    )
}

export default Dashboard