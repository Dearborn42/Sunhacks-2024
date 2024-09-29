"use client";
import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/app/layout';
import { FaCoins } from "react-icons/fa6";
const Navbar = ({move}) => {
    const { userName } = useContext(UserContext);
    const {credits} = useContext(UserContext);

    return (
        <>
            <div className='navy'>
                <div>
                    TradeTrading
                </div>
                <div>
                <Link href={"../dashboard"}>Dashboard</Link>
                <Link href={"../posts"}>Posts</Link>
                <button onClick={() => move(`./account/personal/${userName}`)}>Accounts</button>
                <button>Logout</button>
                <div>Credits: {credits} <FaCoins/></div>
                </div>
                

            </div>
        </>
    )
}

export default Navbar