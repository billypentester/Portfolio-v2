'use server'

async function sendContactData(formData: FormData) : Promise<{ status: boolean, message: string }> {
 
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://billypentester.pk'

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