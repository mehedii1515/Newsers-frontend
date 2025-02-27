"use client";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/app/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditorPanelPage ({params}) {
    const [user, setUser] = useState({});
    const [isEditor, setIsEditor] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch(`${BASE_URL}/accounts/profile/`, {
            headers: {
                "Authorization": `Token ${localStorage.authToken}`,
            }
        })
            .then(res => res.json())
            .then(res => {
                setUser(res);
            });
        if(localStorage.userRole == "editor") {
            setIsEditor(true);
        }
    }, []);

    return (
        <div>
            { !isEditor &&
                <div>
                    You are a subscriber/unauthorized now. So you don&apos;t have access to editor panel.
                </div>
            }
            { isEditor &&
                <div>
                    <h1 className="mb-3">Are you sure you want to delete this article?</h1>
                    <a onClick={() => {
                        fetch(`${BASE_URL}/article/list/${params.id}/`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Token ${localStorage.authToken}`,
                            }
                        })
                            .then(res => {
                                alert("Deleted");
                                router.push("/editor-panel");
                            })
                    }} className="bg-blue-600 p-2 rounded mr-3 hover:cursor-pointer">Yes</a>
                    <Link className="bg-blue-600 p-2 rounded" href="/editor-panel">No</Link>
                </div>
            } 
        </div>
    )
}