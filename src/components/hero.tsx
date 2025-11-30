import Image from 'next/image'
import { data } from '@/src/config/data'
import Icon from '@/src/helpers/IconBuilder'
import { HERO_CHAT_START, HERO_HEADING_END, HERO_HEADING_START, HERO_STARTER } from '@/src/config/constants'
import Link from 'next/link'
import { capitalized } from '../lib/utils'
import { socialLinksInterface } from '../lib/interface'

export default function Hero() {

    const { first_name, profile_pic, socialLinks, identity_keyword } = data

    return (
        <header id="hey" className="my-20 mx-10">
            <div className="flex items-center justify-between">
                <div className='me-0 lg:me-2'>
                    <h1 className='text-xl text-primary font-medium'> 
                        {HERO_STARTER} 
                        <span className='text-secondary font-semibold'>{" " + first_name}</span> 
                    </h1>
                    <h2 className='text-5xl tracking-tight text-primary leading-tight font-semibold my-3'> 
                        {HERO_HEADING_START} 
                        <br /> 
                        {HERO_HEADING_END} 
                    </h2>
                    <div className="flex items-center flex-col sm:flex-row">
                        <p className='me-5 text-lg text-secondary font-medium mb-4 sm:mb-0'> 
                            {HERO_CHAT_START} 
                        </p>
                        <div className="flex items-center space-x-5">
                            {
                                socialLinks.map((url: socialLinksInterface) => (
                                    <Link href={url.url} key={url.name} target="_blank">
                                        <button title={capitalized(url.name)} name={capitalized(url.name)} className='tooltip tooltip-bottom tooltip-secondary bg-base-100 text-secondary p-3 rounded-full shadow transition duration-500 ease-in-out'>
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
                    <Image src={profile_pic} alt={identity_keyword} className='w-72 h-72 profile-pic' loading="lazy"/>
                </div>
            </div>
        </header>
    )
}
