import ColorSection from '@/layouts/ColorSection'
import Icons from '@/utils/Icon'

export default function Services() {

    const services = [
        {
            title: 'Full Stack Development',
            description: 'I design and build beautiful websites using ReactJS, NextJS, TailwindCSS, and other modern technologies.',
            icon: 'web'
        },
        {
            title: 'Database Development',
            description: 'I develop and maintain databases using MongoDB, MySQL, and other modern technologies.',
            icon: 'database'
        },
        {
            title: 'Blockchain Development',
            description: 'I develop and maintain blockchain applications using Ethereum, Solidity, and other modern technologies.',
            icon: 'blockchain'
        }
    ]

    return (
        <ColorSection id="services" title="Services I Offer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                {
                    services.map((service, index) => (
                        <div key={index}>
                            <div className="p-3 bg-surface text-primary inline-block rounded-full shadow-sm shadow-secondary mb-2 text-secondary">
                                <Icons type={service.icon} paint='h-6 w-6' />
                            </div>
                            <h1 className='text-2xl font-medium my-5 text-baseline'> {service.title} </h1>
                            <p className='text-lg font-medium text-baseline'> {service.description} </p>
                        </div>
                    ))
                }
            </div>
        </ColorSection>
    )

}
