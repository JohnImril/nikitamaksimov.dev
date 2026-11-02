"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const navigation = [
  ["Strengths", "/#strengths"],
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["Approach", "/#about"],
  ["Contact", "/#contact"],
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="Nikita Maksimov, home">
          <span className="wordmark-dot" aria-hidden="true" /> Nikita Maksimov
        </Link>
        <button
          className="menu-button"
          ref={menuRef}
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <nav id="site-navigation" aria-label="Main navigation" data-open={open}>
          {navigation.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a className="button button-small" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
