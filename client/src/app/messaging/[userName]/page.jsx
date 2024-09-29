"use client"
import { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "@/app/layout";
import axios from "axios";
import socketio from "socket.io-client";
import { useRouter } from 'next/navigation';

export default function Home() {
    const { userName } = useContext(UserContext);
    const router = useRouter();
    const socket = socketio.connect("http://localhost:4000");

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = e.target[0].value;

        axios.post("http://localhost:4000/api", { name: userName, message })
            .then((res) => {
                console.log(res)
            })

        console.log("submitted", userName, message)
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
            setNotifications([...notifications, data])
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
                    return (
                        <div key={index} id="toast-message-cta"
                            className="w-full p-4 text-gray-500 bg-white rounded-lg shadow
                            dark:bg-gray-800 dark:text-gray-400 my-4" role="alert">
                            <div className="flex justify-between">
                                <div className="flex flex-col text-sm font-normal w-full">
                                    <span className="mb-2 text-lg font-semibold text-gray-900 
                                        dark:text-white">
                                        {notification.name}
                                    </span>
                                    <div className="mb-4 text-base text-gray-700 
                                        dark:text-gray-300">
                                        {notification.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : null
            }
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md rounded-t-lg p-4">
                <form className="flex items-center justify-between" onSubmit={handleSubmit}>
                    <div className="flex-grow mr-2">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Type your message..."
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

// "use client";
// import {
//   useCreateChatClient,
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/v2/index.css';

// const apiKey = 'dz5f4d5kzrue';
// const userId = 'falling-frog-5';
// const userName = 'falling';
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmFsbGluZy1mcm9nLTUiLCJleHAiOjE3Mjc2MTg2MTB9.R5S-ew0w9mC3XuhiiB2iFVnZ0JuSlog8MYt6ZARUD_M';

// const user = {
//   id: userId,
//   name: userName,
//   image: `https://getstream.io/random_png/?name=${userName}`,
// };

// const sort = { last_message_at: -1 };
// const filters = {
//   type: 'messaging',
//   members: { $in: [userId] },
// };
// const options = {
//   limit: 10,
// };

// const App = () => {
//   const client = useCreateChatClient({
//     apiKey,
//     tokenOrProvider: userToken,
//     userData: user,
//   });

//   if (!client) return <div>Setting up client & connection...</div>;

//   return (
//     <Chat client={client}>
//       <ChannelList filters={filters} sort={sort} options={options} />
//       <Channel>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

// export default App;