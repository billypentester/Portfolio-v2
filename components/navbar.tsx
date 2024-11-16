'use client'
import {  useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } 
            else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        // also set hash in url
        window.location.hash = id;
        console.log('element', element);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 150, // Adjust the offset value as needed
            behavior: 'smooth',
          });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (

        <nav className={`fixed top-0 left-0 z-40 w-full bg-background ${isScrolled ? 'shadow-sm' : 'shadow-none'}`}>
            <div className="custom-container p-5">
                <div className="flex items-center">
                    <div className="w-1/5">
                        <button onClick={()=>scrollToTop()} className="text-xl font-bold text-secondary">billypentester</button>
                    </div>
                    <div className="flex-1 bg-surface rounded-2xl shadow-sm">
                        <ul className="flex p-1">
                            <li className="nav-link" onClick={() => handleScroll('services')}>
                                <span>Services</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('work')}>
                                <span>Work</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('experience')}>
                                <span>Experience</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('clients')}>
                                <span>Clients</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('expertise')}>
                                <span>Expertise</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('education')}>
                                <span>Education</span>
                            </li>
                            <li className="nav-link" onClick={() => handleScroll('contact')}>
                                <span>Contact</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/5">
                        <div className="flex justify-end">
                            <a className="btn flex gap-2 items-center" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-user"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 18a3 3 0 1 0-6 0"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="13" r="2"/></svg>
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        // <nav className="navbar bg-base-100">
        //     <div className="navbar-start">
        //         <div className="dropdown">
        //             <label tabIndex={0} className="btn btn-ghost lg:hidden">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        //                 </svg>
        //             </label>
        //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //                 <li>
        //                     <a href='#hey'>Hey</a>
        //                 </li>
        //                 <li>
        //                     <a href='#services'>Services</a>
        //                 </li>
        //                 <li>
        //                     <a href='#work'>Work</a>
        //                 </li>
        //                 <li>
        //                     <a href='#experience'>Experience</a>
        //                 </li>
        //                 <li>
        //                     <a href='#publications'>Publications</a>
        //                 </li>
        //                 <li>
        //                     <a href='#expertise'>Expertise</a>
        //                 </li>
        //                 <li>
        //                     <a href='#education'>Education</a>
        //                 </li>
        //                 <li>
        //                     <a href='#contact'>Contact</a>
        //                 </li>
        //             </ul>
        //         </div>
        //         <a className="btn btn-ghost text-secondary normal-case text-xl" href='https://www.linkedin.com/in/billypentester'>billypentester</a>
        //     </div>
        //     <div className="navbar-center hidden lg:flex">
        //         <ul className="menu menu-horizontal px-1">
        //             <li>
        //                 <a href='#hey'>Hey</a>
        //             </li>
        //             <li>
        //                 <a href='#services'>Services</a>
        //             </li>
        //             <li>
        //                 <a href='#work'>Work</a>
        //             </li>
        //             <li>
        //                 <a href='#experience'>Experience</a>
        //             </li>
        //             <li>
        //                 <a href='#publications'>Publications</a>
        //             </li>
        //             <li>
        //                 <a href='#expertise'>Expertise</a>
        //             </li>
        //             <li>
        //                 <a href='#education'>Education</a>
        //             </li>
        //             <li>
        //                 <a href='#contact'>Contact</a>
        //             </li>
        //         </ul>
        //     </div>
        //     <div className="navbar-end">
        //         <a className="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        //             {/* <Icons type='file' paint="h-4 w-4  text-base-100"/> */}
        //             <span className="hidden md:block me-2 text-base-100">Resume</span>
        //         </a>
        //     </div>
        // </nav>
    )
}
