import { Link } from "react-router-dom";
import { contactPlaceholders, footerNav } from "../data/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h2>Mylavaram Constructions</h2>
            <p>Designed. Engineered. Built.</p>
            <p>
              Civil, commercial and industrial construction solutions, architecture
              collaboration, and development partnership conversations.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul className="footer-links">
              {footerNav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>{contactPlaceholders.phoneDisplay}</p>
            <p>{contactPlaceholders.emailDisplay}</p>
            <p>{contactPlaceholders.address}</p>
            <p className="placeholder-note">{contactPlaceholders.note}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mylavaram Constructions</span>
          <span>Portfolio imagery labelled as placeholders until verified assets arrive.</span>
        </div>
      </div>
    </footer>
  );
}
