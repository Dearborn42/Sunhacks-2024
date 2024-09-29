"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../layout";
import { login } from '@/Components/ServerFunctions';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Image from 'next/image';
import img from '../../public/image.png';

export default function LoginPage(){
    const { update } = useContext(UserContext);
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const handleForm = (field, value) => setForm((prev) => { return { ...prev, [field]: value } });
    function handleSubmit(e){
        e.preventDefault();
        login(form).then(result => {
            if(result.success){
                update(result.user);
                console.log(result.user);
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
            }
        });
    }
    return (
        <div className="loginCont">
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="loginInfo">
                    <h1 className="title">Login</h1>
                    <div className="inputCont">
                        <label htmlFor="email">Email</label>
                        <div>
                            <MdOutlineMail className="icon"/>
                            <input
                                className="text-black" 
                                type="email"
                                autoComplete="true"
                                name="email"
                                id="email"
                                placeholder="example@gmail.com"
                                value={form.email}
                                required
                                onChange={(e) => handleForm("email", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputCont">
                        <label htmlFor="password">Password</label>
                        <div>
                            <RiLockPasswordLine className="icon"/>
                            <input
                                className="text-black"
                                type="password"
                                autoComplete="true"
                                name="password"
                                id="password"
                                placeholder="******"
                                value={form.password}
                                required
                                onChange={(e) => handleForm("password", e.target.value)}
                            />
                        </div>
                    </div>
                    <p>Don't have an account yet? <Link href="../signup" className="signup">Sign Up</Link></p>
                    <button type="submit">Login</button>
                </div>
                <div className="imgCont">
                    <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="login"
                    />
                </div>
            </form>
        </div>
    )
}