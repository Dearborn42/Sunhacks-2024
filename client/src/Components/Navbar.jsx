"use client";
import React from 'react';
import Link from 'next/link';
const Navbar = () => {
    return (
        <>
            <div className='navy'>
                <Link href={"../dashboard"}>Dashboard</Link>
                <Link href={"../posts"}>Posts</Link>
                <Link href={"../account"}>Account</Link>
                <button>Logout</button>

            </div>
        </>
    )
}

export default Navbar