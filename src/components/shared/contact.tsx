'use client'
import { useState } from 'react'
import Icon from '@/src/helpers/IconBuilder'
import ColorSection from "../../layouts/ColorSection"
import { CONTACT_DESC, CONTACT_FLAVOUR, CONTACT_HEADING } from '@/src/lib/constants'
import { sendContactData } from '@/src/helpers/action'
import Dialog from '@/src/components/shared/dialog'
import Link from 'next/link'
import { data } from '@/src/config/data'
import { dialogboxInterface, socialLinksInterface } from '@/src/lib/interface'
import { capitalized } from '../../utils'

const Contact = () => {

  const { socialLinks } = data

  const [loading, setLoading] = useState<boolean>(false)

  const [dialog, setDialog] = useState<dialogboxInterface>({
    show: false,
    content: {
      title: '',
      description: ''
    }
  })

  const getContactData = async(e: any) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)

    if(!data.get('name') || !data.get('email') || !data.get('message')) {
      setLoading(false)
      setDialog({
        ...dialog,
        content: {
          title: 'Contact Us',
          description: 'Please fill all the required fields.'
        },
        show: true
      })
      return
    }

    const { status, message } = await sendContactData(data)

    if(status) {
      form.reset()
    }

    setLoading(false)

    setDialog({
      ...dialog,
      content: {
        title: 'Contact Us',
        description: message
      },
      show: true
    })

  }

  const handleDialogModal = (value: boolean) => {
    setDialog({
      ...dialog,
      show: value
    })
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
                  socialLinks.map((url: socialLinksInterface) => (
                      <Link href={url.url} key={url.name} target="_blank">
                        <button name={capitalized(url.name)} className='tooltip tooltip-bottom tooltip-secondary bg-soft text-secondary p-3 rounded-full shadow transition duration-500 ease-in-out'>
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
                  <input id="name" type="text" name="name" placeholder="Full Name" className="w-full shadow" />
                  <input id="email" type="email" name="email" placeholder="Email Address" className="w-full shadow" />
                </div>
                <textarea id="message" name="message" className="textarea w-full shadow resize-none" placeholder="Type your message..." rows={5}></textarea>
                <button type="submit" className="w-full lg:w-max btn btn-accent ms-auto shadow">
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
      
      <Dialog show={dialog.show} content={dialog.content} handleShow={handleDialogModal} />

    </>
  )
}

export default Contact
