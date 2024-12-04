import { WORK_HEADING } from '@/data/constants'
import TransSection from '@/layouts/TransSection'
import Image from 'next/image'
import React from 'react'

const WorkCard = ({title, image}: { title: string, image: any }) => {
    return (
        <div>
            <Image src={image} alt={title} className="rounded-lg shadow-lg cursor-pointer opacity-90" loading="lazy" width={400} height={400} />
            <h3 className="text-lg text-primary font-medium m-3"> {title} </h3>
        </div>
    )
}

const Work = ({ work }: any) => {

    return (
        <TransSection id="work" title={WORK_HEADING}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {
                    work.map((work: any, index: number) => (
                        <WorkCard key={index} title={work.title} image={work.image} />
                    ))
                }
            </div>
        </TransSection>
    )
}

export default Work
