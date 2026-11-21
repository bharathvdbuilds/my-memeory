"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset, NAV, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 1180) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-bar">
        <a className="brand" href="#home" onClick={close}>
          <span className="brand-mark">
            <Image
              src={asset("/logo.png")}
              alt="Unity Martial Arts Club"
              fill
              sizes="76px"
              priority
            />
          </span>
          <span className="brand-text">
            <span className="brand-name">Unity Martial Arts Club</span>
            <span className="brand-place">Ananthnagar, Bengaluru</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="btn btn-ghost header-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="btn btn-red header-enquire"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire Now
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
      >
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
        <a
          className="btn btn-red"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire Now
        </a>
        <a
          className="btn btn-ghost"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a className="btn btn-ghost" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
      </nav>
    </header>
  );
}
