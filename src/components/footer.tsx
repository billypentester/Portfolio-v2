import Link from "next/link"

export default function Footer({ identity_keyword }: { identity_keyword: string }) {
  return (
    <footer>
        <div className='py-5 bg-base-100 text-center shadow-inner'>
            <span className='text-lg text-secondary font-medium'> 
              <Link href="/about-me" className='link-secondary'>
                {identity_keyword}
              </Link>
              {' '}
              &copy;
              {' '}   
              {new Date().getFullYear()}
            </span>
        </div>
    </footer>
  )
}
