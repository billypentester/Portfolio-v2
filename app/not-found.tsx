import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='centerized'>
        <div className='flex flex-col items-center gap-10 w-full sm:w-11/12 md:w-1/2 lg:w-1/3 p-10 md:p-5'>
            <div className='text-center'>
                <h1 className='text-secondary text-3xl lg:text-4xl font-extrabold mb-4'>Page Not Found</h1>
                <p className='text-primary text-md'>
                    Oops! The page you're looking for isn't here. It might have been moved, deleted, or never existed. Don't worry, let's get you back on track! Use the navigation below to explore, or head back to the homepage.
                </p>
            </div>
            <Link href="/">
                <button className='btn'>
                    Return to Home
                </button>
            </Link>
        </div>
    </div>
  )
}