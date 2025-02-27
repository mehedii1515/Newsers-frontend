"use client";

import { useDebugValue, useEffect, useState } from "react"
import { getUserDetails } from "../auth"
import { BASE_URL } from "../config";
import Link from "next/link";
import clsx from "clsx";

export default function PanelPage () {
    const [user, setUser] = useState({});
    const [isEditor, setIsEditor] = useState(false);
    const [categories, setCategories] = useState([]);
    const [userArticles, setUserArticles] = useState([]);

    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState(1);

    //PAGINATION
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //END

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
    }, []);

    useEffect(() => {
        console.log(user);
        if("id" in user) {
            fetch(`${BASE_URL}/article/list/?editor_id=${user.id}&page=${currentPage}`)
                .then(res => res.json())
                .then(res => {
                    setUserArticles(res.results)
                    let pageCount = (parseInt(res.count)+9)/10;
                    let pageArr = [];
                    for(let i=1; i<=pageCount; i++) {
                        pageArr.push(i);
                    }
                    setPages(pageArr);
                });
        }
    }, [user, currentPage]);

    return (
        <div>
            { !isEditor &&
                <div>
                    You are a subscriber/unauthorized now. So you don&apos;t have access to editor panel.
                </div>
            }
            { isEditor &&
                <div>
                    <h1 className="text-2xl font-semibold">Your Articles</h1>
                    <nav className="flex justify-center" aria-label="Page navigation example">
                        <ul class="inline-flex -space-x-px text-sm">
                        <li>
                            <a onClick={() => {
                            if(currentPage > 1)
                                setCurrentPage(currentPage - 1);
                            }} href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        {
                            pages.map(page => (
                            <li key={`key-${page}`}>
                                <a href="#" onClick={() => {
                                setCurrentPage(page);
                                }} className={
                                clsx({"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white": page != currentPage,
                                    "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white": page == currentPage,
                                })
                                }>{ page }</a>
                            </li>
                            ))
                        }
                        <li>
                            <a onClick={() => {
                            if(currentPage < pages.length)
                                setCurrentPage(currentPage + 1);
                            }} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                        </ul>
                    </nav>
                    <table className="border border-slate-400">
                        <tr>
                            <th className="border border-slate-300">Title</th>
                            <th className="border border-slate-300">Action</th>
                        </tr>
                        {
                            userArticles.map(article => (
                                <tr key={`article-${article.id}`}>
                                    <td className="border border-slate-300">{ article.headline }</td>
                                    <td className="flex gap-4 px-4 border border-slate-300">
                                        <Link className="text-blue underline hover:font-semibold" href={`editor-panel/edit/${article.id}`}>Edit</Link>
                                        <Link className="text-blue underline hover:font-semibold" href={`editor-panel/delete/${article.id}`}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                    <h1 className="text-2xl font-semibold">Publish an Article</h1>
                    <form className="flex flex-col gap-3 *:border">
                        <input onChange={(e) => {
                            setHeadline(e.target.value);
                        }} type="text" id="headline" name="headline" placeholder="Headline" />
                        <textarea onChange={(e) => {
                            setBody(e.target.value);
                        }} type="text" id="body" name="body" placeholder="Body"></textarea>
                        <select onChange={(e) => {
                            setCategory(e.target.value);
                        }} id="category" name="category">
                            {
                                categories.map(category => {
                                    return <option key={`key-${category.id}`} value={category.id}>{category.name}</option>;
                                })
                            }
                        </select>
                        <button onClick={(e) => {
                            e.preventDefault();
                            const apiBody = {
                                "headline": headline,
                                "body": body,
                                "editor": user.id,
                                "category": category
                            }
                            fetch(`${BASE_URL}/article/list/`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Token ${localStorage.authToken}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(apiBody),
                            })
                                .then(res => res.json())
                                .then(res => {
                                    if("id" in res) {
                                        alert("Successfully Published")
                                    } else {
                                        alert("Error: " + JSON.stringify(res));
                                    }
                                })
                        }}>Publish Article</button>
                    </form>
                </div>
            }
        </div>
    )
}