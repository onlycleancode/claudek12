"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Floating book button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-white rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
        aria-label="Open menu"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-8 h-8 text-primary"
        >
          {/* Open book icon */}
          <path
            d="M4 6C4 6 8 4 16 4C24 4 28 6 28 6V26C28 26 24 24 16 24C8 24 4 26 4 26V6Z"
            fill="#FFE8E3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 4V24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 10H13M8 14H12M19 10H24M20 14H24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
