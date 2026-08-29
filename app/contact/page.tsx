import type { Metadata } from "next";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import { FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Opa Kreta voor vragen, tips of samenwerkingen rond Kreta.",
  alternates: { canonical: "https://www.opakreta.be/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Neem contact op met Opa Kreta voor vragen, tips of samenwerkingen rond Kreta.",
    url: "https://www.opakreta.be/contact",
    siteName: "Opa Kreta",
  },
};

export default function Contact() {
  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Contact"
        subtitle="Stuur Opa Kreta een bericht, vraag of samenwerking"
        imageUrl="https://images.pexels.com/photos/29399456/pexels-photo-29399456.jpeg"
      />

      {/* 🔹 Inhoud zonder box */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
          Neem contact op
        </h1>

        <p className="text-gray-700 font-body leading-relaxed mb-8 max-w-2xl">
          Heb je een vraag over Kreta, een tip voor de site of wil je samenwerken?
          Opa hoort het graag! Vul het formulier hieronder in of stuur een berichtje
          via sociale media.
        </p>

        {/* 🔹 Contactformulier */}
        <ContactForm />

        {/* 🔹 Contactinfo & sociale media */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-skyBlue text-xl" />
            <span>opa@opakreta.be</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaInstagram className="text-skyBlue text-xl" />
            <a
              href="https://www.instagram.com/opakreta"
              target="_blank"
              rel="noopener noreferrer"
            >
              @opaskreta
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaFacebook className="text-skyBlue text-xl" />
            <a
              href="https://www.facebook.com/opakreta"
              target="_blank"
              rel="noopener noreferrer"
            >
              /opakreta
            </a>
          </div>
        </div>

        {/* 🔹 Afsluitend tekstje */}
        <div className="text-center mt-16 text-gray-600 font-body italic">
          <p>
            Opa is meestal te vinden op een terrasje in Heraklion — een antwoord komt dus soms pas na de koffie ☕️😉
          </p>
        </div>
      </div>
    </Layout>
  );
}
