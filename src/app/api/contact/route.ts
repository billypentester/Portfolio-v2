import { submitContact } from "@/src/helpers/contact"

const MAX_BODY_BYTES = 16 * 1024

const STATUS_CODES = { success: 201, invalid: 400, error: 500 } as const

export async function POST(request: Request) {
    const declaredLength = Number(request.headers.get('content-length') ?? 0)
    if (declaredLength > MAX_BODY_BYTES) {
        return Response.json({ message: 'Request body is too large.' }, { status: 413 })
    }

    let body: unknown
    try {
        body = await request.json()
    } catch {
        return Response.json({ message: 'Request body must be valid JSON.' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        return Response.json({ message: 'Request body must be a JSON object.' }, { status: 400 })
    }

    const result = await submitContact(body as Record<string, unknown>)
    return Response.json({ message: result.message }, { status: STATUS_CODES[result.status] })
}
