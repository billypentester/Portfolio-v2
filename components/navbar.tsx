'use client'
import {  useEffect, useState } from "react"

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

    return (
        <>
            <nav className={`fixed top-0 left-0 z-40 w-full bg-background ${isScrolled ? 'navbar-shadow' : 'shadow-none'}`}>
                <div className="p-5 custom-container">
                    <div className="flex items-center justify-between xl:gap-5">
                        <button onClick={()=>setNavOpen(value => !value)} className="text-xl font-bold text-secondary block xl:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                                <line x1="4" x2="20" y1="12" y2="12"/>
                                <line x1="4" x2="20" y1="6" y2="6"/>
                                <line x1="4" x2="20" y1="18" y2="18"/>
                            </svg>
                        </button>
                        <div className="mx-2 xl:m-0">
                            <button onClick={()=>scrollToTop()} className="text-xl font-bold text-secondary">{identity_keyword}</button>
                        </div>
                        <div className="flex-1 bg-surface nav-list hidden xl:block xl:flex-none">
                            <ul className="flex p-1 gap-2">
                                <li className={`nav-link ${activeTab == "services" ? "nav-active" : ""}`} onClick={() => handleScroll('services')}>
                                    <span>Services</span>
                                </li>
                                <li className={`nav-link ${activeTab == "work" ? "nav-active" : ""}`} onClick={() => handleScroll('work')}>
                                    <span>Work</span>
                                </li>
                                <li className={`nav-link ${activeTab == "experience" ? "nav-active" : ""}`} onClick={() => handleScroll('experience')}>
                                    <span>Experience</span>
                                </li>
                                <li className={`nav-link ${activeTab == "clients" ? "nav-active" : ""}`} onClick={() => handleScroll('clients')}>
                                    <span>Clients</span>
                                </li>
                                <li className={`nav-link ${activeTab == "expertise" ? "nav-active" : ""}`} onClick={() => handleScroll('expertise')}>
                                    <span>Expertise</span>
                                </li>
                                <li className={`nav-link ${activeTab == "education" ? "nav-active" : ""}`} onClick={() => handleScroll('education')}>
                                    <span>Education</span>
                                </li>
                                <li className={`nav-link ${activeTab == "contact" ? "nav-active" : ""}`} onClick={() => handleScroll('contact')}>
                                    <span>Contact</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 xl:flex-none">
                            <div className="flex justify-end">
                                <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-user mr-2">
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                                        <path d="M15 18a3 3 0 1 0-6 0"/>
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
                                        <circle cx="12" cy="13" r="2"/>
                                    </svg>
                                    <span>Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`fixed top-0 left-0 z-50 w-full h-full backdrop-blur-2xl ${navOpen ? 'block' : 'hidden'}`} style={{ height: '100vh' }}>
                <div className="px-5 py-8">
                    <div className="flex justify-between mb-5">
                        <button onClick={()=>scrollToTop()} className="text-xl font-bold text-secondary">{identity_keyword}</button>
                        <button onClick={()=>setNavOpen(value => !value)} className="text-xl font-bold text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                <line x1="18" x2="6" y1="6" y2="18"/>
                                <line x1="6" x2="18" y1="6" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 bg-surface nav-list shadow-sm">
                        <ul className="flex p-1 gap-2 flex-col">
                            <li className={`nav-link ${activeTab == "services" ? "nav-active" : ""}`} onClick={() => handleScroll('services')}>
                                <span>Services</span>
                            </li>
                            <li className={`nav-link ${activeTab == "work" ? "nav-active" : ""}`} onClick={() => handleScroll('work')}>
                                <span>Work</span>
                            </li>
                            <li className={`nav-link ${activeTab == "experience" ? "nav-active" : ""}`} onClick={() => handleScroll('experience')}>
                                <span>Experience</span>
                            </li>
                            <li className={`nav-link ${activeTab == "clients" ? "nav-active" : ""}`} onClick={() => handleScroll('clients')}>
                                <span>Clients</span>
                            </li>
                            <li className={`nav-link ${activeTab == "expertise" ? "nav-active" : ""}`} onClick={() => handleScroll('expertise')}>
                                <span>Expertise</span>
                            </li>
                            <li className={`nav-link ${activeTab == "education" ? "nav-active" : ""}`} onClick={() => handleScroll('education')}>
                                <span>Education</span>
                            </li>
                            <li className={`nav-link ${activeTab == "contact" ? "nav-active" : ""}`} onClick={() => handleScroll('contact')}>
                                <span>Contact</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
