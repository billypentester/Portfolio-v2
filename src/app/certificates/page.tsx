import React from 'react'
import { data, structuredData } from '@/src/config/data'
import Image from 'next/image'
import { Metadata } from 'next'
import { BLUR_IMAGE_DATA } from '@/src/lib/constants'
import { PAGE_HEADER } from '@/src/lib/constants'
import Starter from '@/src/components/shared/starter'

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
      <Starter starter={PAGE_HEADER.certifications.starter} heading={PAGE_HEADER.certifications.heading} flavour={PAGE_HEADER.certifications.flavour} />
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              cert.length > 0 &&
              cert.map((item, index)=> {
                return (
                  <div key={index}>
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy" 
                      className='card rounded-md object-cover object-top-left shadow h-full' 
                      placeholder="blur"
                      blurDataURL={BLUR_IMAGE_DATA}
                      width={800}
                      height={600}
                    />
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