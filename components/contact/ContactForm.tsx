"use client";

import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const t = useTranslations("contact");
  // Het formulier wordt via een server action verwerkt (components/contact/actions.ts),
  // die geen toegang heeft tot de React-context van next-intl — de actieve
  // taal gaat daarom mee als verborgen veld, zodat de teruggegeven
  // foutmelding/bevestiging in de juiste taal staat. Formulierlogica zelf
  // (validatie, e-mailverzending) blijft ongewijzigd.
  const locale = useLocale();

  return (
    <>
      <form action={formAction} className="space-y-4 mt-6">
        <input type="hidden" name="locale" value={locale} />
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("namePlaceholder")}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
          />
        </div>

        <textarea
          name="message"
          placeholder={t("messagePlaceholder")}
          required
          className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-skyBlue focus:outline-none"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-skyBlue text-white py-3 px-8 rounded-md font-semibold hover:bg-sky-600 transition disabled:opacity-50"
        >
          {isPending ? t("sending") : t("submit")}
        </button>
      </form>

      {state.status !== "idle" && state.message && (
        <p
          className={`mt-4 text-sm ${
            state.status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </>
  );
}
