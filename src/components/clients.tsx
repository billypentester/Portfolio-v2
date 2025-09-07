import { CLIENT_HEADING } from '@/src/data/constants'
import TransSection from '../layouts/TransSection'
import Image from 'next/image'
import Link from 'next/link'
import { data } from '@/src/data/config'

const Education = () => {

  const { clients } = data

  const structuredData = (client: { name: string, url: string }) => {                
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": client.name,
        "url": client.url
    }
    return jsonLd
  }

  return (
    <TransSection id="clients" title={CLIENT_HEADING}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 place-items-center">
        {
          clients.map((client: any) => {
            return(
              <div key={client.id}>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(client)) }}
                />
                <Link key={client.id} href={client.url} target='_blank'>
                  <div key={client.id} className="p-10 client-logo">
                    <Image src={client.image} alt={client.name} height={'130'} className='object-cover' loading="lazy" />
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </TransSection>
  )
}

export default Education
