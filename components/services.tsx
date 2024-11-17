import ColorSection from '@/layouts/ColorSection'
import Icons from '@/utils/Icon'

interface ServicesInterface {
    services: any
}

export default function Services({ services }: ServicesInterface) {

    return (
        <ColorSection id="services" title="Services I Offer">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 my-10">
                {
                    services.map((service: any, index: number) => (
                        <div key={index}>
                            <div className="p-3 bg-surface text-primary inline-block rounded-full shadow-md mb-2 text-secondary">
                                <Icons type={service.icon} paint='h-6 w-6' />
                            </div>
                            <h2 className='text-xl sm:text-2xl font-semibold my-5 text-baseline'> {service.title} </h2>
                            <p className='text-md sm:text-lg font-medium text-baseline'> {service.description} </p>
                        </div>
                    ))
                }
            </div>
        </ColorSection>
    )

}
