"use client";

import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    // Toggle knop bij scrollen
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 0) setVisible(true);
            else setVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility(); // ✅ check direct bij laden!

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    // Scroll naar boven
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll naar boven"
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-skyBlue text-white shadow-lg hover:bg-sky-600 transition transform hover:scale-105 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            {/* Pijl omhoog icoon (Tailwind inline SVG) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}
