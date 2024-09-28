"use client";
import * as React from "react";
import { useState } from "react";
import { signup } from '@/Components/ServerFunctions';

export default function SignUpPage(){
    const [form, setForm] = useState({ email: "", password: "" });
    const handleForm = (field, value) => setForm((prev) => { return { ...prev, [field]: value } });
    function handleSubmit(e){
        e.preventDefault();
        signup(form).then(result => {
            if(result){
                alert("Invalid Email or Password")
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