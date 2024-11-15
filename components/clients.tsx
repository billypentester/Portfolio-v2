import TransSection from '../layouts/TransSection'
import { clients, cert } from '../data/config'
import Image from 'next/image'



const Education = () => {

  return (
    <TransSection id="clients" title={'Who I\'ve Worked With'}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-10 place-items-center">
        {
            clients.map((client) => {
            return(
                <div key={client.id} className="p-10">
                    <Image src={client.image} alt={client.name} width={'170'} loading="lazy" />
                </div>
            //   <div key={item.id} className="bg-surface shadow-lg rounded-lg px-10 py-10">
            //     <div className="flex flex-col sm:flex-row">
            //       <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            //         <Image src={item.image} alt={item.title} className="w-32 h-32" loading="lazy" />
            //       </div>
            //       <div className="w-full sm:w-2/3">
            //         <h3 className="text-lg sm:text-2xl font-semibold text-primary">{item.university}</h3>
            //         <p className="mt-3 text-lg text-primary">{item.title}</p>
            //         <p className="mt-1 text-primary">{item.date}</p>
            //       </div>
            //     </div>
            //   </div>
            )
          })
        }
      </div>
    </TransSection>
  )
}

export default Education
