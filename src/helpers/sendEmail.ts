import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { emailTemplate } from '@/src/data/template';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASS,
    },
});

export const sendEmail = async (name: string, email: string, message: string) : Promise<{ message: string, status: boolean }> => {

    const mailOptions: Mail.Options = {
        from: '"Portfolio" <hello@billypentester.com>',
        to: process.env.APP_EMAIL,
        subject: `Message from : ${name}`,
        html: emailTemplate(name, 'Bilal', message, email)
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
