'use client'
import { useState } from 'react'
import Icon from '@/src/helpers/IconBuilder'
import ColorSection from "../layouts/ColorSection"
import { CONTACT_DESC, CONTACT_FLAVOUR, CONTACT_HEADING } from '@/src/config/constants'
import { sendContactData } from '@/src/helpers/action'
import Dialog from './dialog'
import Link from 'next/link'
import { data } from '@/src/config/data'

const Contact = () => {

  const { socialLinks } = data

  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [content, setContent] = useState<any>({
    title: '',
    description: ''
  })

  const capitalized = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleShow = (value: boolean) => {
    setShow(value)
  }

  const getContactData = async(e: any) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)

    const { status, message } = await sendContactData(data)

    if(status) {
      setLoading(false)
      form.reset()
      setContent({
        title: 'Contact Us',
        description: message
      })
      setTimeout(() => {
        handleShow(true)
      }, 100)
    }
    else {
      setLoading(false)
      setContent({
        title: 'Contact Us',
        description: message
      })
      setTimeout(() => {
        handleShow(true)
      }, 100)
    }
  }

  return (
    <>
      <ColorSection id="contact" title={CONTACT_HEADING}>
        <div className="flex flex-1 flex-col md:flex-row gap-10 my-10">
          <div className="w-full md:w-2/5">
              <p className='text-lg font-medium mb-5'> 
                {CONTACT_DESC}
              </p>
              <p className='text-lg font-medium my-5'>
                {CONTACT_FLAVOUR}
              </p>
              <div className="flex items-center space-x-5 my-8">
                {
                  socialLinks.map((url: any) => (
                      <Link href={url.url} key={url.name} target="_blank">
                        <button name={capitalized(url.name)} className='tooltip tooltip-bottom tooltip-secondary bg-base-100 text-secondary p-3 rounded-full shadow transition duration-500 ease-in-out'>
                          <Icon type={url.name} paint="h-6 w-6"/>
                          <div className="tooltip-content">
                            {capitalized(url.name)}
                          </div>
                        </button>
                      </Link>
                  ))
                }
              </div>
          </div>
          <div className="w-full md:w-3/5">
            <form onSubmit={getContactData}>
              <div className="flex flex-col space-y-5">
                <div className="flex sm:space-x-5 space-y-5 sm:space-y-0 flex-col sm:flex-row">
                  <input id="name" type="text" name="name" placeholder="Full Name *" className="w-full shadow-sm" />
                  <input id="email" type="email" name="email" placeholder="Email *" className="w-full shadow-sm" />
                </div>
                <textarea id="message" name="message" className="textarea w-full shadow-sm resize-none" placeholder="Type your message here *" rows={5}></textarea>
                <button type="submit" className="w-full lg:w-max btn btn-accent ms-auto">
                    {
                      loading ? <Icon type="spinner" paint="animate-spin h-4 w-4 mr-2" /> : <Icon type="contact" paint="h-4 w-4 mr-2" />
                    }
                    <span>Let's Connect</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </ColorSection>  
      <Dialog show={show} handleShow={handleShow} title={content.title} description={content.description} />

    </>
  )
}

export default Contact
