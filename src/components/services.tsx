import ColorSection from '@/src/layouts/ColorSection'
import Icon from '@/src/helpers/IconBuilder'
import { SERVICE_HEADING } from '@/src/config/constants'
import { data } from '@/src/config/data'
import { servicesInterface } from '../interface'

export default function Services() {

    const { services } = data

    if(!services || services.length === 0) return null

    return (
        <ColorSection id="services" title={SERVICE_HEADING}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 my-10">
                {
                    services.map((service: servicesInterface, index: number) => (
                        <section key={index}>
                            <div className="p-3 bg-soft inline-block rounded-full shadow mb-2 text-secondary">
                                <Icon type={service.icon} paint='h-6 w-6' />
                            </div>
                            <h3 className='text-xl sm:text-2xl font-semibold my-5 text-secondary'> {service.title} </h3>
                            <p className='text-md sm:text-lg tracking-wider'> {service.description} </p>
                        </section>
                    ))
                }
            </div>
        </ColorSection>
    )
}
