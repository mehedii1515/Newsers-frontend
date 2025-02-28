import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-gradient-to-t from-sky-700 to-gray-600">
            <div className="container mx-auto text-white p-4 flex">
                <div className="w-1/3 box-border p-4">
                    <div>
                        <h1 className="text-xl uppercase py-4">
                            <span className="text-2xl ml-3">N</span>ewsers
                            
                        </h1>
                        <hr/>
                        <div className="p-5 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col p-2 gap-2">
                    <Link href="/category/0" className="hover:font-semibold hover:cursor-pointer">Latest</Link>
                    <Link href="/category/1" className="hover:font-semibold hover:cursor-pointer">Politics</Link>
                    <Link href="/category/2" className="hover:font-semibold hover:cursor-pointer">Crime</Link>
                    <Link href="/category/3" className="hover:font-semibold hover:cursor-pointer">Business</Link>
                </div>
                <div className="w-1/3 flex flex-col p-2 gap-2">
                    <Link href="/category/4" className="hover:font-semibold hover:cursor-pointer">Opinion</Link>
                    <Link href="/category/5" className="hover:font-semibold hover:cursor-pointer">Sports</Link>
                    <Link href="/category/6" className="hover:font-semibold hover:cursor-pointer">Entertainment</Link>
                    <Link href="/category/8" className="hover:font-semibold hover:cursor-pointer">Technology</Link>
                </div>
            </div>
            <div className="container mx-auto">
                <hr/>
                <h1 className="text-center text-white p-4">Copyright © All Rights Reserved - { new Date().getFullYear() }</h1>
            </div>
        </div>
    )
}