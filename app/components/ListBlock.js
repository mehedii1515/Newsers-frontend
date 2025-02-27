import Link from "next/link";
import { timeAgo } from "../config";
import { notoSerif } from "../font/exports";

const ListBlock = ({newsList, titleName="Latest News"}) => {
    return (
        <div className="box-border p-4 w-[270px]">
            <span className="text-blue-800 text-2xl uppercase">{ titleName }</span>
            <hr className="h-[5px] bg-gray-700"/>
            <div className="bg-emerald-800 w-[50px] h-[10px] mb-2"></div>
            <div className="max-h-[600px] overflow-y-auto"> 
                {
                    newsList.map(news => (
                        <div key={`news-${news.id}`}>
                            <div className="flex">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className={`${notoSerif.className} font-semibold text-xl`}>
                                        <Link href={`/article/${news.id}`}>{ news.headline }</Link>
                                    </h2>
                                    <div className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span>{ timeAgo.format(new Date(news.publishing_time)) }</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-300 my-1"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListBlock;