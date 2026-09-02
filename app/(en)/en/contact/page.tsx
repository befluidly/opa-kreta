import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import { FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import ContactForm from "../../../../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Opa Kreta for questions, tips or collaborations about Crete.",
  alternates: { canonical: "https://www.opakreta.be/en/contact" },
  openGraph: {
    title: "Contact",
    description: "Get in touch with Opa Kreta for questions, tips or collaborations about Crete.",
    url: "https://www.opakreta.be/en/contact",
    siteName: "Opa Kreta",
  },
};

export default function EnglishContact() {
  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Contact"
        subtitle="Send Opa Kreta a message, question or collaboration proposal"
        imageUrl="https://images.pexels.com/photos/29399456/pexels-photo-29399456.jpeg"
      />

      {/* 🔹 Inhoud zonder box */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
          Get in touch
        </h1>

        <p className="text-gray-700 font-body leading-relaxed mb-8 max-w-2xl">
          Got a question about Crete, a tip for the site, or want to collaborate? Opa
          would love to hear from you! Fill in the form below or send a message via
          social media.
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
            Opa is usually found on a terrace in Heraklion — so a reply might come only
            after the coffee ☕️😉
          </p>
        </div>
      </div>
    </Layout>
  );
}
