'use server'

import { BASE_URL } from "@/config"

async function sendContactData(formData: FormData) : Promise<{ status: boolean, message: string }> {
 
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const url = `${BASE_URL}/api/contact`

  const response = await fetch(url, {
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