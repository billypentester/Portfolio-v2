import React from 'react'
import Icons from '@/utils/Icon'
import Image from 'next/image'

interface HeroLinksInterface {
    heroLinks: any,
    profilePic: any
}

export default function Hero({ heroLinks, profilePic }: HeroLinksInterface) {

    const capitalized = (str: any) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <header id="hey" className="my-20 mx-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='text-xl text-primary font-medium'> Hi, I'm <span className='text-secondary font-semibold'>Bilal</span> </h1>
                    <h2 className='text-5xl tracking-tight text-primary leading-tight font-semibold my-3'> I design &#38; build simple yet <br /> beautiful websites </h2>
                    <div className="flex items-center flex-col sm:flex-row">
                        <p className='me-5 text-lg text-primary font-medium mb-4 sm:mb-0'> Let's have a chat </p>
                        <div className="flex items-center space-x-5">
                            {
                                heroLinks.map((url: any) => (
                                    <button title={capitalized(url.name)} name={capitalized(url.name)} key={url.name} className='tooltip tooltip-bottom tooltip-secondary bg-primary text-baseline hover:bg-neutral hover:text-secondary p-3 rounded-full shadow-sm shadow-secondary hover:shadow-secondary transition duration-500 ease-in-out'>
                                        <a href={url.url} target="_blank">
                                            <Icons type={url.name} paint="h-6 w-6" />
                                        </a>
                                        <div className="tooltip-content">
                                            {capitalized(url.name)}
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='hidden md:inline-block'>
                    <Image src={profilePic} alt="billypentester" className='w-56 h-56 profile-pic' loading="lazy"/>
                </div>
            </div>
        </header>
    )
}
