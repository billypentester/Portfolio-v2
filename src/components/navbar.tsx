'use client'
import { useEffect, useState } from "react"
import IconBuilder from "@/src/helpers/IconBuilder";
import Link from "next/link";
import useWindowDimensions from "../helpers/screenDimension";

export default function Navbar({ identity_keyword, isMobileDevice }: { identity_keyword: string, isMobileDevice: boolean }) {

    const [isScrolled, setIsScrolled] = useState(false);
    const { width } = useWindowDimensions()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const pages = [
        { name: 'About', link: '/about-me', icon: "user" },
        { name: 'Projects', link: '/projects', icon: "file" },
        { name: 'Certificates', link: '/certificates', icon: "cert" },
        { name: 'Blog', link: '/blogs', icon: "blog" },
        { name: 'Contact', link: '#contact', icon: "contact" },
    ]

    // Use server-side detection initially, then client-side width after mount
    const showMobileNav = isMounted ? width < 1024 : isMobileDevice;

    if (showMobileNav) {
        return (
            <>
                <nav className="fixed top-0 left-0 z-40 w-full bg-base-100">
                    <div className="p-3 custom-container flex justify-between items-center">
                        <Link href={'/'}>
                            <span className="text-lg font-bold text-secondary">{identity_keyword}</span>
                        </Link>
                        <a className="btn btn-accent" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                            <IconBuilder type="file" paint="h-4 w-4 mr-2" />
                            <span>Resume</span>
                        </a>
                    </div>
                </nav>
                {/* Bottom Navbar */}
                <nav className="fixed bottom-0 left-0 z-40 w-full bg-base-100 px-6 py-2">
                    <ul className="flex justify-between align-middle p-1 gap-2">
                        {
                            pages.map((page, index) => (
                                <Link href={page.link} key={index}>
                                    <li key={page.name} className="tab !p-0 hover:bg-transparent">
                                        <IconBuilder type={page.icon} paint='h-6 w-6 text-accent' />
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </nav>
            </>
        )
    }

    return (
        <nav className={`fixed top-0 left-0 z-40 w-full  ${isScrolled ? 'shadow glass-effect' : 'shadow-none'}`}>
            <div className="p-5 custom-container">
                <div className="flex items-center justify-between xl:gap-5">
                    <div className="flex-1 mx-2 xl:m-0">
                        <Link href={'/'}>
                            <span className="text-xl font-bold text-secondary hover:bg-primary">{identity_keyword}</span>
                        </Link>
                    </div>
                    <div className="flex-1 bg-soft tabs shadow">
                        <ul className="flex p-1 gap-2">
                            {
                                pages.map((page, index) => (
                                    <Link href={page.link} key={index}>
                                        <li key={page.name} className="tab">
                                            <span>{page.name}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-end">
                            <a className="btn btn-accent" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <IconBuilder type="file" paint="h-4 w-4 mr-2" />
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
