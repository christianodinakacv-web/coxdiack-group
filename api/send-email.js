import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { name, email, message } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Coxdiack Group <no-reply@coxdiack.com>",
      to: "christianodidi40@gmail.com",
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}
