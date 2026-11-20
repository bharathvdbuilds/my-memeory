type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="container">
        {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="page-hero__lead">{lead}</p>
      </div>
    </header>
  );
}
