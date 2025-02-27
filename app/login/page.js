"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import { isLoggedIn } from "../auth";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if(isLoggedIn()) {
            router.push("/");
        }
    }, []);

    return (
        <div className="flex">
            <div className="w-1/2 p-40 box-border">
                <img src="/login.svg" className="w-full" />
            </div>
            <div className="p-40 shadow-2xl">
                <h1 className="text-3xl font-bold mb-3">Login</h1>
                <span className="text-red-900 font-semibold">{ errors.detail }</span>
                <form>
                    <div className="flex flex-col gap-3">
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setUsername(e.target.value);
                        }} type="text" id="username" name="username" placeholder="Username" />
                        <span className="text-red-900 font-semibold">{ errors.username }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setPassword(e.target.value);
                        }} type="password" id="password" name="password" placeholder="Password" />
                        <span className="text-red-900 font-semibold">{ errors.password }</span>
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        const apiBody = {
                            "username": username,
                            "password": password,
                        }

                        fetch(`${BASE_URL}/accounts/login/`,
                            {
                                method: "POST",
                                body: JSON.stringify(apiBody),
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            }
                        )
                            .then(res => res.json())
                            .then(res => {
                                if("id" in res) {
                                    setErrors({})
                                    localStorage.authToken = res.token;
                                    fetch(`${BASE_URL}/userprofile/role/`, {
                                        headers: {
                                            "Authorization": `Token ${localStorage.authToken}`,
                                        }
                                    })
                                        .then(data => data.json())
                                        .then(data => {
                                            localStorage.userRole = data.role;
                                            window.location.replace("/");
                                        });
                                } else {
                                    setErrors(res);
                                }
                            })
                    }} className="bg-blue-900 p-4 rounded text-white mt-3">Login</button>
                </form>
            </div>
        </div>
    )
}