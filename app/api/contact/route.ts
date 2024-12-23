import { sendEmail } from "@/helpers/sendEmail"
import { validateContactForm } from "@/helpers/validator"

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { name, email, message } = body

        const { valid, error } = validateContactForm({ name, email, message })

        if(!valid) {
            return Response.json({ message: error }, { status: 400 })
        }

        const res = await sendEmail(name, email, message)
        if(res.status) {
            console.log('Email sent successfully')
        }
        else {
            console.log('Error: ', res.message)
        }

        return Response.json({ message: 'Thank you for contacting us! We will get back to you soon' }, { status: 201 })
    }
    catch(e){
        return Response.json({ message: 'Something went wrong! Please try again' }, { status: 500 })
    }
}