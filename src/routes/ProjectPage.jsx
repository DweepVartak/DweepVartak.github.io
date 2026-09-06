import { Link, useParams } from 'react-router-dom';
import { byslug } from '../data/projects';
import { asset, isVideo } from '../lib/media';
import '../css/Project.css';

function Media({ src, cap }) {
  const url = asset(src);
  if (!url) return null;
  return (
    <figure className="shot">
      {isVideo(src)
        ? <video src={url} autoPlay muted loop playsInline preload="metadata" aria-label={cap || ''} />
        : <img src={url} alt={cap || ''} loading="lazy" />}
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = byslug(slug);

  if (!project || !project.page) {
    return (
      <div className="page project">
        <h1 className="project-title">Not found</h1>
        <p>That project doesn&apos;t have a page.</p>
        <p style={{ marginTop: 20 }}><Link to="/#projects">← Back to projects</Link></p>
      </div>
    );
  }

  const { page } = project;
  const media = page.figures ?? [];

  return (
    <article className="page project">
      <Link className="back" to="/#projects">← Projects</Link>

      <header className="project-head">
        <span className="project-year">{project.year}</span>
        <h1 className="project-title">{project.title}</h1>
        {project.award && <p className="award">{project.award}</p>}
        {page.lede && <p className="lede">{page.lede}</p>}
      </header>

      <div className={`project-body${media.length ? '' : ' no-media'}`}>
        <div className="project-text">
          {page.sections.map((s) => (
            <section className="project-section" key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}

          {page.links?.length > 0 && (
            <div className="project-links">
              {page.links.map((l) => (
                <a key={l.label} href={l.href}>{l.label} ↗</a>
              ))}
            </div>
          )}
        </div>

        {media.length > 0 && (
          <aside className="project-rail">
            {media.map((m) => <Media key={m.src} src={m.src} cap={m.cap} />)}
          </aside>
        )}
      </div>

      <div className="squig" />
      <p className="back-bottom"><Link to="/#projects">← Back to all projects</Link></p>
    </article>
  );
}
