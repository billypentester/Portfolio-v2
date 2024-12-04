import React from 'react'
import Image from 'next/image'

import Icon from '@/helpers/IconBuilder'
import { HERO_CHAT_START, HERO_HEADING_END, HERO_HEADING_START, HERO_STARTER } from '@/data/constants'
import Link from 'next/link'

interface HeroLinksInterface {
    heroLinks: any,
    profilePic: string,
    first_name: string
}

const structuredData = () => {
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "ProfessionalService",
        "name": "Software Services",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "393 H1 Johar Town",
          "addressLocality": "Lahore",
          "addressRegion": "LHR",
          "postalCode": "55150",
          "addressCountry": "PK"
        },
        "telephone": "923324187624",
        "priceRange": "$$$",
        "url": "https://billypentester.pk"
    }
    return jsonLd
}

const structuredData2 = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "image": "https://billypentester.pk/images/profile.webp",
        "name": "Bilal Ahmad",
        "url": "https://billypentester.pk",
        "jobTitle": "Software Engineer",
        "description": "I am a software engineer with a passion for web development and cybersecurity. I have a strong background in computer science and have worked on various projects in the past. I am always looking for new opportunities to learn and grow as a developer.",
        "sameAs": [
            "https://linkedin.com/in/billypentester",
            "https://github.com/billypentester",
            "https://twitter.com/billypentester"
        ]
    }
    return jsonLd
}

export default function Hero({ heroLinks, profilePic, first_name }: HeroLinksInterface) {

    const capitalized = (str: any) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <header id="hey" className="my-20 mx-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData2()) }}
            />
            <div className="flex items-center justify-between">
                <div className='me-0 lg:me-2'>
                    <h1 className='text-xl text-primary font-medium'> {HERO_STARTER} <span className='text-secondary font-semibold'>{first_name}</span> </h1>
                    <h2 className='text-5xl tracking-tight text-primary leading-tight font-semibold my-3'> {HERO_HEADING_START} <br /> {HERO_HEADING_END} </h2>
                    <div className="flex items-center flex-col sm:flex-row">
                        <p className='me-5 text-lg text-primary font-medium mb-4 sm:mb-0'> {HERO_CHAT_START} </p>
                        <div className="flex items-center space-x-5">
                            {
                                heroLinks.map((url: any) => (
                                    <Link href={url.url} key={url.name} target="_blank">
                                        <button title={capitalized(url.name)} name={capitalized(url.name)} className='tooltip tooltip-bottom tooltip-secondary bg-primary text-baseline p-3 rounded-full shadow-2xl transition duration-500 ease-in-out'>
                                            <Icon type={url.name} paint='h-6 w-6' />
                                            <div className="tooltip-content">
                                                {capitalized(url.name)}
                                            </div>
                                        </button>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='hidden lg:inline-block'>
                    <Image src={profilePic} alt="billypentester" className='w-56 h-56 profile-pic' loading="lazy"/>
                </div>
            </div>
        </header>
    )
}
