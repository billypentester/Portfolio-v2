import 'server-only'
import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { emailTemplate } from '@/src/config/template'
import { profile } from '@/src/content/profile'
import type { ContactInput } from './validator'

interface SmtpConfig {
    user: string
    pass: string
    recipient: string
}

// SMTP_* are server-only. The NEXT_PUBLIC_* names are a temporary fallback for existing deployments;
// remove them once the host has the new variables.
const readSmtpConfig = (): SmtpConfig | null => {
    const user = process.env.SMTP_USER ?? process.env.NEXT_PUBLIC_APP_EMAIL
    const pass = process.env.SMTP_PASSWORD ?? process.env.NEXT_PUBLIC_APP_PASS
    const recipient = process.env.APP_EMAIL ?? user
    if (!user || !pass || !recipient) return null
    return { user, pass, recipient }
}

let transport: nodemailer.Transporter | null = null

const getTransport = (config: SmtpConfig): nodemailer.Transporter => {
    transport ??= nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: { user: config.user, pass: config.pass },
    })
    return transport
}

export type SendEmailResult = { status: true } | { status: false; reason: 'not_configured' | 'send_failed' }

export const sendEmail = async ({ name, email, message }: ContactInput): Promise<SendEmailResult> => {
    const config = readSmtpConfig()
    if (!config) {
        console.error('Contact email not sent: SMTP_USER, SMTP_PASSWORD or APP_EMAIL is missing')
        return { status: false, reason: 'not_configured' }
    }

    const mailOptions: Mail.Options = {
        from: `Portfolio <${config.recipient}>`,
        to: config.recipient,
        replyTo: { name, address: email },
        subject: `New contact message from ${name}`,
        html: emailTemplate({ name, email, message, brandName: profile.handle }),
    }

    try {
        await getTransport(config).sendMail(mailOptions)
        return { status: true }
    } catch (error) {
        console.error('Contact email failed to send', error instanceof Error ? error.message : error)
        return { status: false, reason: 'send_failed' }
    }
}
