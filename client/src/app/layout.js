"use client";
import {useState, createContext } from 'react';
import localFont from "next/font/local";
import "./style/global.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const UserContext = createContext();

export default function RootLayout({ children }) {
  const [ user, setUser ] = useState({
    "name": "",
    "userName": "",
    "email" : "",
    "password" : "",
    "skills" : false,
    "pastWorks" : [],
    "credits": 3,
    "averageRating": 3,
  })

  const handleUserChange = (value) => setUser((prev) => {return {...prev, ...value}});

  return (
    <UserContext.Provider value={{...user, "update": handleUserChange}}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html> 
    </UserContext.Provider>
  )
}

export { UserContext }