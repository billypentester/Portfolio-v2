import React from 'react'
import { data, structuredData } from '@/src/config/data'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificates | Bilal Ahmad - Software Engineer',
  description: 'View certifications earned by Bilal Ahmad in software engineering, full-stack development, cloud computing, and security testing. Demonstrating continuous learning and expertise in modern technologies.',
}

const page = () => {

  const { cert } = data
  const { certificationsBreadcrumbSchema } = structuredData

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(certificationsBreadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <header className="flex flex-col gap-4 mb-20 text-center">
        <h3 className="text-primary text-2xl">Proudly Showcasing My</h3>
        <h1 className="font-bold text-secondary text-5xl">Certificates & Achievements</h1>
        <h2 className="text-accent text-2xl">Milestones in My Learning Journey</h2>
      </header>
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              cert.map((item, index)=> {
                return (
                  <div key={index}>
                    <Image src={item.image} alt={item.title} loading="lazy" className='card rounded-md object-cover object-left-top shadow h-full' />
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