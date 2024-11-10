import TransSection from '../layouts/TransSection'
import { edu, cert } from '../data/config'
import Image from 'next/image'

const WorkCard = ({title, image}) => {
  return (
      <div>
          <Image src={image} alt={title} className="rounded-lg shadow-xl cursor-pointer h-60 object-cover" loading="lazy" />
          <h1 className="text-lg font-medium m-3 text-primary"> {title} </h1>
      </div>
  )
}

const Education = () => {

  return (
    <TransSection id="education" title={'My Education'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        {
          edu.map((item) => {
            return(
              <div key={item.id} className="bg-surface shadow-lg rounded-lg px-10 py-10">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                    <Image src={item.image} alt={item.title} className="w-32 h-32" loading="lazy" />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <h3 className="text-lg sm:text-2xl font-semibold text-primary">{item.university}</h3>
                    <p className="mt-3 text-lg text-primary">{item.title}</p>
                    <p className="mt-1 text-primary">{item.date}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center place-items-start gap-5 my-10">
        {
          cert.map((work, index) => (
              <WorkCard key={index} title={work.title} image={work.image} />
          ))
        }
      </div>
    </TransSection>
  )
}

export default Education
