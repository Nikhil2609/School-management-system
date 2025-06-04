import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS
  }
});

export const sendEmail = async (to: string, name: string, emailSubject, emailContent: any) => {
  const htmlWithLayout = await ejs.renderFile(path.join(__dirname, '../views/emails/layout.ejs'), {
    subject: emailSubject,
    body: emailContent
  });

  const mailOptions = {
    from: 'nikpanchal333@gmail.com', // sender address
    to: to,
    subject: 'Welcome to My App 🎉',
    html: htmlWithLayout
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome Email Sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendWelcomeEmail = async (to: string, name: string) => {
  const emailContent = await ejs.renderFile(
    path.join(__dirname, '../views/emails/register-user.ejs'),
    {
      name: 'Nikhil',
      email: 'nikhil.panchal@tatvasoft.com'
    }
  );

  const emailSubject = 'User Registration';

  await sendEmail(to, name, emailSubject, emailContent);
  return;
};
