"use client"
import { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "@/app/layout";
import axios from "axios";
import socketio from "socket.io-client";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home({params}) {
    const { userName } = useContext(UserContext);
    const router = useRouter();
    const socket = socketio.connect("http://localhost:4000");
    const [message, setMessage] = useState("");

    const handleGetHistory = () => {
        axios.post("http://localhost:4000/api/history", { name1: userName, name2: params.userName});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(userName, params.userName, message)

        axios.post("http://localhost:4000/api", { name1: userName, name2: params.userName, message })
            .then((res) => {
                console.log(res)
            })
    }

    useEffect(() => {
        if(userName === ""){
            router.push("/login");
        }
        socket.on('connect', () => {
            console.log(`Connected to server`);
        })

        socket.on('notification', (data) => {
            console.log(`Notification from server`);
            setNotifications((prev) => {
                console.log(data);
                var newList = [...prev];
                for(let i = 0; i < newList.length; i++){
                    if(newList[i].date === data.date){
                        return [...prev];
                    } 
                }
                return [...prev, data]
            })
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected from server`);
        })
    }, [socket])

    const [notifications, setNotifications] = useState([]);

    return (
        <main className="flex flex-col w-full h-screen px-4 py-2 bg-gray-100">
            {
                notifications ? notifications.map((notification, index) => {
                    console.log(notification)
                    return (
                        <div key={index} id="toast-message-cta"
                            className="w-full p-4 text-gray-500 bg-white rounded-lg shadow
                            dark:bg-gray-800 dark:text-gray-400 my-4" role="alert">
                            <div className="flex justify-between">
                                <div className="flex flex-col text-sm font-normal w-full">
                                    <span className="mb-2 text-lg font-semibold text-gray-900 
                                        dark:text-white">
                                        {notification.messageSender}
                                    </span>
                                    <div className="mb-4 text-base text-gray-700 
                                        dark:text-gray-300">
                                        {notification.messageContent}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : null
            }
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md rounded-t-lg p-4">
                <form className="flex items-center justify-between" onSubmit={handleSubmit}>
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline mr-2"
                        type="button"
                        onClick={() => window.history.back()} // Adjust this for custom navigation logic
                    >
                        Back
                    </button>
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline mr-2"
                        type="button"
                        onClick={() => handleGetHistory()} // Adjust this for custom navigation logic
                    >
                        Get history
                    </button>
                    <div className="flex-grow mr-2">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Type your message..."
                            id="message"
                            key="message"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}