const template = `
    <!doctype html>
    <html lang="en" style="margin:0; padding:0;">
    <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contact Us Submission</title>
        <style>
        /* Optional fallback styles for clients that respect <style> */
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
        }
        </style>
    </head>
    <body style="margin:0; padding:0; background:#f5f7fb; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; font-family: Arial, Helvetica, sans-serif;">
        <!-- Preheader (hidden) -->
        <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
        New contact form submission received
        </div>

        <!-- Full width wrapper -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fb;">
        <tr>
            <td align="center" style="padding:30px 15px;">
            <!-- Container -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px; max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
                <!-- Header -->
                <tr>
                <td align="center" style="background:#1f2a44; color:#ffffff; padding:24px;">
                    <h1 style="margin:0; font-size:20px; line-height:1.4; font-weight:700; letter-spacing:0.2px;">
                    New Contact Us Submission
                    </h1>
                </td>
                </tr>

                <!-- Body -->
                <tr>
                <td class="content" style="padding:28px 28px 8px; color:#1c2130; font-size:16px; line-height:1.6;">
                    <p style="margin:0 0 16px;">
                    You’ve received a new message via your Contact Us form. Details are below:
                    </p>

                    <!-- Data card -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e6e8ee; border-radius:6px;">
                    <tr>
                        <td style="padding:16px 18px; border-bottom:1px solid #e6e8ee; background:#fafbff;">
                        <strong style="display:inline-block; width:110px; color:#4a5568;">Name:</strong>
                        <span style="color:#1c2130;">{{name}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 18px; border-bottom:1px solid #e6e8ee;">
                        <strong style="display:inline-block; width:110px; color:#4a5568;">Email:</strong>
                        <a href="mailto:{{email}}" style="color:#1f6feb; text-decoration:none;">{{email}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 18px;">
                        <strong style="display:block; margin-bottom:8px; color:#4a5568;">Message:</strong>
                        <div style="white-space:pre-wrap; color:#1c2130;">{{message}}</div>
                        </td>
                    </tr>
                    </table>

                    <!-- CTA -->
                    <p style="margin:18px 0 0;">
                    <a href="mailto:{{email}}" style="background:#1f6feb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:6px; display:inline-block; font-weight:600; font-size:14px;">
                        Reply to {{name}}
                    </a>
                    </p>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td align="center" style="padding:22px 28px 28px; color:#6b7280; font-size:12px; line-height:1.6;">
                    <p style="margin:0;">
                    You’re receiving this email because your website’s contact form was submitted.
                    </p>
                    <p style="margin:8px 0 0;">
                    © {{year}} {{brand_name}} · This is an automated message
                    </p>
                </td>
                </tr>
            </table>
            <!-- End container -->
            </td>
        </tr>
        </table>
    </body>
    </html>
  
`

function emailTemplate(name: string, email: string, message: string, identity_keyword: string): string {
    
    const currentYear = new Date().getFullYear();
    
    let filledTemplate = template.replace(/{{name}}/g, name);
    filledTemplate = filledTemplate.replace(/{{email}}/g, email);
    filledTemplate = filledTemplate.replace(/{{message}}/g, message);
    filledTemplate = filledTemplate.replace(/{{year}}/g, currentYear.toString());
    filledTemplate = filledTemplate.replace(/{{brand_name}}/g, identity_keyword);
    
    return filledTemplate;

}

export { emailTemplate }
