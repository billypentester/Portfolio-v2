'use client'
import {  useEffect, useState } from "react"
import IconBuilder from "@/helpers/IconBuilder";

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

    const structuredData = () => {
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":
            [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "https://billypentester.pk",
                        "name": "Home"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item":
                    {
                        "@id": "https://billypentester.pk/#services",
                        "name": "Services"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item":
                    {
                        "@id": "https://billypentester.pk/#experience",
                        "name": "Experience"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item":
                    {
                        "@id": "https://billypentester.pk/#clients",
                        "name": "Clients"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item":
                    {
                        "@id": "https://billypentester.pk/#contact",
                        "name": "Contact"
                    }
                }
            ]
        }
        return jsonLd
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
            />
            <nav className={`fixed top-0 left-0 z-40 w-full bg-background ${isScrolled ? 'navbar-shadow' : 'shadow-none'}`}>
                <div className="p-5 custom-container">
                    <div className="flex items-center justify-between xl:gap-5">
                        <button onClick={()=>setNavOpen(value => !value)} className="text-xl font-bold text-secondary block xl:hidden">
                            <IconBuilder type="bars" paint="h-5 w-5" />
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
