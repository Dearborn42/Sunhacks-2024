"use client";
import * as React from "react";
import { useState } from "react";
import { signup } from '@/Components/ServerFunctions';
import Select from 'react-select';

export default function SignUpPage(){
    const [form, setForm] = useState({ email: "", name: "", username: "", password: "", skill: [] });
    const handleForm = (field, value) => setForm((prev) => { return { ...prev, [field]: value } });
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const options = [
        { value: 'first', label: 'First option' },
        { value: 'second', label: 'Second option' },
        { value: 'third', label: 'Third option' },
        { value: 'fourth', label: 'Fourth option' },
        { value: 'fifth', label: 'Fifth option' },
    ];

    const handleChange = (selected) => {
        console.log(selected)
        // setSelectedOptions(selected || []); // Allow empty array on deselect
        // handleForm("skills", form.skill.push(selected[0].label) || []);
        const skills = selected ? selected.map(option => option) : [];
        handleForm('skill', skills);
        console.log(skills)
    };

    // const handleChange = (selected) => {
    //     const skills = selected ? selected.map(option => option.value) : [];
    //     handleForm('skill', skills);
    // };
    
    function handleSubmit(e){
        e.preventDefault();
        signup(form).then(result => {
            if(result){
                alert("Invalid Information")
            }
        });
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="signCont">
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
                    type="name"
                    autoComplete="true"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={form.name}
                    required
                    onChange={(e) => handleForm("name", e.target.value)}
                />
                <input
                    className="text-black" 
                    type="usernme"
                    autoComplete="true"
                    name="usernme"
                    id="usernme"
                    placeholder="Enter your username"
                    value={form.username}
                    required
                    onChange={(e) => handleForm("username", e.target.value)}
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

                <label htmlFor="foo_select" className="screen-reader-text">Click to select an option</label>

                <Select
                id="foo_select"
                name="foo_select"
                options={options}
                isMulti
                placeholder="Click to select an option..."
                value={form.skill}
                onChange={handleChange}
                className="dropdown text-black"
                styles={{
                    container: (provided) => ({
                    ...provided,
                    width: 300,
                    }),
                }}
                />

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}