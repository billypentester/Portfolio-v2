'use server'

async function sendContactData(formData: FormData) : Promise<{ status: boolean, message: string }> {
 
  const rawFormData = {
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const url = "http://localhost:3000/api/contact"

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(rawFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if(response.status === 201){
    return {
      status: true,
      message: 'success'
    }
  }
  else {
    return {
      status: false,
      message: 'error'
    }
  }
    
}

export { sendContactData }