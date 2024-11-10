
export default function ColorSection ({ children, title, id } : {
    children: React.ReactNode,
    title: string,
    id: string
}) 
{
    return (
      <section id={id} className="my-20 bg-primary shadow-xl rounded-none lg:rounded-2xl">
          <div className='p-10'>
              <h1 className='text-4xl sm:text-5xl tracking-tight text-baseline leading-tight font-semibold my-3'> {title} </h1>
              {children}
          </div>
      </section>
    )
  }