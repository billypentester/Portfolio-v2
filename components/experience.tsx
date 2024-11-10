import React from 'react'
import ColorSection from '../layouts/ColorSection'
import { experience } from './../data/config'
import Image from 'next/image'

const Experience = () => {

    return (
        <ColorSection id='experience' title='My Experience'>
            <div key="woo" className="grid grid-cols-1 gap-2 my-10">
                {
                    experience.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className="flex flex-1 flex-col sm:flex-row justify-between my-1">
                                <div className="me-5 mb-5 sm:mb-0">
                                    <Image src={item.logo} alt={item.title} className="w-16 rounded-full" width={64} height={64} loading="lazy" />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <h1 className='text-2xl font-semibold'> {item.title} </h1>
                                        <h1 className='text-lg font-medium hidden sm:block'> {item.duration} </h1>
                                    </div>
                                    <h1 className='text-xl font-medium'> {item.company} </h1>
                                    <h1 className='text-lg'> {item.location} </h1>
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
