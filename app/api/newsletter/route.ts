import { NextResponse } from "next/server";
import { Resend } from "resend";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body ?? {};

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Vul een geldig e-mailadres in." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[newsletter] Ontbrekende RESEND_API_KEY environment variable");
      return NextResponse.json(
        { ok: false, message: "Serverconfig ontbreekt." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Opa Kreta <noreply@opakreta.be>",
      to: "opa@opakreta.be",
      replyTo: email,
      subject: "Nieuwe nieuwsbrief-inschrijving (Opa Kreta)",
      text: `Nieuwe inschrijving:\n\nEmail: ${email}\nTijdstip: ${new Date().toISOString()}\n`,
    });

    if (error) {
      console.error("[newsletter] Resend error:", error);
      return NextResponse.json(
        { ok: false, message: "Serverfout. Probeer later opnieuw." },
        { status: 500 }
      );
    }

    console.log("[newsletter] email sent for:", email);

    return NextResponse.json({ ok: true, message: "Bedankt! 🎉 Je bent ingeschreven." });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json(
      { ok: false, message: "Serverfout. Probeer later opnieuw." },
      { status: 500 }
    );
  }
}
