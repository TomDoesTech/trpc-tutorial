import nodemailer from 'nodemailer'

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string
  url: string
  token: string
}) {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    // host: 'smtp.ethereal.email',
    // port: 587,
    port: 1025,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Jane Doe" <j.doe@example.com>',
      to: email,
      subject: 'Login to your account',
      html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
    });
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error(error);
  }

}
