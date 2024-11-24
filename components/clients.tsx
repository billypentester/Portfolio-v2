import TransSection from '../layouts/TransSection'
import Image from 'next/image'

const Education = ({ clients }: any) => {

  return (
    <TransSection id="clients" title={'Who I\'ve Worked With'}>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 place-items-center">
        {
          clients.map((client: any) => {
            return(
              <div key={client.id} className="p-10 client-logo">
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
