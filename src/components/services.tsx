import ColorSection from '@/src/layouts/ColorSection'
import Icon from '@/src/helpers/IconBuilder'
import { SERVICE_HEADING } from '@/src/config/constants'
import { data } from '@/src/config/data'

const structuredData = (service: { title: string, description: string }) => {                
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Person",
            "name": "Bilal Ahmad"
        }
    }
    return jsonLd
}

export default function Services() {

    const { services } = data

    return (
        <ColorSection id="services" title={SERVICE_HEADING}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 my-10">
                {
                    services.map((service: any, index: number) => (
                        <section key={index}>
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(service)) }}
                            />
                            <div className="p-3 bg-surface text-primary inline-block rounded-full shadow-md mb-2 text-secondary">
                                <Icon type={service.icon} paint='h-6 w-6' />
                            </div>
                            <h3 className='text-xl sm:text-2xl font-semibold my-5 text-baseline'> {service.title} </h3>
                            <p className='text-md sm:text-lg font-medium text-baseline tracking-wider'> {service.description} </p>
                        </section>
                    ))
                }
            </div>
        </ColorSection>
    )
}
