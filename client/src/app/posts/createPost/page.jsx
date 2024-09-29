'use client';

import { useState, useContext } from "react";
import Select from 'react-select';
import {UserContext} from '../../layout';
import { postFetch } from '@/Components/ServerFunctions';
import { useRouter } from 'next/navigation'

const CreatePost = () => {
    const router = useRouter();
    const {userName} = useContext(UserContext);
    const [form, setForm] = useState({ title: "", text: "", userName: userName, date: "", desiredSkills: [], creditWorth: 0 });
    const handleForm = (field, value) => setForm((prev) => { return { ...prev, [field]: value } });
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const options = [
        { value: 'first', label: 'First-option' },
        { value: 'second', label: 'Second-option' },
        { value: 'third', label: 'Third-option' },
        { value: 'fourth', label: 'Fourth-option' },
        { value: 'fifth', label: 'Fifth-option' },
    ];

    const handleChange = (selected) => {
        const formSkills = selected ? selected.map(option => option) : [];
        const skills = selected ? selected.map(option => option.label) : [];
        setSelectedOptions(formSkills);
        handleForm('desiredSkills', skills);
        let temp = new Date();
        temp = formatDate(temp);
        handleForm('date', temp);
    };

    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`; // Format as mm/dd/yyyy
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(form)
        postFetch("posts", form).then(result => {
            if(result.success){
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="createCont">
                <input
                    className="text-black" 
                    type="title"
                    autoComplete="true"
                    name="title"
                    id="title"
                    placeholder="Enter title of post"
                    value={form.title}
                    required
                    onChange={(e) => handleForm("title", e.target.value)}
                />
                <input
                    className="text-black" 
                    type="text"
                    autoComplete="true"
                    name="text"
                    id="text"
                    placeholder="Enter problem"
                    value={form.text}
                    required
                    onChange={(e) => handleForm("text", e.target.value)}
                />
                <input
                    className="text-black" 
                    type="credit"
                    autoComplete="true"
                    name="credit"
                    id="credit"
                    placeholder="Enter worth of project in credits"
                    value={form.creditWorth}
                    required
                    onChange={(e) => handleForm("creditWorth", e.target.value)}
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

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost;