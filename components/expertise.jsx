import ColorSection from "../layouts/ColorSection"
// import icons from "@/utils/Icon"
import { expertise } from '../data/config'
import React from "react"

const Services = () => {

    return (
        <ColorSection id="expertise" title="Expertise I have">
            <div className="grid grid-cols-1 gap-2 my-10">
                {
                    expertise.map((item, index) => (
                        <React.Fragment key={index} >
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="w-full sm:w-1/3 mb-5 sm:mb-0">
                                    <h1 className='text-2xl font-medium my-5'> {item.title} </h1>
                                </div>
                                <div className="w-full sm:w-2/3">
                                    <div className='flex flex-wrap flex-1 justify-center sm:justify-end'>
                                        {
                                            item.skills.map((skill, index) => (
                                                <div key={index} className="bg-white p-3 inline-block rounded-full mr-3 mb-3 xl:mb-0 shadow-lg tooltip cursor-pointer" data-tip={skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}>
                                                    {/* <svg dangerouslySetInnerHTML={{ __html: icons[skill.name] }} viewBox={skill.viewBox} className="w-14" fill="none" xmlns="http://www.w3.org/2000/svg"></svg> */}
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
