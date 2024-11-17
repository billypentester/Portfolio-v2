import React from 'react'
import ColorSection from '../layouts/ColorSection'
import Image from 'next/image'

const structuredData = (data: any) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "legalName": data.company,
        "location": data.location,
    }
    return jsonLd
}

const dateFormatter = (date: string) : string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
    return new Date(date).toLocaleDateString('en-US', options)
}

const yearDifference = (start: string, end: string) : number => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return endDate.getFullYear() - startDate.getFullYear()
}

const Experience = ({ experience }: any) => {

    return (
        <ColorSection id='experience' title='My Experience'>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(experience)) }}
            />

            <div className="grid grid-cols-1 gap-2 my-10">
                {
                    experience.map((item: any, index: number) => (
                        <React.Fragment key={item.id}>
                            <div className="flex flex-1 flex-col sm:flex-row justify-between my-1">
                                <div className="me-5 mb-5 sm:mb-0">
                                    <Image src={item.logo} alt={item.title} className="w-16 rounded-full" width={64} height={64} loading="lazy" />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <h2 className='text-xl sm:text-2xl font-semibold text-baseline'> {item.title} </h2>
                                        <h3 className='text-md sm:text-lg font-medium hidden sm:block text-baseline'> {dateFormatter(item.startTime)} - {item.currentlyWorking ? 'Present' : dateFormatter(item.endTime)} </h3>
                                    </div>
                                    <h1 className='text-lg mg:text-xl font-medium text-baseline'> {item.company} </h1>
                                    <h1 className='text-md sm:text-lg text-baseline'> {item.location} </h1>
                                    <h3 className='text-md sm:text-lg font-medium block sm:hidden text-baseline'> {yearDifference(item.startTime, item.currentlyWorking ? Date.now() : item.endTime)} year </h3>
                                </div>  
                            </div>
                            {
                                index !== experience.length - 1 && <div className="divider"></div>
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </ColorSection>
    )
}

export default Experience
