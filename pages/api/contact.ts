// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from '@sendgrid/mail';
import { AttachmentData } from '@sendgrid/helpers/classes/attachment';
import { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormValues } from '../../components/ContactFormButton';
import twilio from 'twilio';
import formidable from 'formidable';
import { readFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const twilioAccountSid = process.env.TWILIO_SID as string;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioSmsTo = process.env.TWILIO_SMS_TO as string;

const sendGridAPIKey = process.env.SENDGRID_API_KEY as string;
const sendGridEmailTo = process.env.SENDGRID_EMAIL_TO as string;

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

sgMail.setApiKey(sendGridAPIKey);

export default async function brandHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const form = new formidable.IncomingForm({
          keepExtensions: true,
          multiples: false,
          maxFiles: 1,
        });

        const { fields, files } = await new Promise<{
          fields: formidable.Fields;
          files: formidable.Files;
        }>((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) {
              reject(err);
              return;
            }

            resolve({ fields, files });
          });
        });

        await sendNotification({
          ...fields,
          insuranceFile: files.insuranceFile,
        } as unknown as ContactFormValues);

        return res.end();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.cause, error.stack);
        }
        const responseMessage =
          error instanceof Error ? error.message : 'Something went wrong.';

        res.status(500).json({ message: responseMessage });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function sendNotification(formValues: ContactFormValues) {
  return await Promise.all([sendEmail(formValues), sendSMS(formValues)]);
}

async function sendEmail(formValues: ContactFormValues) {
  const insuranceFormidableFile =
    formValues.insuranceFile as unknown as formidable.File;
  const fileData = await readFile(insuranceFormidableFile.filepath);

  const attachment: AttachmentData = {
    // Encode the buffer as a base64 encoded string
    content: fileData.toString('base64'),
    filename:
      insuranceFormidableFile.originalFilename ||
      insuranceFormidableFile.newFilename,
    type: insuranceFormidableFile.mimetype ?? undefined,
    disposition: 'attachment',
    contentId: insuranceFormidableFile.hash ?? undefined,
  };

  const msg: sgMail.MailDataRequired = {
    to: sendGridEmailTo,
    from: 'tell.jordanr@gmail.com',
    subject: 'New form submission for your practice!',
    html: generateHtmlTemplate(formValues),
    attachments: [attachment],
  };

  return await sgMail.send(msg);
}

async function sendSMS(formValues: ContactFormValues) {
  if (!twilioAccountSid || !twilioAuthToken) {
    console.log(
      'Not sending SMS notification because one or more twilio tokens are missing'
    );
    return;
  }

  const message = await twilioClient.messages.create({
    body: `Hi Adam, '${formValues.name}' submitted an inquiry for your practice. Please check your email for further info.`,
    to: twilioSmsTo,
    from: '+19705980222',
  });

  return message;
}

function generateHtmlTemplate(formValues: ContactFormValues) {
  return `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
<title></title>

  <style type="text/css">
    @media only screen and (min-width: 520px) {
.u-row {
  width: 500px !important;
}
.u-row .u-col {
  vertical-align: top;
}

.u-row .u-col-100 {
  width: 500px !important;
}

}

@media (max-width: 520px) {
.u-row-container {
  max-width: 100% !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.u-row .u-col {
  min-width: 320px !important;
  max-width: 100% !important;
  display: block !important;
}
.u-row {
  width: calc(100% - 40px) !important;
}
.u-col {
  width: 100% !important;
}
.u-col > div {
  margin: 0 auto;
}
}
body {
margin: 0;
padding: 0;
}

table,
tr,
td {
vertical-align: top;
border-collapse: collapse;
}

p {
margin: 0;
}

.ie-container table,
.mso-container table {
table-layout: fixed;
}

* {
line-height: inherit;
}

a[x-apple-data-detectors='true'] {
color: inherit !important;
text-decoration: none !important;
}

table, td { color: #000000; } </style>



</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
<tbody>
<tr>
  <td style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    Application!
  </td>
</tr>

<tr style="vertical-align: top">
  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
  

<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      
<h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
  🔥 You've got a new application for your practice!
</h1>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      
<div style="line-height: 140%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 140%;">Hi Adam! <span style="text-decoration: underline; font-size: 14px; line-height: 19.6px;">Here's the information as follows</span>:</p>
<p style="font-size: 14px; line-height: 140%;"> </p>
<p style="font-size: 14px; line-height: 140%;">Name: ${formValues.name}</p>
<p style="font-size: 14px; line-height: 140%;"> </p>
<p style="font-size: 14px; line-height: 140%;">Phone: ${formValues.phone}</p>
<p style="font-size: 14px; line-height: 140%;"> </p>
<p style="font-size: 14px; line-height: 140%;">Email: ${formValues.email}</p>
<p style="font-size: 14px; line-height: 140%;"> </p>
<p style="font-size: 14px; line-height: 140%;">Message: ${formValues.message}</p>
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>


  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
  </td>
</tr>
</tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
</body>

</html>
  `;
}
