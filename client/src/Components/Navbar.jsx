"use client";
import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import {UserContext} from '../app/layout';

import { FaCoins } from "react-icons/fa6";


const Navbar = () => {
    const {credits} = useContext(UserContext);

    return (
        <>
            <div className='navy'>
                <div>
                    TradeTrading
                </div>
                <div>
                <Link href={"../dashboard"}>Dashboard</Link>
                <Link href={"../posts/createPost"}>New Post</Link>
                <Link href={"../account"}>Account</Link>
                <button>Logout</button>
                <div>Credits: {credits} <FaCoins/></div>
                </div>
                

            </div>
        </>
    )
}

export default Navbar