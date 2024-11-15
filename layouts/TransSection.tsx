export default function TransSection ({ children, title, id }: { 
    children: React.ReactNode, 
    title: string, 
    id: string
 }) 
{
  return (
    <section id={id} className="my-20 mx-10">
      <h1 className='text-4xl sm:text-5xl tracking-tight text-secondary leading-tight font-semibold my-3'> {title} </h1>
      {children}
    </section>
  )
}
  

  