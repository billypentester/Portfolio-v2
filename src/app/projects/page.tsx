import React from 'react'

const page = () => {
  return (
    <section>
      <header className="flex flex-col gap-4 mb-20 text-center">
        <h3 className="text-primary text-2xl">Take a Look at My</h3>
        <h1 className="font-bold text-secondary text-5xl">Projects</h1>
        <h2 className="text-primary text-2xl">Turning ideas into real-world solutions</h2>
      </header>
      <main className='my-10'>
        <div className='w-full'>
          <div className="grid grid-cols-1 gap-5">
            {
              [1,2,3,4,5,6].map((item)=> {
                return (
                  <div className='bg-slate-300 h-72 rounded-md'></div>
                )
              })
            }
          </div>
        </div>
      </main>
    </section>
  )
}

export default page