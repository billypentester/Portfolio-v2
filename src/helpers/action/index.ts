'use server'

import { headers } from 'next/headers'

async function sendContactData(formData: FormData) : Promise<{ status: boolean, message: string }> {

  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  console.log('Base URL:', baseUrl);
 
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    body: JSON.stringify(rawFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if(response.status === 201){
    return {
      status: true,
      message: data.message
    }
  }
  else {
    return {
      status: false,
      message: data.message
    }
  }
    
}

export { sendContactData }