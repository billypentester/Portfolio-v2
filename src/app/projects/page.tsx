import { data } from '@/src/config/data'
import { projectsInterface } from '@/src/interface'
import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { projectBreadcrumbSchema } from '@/src/config/schema'

export const metadata: Metadata = {
    title: 'Projects | Bilal Ahmad - Full Stack Software Engineer',
    description: 'Explore projects by Bilal Ahmad, a Software Engineer specializing in full-stack development. Featuring web apps, mobile apps, payment integrations, CRMs, and scalable software solutions.',
}

const page = () => {

  const { projects } = data

  return (
    <section>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectBreadcrumbSchema).replace(/</g, '\\u003c'),
          }}
      />
      <header className="flex flex-col gap-4 mb-20 text-center">
        <h3 className="text-primary text-2xl">Take a Look at My</h3>
        <h1 className="font-bold text-secondary text-5xl">Projects</h1>
        <h2 className="text-primary text-2xl">Turning ideas into real-world solutions</h2>
      </header>
      <main className='my-10'>
        <div className='mx-auto max-w-5xl'>
          <div className='w-full'>
            <div className="grid grid-cols-1 gap-5">
              {
                projects.map((item: projectsInterface, index: number)=> {
                  return (
                    <div key={index} className='h-96 rounded-md bg-surface shadpow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer'>
                      <div className='flex h-full p-2 gap-3'>
                        <div className='hidden lg:flex lg:flex-1 p-5 flex-col justify-between'>
                          <div>
                            <h2 className='text-2xl font-bold text-secondary mb-2'>{item.title}</h2>
                            <p className='text-primary mb-4'>{item.description}</p>
                          </div>
                          <div className='flex flex-wrap gap-2'>
                            {
                              item.tags.map((tag: string, idx: number) => (
                                <span key={idx} className='bg-primary text-white px-3 py-1 rounded-full text-sm'>{tag}</span>
                              ))
                            }
                          </div>
                        </div>
                        <div className='flex-1 h-full'>
                          <Image src={item.image} alt={item.title} className='w-full h-full object-cover object-left-top rounded-md shadow-md' />
                        </div>
                      </div>
                    </div>
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