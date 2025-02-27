"use client";

import { BASE_URL } from "@/app/config";
import { useState, useEffect } from "react";

export default function EditPage ({ params }) {  
    const [user, setUser] = useState({});
    const [isEditor, setIsEditor] = useState(false);
    const [categories, setCategories] = useState([]);
    const [article, setArticle] = useState(null);

    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState(1);

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

        fetch(`${BASE_URL}/article/categories/`)
            .then(res => res.json())
            .then(res => {
                setCategories(res.results);
            });

        const articleId = params.id;
        fetch(`${BASE_URL}/article/list/${articleId}`)
            .then(res => res.json())
            .then(res => {
                setArticle(res);
                setHeadline(res.headline);
                setBody(res.body);
                setCategory(res.category);
            });
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
                <h1 className="text-2xl font-semibold">Edit Article</h1>
                {article && <form className="flex flex-col gap-3 *:border">
                    <input value={headline} onChange={(e) => {
                        setHeadline(e.target.value);
                    }} type="text" id="headline" name="headline" placeholder="Headline" />
                    <textarea className="min-h-[300px]" onChange={(e) => {
                        setBody(e.target.value);
                    }} type="text" id="body" name="body" placeholder="Body">{ body }</textarea>
                    <select onChange={(e) => {
                        setCategory(e.target.value);
                    }} id="category" name="category">
                        {
                            categories.map(category => {
                                return <option key={`key-${category.id}`} value={category.id} selected={category.id == article.category}>{category.name}</option>;
                            })
                        }
                    </select>
                    <button onClick={(e) => {
                        e.preventDefault();
                        const apiBody = {
                            "headline": headline,
                            "body": body,
                            "category": category
                        }
                        console.log(JSON.stringify(apiBody));
                        fetch(`${BASE_URL}/article/list/${article.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Authorization": `Token ${localStorage.authToken}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(apiBody),
                        })
                            .then(res => {
                                console.log(res);
                                return res.json();
                            })
                            .then(res => {
                                if("id" in res) {
                                    alert("Successfully Saved the Changes")
                                } else {
                                    alert("Error: " + JSON.stringify(res));
                                }
                            })
                    }}>Save Changes</button>
                </form>}
            </div> 
            }
        </div>
        
    )
}