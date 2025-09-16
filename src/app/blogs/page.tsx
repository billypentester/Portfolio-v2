import { data } from '@/src/config/data'
import { blogBreadcrumbSchema } from '@/src/config/schema'
import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bilal Ahmad Blogs | Insights on Software Engineering, Development & Technology',
  description: 'Read blogs by Bilal Ahmad, Software Engineer, covering full-stack development, JavaScript, Next.js, Golang, system design, security testing, and modern engineering practices.',
}

const page = () => {

  const { publications } = data

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <header className="flex flex-col gap-4 mb-20 text-center">
        <h3 className="text-primary text-2xl">Insights & Learnings</h3>
        <h1 className="font-bold text-secondary text-5xl">Blogs</h1>
        <h2 className="text-primary text-2xl">Sharing knowledge, thoughts, and experiences</h2>
      </header>
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              publications.map((item, index) => {
                return (
                  <div className='bg-base-100 rounded-md border-primary'>
                    <Link key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
                      <div className='p-5'>
                        <Image src={item.image} alt={item.title} className='h-48 w-full object-cover rounded-md mb-5' />
                        <h1 className='text-2xl font-bold text-secondary'>{item.title}</h1>
                        <p className='text-primary py-3'>{item.description}</p>
                        {/* // tags */}
                        <div className='flex flex-wrap gap-2'>
                          {
                            item.tags.map((tag, index) => {
                              return (
                                <span key={index} className='bg-soft text-white px-3 py-1 rounded-full text-sm'>{tag}</span>
                              )
                            }
                          )
                          }
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </main>
    </section>
  )
}

export default page