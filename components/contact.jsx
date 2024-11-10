import Icons from '@/utils/Icon'
import { urls } from '../data/config';
import ColorSection from "../layouts/ColorSection"

const Contact = () => {

  const capitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <ColorSection id="contact" title="Get in touch">
      <div className="flex flex-1 flex-col md:flex-row gap-10 my-10">
        <div className="w-full md:w-2/5">
            <p className='text-lg text-primary font-medium mb-5'> 
              Let's have a chat and I'll help your next idea comes to the real world. 
            </p>
            <p className='text-lg text-primary font-medium my-5'>
              Simple friendly talk in never a bad idea :)
            </p>
            <div className="flex items-center space-x-5 my-8">
              {
                  urls.map((url) => (
                      <button name={capitalized(url.name)} data-tip={capitalized(url.name)} key={url.name} className='tooltip tooltip-bottom bg-surface hover:bg-secondary text-primary hover:text-neutral p-3 rounded-full shadow-md shadow-secondary transition duration-500 ease-in-out'>
                          <a href={url.url} target="_blank">
                              <Icons type={url.name} paint="h-6 w-6"/>
                          </a>
                      </button>
                  ))
              }
            </div>
        </div>
        <div className="w-full md:w-3/5">
          <form>
            <div className="flex flex-col space-y-5">
              <div className="flex sm:space-x-5 space-y-5 sm:space-y-0 flex-col sm:flex-row">
                <input id="name" type="text" name="name" placeholder="Name*" className="w-full shadow-lg" />
                <input id="email" type="email" name="Email" placeholder="Email*" className="w-full shadow-lg" />
              </div>
              <textarea id="message" name="Message" className="textarea w-full  shadow-lg resize-none" placeholder="Message*" rows="5"></textarea>
              <button type="submit" className="lg:btn-wide btn-inverse ms-auto">
                  <span className="material-icons-outlined text-white capitalize">send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ColorSection>  
  )
}

export default Contact
