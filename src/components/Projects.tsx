import { projects } from "@/data/projects";

const STATUS_STYLES: Record<string, string> = {
  practice: "bg-teal-400/10 text-teal-200 border-teal-400/30",
  coursework: "bg-amber-400/10 text-amber-200 border-amber-400/30",
  empty: "bg-white/10 text-slate-300 border-white/20",
};

export default function Projects() {
  return (
    <section id="projects" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Projects
        </div>
        <h2 className="font-serif text-2xl text-white sm:text-3xl">What&apos;s actually on GitHub</h2>
        <p className="mt-2 max-w-xl text-slate-400">
          Verified repositories only — mostly coursework and practice exercises right now, honestly
          labeled rather than dressed up. Only 6 of 12 repos could be automatically inspected.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <article key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg text-white">{p.title}</h3>
                <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[0.7rem] ${STATUS_STYLES[p.status] || STATUS_STYLES.empty}`}>
                  {p.statusLabel}
                </span>
              </div>
              <p className="text-sm text-slate-400">{p.description}</p>
              {p.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[0.7rem] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs italic text-slate-500">{p.notes}</p>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-amber-300 hover:underline"
              >
                View on GitHub ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
