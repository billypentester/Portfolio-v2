export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { fullname, email, message } = body
        if(!fullname || !email || !message){
            return Response.json({ message: 'Invalid Input' }, { status: 400 })
        }
        
        console.log('Fullname: ', fullname)
        console.log('Email: ', email)
        console.log('Message: ', message)

        return Response.json({ message: 'success' }, { status: 201 })
    }
    catch(e){
        console.log('error in APi: ', e)
        return Response.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}