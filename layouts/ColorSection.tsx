
export default function ColorSection ({ children, title, id } : {
    children: React.ReactNode,
    title: string,
    id: string
}) 
{
    return (
      <section id={id} className="my-20 bg-primary shadow-xl rounded-2xl">
          <div className='p-10'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-baseline font-semibold my-3'> {title} </h1>
              {children}
          </div>
      </section>
    )
  }