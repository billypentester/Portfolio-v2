import TransSection from '../layouts/TransSection'
import Image from 'next/image'

const structuredData = (data: any) => {
  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": data.name,
      "logo": data.image,
  }
  return jsonLd
}

const Education = ({ clients }: any) => {

  return (
    <TransSection id="clients" title={'Who I\'ve Worked With'}>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 place-items-center">
        {
          clients.map((client: any) => {
            return(
              <div key={client.id} className="p-10 client-logo">
                 <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(client)) }}
                  />
                  <Image src={client.image} alt={client.name} height={'130'} className='object-cover' loading="lazy" />
              </div>
            )
          })
        }
      </div>
    </TransSection>
  )
}

export default Education
