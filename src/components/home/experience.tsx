import React from 'react'
import ColorSection from '../../layouts/ColorSection'
import Image from 'next/image'
import { BLUR_IMAGE_DATA, EXPERIENCE_HEADING } from '@/src/lib/constants'
import { data } from '@/src/config/data'
import { experienceInterface } from '../../lib/interface'
import { dateFormatter, yearDifference } from '../../utils'

const Experience = () => {

    const { experience } = data

    if(!experience || experience.length === 0) return null

    return (
        <ColorSection id='experience' title={EXPERIENCE_HEADING}>
            <div className="grid grid-cols-1 gap-2 my-10">
                {
                    experience.map((item: experienceInterface, index: number) => (
                        <React.Fragment key={item.id}>
                            <section className={`flex flex-1 flex-col sm:flex-row justify-between my-1 ${index !== experience.length - 1 ? 'pb-4 divider' : ''}`}>
                                <div className="me-5 mb-5 sm:mb-0">
                                    <div className='p-1 rounded-full w-16 h-16 flex items-center justify-center shadow'>
                                        <Image 
                                            src={item.logo} 
                                            alt={item.title} 
                                            className="rounded-full shadow" 
                                            loading="lazy" 
                                            placeholder="blur"
                                            blurDataURL={BLUR_IMAGE_DATA}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <h3 className='text-xl sm:text-2xl font-semibold text-secondary'> {item.title} </h3>
                                        <h4 className='text-md sm:text-lg font-medium hidden sm:block text-primary'> {dateFormatter(item.startTime)} - {item.currentlyWorking ? 'Present' : dateFormatter(item.endTime)} </h4>
                                    </div>
                                    <h3 className='text-lg mg:text-xl font-medium'> {item.company} </h3>
                                    <h4 className='text-md sm:text-lg'> {item.location} </h4>
                                    <h4 className='text-md sm:text-lg font-medium block sm:hidden'> {yearDifference(item.startTime, item.endTime, item.currentlyWorking)} year </h4>
                                </div>  
                            </section>
                        </React.Fragment>
                    ))
                }
            </div>
        </ColorSection>
    )
}

export default Experience
