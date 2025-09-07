import { EXPERTISE_HEADING } from "@/src/data/constants"
import ColorSection from "../layouts/ColorSection"
import Icons from "@/src/data/SkillIcon"
import React from "react"
import { data } from "@/src/data/config"

const Services = () => {

    const { expertise } = data

    return (
        <ColorSection id="expertise" title={EXPERTISE_HEADING}>
            <div className="grid grid-cols-1 gap-2 my-10">
                {
                    expertise.map((item: any, index: number) => (
                        <React.Fragment key={index} >
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="w-full sm:w-1/3 mb-5 sm:mb-0">
                                    <h3 className='text-xl font-medium my-5 text-baseline'> {item.title} </h3>
                                </div>
                                <div className="w-full sm:w-2/3">
                                    <div className='flex flex-wrap flex-1 justify-center sm:justify-end'>
                                        {
                                            item.skills.map((skill: any, index: number) => (
                                                <div key={index} className="bg-white p-3 inline-block rounded-full mr-3 mb-3 xl:mb-0 shadow-lg tooltip cursor-pointer">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        dangerouslySetInnerHTML={{ __html: Icons[skill].path }} 
                                                        fill="none" 
                                                        viewBox={Icons[skill].viewBox} 
                                                        className="w-10" 
                                                    >
                                                    </svg>
                                                    <div className="tooltip-content">
                                                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                index !== expertise.length - 1 && <div className="divider"></div>
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </ColorSection>   
    )
}

export default Services
