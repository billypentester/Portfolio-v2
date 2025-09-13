import IconBuilder from '@/src/helpers/IconBuilder'
import { aboutSchema, profileSchema } from '@/src/config/schema'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'About Bilal Ahmad | Software Engineer & Full Stack Developer',
    description: 'Learn more about Bilal Ahmad, a Software Engineer and Full Stack Developer with expertise in MERN, MEVN, and modern JavaScript frameworks. Passionate about building scalable web, mobile, and desktop applications.',
}

const page = () => {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(aboutSchema).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(profileSchema).replace(/</g, '\\u003c'),
                }}
            />
            <header className='flex flex-col gap-4 mb-10 text-center'>
                <h3 className='text-primary text-2xl'>Hello there 👋 I'm</h3>
                <h1 className='font-bold text-secondary text-5xl'>Bilal Ahmad</h1>
                <h2 className='text-primary text-2xl'>Software Engineer</h2>
            </header>
            <main className='my-10'>
                <div className='mx-auto max-w-5xl'>
                    <div className='flex flex-col lg:flex-row items-center gap-10 mb-10 mx-5 lg:mx-0'>          
                        <img src='/images/about-me.jpeg' alt='Bilal Ahmad' className='hidden lg:block lg:w-80 lg:h-80 object-cover rounded-full z-20' />
                        <div className='flex flex-col gap-5'>
                            <IconBuilder type='quote' paint='h-10 w-10 text-secondary' />
                            <p className='text-primary text-xl leading-relaxed lg:leading-loose max-w-3xl text-justify'>
                                Full-Stack Software Engineer with 3+ years of experience in designing, developing, and deploying scalable microservices
                                and robust web applications. Proficient in PostgreSQL, Redis, Node.js, Golang, and React, with a strong understanding
                                of MVC design patterns for clean code architecture, bug fixing, and documentation.
                            </p>
                        </div>
                    </div>
                    <div className='mb-10 mx-5 lg:mx-0'>
                        <h1 className='bg-primary rounded-lg block w-fit px-3 py-1 font-semibold mb-5 tracking-wider'>
                            Experience
                        </h1>
                        <div className='ms-5'>
                            <ul className='text-primary mb-5 flex flex-col gap-2'>
                                <li>
                                    <h3 className='font-semibold mb-3'>Simplex Techology Solutions</h3>
                                    <ul className='text-primary mt-1 ml-5 flex flex-col gap-3'>
                                        <li>Developed and maintained web applications using React, Node.js, and PostgreSQL, resulting in a 20% increase in user engagement. Implemented RESTful APIs and microservices architecture, improving system scalability and performance by 30%.</li>
                                        <li>Collaborated with cross-functional teams to design and deploy cloud-based solutions on AWS, reducing infrastructure costs by 15% and enhancing system reliability.</li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className='text-primary mb-5 flex flex-col gap-2'>
                                <li>
                                    <h3 className='font-semibold mb-3'>Cache First</h3>
                                    <ul className='text-primary mt-1 ml-5 flex flex-col gap-3'>
                                        <li>Developed and maintained web applications using React, Node.js, and PostgreSQL, resulting in a 20% increase in user engagement. Implemented RESTful APIs and microservices architecture, improving system scalability and performance by 30%.</li>
                                        <li>Collaborated with cross-functional teams to design and deploy cloud-based solutions on AWS, reducing infrastructure costs by 15% and enhancing system reliability.</li>
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
                                                <h3 className='font-semibold'>Bachelor of Computer Science</h3>
                                                <span className='text-sm'>COMSATS University Islamabad, Lahore</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold'>Intermediate of Computer Science</h3>
                                                <span className='text-sm'>Punjab Group of Colleges, Lahore</span>
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
                                                <h3 className='font-semibold'>Full-Stack Web Development</h3>
                                                <span className='text-sm'>Coursera</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold'>AWS Certified Solutions Architect - Associate</h3>
                                                <span className='text-sm'>Amazon Web Services (AWS)</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold'>Google Data Analytics Professional Certificate</h3>
                                                <span className='text-sm'>Google</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold'>Certified Kubernetes Administrator (CKA)</h3>
                                                <span className='text-sm'>Cloud Native Computing Foundation (CNCF)</span>
                                            </li>
                                            <li>
                                                <h3 className='font-semibold'>Microsoft Certified: Azure Fundamentals</h3>
                                                <span className='text-sm'>Microsoft</span>
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