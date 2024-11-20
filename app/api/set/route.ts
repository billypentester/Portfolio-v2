import fs from "fs"

export async function POST(req: Request) {

    if (req.method !== "POST") {
        return Response.json({ error: "method not allowed" }, { status: 405 })
    } 
    
    const body = await req.json()

    if(body?.theme) {
        const theme = body.theme
        console.log(theme)
        const path = process.cwd() + "data/theme.json"
        fs.writeFileSync(path, JSON.stringify(theme, null, 2))
    }

    return Response.json({ message: "success" }, { status: 200 })

}
