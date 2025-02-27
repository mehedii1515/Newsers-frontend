"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { isLoggedIn } from "../auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                <img src="/signup.svg" className="w-full" />
            </div>
            <div className="p-40 shadow-2xl">
                <h1 className="text-3xl font-bold mb-3">Register</h1>
                <form>
                    <div className="flex flex-col gap-3">
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setUsername(e.target.value);
                        }} type="text" id="username" name="username" placeholder="Username" />
                        <span className="text-red-900 font-semibold">{ errors.username }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setFirstName(e.target.value);
                        }} type="text" id="first_name" name="first_name" placeholder="First Name" />
                        <span className="text-red-900 font-semibold">{ errors.first_name }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setLastName(e.target.value);
                        }} type="text" id="last_name" name="last_nme" placeholder="Last Name" />
                        <span className="text-red-900 font-semibold">{ errors.last_name }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setEmail(e.target.value);
                        }} type="email" id="email" name="email" placeholder="Email" />
                        <span className="text-red-900 font-semibold">{ errors.email }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setPassword(e.target.value);
                        }} type="password" id="password" name="password" placeholder="Password" />
                        <span className="text-red-900 font-semibold">{ errors.password }</span>
                        <input className="border p-4 bg-gray-100 rounded-lg font-bold" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} type="password" id="password2" name="password2" placeholder="Confirm Password" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        if(password != confirmPassword) {
                            alert("Passwords didn't match");
                            return;
                        }
                        const apiBody = {
                            "username": username,
                            "email": email,
                            "password": password,
                            "first_name": firstName,
                            "last_name": lastName,
                        }

                        fetch(`${BASE_URL}/accounts/register/`,
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
                                    alert("Success. Check your email for activating your account");
                                } else {
                                    setErrors(res);
                                }
                            })
                    }} className="bg-blue-900 p-4 rounded text-white mt-3">Register</button>
                </form>
            </div>
        </div>
    )
}