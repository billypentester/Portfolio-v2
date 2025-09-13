import { blogBreadcrumbSchema } from '@/src/config/schema'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Bilal Ahmad Blogs | Insights on Software Engineering, Development & Technology',
  description: 'Read blogs by Bilal Ahmad, Software Engineer, covering full-stack development, JavaScript, Next.js, Golang, system design, security testing, and modern engineering practices.',
}

const page = () => {
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
          <div className="grid grid-cols-1 gap-5">
            {
              [1,2,3,4,5,6].map((item)=> {
                return (
                  <div className='h-72 bg-surface rounded-md border-primary' key={item}>
                    
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