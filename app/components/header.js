"use client";

import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "../auth";
import { useRouter } from "next/navigation";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [isEditor, setIsEditor] = useState(false);

    const router = useRouter();

    useEffect(() => {
      fetch(`${BASE_URL}/article/categories/`)
        .then(res => res.json())
        .then(res => {
          setCategories(res.results);
        });
    
        if(isLoggedIn()) {
            setLoggedIn(true);
            fetch(`${BASE_URL}/accounts/profile`, {
                headers: {
                    "Authorization": `Token ${localStorage.authToken}`,
                }
            })
                .then(res => res.json())
                .then(res => {
                    setUsername(res.username);
                })
            
            if(localStorage.userRole == "editor") {
                setIsEditor(true);
            }
        }
    }, []);

    return (
        <div className="sticky top-0 z-50">
            <div className="bg-sky-400 text-white font-semibold">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-3xl uppercase py-4">
                    <span className="text-4xl ml-3">N</span>ewsers
                    
                    </h1>
                </div>
                
                <div>
                    { loggedIn &&
                        <ul className="flex gap-2 items-center">
                            <li className="text-sm">{ username }</li>
                            <li onClick={() => {
                                localStorage.removeItem("authToken");
                                localStorage.removeItem("userRole");
                                setLoggedIn(false);
                                router.push("/");
                            }} className="text-sm hover:underline cursor-pointer">Log Out</li>
                            { isEditor &&
                                <Link className="bg-blue-900 p-2 text-sm rounded hover:bg-blue-800" href="/editor-panel"><li>Editor Panel</li></Link>
                            }
                            { !isEditor && 
                                <a onClick={(e) => {
                                    fetch(`${BASE_URL}/userprofile/set_editor/`, {
                                        method: "POST",
                                        headers: {
                                            "Authorization": `Token ${localStorage.authToken}`
                                        }
                                    }).then(res => res.json())
                                    .then(res => {
                                        if(res.message == "Success") {
                                            console.log(res);
                                            localStorage.userRole = "editor";
                                            alert("You are now an editor. Go to Editor Panel for more");
                                            window.location.replace("/editor-panel");
                                        }
                                    })
                                }} className="bg-blue-900 p-2 text-sm rounded hover:bg-blue-800 hover:cursor-pointer"><li>Become an Editor</li></a>
                            } 
                        </ul>
                    }
                    { !loggedIn &&
                        <ul className="flex gap-5 items-center">
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </ul>
                    }
                </div>
            </div>
            </div>
            <div className="bg-sky-700">
            <ul className="container mx-auto flex text-white uppercase font-semibold">
                <Link href="/category/0">
                    <li className="bg-sky-700 px-5 py-2 border border-gray-600 hover:bg-sky-800 hover:cursor-pointer">
                        Latest
                    </li>
                </Link>
                {
                    categories.map(category => {
                        return (
                            <Link key={`cat-${category.id}`} href={`/category/${category.id}`}>
                                <li className="bg-sky-700 px-5 py-2 border border-gray-600 hover:bg-sky-800 hover:cursor-pointer">
                                    { category.name }
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
            </div>
        </div>
    )
}

export default Header;