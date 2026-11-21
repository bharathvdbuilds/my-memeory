import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { primaryNav } from "../data/nav";

export function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand__name">Mylavaram Constructions</span>
          <span className="brand__tagline">Designed. Engineered. Built.</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="site-nav__list">
            {primaryNav.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={close}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="site-nav__cta">
            <Link to="/contact" className="btn btn--primary" onClick={close}>
              Discuss Your Project
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
