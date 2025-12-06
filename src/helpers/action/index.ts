'use server'

import { headers } from 'next/headers';

async function sendContactData(formData: FormData) : Promise<{ status: boolean, message: string }> {

  const headersList = headers();
  const host = (await headersList).get('host') ? `http://${(await headersList).get('host')}` : ''

  console.log('Host:', host);
 
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const response = await fetch(`${host}/api/contact`, {
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