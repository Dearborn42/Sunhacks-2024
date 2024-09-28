"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { signup } from '@/Components/ServerFunctions';
import Select from 'react-select';
import {UserContext} from '../layout';
import { useRouter } from 'next/navigation'

export default function SignUpPage(){
    const {update} = useContext(UserContext);
    const [form, setForm] = useState({ email: "", name: "", userName: "", password: "", skills: [] });
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
        const formSkills = selected ? selected.map(option => option) : [];
        const skills = selected ? selected.map(option => option.label) : [];
        setSelectedOptions(formSkills);
        handleForm('skills', skills);
    };
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(form);
        update({...form})
        signup(form).then(result => {
            if(result.success){
                update(result.user);
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
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
                    placeholder="Enter your userName"
                    value={form.userName}
                    required
                    onChange={(e) => handleForm("userName", e.target.value)}
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
                value={selectedOptions}
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