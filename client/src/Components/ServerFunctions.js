'use server';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export async function login(formData){
    const { email, password } = formData;
    const loginRequest = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        next: {revalidate: 1},
        body: JSON.stringify({password, email})
    }) 
    const response = await loginRequest.json();
    console.log(response);
    if(response.success){
        cookies().set("access", true, {maxAge: 60*60*1});
        return response;
    }else{
        return response;
    }
}
export async function signup(formData){
    const signup_request = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        next: {revalidate: 1},
        body: JSON.stringify(formData)
    })
    const response = await signup_request.json();
    console.log(response);
    if(response.success){
        cookies().set("access", true, {maxAge: 60*60*1});
        return response;
    }else{
        return response;
    }
}

export async function getFetch(model, multi, param1, param2){
    /* 
        router.get("/get-multi/:skills", getPosts);
        router.get("/get/:title/:date", getPost);
        router.get("/get/:userName", getAccount);
    */
    const access = cookies().get("access");
    if(!access)return redirect("/login");

    console.log(`http://localhost:5000/${model}/get${multi}/${param1}${param2}`)
    const serverFetch = await fetch(
        `http://localhost:5000/${model}/get${multi}/${param1}${param2}`,
        {
            method: "GET",
            headers: {'Content-Type': 'application/json', access},
            next: {revalidate: 10} 
        }
    );
    const response = await serverFetch.json();
    console.log(response);
    return response;
}
export async function putFetch(model, param1, param2, body){
    /* 
        router.put("/update/:title/:date", updatePost);
        router.put("/update/:userName", updateAccount);
    */
    const access = cookies().get("access");
    if(!access)return redirect("/login");

    console.log(`http://localhost:5000/${model}/update/${param1}${param2}`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/update/${param1}${param2}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json', access},
        next: {revalidate: 100},
        body: JSON.stringify(body)
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}
export async function deleteFetch(model, param1, param2){
    /* 
        router.delete("/delete/:title/:date", deletePost);
        router.delete("/delete/:userName", deleteAccount);
    */
    const access = cookies().get("access");
    if(!access)return redirect("/login");

    console.log(`http://localhost:5000/${model}/delete/${param1}${param2}`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/delete/${param1}${param2}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json', access},
        next: {revalidate: 100},
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}
export async function postFetch(model, body){
    /* 
        router.post("/create", createPost);
    */
    const access = cookies().get("access");
    if(!access)return redirect("/login");

    console.log(`http://localhost:5000/${model}/create`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/create`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', access},
        next: {revalidate: 1},
        body: JSON.stringify(body)
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}