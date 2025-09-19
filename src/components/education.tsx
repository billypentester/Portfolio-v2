import { EDUCATION_HEADING } from '@/src/config/constants';
import TransSection from '../layouts/TransSection'
import Image, { StaticImageData } from 'next/image'
import { data } from '@/src/config/data'
import { certificationInterface, educationInterface } from '../interface';

const WorkCard = ({title, image}: { title: string; image: StaticImageData }) => {
  return (
      <div>
          <Image src={image} alt={title} className="rounded-lg shadow cursor-pointer h-48 object-cover" loading="lazy" />
          <h5 className="text-sm font-medium m-3 text-primary"> {title} </h5>
      </div>
  )
}

const Education = () => {

  const { edu, cert } = data

  return (
    <TransSection id="education" title={EDUCATION_HEADING}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        {
          edu.map((item: educationInterface) => {
            return(
              <div key={item.id} className="card bg-base-100 shadow rounded-lg p-10">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                    <Image src={item.image} alt={item.title} className="w-32 h-32 object-contain" loading="lazy" />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <h3 className="text-lg sm:text-2xl font-semibold text-primary">{item.university}</h3>
                    <h4 className="mt-3 text-lg text-secondary">{item.title}</h4>
                    <h5 className="mt-1 text-accent">{item.startDate} - {item.endDate}</h5>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center place-items-start gap-5 my-10">
        {
          cert.map((work: certificationInterface, index: number) => (
              <WorkCard key={index} title={work.title} image={work.image} />
          ))
        }
      </div>
    </TransSection>
  )
}

export default Education
