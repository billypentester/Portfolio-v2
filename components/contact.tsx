'use client'
import Icons from '@/utils/Icon'
import ColorSection from "../layouts/ColorSection"

const Contact = ({ urls }: any) => {

  const capitalized = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const contactData = (e: any) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('Email')
    const message = data.get('Message')
    console.log(name, email, message)
    form.reset()
  }

  return (
    <ColorSection id="contact" title="Get in touch">
      <div className="flex flex-1 flex-col md:flex-row gap-10 my-10">
        <div className="w-full md:w-2/5">
            <p className='text-lg text-primary font-medium mb-5 text-baseline'> 
              Let's have a chat and I'll help your next idea comes to the real world. 
            </p>
            <p className='text-lg text-primary font-medium my-5 text-baseline'>
              Simple friendly talk in never a bad idea :)
            </p>
            <div className="flex items-center space-x-5 my-8">
              {
                  urls.map((url: any) => (
                      <button name={capitalized(url.name)} key={url.name} className='tooltip tooltip-bottom bg-background hover:bg-secondary text-secondary hover:text-neutral p-3 rounded-full shadow-md shadow-secondary transition duration-500 ease-in-out'>
                          <a href={url.url} target="_blank">
                              <Icons type={url.name} paint="h-6 w-6"/>
                          </a>
                          <div className="tooltip-content">
                            {capitalized(url.name)}
                          </div>
                      </button>
                  ))
              }
            </div>
        </div>
        <div className="w-full md:w-3/5">
          <form onSubmit={contactData}>
            <div className="flex flex-col space-y-5">
              <div className="flex sm:space-x-5 space-y-5 sm:space-y-0 flex-col sm:flex-row">
                <input id="name" type="text" name="name" placeholder="Name*" className="w-full shadow-lg" />
                <input id="email" type="email" name="Email" placeholder="Email*" className="w-full shadow-lg" />
              </div>
              <textarea id="message" name="Message" className="textarea w-full  shadow-lg resize-none" placeholder="Message*" rows={5}></textarea>
              <button type="submit" className="w-full lg:w-max btn btn-inverse ms-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send mr-2">
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                  <span>Let's Connect</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ColorSection>  
  )
}

export default Contact
