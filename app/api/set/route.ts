import fs from "fs"

export async function POST(req: any, res: Response) {

    if (req.method !== "POST") {
        return Response.json({ error: "method not allowed" }, { status: 405 })
    } 
    
    // handle form data
    const formData = await req.formData()
    const file = formData.get("file")

    // read json file
    const json = await file.text()
    const data = JSON.parse(json)
    console.log(data)

    // replace json in theme file
    fs.writeFileSync("data/theme.json", JSON.stringify(data, null, 2))

    return Response.json({ message: "success" }, { status: 200 })

}
