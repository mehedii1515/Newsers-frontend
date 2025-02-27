import Image from "next/image";
import Link from "next/link";

import { timeAgo } from "../config";

import { notoSerif } from "../font/exports";

const ArticleBlock = ({news, charCount=150}) => {
    return (
        <div key={`news-${news.id}`} className="p-4 my-4 w-[400px]">
            <Image className="object-cover rounded-3xl mb-3" loader={() => news.image} src={news.image} alt="news-image" width={400} height={200} />
            <h1 className={`text-2xl font-semibold font-serif ${notoSerif.className}`}>{ news.headline }</h1>
            <p className={`${notoSerif.className} text-xl text-gray-600 mt-2`}>{ news.body.slice(0, charCount) }... <Link className="font-semibold text-purple-900 hover:underline" href={`/article/${news.id}`}>Read more</Link></p>
            <p className={`text-gray-500 text-sm mt-1`}>{ timeAgo.format(new Date(news.publishing_time)) }</p>
        </div>
    );
}

export default ArticleBlock;