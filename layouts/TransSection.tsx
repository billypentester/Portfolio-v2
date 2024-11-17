export default function TransSection ({ children, title, id }: { 
    children: React.ReactNode, 
    title: string, 
    id: string
 }) 
{
  return (
    <section id={id} className="my-20 mx-10">
      <h1 className='text-3xl sm:text-4xl lg:text-5xl leading-tight text-secondary tracking-tight font-semibold my-3'> {title} </h1>
      {children}
    </section>
  )
}
  

  