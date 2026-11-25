import Image from "next/image";
import { ContactForm } from "./components/ContactForm";
import { Header } from "./components/Header";
import {
  FEE_GROUPS,
  GALLERY,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROGRAMS,
  WHATSAPP_URL,
  asset,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero" id="home" aria-label="Home">
          <div className="hero-media">
            <Image
              src={asset("/images/hero.jpg")}
              alt="A karate student practising a punch toward tall windows"
              fill
              priority
              sizes="100vw"
            />
            <div className="hero-shade" />
          </div>
          <div className="wrap hero-copy">
            <p className="badge">Unity Martial Arts Club | Ananthnagar, Bengaluru</p>
            <h1>
              <span>BUILD STRENGTH.</span> <span>MASTER DISCIPLINE.</span>{" "}
              <span>GAIN CONFIDENCE.</span>
            </h1>
            <p className="lede">
              Professional Karate, Kata, Kumite and Self-Defence Training for Kids,
              Teenagers and Adults in Ananthnagar, Bengaluru.
            </p>
            <div className="hero-actions">
              <a className="btn btn-red" href="#programs">
                Explore Our Programs
              </a>
              <a className="btn btn-ghost-light" href="#fees">
                View Class Fees
              </a>
            </div>
            <aside className="offer-card" aria-label="Limited 24-hour enquiry offer for new students">
              <p className="eyebrow">New students</p>
              <h2>Limited 24-hour enquiry offer for new students</h2>
              <p className="price">₹2,000</p>
              <p>Valid for 24 hours.</p>
              <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Ask about this offer
              </a>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="wrap split">
            <div>
              <p className="eyebrow">About</p>
              <h2>More Than Martial Arts. A Foundation for Life.</h2>
              <hr className="accent-rule" />
              <p className="lede">
                Unity Martial Arts Club in Ananthnagar, Bengaluru trains children,
                teenagers, and adults. Classes build fitness, discipline, confidence,
                concentration, and practical skills.
              </p>
              <ul className="ticks">
                <li>Structured karate, kata, and kumite</li>
                <li>Self-defence for boys and girls</li>
                <li>Tournament and championship preparation</li>
                <li>Belt examination preparation</li>
                <li>Training for different age groups</li>
              </ul>
            </div>
            <figure className="frame frame-about">
              <Image
                src={asset("/images/about.jpg")}
                alt="An instructor leading students through karate stances in a bright studio"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </figure>
          </div>
        </section>

        <section className="section section-grey" id="programs">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Programs</p>
              <h2>Train with purpose.</h2>
              <hr className="accent-rule" />
              <p className="lede">
                Karate, kata, kumite, and self-defence for kids, teenagers, and adults.
              </p>
            </div>
            <div className="cards cards-2">
              {PROGRAMS.map((program) => (
                <article className="card" key={program.title}>
                  <p className="index">{program.index}</p>
                  <h3>{program.title}</h3>
                  <p>{program.body}</p>
                </article>
              ))}
            </div>
            <div className="section-cta">
              <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Enquire Now
              </a>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="coach">
          <div className="wrap coach-grid">
            <div>
              <p className="eyebrow">Our coach</p>
              <h2>Train with our coach</h2>
              <hr className="accent-rule" />
              <p className="lede">
                Classes at Unity Martial Arts Club are led by the club’s instructor.
                A coach profile, with name, rank, and background, will be added when
                the club provides it.
              </p>
              <p className="lede" style={{ marginTop: 14 }}>
                Send an enquiry and the club will tell you about the coach and how
                classes run.
              </p>
              <div className="coach-actions">
                <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Enquire Now
                </a>
              </div>
            </div>
            <aside className="coach-note">
              <p className="eyebrow">Profile to follow</p>
              <p>
                This space is reserved for the instructor. The name, rank, and
                background will appear here once the club supplies them.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" id="fees">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Fees</p>
              <h2>Class fees on enquiry.</h2>
              <hr className="accent-rule" />
              <p className="lede">
                The club shares class fees when you enquire. Group classes include
                kata, kumite, and self-defence.
              </p>
            </div>
            <aside className="offer-banner" aria-label="Limited 24-hour enquiry offer for new students">
              <div>
                <p className="eyebrow">New students</p>
                <h2>Limited 24-hour enquiry offer for new students</h2>
                <p className="price">₹2,000</p>
                <p>Valid for 24 hours. Ask the club what this offer covers.</p>
              </div>
              <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Ask about this offer
              </a>
            </aside>
            <div className="cards cards-3">
              {FEE_GROUPS.map((group) => (
                <article className="fee-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <p className="fee-line">Fees on enquiry</p>
                  <p>{group.text}</p>
                  <ul>
                    <li>Group classes</li>
                    <li>Kata</li>
                    <li>Kumite</li>
                    <li>Self-defence</li>
                  </ul>
                  <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Enquire Now
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-grey" id="gallery">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Gallery</p>
              <h2>Karate training.</h2>
              <hr className="accent-rule" />
              <p className="lede">
                Photographs of karate practice. They are reference images, not pictures
                of club members.
              </p>
            </div>
            <div className="gallery-grid">
              {GALLERY.map((photo) => (
                <figure className="frame" key={photo.src}>
                  <Image
                    src={asset(photo.src)}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 720px) 50vw, 33vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Enquire with the club.</h2>
              <hr className="accent-rule" />
              <p className="lede">
                Send an enquiry and the club will share class details. The limited
                24-hour enquiry offer for new students is ₹2,000, valid for 24 hours.
              </p>
              <ul className="contact-facts">
                <li>
                  <span>Phone</span>
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Message {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <span>Location</span>
                  <strong>Ananthnagar, Bengaluru, India</strong>
                </li>
              </ul>
              <div className="contact-actions">
                <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Enquire Now
                </a>
                <a className="btn btn-blue" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-logo">
            <span className="footer-logo-mark">
              <Image src={asset("/logo.png")} alt="" fill sizes="96px" />
            </span>
          </div>
          <p className="name">Unity Martial Arts Club</p>
          <p className="tag">Karate and self-defence training in Ananthnagar, Bengaluru.</p>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#coach">Our Coach</a>
            <a href="#fees">Fees</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="footer-meta">
            <span>Ananthnagar, Bengaluru</span>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
          <p className="credit">
            Training photographs from Pexels and Unsplash, used under their free
            licences. They show karate practice and are not photographs of Unity
            Martial Arts Club members.
          </p>
        </div>
      </footer>
    </>
  );
}
