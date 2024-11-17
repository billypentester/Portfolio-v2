import React from 'react'
import Icons from '@/utils/Icon'
import Image from 'next/image'

interface HeroLinksInterface {
    heroLinks: any,
    profilePic: string,
    first_name: string
}

export default function Hero({ heroLinks, profilePic, first_name }: HeroLinksInterface) {

    const capitalized = (str: any) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <header id="hey" className="my-20 mx-10">
            <div className="flex items-center justify-between">
                <div className='me-0 lg:me-2'>
                    <h1 className='text-xl text-primary font-medium'> Hi, I'm <span className='text-secondary font-semibold'>{first_name}</span> </h1>
                    <h2 className='text-5xl tracking-tight text-primary leading-tight font-semibold my-3'> I design &#38; build simple yet <br /> beautiful websites </h2>
                    <div className="flex items-center flex-col sm:flex-row">
                        <p className='me-5 text-lg text-primary font-medium mb-4 sm:mb-0'> Let's have a chat </p>
                        <div className="flex items-center space-x-5">
                            {
                                heroLinks.map((url: any) => (
                                    <button title={capitalized(url.name)} name={capitalized(url.name)} key={url.name} className='tooltip tooltip-bottom tooltip-secondary bg-primary text-baseline p-3 rounded-full shadow-2xl transition duration-500 ease-in-out'>
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
                <div className='hidden lg:inline-block'>
                    <Image src={profilePic} alt="billypentester" className='w-56 h-56 profile-pic' loading="lazy"/>
                </div>
            </div>
        </header>
    )
}
