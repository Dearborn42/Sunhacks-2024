'use server';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export async function login(formData){
    const { email, name } = formData;
    const loginRequest = await fetch('http://localhost:/*enter your backend portnumber*/ /login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        next: {revalidate: 1},
        body: JSON.stringify({name, email})
    }) 
    const response = await loginRequest.json();
    console.log(response);
    if(response.success){
        cookies().set("access", true, {maxAge: 60*60*1});
        redirect('/home');
    }else{
        
    }
}
export async function signup(formData){
    const signup_request = await fetch('http://localhost:/*enter your backend portnumber*/ /signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        next: {revalidate: 1},
        body: JSON.stringify(formData)
    })
    const response = await signup_request.json();
    if(response.success){
        cookies().set("access", true, {maxAge: 60*60*1});
        console.log(cookies().getAll());
        redirect('/home');
    }
}