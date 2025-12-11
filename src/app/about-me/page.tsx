import IconBuilder from '@/src/helpers/IconBuilder'
import { data, structuredData } from '@/src/config/data'
import { Metadata } from 'next'
import React from 'react'
import { BLUR_IMAGE_DATA, PAGE_HEADER } from '@/src/lib/constants'
import Starter from '@/src/components/shared/starter'
import Image from 'next/image'
import ProfilePic from '@/public/images/about-me.jpeg'

export const metadata: Metadata = {
    title: 'About Bilal Ahmad | Software Engineer & Full Stack Developer',
    description: 'Learn more about Bilal Ahmad, a Software Engineer and Full Stack Developer with expertise in MERN, MEVN, and modern JavaScript frameworks. Passionate about building scalable web, mobile, and desktop applications.',
}

const page = () => {

    const { profileSchema, aboutMebreadcrumbSchema } = structuredData
    const { description } = data

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(profileSchema).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(aboutMebreadcrumbSchema).replace(/</g, '\\u003c'),
                }}
            />
            <Starter starter={PAGE_HEADER.aboutMe.starter} heading={PAGE_HEADER.aboutMe.heading} flavour={PAGE_HEADER.aboutMe.flavour} />
            <main className='my-10'>
                <div className='mx-auto max-w-5xl'>
                    <div className='flex flex-col lg:flex-row items-center gap-10 mb-10 mx-5 lg:mx-0'>          
                        <Image 
                            src={ProfilePic}
                            alt="Bilal Ahmad"
                            className='hidden lg:block lg:w-80 lg:h-80 object-cover rounded-full z-20 shadow'
                            loading="lazy" 
                            placeholder="blur"
                            blurDataURL={BLUR_IMAGE_DATA}
                        />
                        <div className='flex flex-col gap-5'>
                            <IconBuilder type='quote' paint='h-10 w-10 text-primary' />
                            <p className='text-secondary text-xl leading-relaxed lg:leading-loose max-w-3xl text-justify'>
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className='mb-10 mx-5 lg:mx-0'>
                        <h1 className='bg-secondary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                            Experience
                        </h1>
                        <div className='ms-5'>
                            <ul className='text-primary mb-5 flex flex-col gap-2'>
                                <li>
                                    <ul className='text-primary mt-1 ml-5 flex flex-col gap-5'>
                                        <li>
                                            <h3 className='font-semibold mb-3'>Simplex Techology Solutions</h3>
                                            <ul className='text-secondary mt-1 ml-5 flex flex-col gap-3'>
                                                <li>Developed and implemented coupons, discounts, taxation, and OTP-based authentication features, significantly improving system functionality and customer experience.</li>
                                                <li>Redesigned and optimized existing modules, resolved critical bugs, conducted GA integration, and implemented CRM development to ensure seamless performance and improved customer retention.</li>
                                                <li>Integrated third-party SDKs, implemented task scheduling, and managed event-based notifications, streamlining operational workflows.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className='text-primary mb-5 flex flex-col gap-2'>
                                <li>
                                    <ul className='text-primary mt-1 ml-5 flex flex-col gap-5'>
                                        <li>
                                            <h3 className='font-semibold mb-3'>Cache First</h3>
                                            <ul className='text-secondary mt-1 ml-5 flex flex-col gap-3'>
                                                <li>Spearheaded delivery of 10+ global and local projects including crypto exchange, e-commerce solution, SPAs, and CMS using MERN stack, earning 4.5+ client ratings for performance and reliability.</li>
                                                <li>Designed business oriented data models, performed automated migrations, and writing cloud SQL scripts to ensure speed, integrity, and seamless integration with dashboards logs, analytics and reports.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mb-10 flex flex-col lg:flex-row mx-5 lg:mx-0'>
                        <div className='flex-1'>
                            <h1 className='bg-primary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                                Education
                            </h1>
                            <div className='ms-5'>
                                <ul className='text-primary mb-3 flex flex-col gap-2'>
                                    <li>
                                        <ul className='text-primary mt-1 ml-5 flex flex-col gap-5'>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Bachelor of Computer Science</h3>
                                                <span className='text-sm text-secondary'>COMSATS University Islamabad, Lahore</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Intermediate of Computer Science</h3>
                                                <span className='text-sm text-secondary'>Punjab Group of Colleges, Lahore</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h1 className='bg-primary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                                Certificates
                            </h1>
                            <div className='ms-5'>
                                <ul className='text-primary mb-3 flex flex-col gap-2'>
                                    <li>
                                        <ul className='text-primary mt-1 ml-5 flex flex-col gap-5'>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Full-Stack Web Development</h3>
                                                <span className='text-sm text-secondary'>Coursera</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold text-primary'>AWS Certified Solutions Architect - Associate</h3>
                                                <span className='text-sm text-secondary'>Amazon Web Services (AWS)</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Google Data Analytics Professional Certificate</h3>
                                                <span className='text-sm text-secondary'>Google</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Certified Kubernetes Administrator (CKA)</h3>
                                                <span className='text-sm text-secondary'>Cloud Native Computing Foundation (CNCF)</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold text-primary'>Microsoft Certified: Azure Fundamentals</h3>
                                                <span className='text-sm text-secondary'>Microsoft</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mb-10 flex mx-5 lg:mx-0'>
                        <div className='w-1/2'>
                            <h1 className='bg-primary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                                Language
                            </h1>
                            <div className='ms-5'>
                                <ul className='text-primary mt-1 ml-5 flex flex-col gap-2'>
                                    <li>English</li>
                                    <li>Urdu</li>
                                    <li>Punjabi</li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <h1 className='bg-primary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                                Hobbies
                            </h1>
                            <div className='ms-5'>
                                <ul className='text-primary mt-1 ml-5 flex flex-col gap-2'>
                                    <li>Reading</li>
                                    <li>Photography</li>
                                    <li>Movies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default page