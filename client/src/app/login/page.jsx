"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../layout";
import { login } from '@/Components/ServerFunctions';
import { useRouter } from 'next/navigation'

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
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
            }
        });
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
                className="text-black" 
                type="email"
                autoComplete="true"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={form.email}
                required
                onChange={(e) => handleForm("email", e.target.value)}
            />
            <input
                className="text-black"
                type="password"
                autoComplete="true"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={form.password}
                required
                onChange={(e) => handleForm("password", e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}