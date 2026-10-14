import { Link } from 'react-router-dom';
import photo from '../assets/photo.jpg';
import { site, hero, about, experience, interests, contact } from '../data/content';
import { projects } from '../data/projects';
import { asset, isVideo } from '../lib/media';
import useReveal from '../lib/useReveal';

export default function Home() {
  useReveal();

  return (
    <div className="page">
      <header className="hero">
        <h1>{hero.line1}<br />{hero.line2a}<em>{hero.line2b}</em>.</h1>
        {(Array.isArray(hero.sub) ? hero.sub : [hero.sub]).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </header>

      <div className="squig" data-reveal />

      <section id="about">
        <h2>A little about me</h2>
        <div className="about-grid">
          <div>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <figure className="snap">
            <img src={photo} alt={site.name} />
            <figcaption>{about.caption}</figcaption>
          </figure>
        </div>
      </section>

      <div className="squig" data-reveal />

      <section id="projects">
        <h2>Things I've Built</h2>
        <ul className="work">
          {projects.map((p) => (
            <li key={p.slug} className={p.card.thumb ? 'has-thumb' : undefined}>
              <div className="body">
              <div className="top">
                <h3>
                  {p.page
                    ? <Link className="work-link" to={`/projects/${p.slug}`}>{p.title}</Link>
                    : p.title}
                </h3>
                <span className="yr">{p.year}</span>
              </div>

              {p.award && <p className="award">{p.award}</p>}

              <p>{p.card.desc}</p>

              <div className="meta">
                <span>{p.card.stack}</span>
                {p.page && <Link to={`/projects/${p.slug}`}>Read more →</Link>}
              </div>
              </div>

              {p.card.thumb && asset(p.card.thumb) && (
                <figure className="thumb polaroid">
                  {isVideo(p.card.thumb) ? (
                    <video src={asset(p.card.thumb)} autoPlay muted loop playsInline />
                  ) : (
                    <img src={asset(p.card.thumb)} alt={p.card.thumbCap || ''} loading="lazy" />
                  )}
                  {p.card.thumbCap && <figcaption>{p.card.thumbCap}</figcaption>}
                </figure>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="squig" data-reveal />

      <section id="experience">
        <h2>Where I've been</h2>
        <ul className="ledger">
          {experience.map((r) => (
            <li key={r.role + r.org}>
              <span className="when">{r.when}</span>
              <div className={`role-body${r.img && asset(r.img.src) ? ' has-shot' : ''}`}>
                <div className="role-text">
                  <h3>{r.role}</h3>
                  <p className="org">
                    {r.href
                      ? <a href={r.href} target="_blank" rel="noopener noreferrer">{r.org}</a>
                      : r.org}
                  </p>
                  <p>{r.desc}</p>
                </div>

                {r.img && asset(r.img.src) && (
                  <figure className="role-shot polaroid">
                    {isVideo(r.img.src) ? (
                      <video src={asset(r.img.src)} autoPlay muted loop playsInline />
                    ) : (
                      <img src={asset(r.img.src)} alt={r.img.cap || ''} loading="lazy" />
                    )}
                    {r.img.cap && <figcaption>{r.img.cap}</figcaption>}
                  </figure>
                )}

                {r.imgs?.length > 0 && (
                  <div className="role-strip">
                    {r.imgs.filter((m) => asset(m.src)).map((m) => (
                      <figure key={m.src} className="polaroid">
                        {isVideo(m.src) ? (
                          <video src={asset(m.src)} autoPlay muted loop playsInline />
                        ) : (
                          <img src={asset(m.src)} alt={m.cap || ''} loading="lazy" />
                        )}
                        {m.cap && <figcaption>{m.cap}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="squig" data-reveal />

      <section id="interests" className="interests">
        <h2>The rest of me</h2>

        <div className="interests-text">
          <p>
            {interests.lead}{' '}
            {interests.items.map((it, i) => (
              <span key={it + i}>
                <b>{it}</b>
                {i < interests.items.length - 2 ? ', ' : ''}
                {i === interests.items.length - 2 ? ' and ' : ''}
              </span>
            ))}
            {interests.tail ? <>. {interests.tail}</> : '.'}
          </p>
        </div>

        {interests.media?.length > 0 && (
          <div className="life-strip">
            {interests.media.map((m, i) => {
              const url = asset(m.src);
              return (
                <figure key={m.src || `slot-${i}`} className="polaroid">
                  {url && isVideo(m.src) ? (

                    <video src={url} autoPlay muted loop playsInline />
                  ) : url ? (
                    <img src={url} alt={m.cap || ''} loading="lazy" />
                  ) : (
                    <div className="slot-empty" aria-hidden="true">
                      <span>{m.placeholder || 'coming soon'}</span>
                    </div>
                  )}
                  {m.cap && <figcaption>{m.cap}</figcaption>}
                </figure>
              );
            })}
          </div>
        )}

      </section>

      <div className="squig" data-reveal />

      <section id="contact" className="contact">
        <h2>Say Hello</h2>
        <div>
          <p>{contact.lede}</p>
          <p style={{ marginTop: 22 }}>
            <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <div className="links">
            {site.links.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
