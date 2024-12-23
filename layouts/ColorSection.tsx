
export default function ColorSection ({ children, title, id } : {
    children: React.ReactNode,
    title: string,
    id: string
}) 
{
    return (
      <section id={id} className="my-20 bg-primary section-block">
          <div className='p-10'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl leading-tight text-baseline tracking-tight font-semibold my-3'> {title} </h2>
              {children}
          </div>
      </section>
    )
  }