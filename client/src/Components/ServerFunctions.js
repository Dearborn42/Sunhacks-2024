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
        redirect('/dashboard');
    }else{
        
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
        redirect('/dashboard');
    }
}

export async function getFetch(model, multi, param1, param2){
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
export async function putFetch(model, prn, identifier_1, identifier_2, body){
    /* 
        router.put("/update/:prn/:className/:date", updateAppointment);
        router.put("/update/:prn/:className/:id", updateEncounter);
        router.put("/update/:prn/:className", updateFlowsheets);
        router.put("/update/:prn/:className/:type", updateHistory);
        router.put("/update/:prn/:className", updateItem);
        router.put("/update/:prn/:className", updatePatient);
        router.put("/update/:prn/:className/:type/?:name", updatePeople);
        router.put("/update/:prn/:className/:encounterDate/:billId", updateBill);
        router.put("/update/:prn/:className/:id", updateDir);
    */
    const dbname = cookies().get("database_selected");
    if(!dbname) return redirect("/");
    
    const className = cookies().get('className');
    if(!className) return redirect("/login")

    console.log(`http://localhost:5000/${model}/update/${prn}/${className.value}${identifier_1}${identifier_2}`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/update/${prn}/${className.value}${identifier_1}${identifier_2}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json', dbname: dbname.value},
        next: {revalidate: 100},
        body: JSON.stringify(body)
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}
export async function deleteFetch(model, prn, identifier_1, identifier_2){
    /* 
        router.delete("/delete/:prn/:className/:date", deleteAppointment);
        router.delete("/delete/:prn/:className/:date", deleteEncounter);
        router.delete("/delete/:prn/:className", deleteFlowsheets);
        router.delete("/delete/:prn/:className", deleteItem);
        router.delete("/delete/:prn/:className", deletePatient);
        router.delete("/delete/:prn/:className/:type/?:name", deletePerson);
        router.delete("/delete/:prn/:className/:encounterDate/:billId", deleteBill);
        router.delete("/delete/:email", isAuthenticated, removeUsers);
        router.delete("/delete/:prn/:className/:id", deleteDir);
    */
    const dbname = cookies().get("database_selected");
    if(!dbname) return redirect("/");
    
    const className = cookies().get('className');
    if(!className) return redirect("/login");

    console.log(`http://localhost:5000/${model}/delete/${prn}/${className.value}${identifier_1}${identifier_2}`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/delete/${prn}/${className.value}${identifier_1}${identifier_2}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json', dbname: dbname.value},
        next: {revalidate: 100},
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}
export async function postFetch(model, prn, type, body){
    /* 
        router.post("/create/:prn/:className", createAppointment);
        router.post("/create/:prn/:className", createEncounter);
        router.post("/create/:prn/:className", createFlowsheets);
        router.post("/create/:prn/:className/:type", createHistory);
        router.post("/create/:prn/:className", createMedsAndAllergies);
        router.post("/create/:className", createPatient);
        router.post("/create/:prn/:className/:type", createPerson);
        router.post("/create/:prn/:className", createBill);
        router.post("/create/:prn/:className", createDir);
    */
    const dbname = cookies().get("database_selected");
    if(!dbname) return redirect("/");
    
    const className = cookies().get('className');
    if(!className) return redirect("/login");

    console.log(`http://localhost:5000/${model}/create/${prn}/${className.value}${type}`)
    const serverFetch = await fetch(`http://localhost:5000/${model}/create/${prn}/${className.value}${type}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', dbname: dbname.value},
        next: {revalidate: 1},
        body: JSON.stringify(body)
    });
    const response = await serverFetch.json();
    console.log(response);
    return response
}