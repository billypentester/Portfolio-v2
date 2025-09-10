import React from 'react'
import { data } from '@/src/config/data'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificates | Bilal Ahmad - Software Engineer',
  description: 'View certifications earned by Bilal Ahmad in software engineering, full-stack development, cloud computing, and security testing. Demonstrating continuous learning and expertise in modern technologies.',
}

const page = () => {

  const { cert } = data

  return (
    <section>
      <header className="flex flex-col gap-4 mb-20 text-center">
        <h3 className="text-primary text-2xl">Proudly Showcasing My</h3>
        <h1 className="font-bold text-secondary text-5xl">Certificates & Achievements</h1>
        <h2 className="text-primary text-2xl">Milestones in My Learning Journey</h2>
      </header>
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-3 gap-5">
            {
              cert.map((item)=> {
                return (
                  <div>
                    <Image src={item.image} alt={item.title} loading="lazy" className='rounded-md object-cover object-left-top shadow-primary shadow-lg h-full' />
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