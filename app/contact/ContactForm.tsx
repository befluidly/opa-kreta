"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <>
      <form action={formAction} className="space-y-4 mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Je naam"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Je e-mailadres"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
          />
        </div>

        <textarea
          name="message"
          placeholder="Je bericht"
          required
          className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-skyBlue focus:outline-none"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-skyBlue text-white py-3 px-8 rounded-md font-semibold hover:bg-sky-600 transition disabled:opacity-50"
        >
          {isPending ? "Even geduld..." : "Verstuur bericht"}
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
