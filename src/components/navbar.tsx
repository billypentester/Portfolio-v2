'use client'
import {  useEffect, useState } from "react"
import IconBuilder from "@/src/helpers/IconBuilder";
import Link from "next/link";

export default function Navbar({ identity_keyword }: any) {

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // block scroll when nav is open

    useEffect(() => {
        if(navOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [navOpen]);

    const handleScroll = (tab: string) => {
        setActiveTab(tab);
        if(navOpen) {
            setNavOpen(value => !value);
        }
        const element = document.getElementById(tab);
        window.location.hash = tab;
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 150,
            behavior: 'smooth',
          });
        }
    };

    const scrollToTop = () => {
        setActiveTab('');
        if(navOpen) {
            setNavOpen(value => !value);
        }
        window.location.hash = ''
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const pages = [
        { name: 'About', link: '/about-me' },
        { name: 'Projects', link: '/projects' },
        { name: 'Certificates', link: '/certificates' },
        { name: 'Blog', link: '/blogs' },
        { name: 'Contact', link: '#contact' }
    ]

    return (
        <>
            <nav className={`fixed top-0 left-0 z-40 w-full  ${isScrolled ? 'navbar-shadow glass-effect' : 'shadow-none'}`}>
                <div className="p-5 custom-container">
                    <div className="flex items-center justify-between xl:gap-5">
                        <button onClick={()=>setNavOpen(value => !value)} className="text-xl font-bold text-secondary block xl:hidden">
                            <IconBuilder type="bars" paint="h-5 w-5" />
                        </button>
                        <div className="mx-2 xl:m-0">
                            <Link href={'/'}>
                                <span className="text-xl font-bold text-secondary">{identity_keyword}</span>
                            </Link>
                        </div>
                        <div className="flex-1 bg-surface nav-list hidden xl:block xl:flex-none shadow-sm border border-1 border-gray-800">
                            <ul className="flex p-1 gap-2">
                                {
                                    pages.map((page, index) => (
                                        <Link href={page.link} key={index}>
                                            <li key={page.name} className="nav-link">
                                                <span>{page.name}</span>
                                            </li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex-1 xl:flex-none">
                            <div className="flex justify-end">
                                <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                    <IconBuilder type="file" paint="h-4 w-4 mr-2" />
                                    <span>Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav */}

            <div className={`fixed top-0 left-0 z-50 w-full h-full backdrop-blur-2xl ${navOpen ? 'block' : 'hidden'}`} style={{ height: '100vh' }}>
                <div className="px-5 py-8 mob-nav-container">
                    <div className="flex justify-between mb-5">
                        <button onClick={()=>scrollToTop()} className="text-xl font-bold text-secondary">{identity_keyword}</button>
                        <button onClick={()=>setNavOpen(value => !value)} className="text-xl font-bold text-secondary">
                            <IconBuilder type="close" paint="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 bg-surface nav-list shadow-sm">
                        <ul className="flex p-1 gap-2 flex-col">
                            {
                                pages.map((page) => (
                                    <Link href={page.link} key={page.name}>
                                        <li key={page.name} className="nav-link">
                                            <span>{page.name}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
