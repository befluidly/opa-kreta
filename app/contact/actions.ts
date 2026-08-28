"use server";

import { Resend } from "resend";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Vul alle velden in." };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Vul een geldig e-mailadres in." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Ontbrekende RESEND_API_KEY environment variable");
    return {
      status: "error",
      message: "Serverconfig ontbreekt. Probeer later opnieuw.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // ⚠️ Zolang opakreta.be niet als domein geverifieerd is bij Resend moet
      // hier het gratis Resend-testadres blijven staan, anders weigert Resend de mail.
      from: "Opa Kreta contactformulier <onboarding@resend.dev>",
      to: "opa@opakreta.be",
      replyTo: email,
      subject: `Nieuw bericht via het contactformulier van ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Er ging iets mis bij het versturen. Probeer later opnieuw.",
      };
    }

    return {
      status: "success",
      message: "Bedankt voor je bericht! Opa neemt zo snel mogelijk contact op.",
    };
  } catch (err) {
    console.error("[contact] error:", err);
    return {
      status: "error",
      message: "Er ging iets mis bij het versturen. Probeer later opnieuw.",
    };
  }
}
