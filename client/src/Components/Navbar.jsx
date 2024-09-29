"use client";
import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/app/layout';
const Navbar = ({move}) => {
    const { userName } = useContext(UserContext);
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
                </div>
                

            </div>
        </>
    )
}

export default Navbar