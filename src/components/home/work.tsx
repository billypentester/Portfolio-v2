import { WORK_HEADING } from '@/src/lib/constants'
import TransSection from '@/src/layouts/TransSection'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { data } from '@/src/config/data'
import { workInterface } from '../../lib/interface'

const WorkCard = ({title, image}: { title: string, image: StaticImageData }) => {
    return (
        <div>
            <Image src={image} alt={title} className="rounded-lg shadow cursor-pointer opacity-90" loading="lazy" width={400} height={400} />
            <h3 className="text-lg text-primary font-medium m-3"> {title} </h3>
        </div>
    )
}

const Work = () => {

    const { work } = data

    if(!work || work.length === 0) return null

    return (
        <TransSection id="work" title={WORK_HEADING}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {
                    work.map((work: workInterface, index: number) => (
                        <WorkCard key={index} title={work.title} image={work.image} />
                    ))
                }
            </div>
        </TransSection>
    )
}

export default Work
