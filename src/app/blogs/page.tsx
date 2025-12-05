import { data } from '@/src/config/data'
import { structuredData } from '@/src/config/data'
import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Starter from '@/src/components/shared/starter'
import { BLUR_IMAGE_DATA, PAGE_HEADER } from '@/src/lib/constants'

export const metadata: Metadata = {
  title: 'Bilal Ahmad Blogs | Insights on Software Engineering, Development & Technology',
  description: 'Read blogs by Bilal Ahmad, Software Engineer, covering full-stack development, JavaScript, Next.js, Golang, system design, security testing, and modern engineering practices.',
}

const page = () => {

  const { publications } = data
  const { blogBreadcrumbSchema } = structuredData

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Starter starter={PAGE_HEADER.blogs.starter} heading={PAGE_HEADER.blogs.heading} flavour={PAGE_HEADER.blogs.flavour} />
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              publications.map((item, index) => {
                return (
                  <div key={index} className='card bg-base-100 rounded-md border-primary shadow'>
                    <Link key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
                      <div className='p-3'>
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          className='card h-60 w-full object-cover rounded-md mb-5 shadow' 
                          loading="lazy" 
                          placeholder="blur"
                          blurDataURL={BLUR_IMAGE_DATA}
                        />
                        <div className='px-5 pb-3'>
                          <h1 className='text-2xl font-bold text-secondary'>{item.title}</h1>
                          <p className='text-primary py-3'>{item.description}</p>
                          <div className='flex flex-wrap gap-2'>
                            {
                              item.tags.map((tag, index) => {
                                return (
                                  <span key={index} className='bg-soft px-3 py-1 rounded-full text-sm'>{tag}</span>
                                )
                              })
                            }
                          </div>
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