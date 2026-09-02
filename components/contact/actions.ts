"use server";

import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

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
  // Meegegeven door ContactForm.tsx (verborgen veld) — de server action zelf
  // heeft geen toegang tot de React-context van next-intl.
  const locale = formData.get("locale") === "en" ? "en" : "nl";
  const t = await getTranslations({ locale, namespace: "contact" });

  if (!name || !email || !message) {
    return { status: "error", message: t("errorAllFields") };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: t("errorEmail") };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Ontbrekende RESEND_API_KEY environment variable");
    return {
      status: "error",
      message: t("errorServerConfig"),
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Opa Kreta contactformulier <noreply@opakreta.be>",
      to: "gizzylynne@gmail.com",
      replyTo: email,
      subject: `Nieuw bericht via het contactformulier van ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: t("errorSend"),
      };
    }

    return {
      status: "success",
      message: t("success"),
    };
  } catch (err) {
    console.error("[contact] error:", err);
    return {
      status: "error",
      message: t("errorSend"),
    };
  }
}
