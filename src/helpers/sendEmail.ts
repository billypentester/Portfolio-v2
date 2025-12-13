import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { emailTemplate } from '@/src/config/template';
import { data } from '../config/data';

const transport = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_APP_EMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASS,
    },
});

export const sendEmail = async (senderName: string, email: string, message: string) : Promise<{ message: string, status: boolean }> => {

    const { identity_keyword } = data

    const mailOptions: Mail.Options = {
        from: `Portfolio <${process.env.APP_EMAIL}>`,
        to: process.env.APP_EMAIL,
        subject: `New Contact Message from ${senderName}`,
        html: emailTemplate(senderName, email, message, identity_keyword)
    };

    const sendMailPromise = () => new Promise<{ message: string, status: boolean }>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
            if (!err) {
                resolve({
                    message: 'Email sent successfully',
                    status: true
                });
            } 
            else {
                reject({
                    message: err.message,
                    status: false
                });
            }
        });
    });

    return sendMailPromise();

}
