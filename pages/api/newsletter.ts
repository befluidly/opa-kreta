import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ ok: false, message: "Method not allowed" });
    }

    const { email } = req.body ?? {};

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, message: "Vul een geldig e-mailadres in." });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      NEWSLETTER_TO,
      NEWSLETTER_FROM,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NEWSLETTER_TO || !NEWSLETTER_FROM) {
      console.error("[newsletter] Missing env vars");
      return res.status(500).json({ ok: false, message: "Serverconfig ontbreekt (SMTP)." });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE).toLowerCase() === "true", // true voor 465, false voor 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: NEWSLETTER_FROM,
      to: NEWSLETTER_TO,
      subject: "Nieuwe nieuwsbrief-inschrijving (Hidden Crete)",
      text: `Nieuwe inschrijving:\n\nEmail: ${email}\nTijdstip: ${new Date().toISOString()}\n`,
      replyTo: email,
    });

    console.log("[newsletter] email sent for:", email);

    return res.status(200).json({ ok: true, message: "Bedankt! 🎉 Je bent ingeschreven." });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return res.status(500).json({ ok: false, message: "Serverfout. Probeer later opnieuw." });
  }
}
