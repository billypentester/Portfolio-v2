import { data, structuredData } from '@/src/config/data'
import { projectsInterface } from '@/src/lib/interface'
import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { BLUR_IMAGE_DATA, PAGE_HEADER } from '@/src/lib/constants'
import Starter from '@/src/components/shared/starter'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Projects | Bilal Ahmad - Full Stack Software Engineer',
    description: 'Explore projects by Bilal Ahmad, a Software Engineer specializing in full-stack development. Featuring web apps, mobile apps, payment integrations, CRMs, and scalable software solutions.',
}

const page = () => {

  const { projects } = data
  const { projectBreadcrumbSchema } = structuredData

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectBreadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Starter starter={PAGE_HEADER.projects.starter} heading={PAGE_HEADER.projects.heading} flavour={PAGE_HEADER.projects.flavour} />
      <main className='my-10'>
        <div className='mx-auto max-w-6xl'>
          <div className='w-full'>
            <div className="grid grid-cols-1 gap-8">
              {
                projects.map((item: projectsInterface, index: number)=> {
                  return (
                    <Link href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
                      <div className='card h-96 rounded-md bg-base-100 shadow transition-shadow duration-300 ease-in-out cursor-pointer'>
                        <div className={`flex justify-between h-full p-2 gap-5 ${index % 2 === 0 ? 'flex-row' : 'flex-col lg:flex-row-reverse'}`}>
                          <div className='hidden lg:block w-full lg:w-2/5 p-5 flex-col justify-between relative'>
                            <div>
                              <h2 className='text-4xl font-bold text-secondary mb-2'>{item.title}</h2>
                              <p className='text-primary my-4 text-lg'>{item.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 absolute bottom-3 left-5">
                              {
                                item.tags.map((tag: string, idx: number) => (
                                  <span key={idx} className='bg-soft px-3 py-1 rounded-full text-sm'>{tag}</span>
                                ))
                              }
                            </div>
                          </div>
                          <div className='w-full lg:w-3/5 h-full'>
                            <Image 
                              src={item.image} 
                              alt={item.title} 
                              className='card w-full h-full object-cover object-top-left rounded-md shadow' 
                              loading="lazy" 
                              placeholder="blur"
                              blurDataURL={BLUR_IMAGE_DATA}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default page