"use client";

import { BASE_URL, timeAgo } from "@/app/config";
import Link from "next/link";
import { useEffect, useState } from "react"

import { notoSerif } from "@/app/font/exports";
import Image from "next/image";
import ListBlock from "@/app/components/ListBlock";
import { isLoggedIn } from "@/app/auth";

export default function ArticlePage ({ params }) {
    const [article, setArticle] = useState(null);
    const [relatedNewsList, setRelatedNewsList] = useState([]);
    const [ratings, setRatings] = useState([]);

    const [value, setValue] = useState(4);
    const [body, setBody] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [timeStr, setTimeStr] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const articleId = params.id;
        fetch(`${BASE_URL}/article/list/${articleId}/`)
            .then(res => res.json())
            .then(res => setArticle(res));
        if(isLoggedIn()) {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if(article) {
            fetch(`${BASE_URL}/article/list/?cat_id=${article.category}`)
                .then(res => res.json())
                .then(res => {
                    const relatedArticles = [];
                    let i = 0;
                    while(relatedArticles.length < 2) {
                        if(article.id == res.results[i].id) {
                            i++;
                        }
                        if(i >= res.results.length) {
                           break;
                        }
                        relatedArticles.push(res.results[i++]);
                    }
                    console.log(relatedArticles);
                    setRelatedNewsList(relatedArticles);
                });
            
            let timeConfig = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(article.publishing_time);
            setTimeStr(date.toLocaleDateString("en-US", timeConfig));
        }
    }, [article]);

    const [opNewsList, setOpNewsList] = useState([]);
    const [latestNewsList, setLatestNewsList] = useState([]);
    const [politicsNewsList, setPoliticsNewsList] = useState([]);


    useEffect(() => {
        fetch(`${BASE_URL}/article/list/?cat_id=4`)
            .then(res => res.json())
            .then(res => {
                setOpNewsList(res.results);
            });

        fetch(`${BASE_URL}/article/list/?sort_by=time`)
            .then(res => res.json())
            .then(res => {
                setLatestNewsList(res.results);
            });

        fetch(`${BASE_URL}/article/list/?cat_id=1`)
            .then(res => res.json())
            .then(res => {
                setPoliticsNewsList(res.results);
            });
    }, []);

    useEffect(() => {
        if(article) {
            fetch(`${BASE_URL}/article/rating/?article_id=${article.id}`)
                .then(res => res.json())
                .then(res => setRatings(res));
        }
    }, [article, trigger]);
    
    return (
        <div>
            { article && 
                <div className="flex justify-center gap-5">
                    <div>
                        <ListBlock newsList={politicsNewsList.slice(0,3)} titleName="Politics" />
                        <ListBlock newsList={opNewsList.slice(0,3)} titleName="Opinion" />
                    </div>
                    <div className="w-[700px]">
                        <h1 className={`text-3xl font-bold ${notoSerif.className} mb-3`}>{ article.headline }</h1>
                        <span className="text-gray-600 font-semibold mt-4">Published on { timeStr }</span>
                        <img className="w-full mt-3" loader={() => article.image} src={article.image} alt={article.headline} />
                        <p className={`mt-3 ${notoSerif.className} text-lg leading-8`}>{ article.body }</p>

                        <h2 className="text-2xl font-bold mt-3 mb-3">Leave a Rating</h2>
                        {loggedIn && <form className="flex items-start gap-2 *:h-full">
                            <select onChange={(e) => {
                                setValue(e.target.value);
                            }} className="bg-purple-800 p-2 rounded-lg text-white">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4" selected>4</option>
                            </select>
                            <textarea onChange={(e) => {
                                setBody(e.target.value);
                            }} className="p-4 border rounded w-[80%]" placeholder="Feedback...">

                            </textarea>
                            <button onClick={(e) => {
                                e.preventDefault();
                                fetch(`${BASE_URL}/article/rate/`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Token ${localStorage.authToken}`,
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "user": article.editor,
                                        "article": article.id,
                                        "value": value,
                                        "body": body
                                    })
                                }).then(res => res.json())
                                    .then(res => {
                                        if("body" in res) {
                                            setTrigger(trigger + 1);
                                        } else {
                                            alert("Error" + JSON.stringify(res));
                                        }
                                    })
                            }} className="bg-purple-800 p-2 rounded-lg text-white">Submit</button>
                        </form>}
                        {
                            !loggedIn &&
                            <div>You must be logged in to rate this news article</div>
                        }
                        <h2 className="text-2xl font-bold mt-3 mb-3">Average Rating: { (article.avg_rating != "-1") ? article.avg_rating.toFixed(2) : "No reviews yet" }</h2>
                        <div>
                            {
                                ratings.map(rating => 
                                    <div key={`key-${rating.time}`}>
                                        <div className="flex gap-2 items-center">
                                            <Image className="rounded-full" src="/profile.webp" width={50} height={50} alt="" />
                                            <div>
                                                <div className="font-bold">@{ rating.user.username }</div>
                                                <div className="text-sm text-gray-700">Rating: { rating.value }/4, { timeAgo.format(new Date(rating.time)) }</div>
                                            </div>
                                        </div>                  
                                        <div className="p-2">{ rating.body }</div>
                                        <hr/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <ListBlock newsList={relatedNewsList.slice(0,2)} titleName="Related News" />
                        <ListBlock newsList={latestNewsList.slice(0,5)} titleName="Latest" />
                    </div>
                </div>
            }   
        </div>
    )
}