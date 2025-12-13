import { EXPERTISE_HEADING } from "@/src/lib/constants"
import ColorSection from "../../layouts/ColorSection"
import Icons from "@/src/config/skillIcon"
import React from "react"
import { data } from "@/src/config/data"
import { expertiseInterface } from "../../lib/interface"

const Services = () => {

    const { expertise } = data

    return (
        <ColorSection id="expertise" title={EXPERTISE_HEADING}>
            <div className="grid grid-cols-1 gap-2 my-10">
                {
                    expertise.map((item: expertiseInterface, index: number) => (
                        <div key={index} className={`flex flex-1 flex-col sm:flex-row justify-between items-center pb-3 pt-1 ${index !== expertise.length - 1 ? 'divider' : ''}`}>
                            <div className="w-full sm:w-1/3 mb-5 sm:mb-0">
                                <h3 className='text-xl font-medium my-5 text-secondary'> {item.title} </h3>
                            </div>
                            <div className="w-full sm:w-2/3">
                                <div className='flex flex-wrap flex-1 justify-center sm:justify-end gap-1'>
                                    {
                                        item.skills.map((skill: string, index: number) => (
                                            <div key={index} className="bg-soft p-3 inline-block rounded-full mr-3 mb-3 xl:mb-0 shadow tooltip tooltip-secondary cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    dangerouslySetInnerHTML={{ __html: Icons[skill]?.path ?? Icons['default']?.path }}
                                                    fill="none"
                                                    viewBox={Icons[skill]?.viewBox ?? Icons['default']?.viewBox}
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
                    ))
                }
            </div>
        </ColorSection>
    )
}

export default Services
