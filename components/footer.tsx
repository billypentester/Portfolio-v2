export default function Footer({ identity_keyword }: any) {
  return (
    <footer>
        <div className='py-5 bg-surface text-center shadow-inner'>
            <span className='text-lg text-primary font-medium'> 
              <a href="https://www.linkedin.com/in/billypentester" target='_blank' className='link-secondary'>{identity_keyword}</a>
              {' '}
              &copy;
              {' '}   
              {new Date().getFullYear()}
            </span>
        </div>
    </footer>
  )
}
