'use client'
import { useEffect, useState } from "react"
import IconBuilder from "@/src/helpers/IconBuilder";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWindowDimensions from "../../helpers/screenDimension";
import { PAGE_LIST } from "@/src/lib/constants";

export default function Navbar({ identity_keyword, isMobileDevice }: { identity_keyword: string, isMobileDevice: boolean }) {

    const [isScrolled, setIsScrolled] = useState(false);
    const { width } = useWindowDimensions()
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                <nav className="fixed bottom-5 left-0 z-40 w-full px-5">
                    <ul className="flex justify-between align-middle px-6 py-3 glass-effect border-radius">
                        {
                            PAGE_LIST.map((page, index) => (
                                <Link href={page.link} key={index}>
                                    <li key={page.name} className="mobile-tab p-0!">
                                        <IconBuilder type={page.icon} paint='h-6 w-6 text-accent' />
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </nav>
                <div className="fixed bottom-0 left-0 z-30 w-full h-24 bg-linear-to-t from-gray-100 to-transparent pointer-events-none"></div>

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
                    <div className="flex-1 bg-base-100 tabs shadow">
                        <ul className="flex p-1 gap-2">
                            {
                                PAGE_LIST.map((page, index) => (
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
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <button className="btn btn-accent">
                                    <IconBuilder type="file" paint="h-4 w-4 mr-2" />
                                    <span>Resume</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
